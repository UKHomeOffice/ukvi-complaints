import requests

# The URL to ping
target_url = "https://acp-sso.prod.acp.homeoffice.gov.uk/realms/acp-vpn/protocol/openid-connect/auth?state=698544209d72fd3ae3861cb0ea51579e&client_id=broker&nonce=781ab3bd7212592874ded872b87ea70a&scope=openid%20&redirect_uri=https%3A%2F%2Faccess-acp.digital.homeoffice.gov.uk%2Foauth%2Fcallback&response_type=code"

try:
    response = requests.get(target_url)
    print(f"Status code: {response.status_code}")
    print(f"Response headers: {response.headers}\n")
    print(f"Response body (first 500 chars):\n{response.text[:500]}")
except Exception as e:
    print(f"Error pinging URL: {e}")
