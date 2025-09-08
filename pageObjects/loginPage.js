class LoginPage{
    constructor(page){
        this.page = page;
    }

    async aceitarCookies(){
        const botaoAceitarCookies = await this.page.getByRole('button', {name: 'Accept All'});
        await botaoAceitarCookies.click();
    }
    

    async preencherEmailESenha(email, senha){
        const campoEmail = await this.page.locator('#GEN_INPUT_ACCOUNT_LOGIN_EMAIL');
        await campoEmail.fill(email);

        const campoSenha = await this.page.locator('#GEN_INPUT_ACCOUNT_LOGIN_PASSWORD');
        await campoSenha.fill(senha);
    }

    async clicarEmLogar(){
        const botaoLogin = await this.page.getByRole('button', { name: 'Login' });
        await botaoLogin.click();
    }

    async verificarMensagemDeErro(){
        const mensagemDeErro = await this.page.getByText('SorryWe didn\'t find an');
        return mensagemDeErro;
    }
}

module.exports = LoginPage;