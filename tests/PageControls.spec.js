const {test, expect} = require('@playwright/test');

test('Child Window Handling Test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const website = "https://www.saucedemo.com/";
    const userName = "standard_user";
    const password = "secret_sauce";
    const txtUsername = page.locator("#user-name");
    const txtPassword = page.locator("#password");
    const btnLogin = page.locator("#login-button");
    const btnBurgerMenu = page.locator("#react-burger-menu-btn");
    const lblLogout = page.locator("#logout_sidebar_link");
    const btnLinkedin = page.locator("[href*=linkedin]");
    
    await page.goto(website);
    await txtUsername.fill(userName);
    await txtPassword.fill(password);
    await btnLogin.click();
    await page.mouse.wheel(0, 500); //scroll down

    /**
     * create a Promise
     * until the step(s) below is resolved, the steps afterwards won't be executed
     */
    const [newPage] = await Promise.all(
        [
            /* listens for any new page pending, rejected, fulfilled */
            context.waitForEvent('page'),

            /* click linkedin button */
            btnLinkedin.click(), // new page is opened
        ]
    );

    /* switch to child page */
    const btnDismiss = newPage.locator(".modal__dismiss").first();
    const lblCardTitle = newPage.locator(".top-card-layout__title");

    await btnDismiss.click();
    const lblText = await lblCardTitle.textContent();
    await expect(lblCardTitle).toContainText("Sauce Labs");

    /* switch to parent page */
    await page.mouse.wheel(0, -500); // scroll up
    await btnBurgerMenu.click();
    await lblLogout.click();

    await txtUsername.fill(lblText);
    console.log(await txtUsername.textContent());
});