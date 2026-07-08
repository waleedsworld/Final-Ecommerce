// Central content + theming for the Dine Market storefront.
// Everything the marketing sections render lives here, so you can restyle the
// whole shop by editing copy in one place instead of hunting through JSX.
const config = {
  // Navigation Bar — mapped to the category pages in /pages
  navbarItems: [
    { label: 'Female', href: '/female' },
    { label: 'Male', href: '/male' },
    { label: 'Kids', href: '/kids' },
    { label: 'All Products', href: '/products' },
  ],

  // Hero Section
  heroItems: [
    { label: 'New Season — Up to 40% Off' },
    { label: 'Wardrobe Staples, Reimagined' },
    { label: 'Discover everyday essentials crafted from premium, planet-friendlier fabrics — built to last, styled to love.' },
  ],

  // Promotion Section
  eventtext: [
    // Heading of New Section
    { label: 'Promotions' },
    { label: 'Deals You Will Actually Wear' },
    // Block One
    { label: 'Get Up to' },
    { label: '40% Off' },
    { label: 'On Selected Outerwear' },

    // Block Two
    { label: 'Limited Time Offer' },
    { label: 'Use Promo Code' },
    { label: 'DINE40' },

    // Block Three
    { label: 'Alpaca Hoodie' },
    { label: '$120.00' },
    { label: 'Starting at $79.00' },
  ],

  // Features Section
  fearturestext: [
    // Heading of New Section
    { label: 'Why Shop With Us' },
    { label: 'The Dine Market Difference' },
    // Block One
    { label: 'Premium Materials' },
    { label: 'Soft, durable fabrics chosen to feel great wash after wash.' },

    { label: 'Sizes For Everyone' },
    { label: 'A full XS–XL range across Female, Male, and Kids.' },

    { label: 'Secure Checkout' },
    { label: 'Fast, encrypted payments powered by Stripe.' },

    // Block Three
    { label: 'Free & Easy Returns' },
    { label: 'Changed your mind? Send it back within 30 days, no fuss.' },

    { label: 'Thoughtfully designed staples that pair with everything already in your closet. Elevate your everyday without the everyday price tag.' },
  ],

  // Footer
  footertext: [
    { label: 'Timeless pieces, honest pricing, and a fit you can count on. Elevate your everyday with Dine Market.' },
    { label: 'Copyright © 2023 Dine Market' },
  ],

  // Design Color Scheme
  // primaryColor1 is the light/accent used on top of the dark primaryColor2,
  // so it must stay light enough to read against near-black surfaces.
  design: [
    { label: 'white' },      // primaryColor  (page background)
    { label: '#E4A11B' },    // primaryColor1 (warm amber accent)
    { label: '#1A1A1A' },    // primaryColor2 (near-black text / surfaces)
  ],
};

export default config;
