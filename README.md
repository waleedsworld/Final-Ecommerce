# Dine Market 🛍️

A modern, full-stack clothing storefront built with **Next.js**, a **Sanity** headless CMS, and **Stripe** checkout. Browse by Female, Male, and Kids, drop your favourites in the cart, and check out with a real payment flow. It's fast, it's responsive, and — dare we say — it wears well.

> Wardrobe staples, reimagined. New season, up to 40% off. 😉

![Dine Market storefront tour — home, catalogue, and product detail](assets/demo.gif)

_A quick tour of the running storefront: the hero, the live product catalogue, and a product detail page. See [`assets/`](assets/) for the full-resolution stills._

![Dine Market home page](docs/media/home-desktop.png)

---

## ✨ Features

- **Category shopping** — dedicated Female, Male, and Kids pages plus an "All Products" grid, all powered by live Sanity content.
- **Product detail pages** — image gallery, size picker, quantity stepper, and product care notes, statically generated for speed (SSG with blocking fallback).
- **Real cart + Stripe checkout** — add to cart, adjust quantities, and pay through a Stripe Checkout session with shipping options and confetti on success. 🎉
- **Content-driven theming** — every marketing headline, promo, and the accent colour live in one tidy `lib/config.js`, so you can restyle the whole shop without touching a single component.
- **Mobile-first & responsive** — a slide-out mobile menu and layouts that reflow cleanly from phone to widescreen.
- **SEO-friendly** — proper `<title>`, meta description, and Open Graph tags out of the box.

---

## 🧩 Tech stack

| Layer      | Tooling                                   |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 13 (pages router) + React 18      |
| Content    | Sanity (headless CMS) via `@sanity/client`|
| Payments   | Stripe Checkout (`@stripe/stripe-js`)     |
| UI extras  | Swiper, react-icons, react-hot-toast      |
| Styling    | Hand-written CSS (`styles/globals.css`)   |

---

## 🚀 Getting started

You'll need **Node 18+** and npm. Then:

```bash
# 1. Install the dependencies
npm install

# 2. Add your environment variables (see below)
#    Create .env.local and fill in your keys

# 3. Fire up the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're shopping.

### Environment variables

Create a `.env.local` in the project root:

```bash
# Sanity — the read token is optional for public datasets
NEXT_PUBLIC_SANITY_TOKEN=your_sanity_read_token

# Stripe
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxx      # publishable key (client)
NEXT_SECRET_STRIPE_KEY=sk_test_xxx      # secret key (server, used in /api/stripe)
```

> No secrets are committed to this repo — everything sensitive is read from the environment. Keep it that way. 🔐

### The Sanity Studio

The CMS schema lives in [`sanity-ecommerce-clothing/`](sanity-ecommerce-clothing). To run the Studio locally:

```bash
cd sanity-ecommerce-clothing
npm install
npm run dev
```

Add products (name, images, category, price, care notes) there and they'll appear on the storefront instantly.

---

## 🗺️ Project layout

```
components/     Reusable UI (Navbar, HeroBanner, Footer, product cards…)
context/        Global cart state (React Context)
lib/            Sanity client, Stripe helper, and the central config.js
pages/          Routes — home, category pages, product/[slug], cart, api/stripe
sanity-ecommerce-clothing/  The Sanity Studio + schemas
styles/         globals.css
```

---

## 📸 A quick look

| Products grid | Product detail |
| --- | --- |
| ![Products](docs/media/products-desktop.png) | ![Product detail](docs/media/product-detail-desktop.png) |

And it looks just as good in your pocket:

| Home (mobile) | Products (mobile) |
| --- | --- |
| ![Home mobile](docs/media/home-mobile.png) | ![Products mobile](docs/media/products-mobile.png) |

---

## 🌐 Live demo

Live demo — deploying soon.

---

## 🛠️ Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run next lint
```

---

## 📝 Notes

The "Dine Market" name and layout are based on a free community e-commerce UI design; the implementation here is an independent build. Swap the copy and colours in `lib/config.js` to make it your own.

Happy shopping — and happy hacking. 🧵
