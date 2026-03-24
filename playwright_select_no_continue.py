import asyncio
from playwright.async_api import async_playwright

URL = "https://rotm.uat.internal.sas-notprod.homeoffice.gov.uk/evidence-url"

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # Set headless=True to run without UI
        page = await browser.new_page()
        await page.goto(URL)
        await page.wait_for_load_state('networkidle')

        # Try to locate and select the 'No' option (update selector as needed)
        try:
            # Example: radio button or label with text 'No'
            await page.click("text=No")
            print("'No' option selected.")
        except Exception as e:
            print("Could not find 'No' option:", e)

        # Try to click the 'Continue' button (update selector as needed)
        try:
            await page.click("text=Continue")
            print("'Continue' button clicked.")
        except Exception as e:
            print("Could not find 'Continue' button:", e)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
