// @ts-check
import { test, expect } from '@playwright/test';
const LoginPage = require('../pageObjects/loginPage.js');

test('Invalid Login using POM', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://app.go2atlas.com/version-test/account_login?lang=en_us');
    await loginPage.aceitarCookies();
    await loginPage.preencherEmailESenha('teste@teste.com', 'teste@teste1234');
    await loginPage.clicarEmLogar();
    await expect(await loginPage.verificarMensagemDeErro()).toContainText('SorryWe didn\'t find an');
});