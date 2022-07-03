const { expect } = require('@playwright/test');
const ROUTERS = require('../utils/routersConstants');
const { AuthPage } = require('./AuthPage')

exports.ShopPage = class ShopPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this._loginBtn = page.locator('#data-qa_navbar_login');
        this._navLink = page.locator('#data-qa_navbar_nav-link');
        this._logoutBtn = page.locator('#data-qa_navbar_logout');
    }

    async openShopPage() {
        // await this.page.goto(ROUTERS.SHOP); //TODO: WIP using const
        await this.page.goto("http://localhost:3000/");
        await expect(this._loginBtn).toBeVisible();
    }

    async openLoginForm() {
        await this._loginBtn.click();

        const authPage = new AuthPage(this.page);
        await expect(authPage.authMsg).toBeVisible();
    }
}