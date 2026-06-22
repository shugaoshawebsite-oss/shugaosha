# Cloudinary Images Standard Operating Procedure (SOP)

## Goal
Optimize image delivery by loading all assets from Cloudinary.

## Next.js Loader Configuration
We configure Next.js to use a custom image loader.

### 1. `next.config.ts` Configuration
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/utils/cloudinaryLoader.ts',
  },
};
export default nextConfig;
```

### 2. Loader Implementation (`src/utils/cloudinaryLoader.ts`)
Converts relative image paths to optimized Cloudinary URLs:
```typescript
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dhtgf4e54';
  
  // If the src is already a full URL, return it
  if (src.startsWith('http')) {
    return src;
  }
  
  const params = [
    'f_auto',
    'q_auto',
    `w_${width}`,
  ].join(',');

  return f`https://res.cloudinary.com/${cloudName}/image/upload/${params}/${src}`;
}
```

## Guidelines
- All images displayed on the site must pass through the `next/image` component.
- The `src` path should be relative to the Cloudinary upload (e.g. `hero_image.jpg`), or if pulled from Sanity, it should resolve to Sanity's CDN or Cloudinary depending on where the asset was uploaded.
