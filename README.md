<div align="center">

# Dine Market 🛍️

### A full-stack clothing storefront that browses fast, checks out for real, and wears well.

Category shopping, dynamic product pages, a live cart, and a genuine Stripe Checkout flow — all driven by a Sanity headless CMS and restyleable from a single config file.

[![Next.js](https://img.shields.io/badge/Next.js-13-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity&logoColor=white)](https://www.sanity.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![Dine Market demo](assets/demo.gif)

<sub>Drop a walkthrough clip at <code>assets/demo.gif</code> to replace this placeholder.</sub>

</div>

> **Wardrobe staples, reimagined.** New season, up to 40% off. Browse by Female, Male, and Kids, drop your favourites in the cart, and pay through a real payment flow. 😉

![Dine Market home page](docs/media/home-desktop.png)

---

## ✨ Features

- **🧭 Category shopping** — dedicated Female, Male, and Kids pages plus an "All Products" grid, every card powered by live Sanity content.
- **🖼️ Rich product pages** — image gallery, size picker, quantity stepper, and care notes, statically generated for speed (SSG with blocking fallback so new products appear without a rebuild).
- **🛒 Real cart + Stripe checkout** — add to cart, adjust quantities, and pay through a Stripe Checkout session with shipping options and confetti on success. 🎉
- **🎨 Content-driven theming** — every marketing headline, promo, and the accent colour live in one tidy [`lib/config.js`](lib/config.js), so you can rebrand the whole shop without touching a component.
- **📱 Mobile-first & responsive** — a slide-out mobile menu and layouts that reflow cleanly from phone to widescreen.
- **🔍 SEO-friendly** — proper `<title>`, meta description, and Open Graph tags out of the box.

---

## 🧩 Tech stack

| Layer      | Tooling                                    |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 13 (pages router) + React 18       |
| Content    | Sanity headless CMS via `@sanity/client`   |
| Payments   | Stripe Checkout (`@stripe/stripe-js`)      |
| UI extras  | Swiper, react-icons, react-hot-toast       |
| Styling    | Hand-written CSS (`styles/globals.css`)    |

---

## 🚀 Quickstart

You'll need **Node 18+** and npm.

```bash
# 1. Clone and install
git clone https://github.com/waleedsworld/Final-Ecommerce.git
cd Final-Ecommerce
npm install

# 2. Add your environment variables (see below)
#    Create .env.local and fill in your keys

# 3. Fire up the dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** and you're shopping.

### Environment variables

Create a `.env.local` in the project root:

```bash
# Sanity — the read token is optional for public datasets
NEXT_PUBLIC_SANITY_TOKEN=your_sanity_read_token

# Stripe
NEXT_PUBLIC_STRIPE_KEY=pk_test_xxx      # publishable key (client)
NEXT_SECRET_STRIPE_KEY=sk_test_xxx      # secret key (server, used in /api/stripe)
```

> 🔐 No secrets are committed to this repo — everything sensitive is read from the environment. Keep it that way.

### The Sanity Studio

The CMS schema lives in [`sanity-ecommerce-clothing/`](sanity-ecommerce-clothing). To run the Studio locally:

```bash
cd sanity-ecommerce-clothing
npm install
npm run dev
```

Add products (name, images, category, price, care notes) there and they appear on the storefront instantly.

---

## 🕹️ Usage

Once both apps are running:

1. **Browse** — hit the home page, then jump into Female, Male, Kids, or the full grid from the navbar.
2. **Open a product** — pick a size and quantity, then **Add to Cart**. A toast confirms it.
3. **Review the cart** — open the slide-out cart to tweak quantities or remove items.
4. **Check out** — **Pay with Stripe** spins up a Checkout session (use Stripe test card `4242 4242 4242 4242`), and a successful payment lands on the confetti-powered success page.
5. **Rebrand it** — edit copy, promos, and the accent colour in [`lib/config.js`](lib/config.js); add or edit products in the Sanity Studio. No component changes required.

---

## 🏗️ Architecture

The storefront is a Next.js app that reads content from Sanity at build/request time and hands payments off to Stripe through a serverless API route.

```
┌──────────────┐      GROQ query      ┌──────────────┐
│  Sanity CMS  │ ───────────────────▶ │  Next.js app │
│  (products)  │   getStaticProps /   │ pages/ + SSG │
└──────────────┘   getServerSideProps └──────┬───────┘
                                             │
                       add to cart (Context) │
                                             ▼
                                      ┌──────────────┐
                                      │  Cart state  │
                                      │ (React ctx)  │
                                      └──────┬───────┘
                                             │ POST /api/stripe
                                             ▼
                                      ┌──────────────┐
                                      │    Stripe    │
                                      │   Checkout   │
                                      └──────────────┘
```

### Project layout

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

## 🛠️ Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run next lint
```

---

## 🌐 Live demo

Live demo — deploying soon.

---

## 📝 Notes

The "Dine Market" name and layout are based on a free community e-commerce UI design; the implementation here is an independent build. Swap the copy and colours in [`lib/config.js`](lib/config.js) to make it your own.

---

## 📄 License

Released under the [MIT License](LICENSE).

<div align="center">
<sub>Happy shopping — and happy hacking. 🧵</sub>
</div>
