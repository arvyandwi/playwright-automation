const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title());

    const userName = page.locator("#user-name");
    const password = page.locator("[type='password']");
    const btnLogin = page.locator("#login-button");
    const txtError = page.locator("h3[data-test='error']");
    const items = page.locator("a div.inventory_item_name");

    /* insert wrong username */
    await userName.fill("standard");
    /* insert wrong password */
    await password.fill("secret");
    /* click login button */
    await btnLogin.click();
    console.log(txtError.textContent());
    /* verify if error text contains expected text */
    await expect(txtError).toContainText("sadface");

    /* clear username */
    await userName.fill("");
    /* clear password */
    await password.fill("");
    /* input username */
    await userName.fill("standard_user");
    /* input password */
    await password.fill("secret_sauce");
    /* click login button */
    await btnLogin.click();
    //console.log(await items.first().textContent());
    //console.log(await items.nth(2).textContent());
    //console.log(await items.last().textContent());
    console.log(await items.allTextContents());
});

test('Page Context Playwright Test', async ({page}) =>
{
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Swag Labs");
});