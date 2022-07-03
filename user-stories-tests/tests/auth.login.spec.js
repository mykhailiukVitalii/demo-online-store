const { test, expect } = require('@playwright/test');
const { ShopPage } = require('../src/pages/ShopPage');
const { AuthPage } = require('../src/pages/AuthPage');
const USER_AUTH = require('../src/utils/data');

const { faker } = require('@faker-js/faker');

test.describe('Login to the Shop app using different credentials: valid & invalid &...', () => {

    test.beforeEach(async ({ page }) => {
        const shopPage = new ShopPage(page);
        await shopPage.openShopPage();
        await shopPage.openLoginForm();   
    });
    //check login using invalid credentials
    test('[Wrong PWD]Login to the system using wrong pwd => Error msg should be visible.', async ({ page }) => {        
        const authPage = new AuthPage(page);
        //test data
        const { email } = USER_AUTH.wrongPassword, 
                pwd = faker.internet.password();

        await authPage.loginToApp(email, pwd);

        await expect(authPage._authError).toHaveText("Ooops:" + " " + "The password is incorrect!");
    });
});