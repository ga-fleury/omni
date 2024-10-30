import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('http://localhost:5173/calendar');
	await expect(page.getByRole('main')).toContainText('09');
	await page.locator('div:nth-child(9)').click();
	await page.getByRole('button', { name: 'add Add property' }).click();
	await page.getByText('Checkbox').click();
	await page.locator('div:nth-child(5) > .param-right').click();
	await page.locator('.modal-backdrop').click();
	await page.getByRole('button', { name: 'Close' }).click();
	await expect(
		page.locator('div:nth-child(4) > .icon3 > .material-symbols-outlined')
	).toBeVisible();
});
