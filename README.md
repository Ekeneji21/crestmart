# CrestMart

**Shop Zimbabwe, pay with EcoCash.** A Crestline Systems marketplace for solar and backup power, phones and tech, home essentials, farm inputs, and grocery hampers that people abroad can send to family at home.

This repository was previously **Gomo AI Shop** and has been rebranded under Crestline Systems.

## Features

- Home page with load-shedding deals, categories and a diaspora "send home" section
- Catalogue with search, category filters and sorting
- Product pages, cart (saved in the browser), and checkout
- Delivery zones (Harare, Bulawayo, other towns, free collection points)
- Gift orders: buy abroad, deliver to a recipient in Zimbabwe
- EcoCash, OneMoney and card payment options (simulated in this demo)
- Order confirmation and order history
- "Sell on CrestMart" page for marketplace sellers

## How it makes money

| Stream | Price |
| --- | --- |
| Marketplace commission | 8% per sale on Starter, 5% on Pro Seller |
| Pro Seller plan | US$25 / month |
| CrestMart Plus (shoppers) | US$5 / month: free delivery over $50, early deals |
| Delivery fees | US$5–12 per order |

## Run it

```bash
npm install
npm run dev
```

Build with `npm run build`; `netlify.toml` is included for deployment.

## Going live

Payments are simulated (`src/pages/Checkout.jsx`). To take real payments, add a small API that starts Paynow transactions (EcoCash / OneMoney express checkout and cards). The MediCrest backend's `paymentService.js` is a ready reference implementation.

---
© Crestline Systems, Harare
