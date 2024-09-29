const {test, expect} = require('@playwright/test');

test('UI Controls Test', async ({page}) =>
{
    const website = "https://katalon-demo-cura.herokuapp.com/";
    const btnMakeAppointment = page.locator("#btn-make-appointment");
    const userName = "John Doe";
    const password = "ThisIsNotAPassword";
    const txtUsername = page.locator("#txt-username");
    const txtPassword = page.locator("#txt-password");
    const btnLogin = page.locator("#btn-login");
    const dropdownFacility = page.locator("#combo_facility");
    const chkHospital = page.locator("#chk_hospotal_readmission");
    const radioProgram = page.locator(".radio-inline input");

    await page.goto(website);

    /* assertion */
    await expect(page).toHaveTitle("CURA Healthcare Service");

    /* CTA make an appointment */
    await btnMakeAppointment.click();

    /* insert username */
    await txtUsername.fill(userName);

    /* insert password */
    await txtPassword.fill(password);

    /* click login button */
    await btnLogin.click();

    /* select dropdown option(s) */
    await dropdownFacility.selectOption({index: 0});

    /* assertion */
    await expect(dropdownFacility).toContainText("Tokyo CURA");

    /* click the checkbox */
    await chkHospital.click();

    /* assertion */
    await expect(chkHospital).toBeChecked();

    /* uncheck the checkbox */
    await chkHospital.uncheck();

    /* assertion */
    expect(await chkHospital.isChecked()).toBeFalsy(); // check if the checkbox is unchecked and returns true, otherwise returns false

    /* click radio button */
    await radioProgram.last().click();
    console.log(radioProgram.last().isChecked()); // returns boolean & no assertion

    /* assertion */
    await expect(radioProgram.last()).toBeChecked();

    //await page.pause();
});