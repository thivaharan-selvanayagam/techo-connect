'use client'
import { useState, useEffect } from 'react'
import Nav from '../../components/layout/Nav' 
import Footer from '../../components/layout/Footer'
import toast from 'react-hot-toast'
// Import both antenna definitions and spare product datasets from your data source
import { mainProducts, spareProducts } from '../../lib/data'

// Config list mapped directly to slugs inside spareProducts to pull absolute prices dynamically
const partDeductionBlueprint = [
  { slug: 'rg6-cable-10m', name: 'RG6 Low-Loss Cable (10M)', category: 'Cable Assembly' },
  { slug: 'rg6-cable-15m', name: 'RG6 Low-Loss Cable (15M)', category: 'Cable Assembly' },
  { slug: 'f-male-connector', name: 'F Male / Female Connector Unit', category: 'Cable Assembly' },
  { slug: 'sma-male-connector-gold', name: 'SMA Converter Connector (Gold)', category: 'Cable Assembly' },
  { slug: 'aluminum-box-bar', name: 'Aluminum Main Box Bar Structural Pipe', category: 'Boom Pipe Assembly' },
  { slug: 'round-end-caps', name: 'Round End Caps', category: 'Boom Pipe Assembly' },
  { slug: 'square-top-round-end-caps', name: 'Square Top End Cap Box Cover', category: 'Boom Pipe Assembly' },
  { slug: 'director-elements', name: 'Aluminum Director Element Rod', category: 'Boom Pipe Assembly' },
  { slug: 'reflector-elements', name: 'Aluminum Reflector Element Rod', category: 'Boom Pipe Assembly' },
  { slug: 'u-bolt-type-a', name: 'U-Bolt Mounting Hardware (Type A)', category: 'Hardware Mounting' },
  
  // ── 🌟 MANUALLY ADDED EXTRA UNASSEMBLED COMPONENT OVERRIDE ──
  { slug: 'assembled-dipole-box', name: 'Assembled Dipole Box', category: 'Dipole Box Module', manualPrice: 534 }
]

