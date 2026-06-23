import os
import sys
import json

def load_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f), None
    except Exception as e:
        return None, str(e)

def check_image_exists(image_path, workspace_root):
    if not image_path:
        return True # Optional image
    # Image path starts with /images/
    if image_path.startswith('/'):
        full_path = os.path.join(workspace_root, 'public', image_path.lstrip('/'))
    else:
        full_path = os.path.join(workspace_root, 'public', 'images', image_path)
    return os.path.exists(full_path)

def verify_github_cms():
    workspace_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    content_dir = os.path.join(workspace_root, 'content')
    
    if not os.path.exists(content_dir):
        print(f"❌ Error: content/ directory does not exist at {content_dir}")
        return False

    files_to_verify = [
        ('services.json', ['_id', 'title', 'slug', 'description', 'benefits'], 'imageRelativeUrl'),
        ('celebrities.json', ['_id', 'name', 'role', 'quote'], 'imageRelativeUrl'),
        ('caseStudies.json', ['_id', 'title', 'sessionsCount', 'category', 'beforeImageRelativeUrl', 'afterImageRelativeUrl'], None),
        ('reviews.json', ['_id', 'clientName', 'location', 'rating', 'reviewText'], None),
        ('team.json', ['_id', 'name', 'role', 'bio'], 'imageRelativeUrl'),
        ('tours.json', ['_id', 'city', 'dates', 'isActive'], None)
    ]
    
    overall_success = True
    print("🔍 Starting GitHub CMS Data Verification...")

    for filename, required_fields, image_field in files_to_verify:
        file_path = os.path.join(content_dir, filename)
        if not os.path.exists(file_path):
            print(f"❌ Error: Required content file {filename} is missing")
            overall_success = False
            continue
            
        data, err = load_json_file(file_path)
        if err:
            print(f"❌ Error parsing {filename}: {err}")
            overall_success = False
            continue
            
        if not isinstance(data, list):
            print(f"❌ Error in {filename}: Root element must be a JSON array")
            overall_success = False
            continue
            
        print(f"✓ {filename} parsed successfully. Validating {len(data)} items...")
        
        for idx, item in enumerate(data):
            # Check required fields
            for field in required_fields:
                if field not in item:
                    print(f"  ❌ Item {idx} in {filename} is missing required field '{field}'")
                    overall_success = False
            
            # Check localized string presence for title/name/description/quote/bio
            for local_field in ['title', 'name', 'description', 'quote', 'bio', 'reviewText', 'city']:
                if local_field in item:
                    val = item[local_field]
                    if not isinstance(val, dict) or 'en' not in val or 'zh' not in val:
                        print(f"  ❌ Item {idx} in {filename} field '{local_field}' must be a bilingual object with 'en' and 'zh'")
                        overall_success = False

            # Check image existence
            if image_field and image_field in item:
                img_path = item[image_field]
                if not check_image_exists(img_path, workspace_root):
                    print(f"  ❌ Item {idx} in {filename} references non-existent image: {img_path}")
                    overall_success = False

            # Special checks for Case Studies
            if filename == 'caseStudies.json':
                before_img = item.get('beforeImageRelativeUrl')
                after_img = item.get('afterImageRelativeUrl')
                if not check_image_exists(before_img, workspace_root):
                    print(f"  ❌ Item {idx} in {filename} references non-existent before image: {before_img}")
                    overall_success = False
                if not check_image_exists(after_img, workspace_root):
                    print(f"  ❌ Item {idx} in {filename} references non-existent after image: {after_img}")
                    overall_success = False

    if overall_success:
        print("✅ All GitHub CMS files validated successfully! Data schemas and images are intact.")
        return True
    else:
        print("❌ Validation failed. Please correct the schema or image path issues outlined above.")
        return False

if __name__ == "__main__":
    success = verify_github_cms()
    sys.exit(0 if success else 1)
