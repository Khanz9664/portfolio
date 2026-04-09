const { test, expect } = require('@playwright/test');

test.describe('Navigation End-to-End Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Shahid Ul Islam/);
  });

  test('navbar links should navigate to correct pages', async ({ page, isMobile }) => {
    const navLinks = page.locator('.nav-links');
    const menuToggle = page.locator('.menu-toggle');

    // Helper to click a link, handling mobile menu
    const navigateTo = async (selector) => {
      const isMobileView = isMobile || (await menuToggle.isVisible());
      
      if (isMobileView) {
        const isOpen = await menuToggle.evaluate(el => el.classList.contains('open'));
        if (!isOpen) {
          await menuToggle.click();
          // Wait for transition to finish
          await expect(navLinks).toHaveClass(/active/);
          await page.waitForTimeout(600); 
        }
      }
      
      const link = page.locator(selector).first();
      await link.click();
    };

    // Navigate to About
    await navigateTo('a.nav-link[href="about.html"]');
    await expect(page).toHaveURL(/about.html/);
    await expect(page.locator('h1').first()).toBeVisible();

    // Navigate back to Home
    await navigateTo('a.nav-link[href="index.html"]');
    await expect(page).toHaveURL(/index.html/);
  });

  test('active link highlighting should work', async ({ page }) => {
    await page.goto('/contact.html');
    const contactLink = page.locator('a.nav-link[href="contact.html"]').first();
    await expect(contactLink).toHaveClass(/active/);
  });

  test('mobile menu should toggle', async ({ page, isMobile }) => {
    // Force mobile viewport if running in desktop project
    if (!isMobile) {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/'); 
    }
    
    const menuToggle = page.locator('.menu-toggle');
    const navLinks = page.locator('.nav-links');

    await expect(menuToggle).toBeVisible();

    // Open menu if not already open
    const isOpenInitial = await menuToggle.evaluate(el => el.classList.contains('open'));
    if (!isOpenInitial) {
      await menuToggle.click();
    }
    await expect(navLinks).toHaveClass(/active/);
    await expect(menuToggle).toHaveClass(/open/);

    // Wait for transition to stabilize
    await page.waitForTimeout(800);

    // Close menu if it's open
    const isOpenBeforeClose = await menuToggle.evaluate(el => el.classList.contains('open'));
    if (isOpenBeforeClose) {
      // Use force click to bypass any potential overlay issues during transition
      await menuToggle.click({ force: true });
    }
    
    await expect(navLinks).not.toHaveClass(/active/);
    await expect(menuToggle).not.toHaveClass(/open/);
  });
});
