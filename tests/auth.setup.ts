declare var require: any;
declare var process: any;


import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto('https://www.zillow.com/?autosignin=false');
    await page.getByRole('button',{name:'Sign in'}).click()
    await page.getByLabel('identifier').fill(process.env.EMAIL)
    await page.getByRole('button',{name:'Continue'}).click()
    await page.locator('#password').fill(process.env.PASSWORD);
    await page.waitForLoadState('load');

    // back to normal programming...
    await expect(page).toHaveURL(`https://dev-fci-app.apps.lyn-cre01.liberty.edu/`);

    await page.context().storageState({ path: authFile });
});