'use client'
import { useState, useRef, useEffect } from 'react'
import Nav from '../../../components/layout/Nav'
import Footer from '../../../components/layout/Footer'
import { supabase } from '../../../lib/supabase'
import { formatLKR } from '../../../lib/utils'
import toast from 'react-hot-toast'

export default function AdminDispatchPage() {
  const [orderQuery, setOrderQuery] = useState('')
  const [stickerQuery, setStickerQuery] = useState('')
  const [activeOrder, setActiveOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const orderInputRef = useRef(null)
  const stickerInputRef = useRef(null)

  useEffect(() => {
    if (orderInputRef.current) orderInputRef.current.focus()
  }, [])

  const handleFetchOrder = async (e) => {
    e.preventDefault()
    const query = orderQuery.trim().toUpperCase()
    if (!query) return

    setLoading(true)
    setActiveOrder(null)
    setStickerQuery('')

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', query)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setActiveOrder(data)
        toast.success(`Order #${data.order_number} loaded. Scan sticker now!`)
        setTimeout(() => {
          if (stickerInputRef.current) stickerInputRef.current.focus()
        }, 50)
      } else {
        toast.error('Order not found. Scan again.')
        setOrderQuery('')
        if (orderInputRef.current) orderInputRef.current.focus()
      }
    } catch (err) {
      console.error(err)
      toast.error('Error fetching order details.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSticker = async (e) => {
    e.preventDefault()
    const sticker = stickerQuery.trim().toUpperCase()
    if (!sticker || !activeOrder) return

    setSubmitting(true)
    const integrationToast = toast.loading('Syncing sticker parameters with Fardar Express...')

    try {
      const res = await fetch('/api/courier/book-existing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: activeOrder.order_number, 
          order_number: activeOrder.order_number, 
          stickerNumber: sticker
        })
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Fardar gateway registration failed')
      }

      toast.success(`Success! Waybill ${sticker} linked to Order #${activeOrder.order_number}`, { id: integrationToast })
      
      setActiveOrder(null)
      setOrderQuery('')
      setStickerQuery('')
      setTimeout(() => {
        if (orderInputRef.current) orderInputRef.current.focus()
      }, 50)

    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Courier mapping submission failed.', { id: integrationToast })
      setStickerQuery('')
      if (stickerInputRef.current) stickerInputRef.current.focus()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Nav />
      <div style={{ paddingTop: '5.5rem', minHeight: '90vh', background: 'var(--bg)' }}>
        <section style={{ padding: '3rem 0 6rem' }}>
          <div className="container-sm" style={{ maxWidth: '600px' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🏭</span>
              <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--ink)', marginTop: '0.5rem' }}>
                Fardar Barcode Dispatch Station
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Hands-free high-speed order processing station.</p>
            </div>

            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <form onSubmit={handleFetchOrder}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '0.5rem' }}>
                  Step 1: Scan Invoice Barcode / Type Order Number
                </label>
                <input 
                  ref={orderInputRef}
                  type="text" 
                  placeholder="Scan invoice barcode..."
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  disabled={loading || !!activeOrder}
                  style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid var(--border-light)', borderRadius: '8px', fontSize: '1rem', outline: 'none', background: activeOrder ? '#F3F4F6' : 'white', fontWeight: 600 }}
                  required
                />
              </form>
            </div>

            {activeOrder && (
              <div style={{ background: '#FFF', borderRadius: 12, border: '2px solid var(--green)', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Active Order: #{activeOrder.order_number}</span>
                  <span style={{ color: 'var(--green)', fontWeight: 800 }}>{formatLKR(activeOrder.grand_total)}</span>
                </div>
                <div style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--slate)' }}>
                  <div>👤 <strong>Customer:</strong> {activeOrder.customer_name}</div>
                  <div>📍 <strong>City/District:</strong> {activeOrder.customer_district}</div>
                  <div>🏠 <strong>Address:</strong> {activeOrder.customer_address}</div>
                  <div style={{ marginTop: '0.25rem' }}>📞 Contact: {activeOrder.customer_phone1}</div>
                </div>
                <button 
                  onClick={() => { setActiveOrder(null); setOrderQuery(''); setStickerQuery(''); setTimeout(() => orderInputRef.current.focus(), 50); }}
                  style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', marginTop: '0.75rem', padding: 0 }}
                >
                  ✕ Cancel & Reset Station
                </button>
              </div>
            )}

            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.5rem', opacity: activeOrder ? 1 : 0.5, pointerEvents: activeOrder ? 'auto' : 'none', transition: 'opacity 0.2s' }}>
              <form onSubmit={handleRegisterSticker}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '0.5rem' }}>
                  Step 2: Scan Fardar Waybill Sticker Barcode
                </label>
                <input 
                  ref={stickerInputRef}
                  type="text" 
                  placeholder={activeOrder ? "Waiting for sticker barcode scan..." : "Unlock Step 1 first"}
                  value={stickerQuery}
                  onChange={(e) => setStickerQuery(e.target.value)}
                  disabled={submitting || !activeOrder}
                  style={{ width: '100%', padding: '0.8rem 1rem', border: '2px solid var(--border-light)', borderRadius: '8px', fontSize: '1rem', outline: 'none', borderColor: activeOrder ? 'var(--green)' : 'var(--border-light)', fontWeight: 600 }}
                  required
                />
              </form>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}