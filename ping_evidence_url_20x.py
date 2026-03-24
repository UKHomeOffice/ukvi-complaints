import requests
import time

url = "https://rotm.uat.internal.sas-notprod.homeoffice.gov.uk/evidence-url"

for i in range(1, 21):
    try:
        response = requests.get(url)
        print(f"Attempt {i}: Status code: {response.status_code}")
    except Exception as e:
        print(f"Attempt {i}: Error pinging URL: {e}")
    time.sleep(1)  # Optional: wait 1 second between requests
