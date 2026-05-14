import { NextResponse } from 'next/server'

async function sendDiscordNotification(order, receiptUrl) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const itemsText = order.items.map(item => 
    `• **${item.name}** ${item.variant ? `(${item.variant})` : ''} x${item.qty}`
  ).join('\n');

  const embed = {
    title: `🚀 New Order: ${order.order_number}`,
    description: `A new order has been placed and verified on Techo Connect.`,
    color: 0x0AAD6E,
    fields: [
      { name: "👤 Customer", value: order.customer_name, inline: true },
      { name: "📞 Phone", value: order.customer_phone1, inline: true },
      { name: "📍 District", value: order.customer_district, inline: true },
      { name: "🏠 Address", value: order.customer_address },
      { name: "💰 Total", value: `**LKR ${order.grand_total}**`, inline: true },
      { name: "💳 Method", value: order.payment_method.toUpperCase(), inline: true },
      { name: "📝 Items", value: itemsText },
      { name: "📄 Receipt", value: receiptUrl ? `[View Receipt](${receiptUrl})` : 'No receipt uploaded' }
    ],
    footer: { text: "Techo Connect Automatic Alerts" },
    timestamp: new Date()
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
  });
}

export async function POST(req) {
  try {
    const { order, receiptUrl } = await req.json();
    await sendDiscordNotification(order, receiptUrl);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}