export default function RefundDetectionPage() {
  const [flattenedVariants, setFlattenedVariants] = useState([])
  const [selectedVariantKey, setSelectedVariantKey] = useState('')
  const [totalPricePaid, setTotalPricePaid] = useState('')
  const [partsWithPrices, setPartsWithPrices] = useState([])
  const [faultyPartsQuantities, setFaultyPartsQuantities] = useState({})
  const [calculationResults, setCalculationResults] = useState(null)

  useEffect(() => {
    // 1. Map products and variants for dropdown lookup selections
    const flattened = []
    if (mainProducts && Array.isArray(mainProducts)) {
      mainProducts.forEach(product => {
        if (product.variants && Array.isArray(product.variants)) {
          product.variants.forEach(variant => {
            flattened.push({
              uniqueKey: `${product.id}__${variant.id}`,
              displayName: `${product.name} — ${variant.name}`,
              retailPrice: variant.price
            })
          })
        }
      })
    }
    setFlattenedVariants(flattened)

    // 2. Dynamically bind prices from spareProducts or fall back onto manual prices
    const enrichedParts = partDeductionBlueprint.map(blueprintItem => {
      // If a manual override price is specified directly in the schema, use it instantly
      if (blueprintItem.manualPrice !== undefined) {
        return {
          ...blueprintItem,
          price: blueprintItem.manualPrice
        }
      }

      const liveInventoryMatch = spareProducts?.find(sp => sp.slug === blueprintItem.slug)
      return {
        ...blueprintItem,
        price: liveInventoryMatch ? liveInventoryMatch.price : 0
      }
    })
    setPartsWithPrices(enrichedParts)

    // 3. Populate default starting counts safely at zero using the matching identifier slugs
    const initialQty = {}
    partDeductionBlueprint.forEach(part => {
      initialQty[part.slug] = 0
    })
    setFaultyPartsQuantities(initialQty)
  }, [])

  const handleVariantChange = (e) => {
    const key = e.target.value
    setSelectedVariantKey(key)
    
    const matched = flattenedVariants.find(v => v.uniqueKey === key)
    if (matched) {
      setTotalPricePaid(matched.retailPrice)
    } else {
      setTotalPricePaid('')
    }
    setCalculationResults(null)
  }

  const updatePartQuantity = (partSlug, change) => {
    setFaultyPartsQuantities(prev => {
      const currentQty = prev[partSlug] || 0
      const updatedQty = Math.max(0, currentQty + change)
      return { ...prev, [partSlug]: updatedQty }
    })
    setCalculationResults(null)
  }

  const calculateRefundStrategy = (e) => {
    e.preventDefault()
    
    const baseValue = parseFloat(totalPricePaid)
    if (!selectedVariantKey) {
      toast.error('Please choose a valid product variant configuration from the dropdown picker.')
      return
    }
    if (isNaN(baseValue) || baseValue <= 0) {
      toast.error('Please enter a valid monetary value statement for total price paid.')
      return
    }

    let calculatedDeductionsAccumulator = 0
    const dynamicBreakdownList = []

    partsWithPrices.forEach(part => {
      const count = faultyPartsQuantities[part.slug] || 0
      if (count > 0) {
        const itemDeductionCost = part.price * count
        calculatedDeductionsAccumulator += itemDeductionCost
        dynamicBreakdownList.push({
          name: part.name,
          unitPrice: part.price,
          quantity: count,
          allocatedCost: itemDeductionCost
        })
      }
    })

    const totalDeductionsFinal = Math.min(baseValue, calculatedDeductionsAccumulator)
    const secureRefundCalculated = Math.max(0, baseValue - totalDeductionsFinal)

    setCalculationResults({
      baseValue,
      totalDeductionsFinal,
      secureRefundCalculated,
      items: dynamicBreakdownList
    })

    toast.success('Refund detection parameters compiled successfully.')
  }

  const cssStyles = `
    .ref-section { padding: 3rem 1rem 5rem; background: #f8fafc; min-height: 90vh; box-sizing: border-box; }
    .ref-container { max-width: 1040px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }
    .ref-header { text-align: center; margin-bottom: 1rem; }
    .ref-grid { display: flex; flex-wrap: wrap; gap: 1.5rem; }
    .ref-form-panel { flex: 1 1 500px; background: white; border: 1px solid #e2e8f0; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.01); }
    .ref-results-panel { flex: 1 1 400px; display: flex; flex-direction: column; gap: 1rem; min-width: 320px; }
    
    .ref-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem; text-align: left; }
    .ref-group label { font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.02em; }
    .ref-select, .ref-input { padding: 0.75rem 1rem; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1rem; outline: none; font-weight: 600; background: white; width: 100%; box-sizing: border-box; transition: border-color 0.2s; }
    .ref-select:focus, .ref-input:focus { border-color: #0ead6e; }
    
    .ref-parts-title { font-size: 0.85rem; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 1rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; text-align: left; }
    .ref-parts-category-group { margin-bottom: 1.25rem; }
    .ref-cat-header { font-size: 0.8rem; font-weight: 700; color: #0ead6e; text-transform: uppercase; margin-bottom: 0.5rem; text-align: left; background: #f0fdf4; padding: 4px 8px; border-radius: 4px; display: inline-block; }
    
    .ref-part-item { display: flex; justify-content: space-between; align-items: center; padding: 0.55rem 0.5rem; border-bottom: 1px solid #f1f5f9; gap: 1rem; }
    .ref-part-info { text-align: left; }
    .ref-part-name { font-size: 0.92rem; font-weight: 600; color: #1e293b; }
    .ref-part-pct { font-size: 0.78rem; font-weight: 700; color: #94a3b8; }
    
    .ref-qty-counter { display: flex; align-items: center; gap: 0.5rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 2px; }
    .ref-qty-btn { width: 28px; height: 28px; border: none; background: white; color: #0f172a; border-radius: 4px; font-weight: 800; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .ref-qty-btn:hover { background: #f1f5f9; }
    .ref-qty-val { width: 24px; text-align: center; font-size: 0.9rem; font-weight: 700; color: #0f172a; }
    
    .ref-calc-btn { width: 100%; padding: 0.9rem; border-radius: 8px; font-size: 0.95rem; font-weight: 700; background: #0ead6e; color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(14,173,110,0.15); transition: opacity 0.2s; }
    .ref-calc-btn:hover { opacity: 0.9; }
    
    .ref-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; text-align: left; box-shadow: 0 4px 15px rgba(0,0,0,0.01); }
    .ref-metric { display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px dashed #e2e8f0; font-size: 0.92rem; font-weight: 600; color: #475569; }
    .ref-main-result { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; border-radius: 12px; padding: 1.5rem; text-align: center; }
    
    @media (max-width: 576px) {
      .ref-header { margin-top: 4rem; }
      .ref-section { padding: 1.5rem 0.5rem 3rem !important; }
      .ref-form-panel { padding: 1.25rem 1rem !important; }
    }
  `;

  const structuredCategories = partsWithPrices.reduce((acc, currentItem) => {
    if (!acc[currentItem.category]) acc[currentItem.category] = []
    acc[currentItem.category].push(currentItem)
    return acc
  }, {})

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <Nav />
      
      <div className="ref-section">
        <div className="ref-container">
          
          <div className="ref-header">
            <span style={{ fontSize: '3.2rem' }}>⚖️</span>
            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.95rem', color: '#0f172a', marginTop: '0.25rem' }}>
              Techo Connect Refund Assessment Dashboard
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '560px', margin: '0.4rem auto 0', lineHeight: 1.4 }}>
              Process returning product claims by assessing structural faults. Deduction values are calculated on a fixed-cost itemized component basis directly synced from inventory records.
            </p>
          </div>

          <div className="ref-grid">
            
            {/* COMPONENT CONTROL INPUT AREA */}
            <div className="ref-form-panel">
              <form onSubmit={calculateRefundStrategy}>
                
                <div className="ref-group">
                  <label>1. Select Returned Product Variant</label>
                  <select className="ref-select" value={selectedVariantKey} onChange={handleVariantChange} required>
                    <option value="">-- Choose Stock Antenna Item Profile --</option>
                    {flattenedVariants.map(variant => (
                      <option key={variant.uniqueKey} value={variant.uniqueKey}>
                        {variant.displayName} (LKR {variant.retailPrice.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ref-group">
                  <label>2. Base Price Paid for Hardware Unit (LKR)</label>
                  <input type="number" className="ref-input" placeholder="e.g. 3800" value={totalPricePaid} onChange={(e) => { setTotalPricePaid(e.target.value); setCalculationResults(null); }} required min="0" step="any" />
                </div>

                <div className="ref-parts-title">3. Flag Damaged Components & Quantity</div>
                
                {Object.keys(structuredCategories).map(category => (
                  <div key={category} className="ref-parts-category-group">
                    <div className="ref-cat-header">{category}</div>
                    {structuredCategories[category].map(part => (
                      <div key={part.slug} className="ref-part-item">
                        <div className="ref-part-info">
                          <div className="ref-part-name">{part.name}</div>
                          <div className="ref-part-pct">Deduction price: <strong>LKR {part.price.toLocaleString()}</strong></div>
                        </div>
                        <div className="ref-qty-counter">
                          <button type="button" className="ref-qty-btn" onClick={() => updatePartQuantity(part.slug, -1)}>-</button>
                          <div className="ref-qty-val">{faultyPartsQuantities[part.slug] || 0}</div>
                          <button type="button" className="ref-qty-btn" onClick={() => updatePartQuantity(part.slug, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                <button type="submit" className="ref-calc-btn" style={{ marginTop: '1rem' }}>
                  ⚙️ Process Deduction Matrix Allocation
                </button>
              </form>
            </div>

            {/* STRATEGY OUTPUT BREAKDOWN PANEL AREA */}
            <div className="ref-results-panel">
              {calculationResults ? (
                <>
                  <div className="ref-main-result">
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, opacity: 0.85 }}>Estimated Adjusted Refund Allocation</span>
                    <h2 style={{ fontSize: '2.4rem', margin: '0.4rem 0', fontWeight: 800 }}>LKR {calculationResults.secureRefundCalculated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.35 }}>
                      Evaluation matrix rule verified:<br /> Refund Amount = Price Paid - Parts Deduction
                    </p>
                  </div>

                  <div className="ref-card">
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 800, color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '6px' }}>Settlement Matrix Summary</h3>
                    
                    <div className="ref-metric">
                      <span>Gross Initial Value Paid:</span>
                      <strong style={{ color: '#0f172a' }}>LKR {calculationResults.baseValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                    </div>

                    <div className="ref-metric">
                      <span>Accumulated Parts Reductions:</span>
                      <strong style={{ color: '#ef4444' }}>- LKR {calculationResults.totalDeductionsFinal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                    </div>

                    <div className="ref-metric" style={{ borderBottom: 'none', paddingTop: '1rem', fontSize: '1rem' }}>
                      <span>Net Refund Settlement:</span>
                      <strong style={{ color: '#10b981', fontSize: '1.15rem' }}>LKR {calculationResults.secureRefundCalculated.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                    </div>
                  </div>

                  {calculationResults.items.length > 0 && (
                    <div className="ref-card" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                      <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Fault Evaluation Breakdown</h4>
                      {calculationResults.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.45rem 0', borderBottom: '1px solid #f8fafc', gap: '1rem' }}>
                          <span style={{ color: '#334155', flex: 1, textAlign: 'left' }}>
                            {item.name} <strong style={{ color: '#0f172a' }}>(x{item.quantity})</strong>
                          </span>
                          <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                            LKR {item.unitPrice.toLocaleString()} each
                          </span>
                          <strong style={{ color: '#e11d48' }}>
                            LKR {item.allocatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </strong>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ background: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: 12, padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', textAlign: 'center', minHeight: '340px' }}>
                  <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧮</span>
                  <strong style={{ color: '#475569', fontSize: '0.95rem' }}>Awaiting Input Parameters</strong>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', maxWidth: '280px', lineHeight: 1.4 }}>Select an active model composition value block on the left sidebar to generate strategic claim adjustment breakdowns.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}