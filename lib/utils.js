/**
 * Calculate delivery charge based on total weight
 * First 1000g (1kg) = LKR 500
 * Each additional 1000g (1kg) = LKR 100
 */
export function calcDelivery(weightGrams) {
  if (weightGrams <= 0) return 0
  const firstKg = 500
  const additionalKgs = Math.ceil(Math.max(0, weightGrams - 1000) / 1000)
  return firstKg + additionalKgs * 100
}

/**
 * Format LKR price
 */
export function formatLKR(amount) {
  return `LKR ${amount.toLocaleString('en-LK')}`
}

/**
 * Generate WhatsApp message for admin notification
 */
export function buildWhatsAppMessage(order) {
  const itemLines = order.items
    .map(i => `  • ${i.name}${i.variant ? ` (${i.variant})` : ''} × ${i.qty} — LKR ${(i.price * i.qty).toLocaleString()}`)
    .join('\n')

  const dt = new Date(order.created_at)
  const dateStr = dt.toLocaleDateString('en-LK', { day: '2-digit', month: 'short', year: 'numeric' })
  const timeStr = dt.toLocaleTimeString('en-LK', { hour: '2-digit', minute: '2-digit' })

  return encodeURIComponent(
`🛒 *NEW ORDER — ${order.order_number}*

📅 Date: ${dateStr}  ⏰ Time: ${timeStr}

━━━━━━━━━━━━━━━━━━━━
📦 *ORDER ITEMS*
${itemLines}

💰 Product Total: LKR ${order.product_total.toLocaleString()}
🚚 Delivery Charge: LKR ${order.delivery_charge.toLocaleString()}
💵 *Grand Total: LKR ${order.grand_total.toLocaleString()}*

━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS*
Name: ${order.customer_name}
Address: ${order.customer_address}
District: ${order.customer_district}
Phone 1: ${order.customer_phone1}${order.customer_phone2 ? `\nPhone 2: ${order.customer_phone2}` : ''}

━━━━━━━━━━━━━━━━━━━━
💳 *PAYMENT*
Method: ${order.payment_method === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Deposit'}
Deposit: LKR ${order.deposit_amount.toLocaleString()}
Receipt: ${order.receipt_url ? 'Uploaded ✅' : 'Pending ⏳'}

━━━━━━━━━━━━━━━━━━━━
_Techo Connect Order System_`)
}

export const ADMIN_WA = process.env.ADMIN_WHATSAPP || '94706656007'
export const WA_LINK = `https://wa.me/94706656007?text=`
export const WA_COMMUNITY = 'https://chat.whatsapp.com/IMybu7FGZ9s428LfnPQ7lK'
export const FB_PAGE = 'https://www.facebook.com/share/17v3yMGC8U/?mibextid=wwXIfr'

export const SRI_LANKA_DISTRICTS = [
  'Ampara','Anuradhapura','Badulla','Batticaloa','Colombo',
  'Galle','Gampaha','Hambantota','Jaffna','Kalutara',
  'Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar',
  'Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya',
  'Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya'
]

export const BANK_DETAILS = {
  bank: 'Hatton National Bank (HNB)',
  branch: 'Batticaloa',
  accountName: 'S.Thivaharan',
  accountNumber: '057020041271',
  note: 'Please use your Name as the payment reference.'
}
