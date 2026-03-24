import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# URL to automate
target_url = "https://acp-sso.prod.acp.homeoffice.gov.uk/realms/acp-vpn/protocol/openid-connect/auth?state=698544209d72fd3ae3861cb0ea51579e&client_id=broker&nonce=781ab3bd7212592874ded872b87ea70a&scope=openid%20&redirect_uri=https%3A%2F%2Faccess-acp.digital.homeoffice.gov.uk%2Foauth%2Fcallback&response_type=code"

# Set up Chrome options (headless optional)
chrome_options = Options()
# chrome_options.add_argument('--headless')  # Uncomment to run headless

# Start the browser
driver = webdriver.Chrome(options=chrome_options)

driver.get(target_url)

time.sleep(3)  # Wait for page to load

# Try to find and click the O365 button (update selector as needed)
try:
    # This selector may need to be updated based on the actual button HTML
    o365_button = driver.find_element(By.XPATH, "//button[contains(., 'O365') or contains(., 'Office 365')]")
    o365_button.click()
    print("O365 button clicked.")
except Exception as e:
    print("Could not find or click the O365 button:", e)

# Wait to observe result (optional)
time.sleep(5)

driver.quit()
