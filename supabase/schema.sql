-- =============================================
-- TECHO CONNECT — SUPABASE SCHEMA
-- Run this in Supabase SQL editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ORDERS TABLE ──
CREATE TABLE IF NOT EXISTS orders (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number  TEXT UNIQUE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),

  -- Customer info
  customer_name    TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_district TEXT NOT NULL,
  customer_phone1  TEXT NOT NULL,
  customer_phone2  TEXT,

  -- Order items (JSON array)
  items         JSONB NOT NULL,

  -- Weights & charges
  total_weight_g  INTEGER NOT NULL,
  product_total   INTEGER NOT NULL,
  delivery_charge INTEGER NOT NULL,
  grand_total     INTEGER NOT NULL,

  -- Payment
  payment_method  TEXT NOT NULL CHECK (payment_method IN ('cod', 'bank')),
  deposit_amount  INTEGER NOT NULL DEFAULT 500,
  receipt_url     TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),

  -- Notification
  whatsapp_sent BOOLEAN DEFAULT FALSE
);

-- ── PRODUCTS TABLE (for CMS-style management) ──
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL CHECK (category IN ('main', 'spare')),
  description TEXT,
  images      TEXT[] DEFAULT '{}',
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── PRODUCT VARIANTS ──
CREATE TABLE IF NOT EXISTS product_variants (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  price_lkr   INTEGER NOT NULL,
  weight_g    INTEGER NOT NULL,
  in_stock    BOOLEAN DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0
);

-- ── CAREERS TABLE ──
CREATE TABLE IF NOT EXISTS job_openings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  type        TEXT NOT NULL,
  locations   TEXT[] NOT NULL,
  requirements TEXT[] NOT NULL,
  description TEXT NOT NULL,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── STORAGE BUCKET for receipts ──
-- Run in Supabase Dashboard → Storage → New Bucket
-- Bucket name: receipts
-- Public: false
-- File size limit: 10MB
-- Allowed MIME: image/jpeg, image/png, image/webp, application/pdf

-- ── RLS POLICIES ──
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT TO anon WITH CHECK (true);

-- Allow anyone to read their own order by ID
CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT TO anon USING (true);

-- ── GENERATE ORDER NUMBER FUNCTION ──
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  exists_already BOOLEAN;
BEGIN
  LOOP
    new_number := 'TC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 9999 + 1)::TEXT, 4, '0');
    SELECT EXISTS(SELECT 1 FROM orders WHERE order_number = new_number) INTO exists_already;
    EXIT WHEN NOT exists_already;
  END LOOP;
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;
