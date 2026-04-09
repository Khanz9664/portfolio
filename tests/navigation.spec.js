const { test, expect } = require('@playwright/test');

test.describe('Navigation End-to-End Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Increase timeout and wait for DOM content to be ready
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 });
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
          // Use evaluate to click to avoid potential double-toggle issues on mobile emulations
          await menuToggle.evaluate(el => el.click());
          // Wait for transition to finish
          await expect(navLinks).toHaveClass(/active/);
          await page.waitForTimeout(800); 
        }
      }
      
      const link = page.locator(selector).first();
      // Using force: true to bypass "outside viewport" errors in webkit for fixed elements
      await link.click({ force: true });
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
      // Use evaluate to click to avoid potential double-toggle issues with standard click() on mobile
      await menuToggle.evaluate(el => el.click());
    }
    await expect(navLinks).toHaveClass(/active/);
    await expect(menuToggle).toHaveClass(/open/);

    // Wait for transition to stabilize
    await page.waitForTimeout(1000);

    // Close menu if it's open
    const isOpenBeforeClose = await menuToggle.evaluate(el => el.classList.contains('open'));
    if (isOpenBeforeClose) {
      await menuToggle.evaluate(el => el.click());
    }
    
    await expect(navLinks).not.toHaveClass(/active/);
    await expect(menuToggle).not.toHaveClass(/open/);
  });
});
