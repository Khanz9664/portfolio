const { test, expect } = require('@playwright/test');

test.describe('Contact Form Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact.html');
  });

  test('service chips should toggle correctly', async ({ page }) => {
    const devChip = page.locator('.chip:has-text("Development")');
    const aiChip = page.locator('.chip:has-text("AI Solutions")');
    const serviceInput = page.locator('#service-input');

    // Click Development
    await devChip.click();
    await expect(devChip).toHaveClass(/active/);
    await expect(aiChip).not.toHaveClass(/active/);
    await expect(serviceInput).toHaveValue('Development');

    // Click AI Solutions
    await aiChip.click();
    await expect(aiChip).toHaveClass(/active/);
    await expect(devChip).not.toHaveClass(/active/);
    await expect(serviceInput).toHaveValue('AI Solutions');
  });

  test('should show success message on valid form submission', async ({ page }) => {
    // Intercept/Mock the fetch request
    await page.route('https://script.google.com/macros/s/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ result: 'success' }),
      });
    });

    // Fill the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message for playwright.');

    // Submit
    await page.click('.get-in-touch-btn');

    // Verify success state
    const msg = page.locator('#msg');
    await expect(msg).toHaveText(/Message Sent Successfully/i, { timeout: 10000 });
  });

  test('should show error message on failed submission', async ({ page }) => {
    // Force a failure
    await page.route('https://script.google.com/macros/s/**', async route => {
      await route.fulfill({ status: 500 });
    });

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message for failure.');
    await page.click('.get-in-touch-btn');

    const msg = page.locator('#msg');
    await expect(msg).toHaveText(/Error/i, { timeout: 10000 });
  });
});
