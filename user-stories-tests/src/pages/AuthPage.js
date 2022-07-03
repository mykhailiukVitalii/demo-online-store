const { expect } = require('@playwright/test');

exports.AuthPage = class AuthPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this._authEmail = page.locator('#data-qa_auth_email-input');
        this._authPwd = page.locator('#data-qa_auth_pwd-input');
        this._authSuccessBtn = page.locator('#data-qa_auth_success-btn');
        this._authMsg = page.locator('#data-qa_auth-msg');
        this._authError = page.locator('#data-qa_auth_login-error');
    }

    get authMsg() {
        return this._authMsg
    }
    async loginToApp(email, pwd) {
        await this._authEmail.fill(email);
        await this._authPwd.fill(pwd);

        return await this._authSuccessBtn.click();
    }
}