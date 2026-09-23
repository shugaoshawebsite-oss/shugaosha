import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to load env from .env.local or .env
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  const env = { ...process.env };

  for (const file of envFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          // Remove wrapping quotes if present
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!env[key]) {
            env[key] = val;
          }
        }
      }
    }
  }
  return env;
}

async function main() {
  console.log('🔄 Starting Cloudinary migration...\n');

  const env = loadEnv();
  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  const cloudinaryUrl = env.CLOUDINARY_URL;

  if (cloudinaryUrl) {
    console.log('🔑 Using CLOUDINARY_URL from environment');
    cloudinary.config({ cloudinary_url: cloudinaryUrl });
  } else if (cloudName && apiKey && apiSecret) {
    console.log(`🔑 Using Cloudinary account: ${cloudName}`);
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  } else {
    console.error('❌ Error: Cloudinary credentials not found!');
    console.error('Please make sure you have saved your .env.local file with:');
    console.error('  CLOUDINARY_CLOUD_NAME=...');
    console.error('  CLOUDINARY_API_KEY=...');
    console.error('  CLOUDINARY_API_SECRET=...');
    console.error('  (or CLOUDINARY_URL=cloudinary://...)');
    process.exit(1);
  }

  // Ping Cloudinary
  try {
    const ping = await cloudinary.api.ping();
    console.log('✅ Connected to Cloudinary successfully:', ping);
  } catch (err) {
    console.error('❌ Failed to connect to Cloudinary:', err.message);
    process.exit(1);
  }

  const jsonFiles = [
    'content/caseStudies.json',
    'content/celebrities.json',
  ];

  const uploadedMap = new Map();

  for (const relJsonPath of jsonFiles) {
    const fullJsonPath = path.join(rootDir, relJsonPath);
    if (!fs.existsSync(fullJsonPath)) {
      console.warn(`⚠️ File not found: ${relJsonPath}, skipping.`);
      continue;
    }

    console.log(`\n📄 Processing ${relJsonPath}...`);
    const originalContent = fs.readFileSync(fullJsonPath, 'utf8');
    const items = JSON.parse(originalContent);

    // Save backup
    fs.writeFileSync(`${fullJsonPath}.bak`, originalContent, 'utf8');

    let modified = false;

    for (const item of items) {
      if (!item.imageRelativeUrl) continue;

      const imgPath = item.imageRelativeUrl;
      // Skip if already a Cloudinary or remote URL
      if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
        console.log(`  ⏩ Already remote URL: ${imgPath}`);
        continue;
      }

      if (uploadedMap.has(imgPath)) {
        item.imageRelativeUrl = uploadedMap.get(imgPath);
        modified = true;
        continue;
      }

      // Resolve local file path
      const localFilePath = path.join(rootDir, 'public', imgPath.replace(/^\//, ''));
      if (!fs.existsSync(localFilePath)) {
        console.warn(`  ⚠️ Local file does not exist: ${localFilePath}`);
        continue;
      }

      console.log(`  ⬆️ Uploading: ${imgPath} ...`);
      try {
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
          folder: 'shugaosha_cms',
          resource_type: 'auto',
          use_filename: true,
          unique_filename: false,
        });

        const cloudUrl = uploadResult.secure_url;
        console.log(`  ✅ Uploaded -> ${cloudUrl}`);
        uploadedMap.set(imgPath, cloudUrl);
        item.imageRelativeUrl = cloudUrl;
        modified = true;
      } catch (uploadErr) {
        console.error(`  ❌ Failed to upload ${imgPath}:`, uploadErr.message);
      }
    }

    if (modified) {
      fs.writeFileSync(fullJsonPath, JSON.stringify(items, null, 2), 'utf8');
      console.log(`  💾 Updated and saved ${relJsonPath}`);
    } else {
      console.log(`  ℹ️ No changes needed in ${relJsonPath}`);
    }
  }

  // Also update dataService.ts fallbacks if any images matched
  const dataServicePath = path.join(rootDir, 'src/utils/dataService.ts');
  if (fs.existsSync(dataServicePath) && uploadedMap.size > 0) {
    let serviceCode = fs.readFileSync(dataServicePath, 'utf8');
    let serviceModified = false;
    for (const [localPath, cloudUrl] of uploadedMap.entries()) {
      if (serviceCode.includes(localPath)) {
        serviceCode = serviceCode.replaceAll(localPath, cloudUrl);
        serviceModified = true;
      }
    }
    if (serviceModified) {
      fs.writeFileSync(dataServicePath, serviceCode, 'utf8');
      console.log('\n💾 Updated fallback image references in src/utils/dataService.ts');
    }
  }

  console.log('\n🎉 Migration complete!');
  console.log(`Total unique images uploaded: ${uploadedMap.size}`);
}

main().catch(console.error);
