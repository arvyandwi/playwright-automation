const {test, expect} = require('@playwright/test');

test('End to End Test Scenario', async ({page}) => {
    
    const website = "https://automationteststore.com/index.php?rt=account/login";
    const userName = "demo_user";
    const password = "demo123";

    /**
     * go to website and do login
     * check if the homepage title is visible
     */
    await page.goto(website);
    await page.locator("input[id*='loginname']").fill(userName);
    await page.locator("input[id*='password']").fill(password);
    await page.locator("button[title='Login']").click();
    await page.locator("img[title='Automation Test Store']").isVisible();

    /**
     * click on a category
     * in this case, on the 6th element which is 'Men'
     */
    await page.locator("ul.categorymenu > li").nth(5).click();

    /**
     * count all the available subcategories
     */
    const subcategories = page.locator("ul.thumbnails > li > div");
    const selectsubcategories = "Fragrance Sets";
    const totalsubcategories = await subcategories.count();
    console.log(`Count Subcategories ${totalsubcategories}`);

    /**
     * loop all the subcategories
     * loop ends when the given subcategories matched with selector aand click it
     */
    for(let i = 0; i < totalsubcategories; i++) {
        if(await subcategories.nth(i).locator("a").textContent() === selectsubcategories) {
            await subcategories.nth(i).locator("a").click();
            break;
        }
    }

    /**
     * given the selected item contains below
     * add to cart
     */
    await page.locator("a[title*='Night Perfume']").click();
    const selectItem = page.locator("h1[class='productname'] > .bgnone");
    const txtItem = await selectItem.textContent();
    await page.locator(".cart").click();

    /**
     * do assertion for the selected item
     * click checkout
     */
    await expect(page.locator(".align_left a")).toContainText(txtItem);
    await page.locator("#cart_checkout1").click();

    /**
     * confirm checkout
     */
    await page.locator("button[id='checkout_btn']").click();

    /**
     * get the Order ID
     * split the text content of the locator and split it
     * the store it for assertion
     */
    const lblOrderId = page.locator(".mb40 p").nth(1);
    const txtOrderId = await lblOrderId.textContent();
    const splitText = txtOrderId.split(" ");
    const orderId = splitText[2];
    console.log(`Order ID ${orderId}`);
    await page.locator("[title='Continue']").click();

    /**
     * verify if the page navigate to homepage
     * go to navigation on the 6th element which is 'Account'
     * in the 'Account' page, click on 'Order History'
     */
    await page.locator("img[title='Automation Test Store']").isVisible();
    await page.locator("i[class='fa fa-user'] + span").first().click();
    await page.locator(".side_account_list li").nth(5).click();

    /**
     * count all the Order ID(s)
     */
    const txtOrders = page.locator(".contentpanel .container-fluid.mt20 > div:nth-child(1)");
    const countOrders = await txtOrders.count();
    console.log(`Count Order ID ${countOrders}`);


    /**
     * loop all the Order ID(s)
     * split the text content
     * if the split text matches or includes the Order ID text from the confirmation page
     * click on the 'View' button and end the loop
     */
    for(let i = 0; i < countOrders; i++) {
        await txtOrders.first().isVisible();
        const orders = await txtOrders.nth(i).textContent();
        const splitTxtOrder = orders.split(" ")[5];
        console.log(`Current Order ID ${splitTxtOrder}`);
        if(splitTxtOrder === orderId || splitTxtOrder.includes(orderId)) {
            await page.locator("button[title='View']").nth(i).click();
            break;
        }
    }

    /**
     * click continue
     */
    const btnContinue = page.locator("a[title='Continue']");

    /**
     * do logout
     */
    await btnContinue.click();
    await page.locator(".side_account_list li").nth(9).click();

    /**
     * verify logout successful aand continue
     */
    await expect(page.locator(".maintext")).toContainText("Logout");
    await btnContinue.click();

    /**
     * wait for the image carousel element to appear
     */
    await page.locator(".oneByOneSlide").waitFor();
});