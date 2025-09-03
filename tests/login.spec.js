// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.use({
  permissions: [] // Bloqueia todas as permissões, incluindo geolocalização
});

export function createRandomUser() {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
  };
}

const emailUser = faker.internet.email();
const nameUser = faker.internet.username();

test.describe.configure({ mode: 'serial' });

test.describe('Testes em sequência', () => {
  test('Criar conta', async ({ page }) => {
    await page.goto('https://app.go2atlas.com/version-test/account_create?lang=en_us');
    
    // Aceitar cookies se existir
    await page.getByRole('button', { name: 'Accept All' }).click().catch(() => {});
    
    // Preencher formulário
    await page.locator('#GEN_INPUT_ACCOUNT_CREATE_EMAIL').fill(emailUser);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#GEN_INPUT_ACCOUNT_CREATE_FIRST_NAME').fill(nameUser);
    await page.locator('#GEN_INPUT_ACCOUNT_CREATE_PASSWORD').fill('teste@teste123');
    await page.getByRole('button', { name: 'Create account' }).click({force: true});
    await page.getByRole('button', { name: 'Create account' }).click({force: true});

    // Esperar por uma resposta ou navegação
    try {
      await page.waitForURL(/account_home|account-created/, { timeout: 25000 });

      await expect(page).toHaveURL(/account_home|account-created/);
      
    } catch (error) {
      // Debug: capturar o conteúdo da página em caso de erro
      console.error('Error during account creation. Page content:', await page.content());
      throw error;
    }
  });

  test('Teste de login com sucesso', async ({ page }) => {
    await page.goto('https://app.go2atlas.com/version-test/account_login?lang=en_us');
    
    await page.getByRole('button', { name: 'Accept All' }).click();
    await page.locator('#GEN_INPUT_ACCOUNT_LOGIN_EMAIL').fill(emailUser);
    await page.locator('#GEN_INPUT_ACCOUNT_LOGIN_PASSWORD').fill('teste@teste123');
    await page.getByRole('button', { name: 'Login' }).click();

     try {
      
      await page.waitForURL(/account_home/, { timeout: 25000 });
      
      // Verificações de sucesso
      await expect(page).toHaveURL(/account_home/);
      
    } catch (error) {
      // Debug: capturar o conteúdo da página em caso de erro
      console.error('Error during account creation. Page content:', await page.content());
      throw error;
    }
    
  });
});