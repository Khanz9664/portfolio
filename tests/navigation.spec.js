const { test, expect } = require('@playwright/test');

test.describe('Navigation End-to-End Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Shahid Ul Islam/);
  });

  test('navbar links should navigate to correct pages', async ({ page }) => {
    // Navigate to About
    await page.click('a.nav-link[href="about.html"]');
    await expect(page).toHaveURL(/about.html/);
    await expect(page.locator('h1')).toBeVisible();

    // Navigate back to Home (index.html)
    await page.click('a.nav-link[href="index.html"]');
    await expect(page).toHaveURL(/index.html/);
  });

  test('active link highlighting should work', async ({ page }) => {
    await page.goto('/contact.html');
    const contactLink = page.locator('a.nav-link[href="contact.html"]');
    await expect(contactLink).toHaveClass(/active/);
  });

  test('mobile menu should toggle', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuToggle = page.locator('.menu-toggle');
    const navLinks = page.locator('.nav-links');

    // Open menu
    await menuToggle.click();
    await expect(navLinks).toHaveClass(/active/);
    await expect(menuToggle).toHaveClass(/open/);

    // Close menu
    await menuToggle.click({ force: true });
    await expect(navLinks).not.toHaveClass(/active/, { timeout: 10000 });
  });
});
