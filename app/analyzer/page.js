'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import toast from 'react-hot-toast'

export default function SignalAnalyzerPage() {
  const [inputs, setInputs] = useState({ sinr: '', rsrp: '', rsrq: '', rssi: '' })
  const [verdict, setVerdict] = useState(null)
  const [currentDateString, setCurrentDateString] = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)
  const reportRef = useRef(null)

  useEffect(() => {
    setCurrentDateString(new Date().toLocaleDateString())
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  const analyzeSignal = (e) => {
    e.preventDefault()
    
    const sinr = parseFloat(inputs.sinr)
    const rsrp = parseFloat(inputs.rsrp)
    const rsrq = parseFloat(inputs.rsrq)
    const rssi = parseFloat(inputs.rssi)

    const grades = {
      rsrp: rsrp >= -80 ? { label: 'Excellent', color: '#10B981' } :
            rsrp >= -90 ? { label: 'Good', color: '#059669' } :
            rsrp >= -100 ? { label: 'Fair (Weak Power)', color: '#F59E0B' } :
            { label: 'Poor (Severe Blockage)', color: '#EF4444' },
      
      sinr: sinr >= 20 ? { label: 'Excellent', color: '#10B981' } :
            sinr >= 13 ? { label: 'Good', color: '#059669' } :
            sinr >= 5 ? { label: 'Fair (High Noise)', color: '#F59E0B' } :
            { label: 'Terrible (Heavy Interference)', color: '#EF4444' },

      rsrq: rsrq >= -10 ? { label: 'Excellent', color: '#10B981' } :
            rsrq >= -15 ? { label: 'Good', color: '#059669' } :
            { label: 'Poor (Unstable Quality)', color: '#EF4444' },

      rssi: rssi >= -65 ? { label: 'Excellent', color: '#10B981' } :
            rssi >= -75 ? { label: 'Good', color: '#059669' } :
            { label: 'Poor (Low Total Energy)', color: '#EF4444' }
    }

    let issueTitle = ""
    let diagnosticMessage = ""
    let whyItHappens = ""
    let problemList = []

    if (rsrp < -92 && sinr < 10) {
      issueTitle = "Critical Signal Starvation & Tower Static"
      diagnosticMessage = `Your wireless broadband connection is experiencing extreme signal attenuation. An RSRP value of ${rsrp} dBm shows the cellular waves are heavily blocked before reaching your workspace, forcing your router to decode distorted packets through background radio static noise (SINR: ${sinr} dB).`
      whyItHappens = "This happens because high-frequency cellular bands are absorbed by concrete structural blockades, reinforced masonry walls, and roofing profiles. Your internal omnidirectional router antennas are pulling in destructive reflections and environmental electronic noise instead of a clean, direct tower line."
      problemList = ["Unpredictable ping spikes (latency jitter) between 40ms and 600ms.", "Drastic speed drops during peak hours due to massive packet corruption.", "Complete network dropouts under heavy streaming loads."]
    } 
    else if (rsrp >= -85 && sinr < 8) {
      issueTitle = "High Transmission Power with Severe Sector Jamming"
      diagnosticMessage = `Your raw reception power (${rsrp} dBm) is strong, but your overall communication clarity is critically compromised (SINR: ${sinr} dB). Your router has adequate raw power but cannot establish a clean connection through the surrounding radio clutter.`
      whyItHappens = "This happens because your router's stock internal antennas lack directional focus. They are accidentally catching competing, overlapping wave front paths from multiple base towers at the same time, creating an echoing cross-talk effect that slows down data parsing."
      problemList = ["Lagging web page loads and stalling video player buffers.", "Disrupted connection speeds even when the signal bars display full power.", "Frequent stuttering during online multiplayer gaming or live Zoom calls."]
    } 
    else {
      issueTitle = "Sub-Optimal Network Range Limitation"
      diagnosticMessage = `Your data stream parameters indicate a connection bottleneck. Your current signal profile provides functional bandwidth for light browsing, but fails under high-load data processing tasks.`
      whyItHappens = "This is caused by distance constraints from the primary provider grid terminal or physical obstructions like dense foliage and surrounding buildings. The signal waves arrive scattered and weakened by the time they reach your indoor setup."
      problemList = ["Pixelated video quality during 4K or HD streaming.", "Slower upload speeds that bottleneck file transfers.", "Noticeable packet loss during heavy multi-device network load."]
    }

    setVerdict({ grades, issueTitle, diagnosticMessage, whyItHappens, problemList })
  }

  const downloadPDFReport = async () => {
    if (!verdict) return
    setPdfLoading(true)
    const toastId = toast.loading('Compiling crisp professional layout into PDF form...')

    try {
      if (!window.html2pdf) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
          script.crossOrigin = 'anonymous'
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      // 🌟 FIXED: Dynamically detect mobile viewports to adapt canvas capture points
      const isMobile = window.innerWidth <= 576
      const element = reportRef.current
      
      const opt = {
        margin: [0, 0, 0, 0],
        filename: 'Techo_Connect_Signal_Analysis_Report.pdf',
        image: {
          type: 'jpeg',
          quality: 1
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
          scrollX: isMobile ? -40 : 75, // 🌟 FIXED: Uses 75 for perfect desktop layout alignment, 0 for mobile screen widths
          windowWidth: 1200
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['css']
        }
      }

      await window.html2pdf().set(opt).from(element).save()
      toast.success('Vector PDF Report successfully compiled!', { id: toastId })
    } catch (err) {
      console.error('PDF compiling runtime crash error:', err)
      toast.error('PDF rendering sequence failed to complete.', { id: toastId })
    } finally {
      setPdfLoading(false)
    }
  }

  const cssStyles = `
    /* ── SCREEN INTERACTIVE VIEW STYLES ── */
    .an-section { padding: 3rem 1rem 5rem; background: var(--bg); min-height: 90vh; }
    .an-container { max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }
    .an-header { text-align: center; margin-bottom: 1rem; }
    .an-grid { display: flex; flex-wrap: wrap; gap: 1.5rem; }
    .an-form-panel { flex: 1 1 360px; background: white; border: 1px solid var(--border-light); padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.01); height: fit-content; }
    .an-results-panel { flex: 1 2 480px; display: flex; flex-direction: column; gap: 1rem; min-width: 0; }
    .an-metric-badge { display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-light); font-size: 0.88rem; }
    .an-pitch-card { background: linear-gradient(135deg, #FFF 0%, #F0FDF4 100%); border: 2px solid var(--green); border-radius: 12px; padding: 1.5rem; margin-top: 0.25rem; }
    .an-input-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem; }
    .an-input-group label { font-size: 0.78rem; font-weight: 700; color: var(--slate); text-transform: uppercase; letter-spacing: 0.02em; }
    .an-input-group input { padding: 0.75rem 1rem; border: 2px solid var(--border-light); border-radius: 8px; font-size: 1rem; outline: none; font-weight: 600; transition: border-color 0.2s; }
    .an-input-group input:focus { border-color: var(--green); }

    /* ── 📱 MOBILE RESPONSIVE ADAPTER OVERRIDES ── */
    @media (max-width: 576px) {
      .an-header { text-align: center; margin-bottom: 1rem; margin-top: 4rem;}
      .an-section { padding: 1.5rem 0.5rem 3rem !important; }
      .an-form-panel { padding: 1.25rem 1rem !important; flex: 1 1 100% !important; }
      .an-results-panel { flex: 1 1 100% !important; }
      .an-metric-badge { padding: 0.65rem 0.75rem !important; font-size: 0.82rem !important; flex-direction: row !important; justify-content: space-between !important; }
      .an-badge-text { font-size: 0.8rem !important; }
      .an-pitch-card { padding: 1.25rem 1rem !important; }
    }

    /* ── 🖨️ PERFECT FULL-SCALE A4 CANVAS ARCHITECTURE (NO CLIPPING) ── */
    /* ── PDF ROOT WRAPPER ── */
    .html2pdf-hidden-wrapper {
      position: absolute; /* 🌟 FIXED: Switching from fixed to absolute completely cures left side mobile edge clipping */
      top: 0;
      left: 0;
      width: 210mm;
      background: #ffffff;
      z-index: -9999;
      opacity: 0;
      pointer-events: none;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* ── PDF CONTENT ROOT ── */
    .pdf-content-area {
      width: 210mm;
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff;
      font-family: Arial, sans-serif;
      color: #1e293b;
      line-height: 1.4;
    }

    /* ── A4 PAGE ── */
    .pdf-page {
      width: 210mm;
      height: 296.5mm; 
      background: #ffffff;
      box-sizing: border-box;
      position: relative;

      /* PROFESSIONAL PAGE MARGINS */
      padding-top: 20mm;
      padding-right: 14mm;
      padding-bottom: 12mm;
      padding-left: 14mm;
      margin: 0 !important;
      overflow: hidden;
      page-break-after: always;
    }

    .pdf-page:last-child {
      page-break-after: avoid !important;
    }

    .pdf-letterhead {
      border-bottom: 2px solid #0ead6e;
      padding-bottom: 6px;
      margin-bottom: 10px;
      margin-top: 0 !important;
      padding-top: 0 !important;
    }

    .pdf-logo {
      font-size: 22pt;
      font-weight: 800;
      color: #0ead6e;
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1;
    }
    .pdf-logo span { color: #1e293b; }
    .pdf-lh-contacts { text-align: right; font-size: 8.5pt; color: #64748b; line-height: 1.4; vertical-align: top; }
    .pdf-title-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0ead6e; padding: 8px 12px; border-radius: 6px; margin-bottom: 14px; }
    .pdf-section-heading { font-size: 11pt; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px; }
    .pdf-table { width: 100%; border-collapse: collapse; margin: 6px 0 12px; }
    .pdf-table th { background: #1e293b; color: #ffffff; text-transform: uppercase; font-size: 8.5pt; font-weight: 700; padding: 6px 8px; text-align: left; }
    .pdf-table td { padding: 6px 8px; font-size: 9pt; border: 1px solid #e2e8f0; color: #334155; }
    .pdf-badge { font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 7.5pt; display: inline-block; }
    .pdf-highlight { background: #fff9db; border-left: 4px solid #ef4444; padding: 8px 10px; margin-bottom: 10px; font-size: 9pt; color: #334155; }
    .pdf-product-card { border: 1px solid #0ead6e; background: #f0fdf4; border-radius: 8px; padding: 12px; margin-top: 10px; }
    .pdf-cta-box { background: #0ead6e; padding: 14px; border-radius: 8px; text-align: center; margin-top: 15px; }
    
    .pdf-btn-link { display: inline-block; background: white; color: #0ead6e; font-weight: 800; padding: 8px 16px; border-radius: 5px; text-decoration: underline; font-size: 9pt; text-transform: uppercase; margin-top: 8px; border: 1px solid #0ead6e; }
    .pdf-prod-url { color: #0ead6e; font-weight: 700; text-decoration: underline; font-size: 9.5pt; display: inline-block; margin-top: 4px; }
    .pdf-footer-tag { position: absolute; bottom: 12mm; left: 16mm; right: 16mm; border-top: 1px solid #e2e8f0; padding-top: 6px; font-size: 7.5pt; color: #64748b; }
    .pdf-content-area p, .pdf-content-area li { font-size: 9.5pt; color: #334155; line-height: 1.45; text-align: justify; margin: 0 0 6px 0; }
    .pdf-content-area ul { padding-left: 16px; margin-bottom: 6px; }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      {/* ── INTERACTIVE WEB DISPLAY VIEW MODE ── */}
      <Nav />
      <div className="an-section">
        <div className="an-container">
          
          <div className="an-header">
            <span style={{ fontSize: '3.2rem' }}>📊</span>
            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.95rem', color: 'var(--ink)', marginTop: '0.25rem' }}>
              Techo Connect Signal Analyzer
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem', maxWidth: '520px', margin: '0.4rem auto 0', lineHeight: 1.4 }}>
              Input your wireless gateway diagnostic logs below to map your tower reception performance metrics instantly.
            </p>
          </div>

          <div className="an-grid">
            
            <div className="an-form-panel">
              <form onSubmit={analyzeSignal}>
                <div className="an-input-group">
                  <label>1. SINR (Signal Quality Ratio)</label>
                  <input type="number" step="0.1" name="sinr" placeholder="e.g. 4.2 or 16" value={inputs.sinr} onChange={handleInputChange} required />
                </div>
                <div className="an-input-group">
                  <label>2. RSRP (Signal Power Strength)</label>
                  <input type="number" step="1" name="rsrp" placeholder="e.g. -98 or -75" value={inputs.rsrp} onChange={handleInputChange} required />
                </div>
                <div className="an-input-group">
                  <label>3. RSRQ (Wave Quality Variable)</label>
                  <input type="number" step="1" name="rsrq" placeholder="e.g. -14 or -8" value={inputs.rsrq} onChange={handleInputChange} required />
                </div>
                <div className="an-input-group">
                  <label>4. RSSI (Total Power Energy)</label>
                  <input type="number" step="1" name="rssi" placeholder="e.g. -78 or -60" value={inputs.rssi} onChange={handleInputChange} required />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', fontSize: '0.92rem', fontWeight: 700 }}>
                  Analyze Connection Metrics
                </button>
              </form>
            </div>

            <div className="an-results-panel">
              {verdict ? (
                <>
                  <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.1rem' }}>Live Grading Blocks</div>
                    <div className="an-metric-badge"><span className="an-badge-text">SINR (Quality Ratio): <strong>{inputs.sinr} dB</strong></span><span style={{ color: verdict.grades.sinr.color, fontWeight: 700 }}>{verdict.grades.sinr.label}</span></div>
                    <div className="an-metric-badge"><span className="an-badge-text">RSRP (Signal Power): <strong>{inputs.rsrp} dBm</strong></span><span style={{ color: verdict.grades.rsrp.color, fontWeight: 700 }}>{verdict.grades.rsrp.label}</span></div>
                    <div className="an-metric-badge"><span className="an-badge-text">RSRQ (Wave Quality): <strong>{inputs.rsrq} dB</strong></span><span style={{ color: verdict.grades.rsrq.color, fontWeight: 700 }}>{verdict.grades.rsrq.label}</span></div>
                    <div className="an-metric-badge"><span className="an-badge-text">RSSI (Total Energy): <strong>{inputs.rssi} dBm</strong></span><span style={{ color: verdict.grades.rssi.color, fontWeight: 700 }}>{verdict.grades.rssi.label}</span></div>
                  </div>

                  <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: '#EF4444', margin: '0 0 0.4rem 0' }}>🚨 {verdict.issueTitle}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.45, margin: 0 }}>{verdict.diagnosticMessage}</p>
                  </div>

                  <button onClick={downloadPDFReport} disabled={pdfLoading} className="btn" style={{ width: '100%', background: '#1e293b', color: 'white', padding: '0.8rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none', opacity: pdfLoading ? 0.7 : 1 }}>
                    <span>{pdfLoading ? 'Compiling PDF Layers...' : '📥 Download Detailed PDF Report'}</span>
                  </button>

                  <div className="an-pitch-card">
                    <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--green)', margin: '0 0 0.3rem 0' }}>📡 Prescribed Hardware Upgrade</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ink)', lineHeight: 1.45, marginBottom: '1rem' }}>
                      Bypass structural signal insulation barriers entirely. Our commercial-grade high-gain directional systems focus antennas directly onto the primary grid transmitter cell block, filtering out environmental network noise.
                    </p>
                    <Link href="/products/yagi-elite" style={{ display: 'block', background: 'var(--green)', color: 'white', padding: '0.65rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', textAlign: 'center' }}>
                      Explore Yagi Elite Systems &rarr;
                    </Link>
                  </div>
                </>
              ) : (
                <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '100%', minHeight: '280px', color: 'var(--muted)', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>📈</span>
                  <strong style={{ color: 'var(--ink)', fontSize: '0.9rem' }}>Awaiting Diagnostic Inputs</strong>
                  <p style={{ margin: 0, fontSize: '0.78rem', maxWidth: '260px', lineHeight: 1.35 }}>Input your cellular router values on the left panel to map network bottlenecks.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />

      {/* ── 🖨️ CORPORATE CANVAS RENDER HOUSING NODE ── */}
      {verdict && (
        <div className="html2pdf-hidden-wrapper">
          <div ref={reportRef} className="pdf-content-area">
            
            {/* 📄 PDF REPORT PAGE ONE */}
            <div className="pdf-page">
              <div className="pdf-letterhead">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td>
                        <div className="pdf-logo">Techo<span>Connect</span></div>
                        <div style={{ fontSize: '8.5pt', color: '#64748b', marginTop: '2px', fontWeight: 'bold' }}>High-Performance Wireless Signal Engineering</div>
                      </td>
                      <td className="pdf-lh-contacts">
                        <strong>Technical Diagnostics Lab</strong><br />
                        Hotline: 076 665 6007<br />
                        Email: inquiries@techotraders.com.lk<br />
                        Web: connect.techotraders.com.lk
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pdf-title-box">
                <h2 style={{ fontSize: '13pt', fontWeight: '700', color: '#0f172a', margin: '0 0 2px 0' }}>Advanced Wireless Signal Diagnostic Report</h2>
                <table style={{ width: '100%', fontSize: '8.5pt', color: '#475569' }}>
                  <tbody>
                    <tr>
                      <td><strong>Reference ID:</strong> TC-DIAG-5813</td>
                      <td style={{ textAlign: 'right' }}><strong>Date Generated:</strong> {currentDateString}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pdf-section-heading">1. Current Signal Reception Profile</div>
              <p>The matrix below outlines the exact radio frequency parameters parsed from your internal broadband router tracking terminal:</p>
              
              <table className="pdf-table">
                <thead>
                  <tr>
                    <th>Measurement Parameter Metric</th>
                    <th>Logged Value</th>
                    <th>Optimal Benchmark</th>
                    <th>Diagnostic Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>RSRP</strong> (Raw Received Signal Power)</td>
                    <td>{inputs.rsrp} dBm</td>
                    <td>&ge; -80 dBm</td>
                    <td><span className="pdf-badge" style={{ background: '#fee2e2', color: '#991b1b' }}>{verdict.grades.rsrp.label}</span></td>
                  </tr>
                  <tr>
                    <td><strong>SINR</strong> (Signal-to-Noise Clarity Ratio)</td>
                    <td>{inputs.sinr} dB</td>
                    <td>&ge; 15.0 dB</td>
                    <td><span className="pdf-badge" style={{ background: '#fee2e2', color: '#991b1b' }}>{verdict.grades.sinr.label}</span></td>
                  </tr>
                  <tr>
                    <td><strong>RSRQ</strong> (Wave Quality Factor)</td>
                    <td>{inputs.rsrq} dB</td>
                    <td>&ge; -10 dB</td>
                    <td><span className="pdf-badge" style={{ background: '#fef3c7', color: '#92400e' }}>{verdict.grades.rsrq.label}</span></td>
                  </tr>
                  <tr>
                    <td><strong>RSSI</strong> (Total Received Energy Indicator)</td>
                    <td>{inputs.rssi} dBm</td>
                    <td>&ge; -65 dBm</td>
                    <td><span className="pdf-badge" style={{ background: '#fef3c7', color: '#92400e' }}>{verdict.grades.rssi.label}</span></td>
                  </tr>
                </tbody>
              </table>

              <div className="pdf-section-heading">2. Current Operational Limitations & Connection Problems</div>
              <p>Due to the sub-optimal cellular reception parameters indexed above, your hardware connection suffers from continuous data processing bottlenecks, manifesting as:</p>
              <ul>
                {verdict.problemList.map((prob, i) => (
                  <li key={i} style={{ marginBottom: '4px', fontSize: '9.5pt' }}>
                    {prob.includes(':') ? (
                      <><strong>{prob.split(':')[0]}:</strong>{prob.split(':')[1]}</>
                    ) : prob}
                  </li>
                ))}
              </ul>

              <div className="pdf-section-heading">3. Scientific Root Cause: Why It Happens</div>
              <div className="pdf-highlight">
                <strong>Radio Frequency Absorption Warning:</strong> Your recorded parameters verify deep structural wireless absorption metrics. Signal frequency paths are failing to penetrate indoor masonry spaces efficiently.
              </div>
              <p style={{ margin: 0 }}>{verdict.whyItHappens}</p>
              
              <div className="pdf-footer-tag">
                <span>Techo Connect Labs • Document Ref: TC-DIAG-5813</span>
                <span style={{ float: 'right' }}>Page 1 of 2</span>
              </div>
            </div>

            {/* 📄 PDF REPORT PAGE TWO */}
            <div className="pdf-page">
              <div className="pdf-letterhead">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td>
                        <div className="pdf-logo">Techo<span>Connect</span></div>
                        <div style={{ fontSize: '8.5pt', color: '#64748b', marginTop: '2px', fontWeight: 'bold' }}>High-Performance Wireless Signal Engineering</div>
                      </td>
                      <td className="pdf-lh-contacts">
                        <strong>Technical Diagnostics Lab</strong><br />
                        Hotline: 076 665 6007<br />
                        Email: inquiries@techotraders.com.lk<br />
                        Web: connect.techotraders.com.lk
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pdf-section-heading">4. Engineering Solution Matrix</div>
              <p>To establish a stable high-bandwidth baseline connection capable of seamless live file processing and zero latency drops, structural signal isolation must be completely eliminated.</p>
              <p>The only scientifically tested methodology involves shifting data collection outside through an <strong>Exterior Directional Antenna Grid</strong>. This completely cuts out concrete interference factors by intercepting signal waves directly from open space and channeling them down via shielded low-loss coaxial cabling assemblies directly to your gateway router terminals.</p>

              <div className="pdf-section-heading">5. Prescribed Solution Hardware: Techo Connect Yagi Elite</div>
              <p>To fully neutralize your local SINR wave distortion and boost data throughput speeds, our hardware engineering division strictly prescribes deploying our high-gain directional array flagship:</p>
              
              <div className="pdf-product-card">
                <strong style={{ fontWeight: 800, color: '#0f172a', fontSize: '10.5pt', display: 'block', marginBottom: '2px' }}>📡 Techo Connect Yagi Elite Edition</strong>
                <p style={{ margin: '0 0 4px 0', fontSize: '9.5pt', color: '#334155' }}>
                  Engineered with an ultra-narrow 30° spatial receiving aperture plane. The Yagi Elite system locks directly onto the clean primary transmission sector block of local providers while forcefully rejecting secondary bouncing cell echoes and background radiation noise fields.
                </p>
                <div style={{ fontSize: '8pt', color: '#0ead6e', fontWeight: 700, margin: '4px 0' }}>
                  Gain Matrix: 24 dBi Double Cross-Polarization Feeds • Spectrum Support: Full Band 698-2700 MHz MIMO Upgrade
                </div>
                
                <div style={{ marginTop: '6px', fontSize: '9.5pt', color: '#334155' }}>
                  <strong>Secure Your System Online:</strong><br />
                  <a href="https://connect.techotraders.com.lk/products/yagi-elite" target="_blank" rel="noopener noreferrer" className="pdf-prod-url">
                    To view Yagi antenns click here
                  </a>
                </div>
              </div>
              <p style={{ marginTop: '12px', fontSize: '9.5pt' }}><strong>Anticipated Performance Shift:</strong> Integrating the Yagi Elite will lift your RSRP into the safe green threshold (-70 dBm) and scale your functional quality ratio (SINR) past 20 dB, unlocking the maximum speed tiers available on your provider network.</p>

              <div className="pdf-section-heading">6. Personalized Engineering Consultation Activation</div>
              <p>Our optimization technicians have mapped out your vector coordinates. We are ready to conduct an engineering line review of your signal footprint structure on an active consultation channel.</p>
              
              <div className="pdf-cta-box">
                <strong style={{ fontSize: '11pt', display: 'block', marginBottom: '4px', color: '#ffffff' }}>💬 Launch Your WhatsApp Engineering Desk Review</strong>
                <p style={{ fontSize: '9.5pt', margin: '0 0 10px 0', opacity: 0.95, color: '#ffffff' }}>
                  Please click the link button below to connect with technical support. Forward a copy of this downloaded PDF report file straight to our WhatsApp chat channel so our engineers can read your local tower metrics immediately.
                </p>
                <a href="https://wa.me/94766656007?text=I%20have%20run%20my%20Techo%20Connect%20Signal%20Analyzer%20Report%20.%20Please%20review%20my%20metrics%20for%20Yagi%20Elite%20installation." target="_blank" rel="noopener noreferrer" className="pdf-btn-link">
                WhatsApp Chat with us
                </a>
              </div>

              <div className="pdf-footer-tag">
                <span>Techo Connect Engineering Labs • Document Ref: TC-DIAG-5813</span>
                <span style={{ float: 'right' }}>Page 2 of 2</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}