const { test, expect } = require('@playwright/test');

test.describe('Verificate Shop page: home link + list of product:', () => {

    const PRODUCT_COUNT = 6;

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');        
    });
    //check home link
    test('home link text should be equal "DEMO Store".', async ({ page }) => {
        const homeLink = page.locator('.nav-link'); //TODO: wip using [data-qa]
        await expect(homeLink).toHaveText('DEMO Store');
        await page.screenshot({ path: 'screens/screenshot-home.png', fullPage: true });
    });
    //check products list card
    test('List of products should contains more than 3 card.', async ({ page }) => {
        const card = page.locator('.card'); //TODO: wip using [data-qa]
        await expect(card).toHaveCount(PRODUCT_COUNT);
    });
});