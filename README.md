# Techo Connect — Next.js E-Commerce Website

Full e-commerce platform for Techo Connect antenna products. Built with Next.js 14, Supabase, and Zustand.

**Primary Color:** `#0AAD6E` (Green)  
**Framework:** Next.js 14 (App Router)  
**Database:** Supabase (PostgreSQL)  
**State:** Zustand (cart + checkout)  
**Hosting:** Vercel (recommended)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local .env.local
# Fill in your Supabase credentials (see below)

# 3. Set up Supabase database
# Run supabase/schema.sql in Supabase SQL Editor
# Create a 'receipts' storage bucket (private, 10MB limit)

# 4. Run development server
npm run dev

# Open http://localhost:3000
```

---

## Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_WHATSAPP=94706656007
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

## Supabase Setup

1. Create a new Supabase project at supabase.com
2. Go to **SQL Editor** and run `supabase/schema.sql`
3. Go to **Storage** → Create bucket named `receipts`
   - Set to **Private**
   - Max file size: **10MB**
   - Allowed MIME types: `image/jpeg, image/png, image/webp, application/pdf`
4. Copy your **Project URL** and **Anon Key** from Settings → API

---

## Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel Dashboard
# Project → Settings → Environment Variables
```

Or connect your GitHub repository to Vercel for automatic deployments.

---

## Project Structure

```
techo-connect/
├── app/
│   ├── page.js                    # Home page
│   ├── layout.js                  # Root layout
│   ├── not-found.js               # 404 page
│   ├── globals.css                # Design system
│   ├── about/page.js              # About page
│   ├── careers/
│   │   ├── page.js                # Job listings
│   │   └── [slug]/page.js         # Job detail + apply
│   ├── contact/page.js            # Contact + wholesale
│   ├── installation-guide/page.js # Step-by-step guide
│   ├── products/
│   │   ├── page.js                # All products
│   │   └── [slug]/page.js         # Product detail + order
│   ├── checkout/
│   │   ├── page.js                # Cart
│   │   ├── address/page.js        # Customer details
│   │   ├── payment/page.js        # Payment + receipt upload
│   │   └── confirm/page.js        # Order confirmation
│   ├── returns/page.js            # Returns & Refunds policy
│   ├── terms/page.js              # Terms & Conditions
│   ├── privacy/page.js            # Privacy Policy
│   ├── shipping/page.js           # Shipping Policy
│   └── api/
│       └── orders/route.js        # Order creation API
├── components/
│   ├── layout/
│   │   ├── Nav.js                 # Sticky navigation
│   │   └── Footer.js              # Footer
│   └── ui/
│       ├── WAFloat.js             # WhatsApp float button
│       └── useReveal.js           # Scroll reveal hook
├── data/
│   └── index.js                   # All products, jobs, testimonials
├── lib/
│   ├── supabase.js                # Supabase client
│   └── utils.js                   # Delivery calc, WhatsApp msg builder
├── store/
│   └── cart.js                    # Zustand cart + checkout store
├── supabase/
│   └── schema.sql                 # Database schema
└── public/
    └── products/                  # Product images (add your own)
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, products, testimonials, YouTube video, community |
| Products | `/products` | All antennas + spare parts with filtering |
| Product Detail | `/products/[slug]` | Variants, pricing, tabs, add to cart |
| Cart | `/checkout` | Cart items, summary, proceed |
| Address | `/checkout/address` | Customer name, address, district, phone |
| Payment | `/checkout/payment` | COD or bank deposit, receipt upload |
| Confirmation | `/checkout/confirm` | Order number + WhatsApp notification |
| About | `/about` | Story, mission, ecosystem, working hours |
| Careers | `/careers` | Job openings listing |
| Job Detail | `/careers/[slug]` | Full job + apply form |
| Contact | `/contact` | Contact form + wholesale enquiry |
| Installation Guide | `/installation-guide` | 5-step guide with SVG graphics |
| Returns | `/returns` | Returns & Refunds Policy |
| Terms | `/terms` | Terms & Conditions |
| Privacy | `/privacy` | Privacy Policy |
| Shipping | `/shipping` | Shipping charges & timelines |

---

## Checkout Flow

```
Product Page
    ↓ Add to Cart
Cart (/checkout)
    ↓ Proceed to Checkout
Address (/checkout/address)
    → Name, address, district, phone1, phone2
    ↓ Continue to Payment
Payment (/checkout/payment)
    → Choose: COD or Bank Deposit
    → View bank details + required amount
    → Upload receipt (photo/PDF)
    ↓ Confirm & Place Order
    → POST /api/orders → Supabase
    → Upload receipt to Supabase Storage
    → Opens WhatsApp with admin notification
Order Confirmation (/checkout/confirm)
    → Order number displayed
    → WhatsApp follow-up button
```

---

## Delivery Charge Formula

```
First 1000g  = LKR 500
Each extra 1000g = LKR 100

Examples:
600g  → LKR 500
850g  → LKR 500
1100g → LKR 600
1800g → LKR 700
2500g → LKR 800
```

---

## Customisation

### Update contact details
Edit `lib/utils.js`:
- `ADMIN_WA` — admin WhatsApp number
- `BANK_DETAILS` — bank account information
- `WA_COMMUNITY` — WhatsApp community link
- `FB_PAGE` — Facebook page link

### Add product photos
Place images in `public/products/`:
- `yagi-pro-1.jpg` (and `-2`, `-3`, etc.)
- `yagi-elite-1.jpg`
- Spare part images as needed

Then update `images` array in `lib/data.js`.

### Add YouTube video
In `app/page.js`, replace `dQw4w9WgXcQ` with your actual YouTube video ID.

### Update testimonials
Edit the `testimonials` array in `lib/data.js`. Set `hasScreenshot: true` and add the screenshot URL to show a "View Screenshot" button.

### Add a new job opening
Add to `jobOpenings` array in `lib/data.js` with required fields.

---

## WhatsApp Notification

When an order is confirmed, the system automatically opens WhatsApp with a pre-filled admin notification message containing:
- Order number, date and time
- All ordered items with quantities and prices
- Customer name, address, district, phone numbers
- Payment method and deposit status
- Receipt upload status

Admin WhatsApp number is set in `.env.local` as `ADMIN_WHATSAPP`.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.2.5 | Framework (App Router) |
| React | 18 | UI library |
| Supabase | ^2.45 | Database + file storage |
| Zustand | ^4.5 | Cart & checkout state |
| react-hot-toast | ^2.4 | Toast notifications |

---

## Part of the Techo Ecosystem

- **Techo Traders** → techotraders.com.lk (parent company)
- **Techo Labs** → Digital & web development
- **Techo Connect** → This site (antenna hardware)
- **Techo Xpress** → Courier & logistics
