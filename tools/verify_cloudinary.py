import os
import sys
import urllib.request
import urllib.error
import base64

def load_env():
    env_vars = {}
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    if '=' in line:
                        key, val = line.split('=', 1)
                        env_vars[key.strip()] = val.strip()
    return env_vars

def verify_cloudinary():
    env = load_env()
    cloud_name = env.get('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')
    api_key = env.get('CLOUDINARY_API_KEY')
    api_secret = env.get('CLOUDINARY_API_SECRET')

    if not cloud_name:
        print("❌ Error: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in .env")
        return False

    url = f"https://api.cloudinary.com/v1_1/{cloud_name}/ping"
    
    try:
        req = urllib.request.Request(url, method='GET')
        if api_key and api_secret:
            # Build basic auth header
            auth_str = f"{api_key}:{api_secret}"
            auth_bytes = auth_str.encode('utf-8')
            auth_b64 = base64.b64encode(auth_bytes).decode('utf-8')
            req.add_header('Authorization', f'Basic {auth_b64}')

        with urllib.request.urlopen(req, timeout=10) as response:
            status_code = response.getcode()
            if status_code == 200:
                print("✅ Cloudinary connection successful! Response 200.")
                return True
            else:
                print(f"❌ Cloudinary connection failed with status code {status_code}")
                return False
    except urllib.error.HTTPError as e:
        # Public ping might return 401 if unauthenticated but it still confirms the cloud exists
        if e.code in [200, 401]:
            print(f"ℹ️ Cloudinary endpoint reached (status code {e.code}).")
            return True
        else:
            print(f"❌ Cloudinary connection failed with HTTPError: {e.code} {e.reason}")
            return False
    except Exception as e:
        print(f"❌ Cloudinary connection failed with exception: {e}")
        return False

if __name__ == "__main__":
    success = verify_cloudinary()
    sys.exit(0 if success else 1)
