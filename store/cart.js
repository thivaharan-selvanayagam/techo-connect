import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, qty = 1) => {
        const items = get().items
        const key = `${product.id}-${variant?.id || 'default'}`
        const existing = items.find(i => i.key === key)
        if (existing) {
          set({ items: items.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i) })
        } else {
          set({
            items: [...items, {
              key,
              productId: product.id,
              productSlug: product.slug,
              name: product.name,
              variantId: variant?.id || null,
              variantName: variant?.name || null,
              price: variant?.price || product.price,
              weight: variant?.weight || product.weight,
              qty,
            }]
          })
        }
      },

      updateQty: (key, qty) => {
        if (qty < 1) {
          set({ items: get().items.filter(i => i.key !== key) })
        } else {
          set({ items: get().items.map(i => i.key === key ? { ...i, qty } : i) })
        }
      },

      removeItem: (key) => set({ items: get().items.filter(i => i.key !== key) }),

      clearCart: () => set({ items: [] }),

      get totalWeight() {
        return get().items.reduce((sum, i) => sum + (i.weight * i.qty), 0)
      },

      get productTotal() {
        return get().items.reduce((sum, i) => sum + (i.price * i.qty), 0)
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.qty, 0)
      },
    }),
    { name: 'techo-connect-cart' }
  )
)

// Customer info store (checkout flow)
export const useCheckoutStore = create(
  persist(
    (set) => ({
      customer: {
        name: '',
        address: '',
        district: '',
        phone1: '',
        phone2: '',
      },
      paymentMethod: null,
      receiptUrl: null,
      orderId: null,
      orderNumber: null,

      setCustomer: (data) => set({ customer: data }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setReceiptUrl: (url) => set({ receiptUrl: url }),
      setOrder: (id, number) => set({ orderId: id, orderNumber: number }),
      reset: () => set({ customer: { name: '', address: '', district: '', phone1: '', phone2: '' }, paymentMethod: null, receiptUrl: null, orderId: null, orderNumber: null }),
    }),
    { name: 'techo-connect-checkout' }
  )
)
