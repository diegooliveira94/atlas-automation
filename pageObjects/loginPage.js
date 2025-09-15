class LoginPage {
    constructor(page) {
        this.page = page;

        // Isolando locators como atributos de classe
        this.botaoAceitarCookies = page.getByRole('button', { name: 'Accept All' });
        this.campoEmail = page.locator('#GEN_INPUT_ACCOUNT_LOGIN_EMAIL');
        this.campoSenha = page.locator('#GEN_INPUT_ACCOUNT_LOGIN_PASSWORD');
        this.botaoLogin = page.getByRole('button', { name: 'Login' });
        this.mensagemDeErro = page.getByText('SorryWe didn\'t find an');
    }

    async aceitarCookies() {
        await this.botaoAceitarCookies.click();
    }

    async preencherEmail(email, ) {
        await this.campoEmail.fill(email);
    }

    async preencherEmailESenha(email, senha) {
        await this.campoEmail.fill(email);
        await this.campoSenha.fill(senha);
    }

    async clicarEmLogar() {
        await this.botaoLogin.click();
    }

    async verificarMensagemDeErro() {
        return this.mensagemDeErro;
    }
}

module.exports = LoginPage;