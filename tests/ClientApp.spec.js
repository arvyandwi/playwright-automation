const {test, expect} = require('@playwright/test');

test('@Web Client App Login Test', async ({page}) =>
{
    const website = "https://www.saucedemo.com/";
    const userName = "standard_user";
    const password = "secret_sauce";
    await page.goto(website);
    await page.locator("#user-name").fill(userName);
    await page.locator("#password").fill(password);
    await page.locator("#login-button").click();

    /* Wait for the elements to fully load 
    * The method below is DISCOURAGED!!!
    */
    //await page.waitForLoadState('networkidle');

    /* The method below is allowed to wait for load state */
    await page.locator(".inventory_item_name").first().waitFor();

    const items = await page.locator(".inventory_item_name").allTextContents();
    console.log(items);
});