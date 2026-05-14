'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../../lib/supabase' 
import { formatLKR } from '../../../../lib/utils'
import Link from 'next/link'

export default function InvoicePage() {
  const params = useParams()
  const orderId = params.id

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  // --- FIXED: This line was missing! ---
  const [errorMsg, setErrorMsg] = useState(null) 

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return

      try {
        // 1. Try searching specifically by order_number (Text column)
        // This prevents the UUID type mismatch error (22P02)
        let { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('order_number', orderId)
          .single()
        
        // 2. Fallback: If not found, only try searching by ID if it's NOT a "TC-" number
        // (Valid UUIDs don't start with "TC-")
        if (!data && !orderId.startsWith('TC-')) {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single()
          
          data = fallbackData
          if (fallbackError) console.error("ID Search Error:", fallbackError.message)
        }

        if (data) {
          setOrder(data)
        } else {
          setErrorMsg("No order found with this reference.")
        }

      } catch (err) {
        console.error("Fetch Logic Error:", err)
        setErrorMsg("Something went wrong while fetching the order.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  const handleShare = async () => {
    const shareData = {
      title: `Techo Connect Invoice ${order?.order_number}`,
      text: `Hi! Here is my order invoice from Techo Connect.`,
      url: window.location.href,
    }
    
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`
      window.open(waUrl, '_blank')
    }
  }

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: 'var(--muted)' }}>Generating professional invoice...</div>
  
  if (!order) return (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>Order not found.</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Ref: <strong>{orderId}</strong></p>
      {errorMsg && <p style={{ color: 'red', fontSize: '0.85rem' }}>{errorMsg}</p>}
      <Link href="/products" className="btn btn-primary">Go back to products</Link>
    </div>
  )

  return (
    <div className="invoice-screen">
      <div className="invoice-toolbar no-print">
        <div className="container-invoice">
          <Link href="/checkout/confirm" className="btn-back">← Back</Link>
          <div className="tool-actions">
            <button onClick={() => window.print()} className="btn-print">💾 Download PDF / Print</button>
            <button onClick={handleShare} className="btn-share">🔗 Share to WhatsApp</button>
          </div>
        </div>
      </div>

      <div className="invoice-paper" id="invoice-content">
        <div className="invoice-header">
          <div className="brand">
            <h1 className="logo">TECHO<span>CONNECT</span></h1>
            <p className="company-info">
              Professional Signal Hardware<br />
              Kallady, Batticaloa, Sri Lanka<br />
              <strong>WhatsApp:</strong> +94 70 665 6007
            </p>
          </div>
          <div className="invoice-meta">
            <div className="invoice-label">INVOICE</div>
            <div className="meta-item"><span>No:</span> <strong>{order.order_number}</strong></div>
            <div className="meta-item"><span>Date:</span> <strong>{new Date(order.created_at).toLocaleDateString()}</strong></div>
            <div className="status-badge">PAID DEPOSIT</div>
          </div>
        </div>

        <div className="invoice-billing">
          <div className="bill-col">
            <div className="small-label">Billed To:</div>
            <div className="customer-name">{order.customer_name}</div>
            <div className="customer-details">
              {order.customer_address}<br />
              {order.customer_district}, Sri Lanka<br />
              {order.customer_phone1}
            </div>
          </div>
          <div className="bill-col" style={{ textAlign: 'right' }}>
            <div className="small-label">Payment Method:</div>
            <div className="method-val">{order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Deposit'}</div>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product Description</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i}>
                <td>
                  <strong>{item.name}</strong>
                  {item.variant && <span className="variant-tag">({item.variant})</span>}
                </td>
                <td className="text-center">{item.qty}</td>
                <td className="text-right">{formatLKR(item.price)}</td>
                <td className="text-right">{formatLKR(item.price * item.qty)}</td>
              </tr>
            ))}
            <tr>
              <td>Standard Shipping ({order.customer_district})</td>
              <td className="text-center">1</td>
              <td className="text-right">{formatLKR(order.delivery_charge)}</td>
              <td className="text-right">{formatLKR(order.delivery_charge)}</td>
            </tr>
          </tbody>
        </table>

        <div className="invoice-footer-grid">
          <div className="note-box">
            <strong>Notes:</strong><br />
            Please keep this invoice for warranty claims. For support regarding installation, contact our technical team via WhatsApp.
          </div>
          <div className="totals-box">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatLKR(order.product_total + order.delivery_charge)}</span>
            </div>
            <div className="total-row deposit">
              <span>Deposit Paid</span>
              <span>-{formatLKR(order.deposit_amount)}</span>
            </div>
            <div className="total-row grand-total">
              <span>Balance Due</span>
              <span>{formatLKR(order.grand_total - order.deposit_amount)}</span>
            </div>
            <div className="balance-note">* Payable in cash to courier on delivery</div>
          </div>
        </div>

        <div className="final-footer">
          Thank you for choosing Techo Connect — The strongest signals in Sri Lanka.
        </div>
      </div>

      <style jsx>{`
        .invoice-screen { background: #f0f2f5; min-height: 100vh; padding: 40px 20px; font-family: 'Inter', system-ui, sans-serif; }
        .container-invoice { max-width: 800px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .invoice-toolbar { background: white; padding: 15px 0; border-bottom: 1px solid #ddd; position: fixed; top: 0; left: 0; right: 0; z-index: 100; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .invoice-paper { background: white; max-width: 800px; margin: 60px auto 0; padding: 60px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); color: #333; }
        .invoice-header { display: flex; justify-content: space-between; border-bottom: 3px solid #0AAD6E; padding-bottom: 30px; margin-bottom: 40px; }
        .logo { font-size: 28px; font-weight: 900; margin: 0; letter-spacing: -1px; }
        .logo span { color: #0AAD6E; }
        .company-info { font-size: 13px; color: #666; margin-top: 8px; line-height: 1.5; }
        .invoice-label { font-size: 40px; font-weight: 900; color: #f0f0f0; margin-bottom: 10px; line-height: 1; }
        .meta-item { font-size: 14px; margin-bottom: 4px; }
        .status-badge { display: inline-block; padding: 5px 12px; background: #0AAD6E; color: white; border-radius: 20px; font-size: 11px; font-weight: 700; margin-top: 10px; }
        .invoice-billing { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .small-label { font-size: 10px; text-transform: uppercase; font-weight: 800; color: #aaa; letter-spacing: 1px; margin-bottom: 8px; }
        .customer-name { font-size: 18px; font-weight: 700; margin-bottom: 5px; }
        .customer-details { font-size: 14px; color: #555; line-height: 1.6; }
        .method-val { font-weight: 700; color: #333; }
        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .invoice-table th { text-align: left; background: #f8f9fa; padding: 15px; border-bottom: 2px solid #eee; font-size: 12px; text-transform: uppercase; color: #888; }
        .invoice-table td { padding: 15px; border-bottom: 1px solid #f0f0f0; font-size: 15px; }
        .variant-tag { font-size: 12px; color: #0AAD6E; margin-left: 8px; font-weight: 500; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .invoice-footer-grid { display: grid; grid-template-columns: 1fr 280px; gap: 40px; }
        .note-box { font-size: 13px; color: #777; line-height: 1.6; background: #fcfcfc; padding: 20px; border-radius: 10px; border: 1px solid #eee; }
        .totals-box { font-size: 15px; }
        .total-row { display: flex; justify-content: space-between; padding: 10px 0; }
        .deposit { color: #e53e3e; }
        .grand-total { border-top: 2px solid #0AAD6E; margin-top: 10px; padding-top: 15px; font-weight: 900; font-size: 20px; color: #0AAD6E; }
        .balance-note { font-size: 11px; color: #999; text-align: right; margin-top: 10px; }
        .final-footer { border-top: 1px solid #eee; margin-top: 60px; padding-top: 20px; text-align: center; font-size: 12px; color: #aaa; }
        .btn-back { text-decoration: none; color: #666; font-size: 14px; font-weight: 600; }
        .btn-print { background: #333; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .btn-share { background: #25D366; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-left: 10px; }
        @media print {
          .no-print { display: none !important; }
          .invoice-screen { background: white; padding: 0; }
          .invoice-paper { box-shadow: none; margin: 0; width: 100%; max-width: 100%; padding: 0; }
          body { background: white; }
        }
        @media (max-width: 600px) {
          .invoice-paper { padding: 30px; }
          .invoice-header { flex-direction: column; gap: 20px; }
          .invoice-meta { text-align: left; }
          .invoice-billing { grid-template-columns: 1fr; gap: 20px; }
          .invoice-footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}