import config from '../lib/config';

// The storefront copy and theming are centralised in lib/config.js. These
// tests guard the shape the marketing components rely on, so a stray edit that
// drops a field or breaks the nav-to-route contract fails fast.
describe('storefront config', () => {
  it('exposes navbar items that each map to a category route', () => {
    expect(Array.isArray(config.navbarItems)).toBe(true);
    expect(config.navbarItems.length).toBeGreaterThan(0);

    for (const item of config.navbarItems) {
      expect(typeof item.label).toBe('string');
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.href).toMatch(/^\//);
    }
  });

  it('links every category page that exists under /pages', () => {
    const hrefs = config.navbarItems.map((i) => i.href);
    expect(hrefs).toEqual(
      expect.arrayContaining(['/female', '/male', '/kids', '/products'])
    );
  });

  it('provides a hero section with exactly the heading/sub/description triple', () => {
    expect(config.heroItems).toHaveLength(3);
    config.heroItems.forEach((item) => {
      expect(typeof item.label).toBe('string');
      expect(item.label.trim()).not.toBe('');
    });
  });

  it('defines a three-colour design scheme', () => {
    expect(config.design).toHaveLength(3);
    config.design.forEach((c) => expect(typeof c.label).toBe('string'));
  });

  it('has no empty labels anywhere in the marketing copy arrays', () => {
    const arrays = [
      config.eventtext,
      config.fearturestext,
      config.footertext,
    ];
    arrays.forEach((arr) => {
      expect(Array.isArray(arr)).toBe(true);
      arr.forEach((entry) => {
        expect(entry).toHaveProperty('label');
        expect(entry.label.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
