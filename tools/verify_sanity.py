import os
import sys
import urllib.request
import urllib.parse
import json

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

def verify_sanity():
    env = load_env()
    project_id = env.get('NEXT_PUBLIC_SANITY_PROJECT_ID')
    dataset = env.get('NEXT_PUBLIC_SANITY_DATASET', 'production')
    api_version = env.get('NEXT_PUBLIC_SANITY_API_VERSION', '2024-03-11')

    if not project_id:
        print("❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env")
        return False

    # Perform a simple check query
    query = "*[_type == 'service'][0...1]"
    query_encoded = urllib.parse.quote(query)
    url = f"https://{project_id}.api.sanity.io/v{api_version}/data/query/{dataset}?query={query_encoded}"
    
    try:
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=10) as response:
            status_code = response.getcode()
            if status_code == 200:
                print("✅ Sanity connection successful! Response 200.")
                return True
            else:
                print(f"❌ Sanity connection failed with status code {status_code}")
                return False
    except Exception as e:
        print(f"❌ Sanity connection failed with exception: {e}")
        return False

if __name__ == "__main__":
    success = verify_sanity()
    sys.exit(0 if success else 1)
