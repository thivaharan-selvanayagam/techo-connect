'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import { supabase } from '../../lib/supabase'
import { formatLKR } from '../../lib/utils'
import toast from 'react-hot-toast'

// ── 🏢 FARDAR EXPRESS DOMESTIC BRANCH DIRECTORY ──
const BRANCH_DATA = {
  "akurana": { name: "Akurana", phone: "0812304154 / 0763286123", address: "No. 250, Dodangolla, Akurana" },
  "ambalangoda": { name: "Ambalangoda", phone: "0912253779 / 0760980148", address: "No 310, Mahaweediya, Ambalangoda" },
  "ampara": { name: "Ampara", phone: "0632240020 / 0760980007", address: "No.7, Iginiyagala road, Ampara" },
  "anuradhapura": { name: "Anuradhapura", phone: "0252237129 / 0761488100", address: "No. 188, Godage Mawatha, Anuradhapura" },
  "avissawella": { name: "Avissawella", phone: "0362232220 / 0760980015", address: "No. 141, D10, Rathnapura Road, nawetiya, awissawella" },
  "baddegama": { name: "Baddegama", phone: "0912298488 / 0764424450", address: "No. 39, Main state, Baddegama" },
  "badulla": { name: "Badulla", phone: "0552233003 / 0760039545", address: "No.8 riverside road, Badulla" },
  "balangoda": { name: "Balangoda", phone: "0452288365 / 0760980168", address: "323 B, Rathnapura Road, Balangoda" },
  "bandarawela": { name: "Bandarawela", phone: "0572221153 / 0761489697", address: "colombo road, ellethota, Bandarawela" },
  "batticaloa": { name: "Batticaloa", phone: "0652227150 / 0761489689", address: "no. 373 Bar Road, Batticoloa" },
  "bibile": { name: "Bibile", phone: "0552266628 / 0763438757", address: "Bibile" },
  "biyagama": { name: "Biyagama", phone: "0112465747 / 0760980073", address: "No. 35 6 samurdi mawatha siyabalathe" },
  "chilaw": { name: "Chilaw", phone: "0322220244 / 0761489678", address: "234 puttalam road, chillaw" },
  "city office": { name: "City Office", phone: "0112682300 / 0760980030", address: "947 mardana road colombo 8" },
  "dambulla": { name: "Dambulla", phone: "0662284090 / 0761489673", address: "84 D1, Trincomalle road, Mirisgoniyawa, Dambulla" },
  "dehiaththakandiya": { name: "Dehiaththakandiya", phone: "0272250146 / 0760980109", address: "no.1, infront of filling station, dehiaththakandiya" },
  "dharga town": { name: "Dharga Town", phone: "0342215331 / 0760980033", address: "No. 35, Yatadola Road, Dharga Town" },
  "digana": { name: "Digana", phone: "0812081035 / 0775278044", address: "No.5 Kandy Road Digana, Rajawella" },
  "divulapitiya": { name: "Divulapitiya", phone: "0312263029 / 0760980013", address: "No. 71 16 minuwangoda road divelapitiya" },
  "eheliyagoda": { name: "Eheliyagoda", phone: "0362263021 / 0767339702", address: "No 487, moragala, eheliyagoda" },
  "embilipitiya": { name: "Embilipitiya", phone: "0472264129 / 0761375137", address: "K L Ariyarathne, Beliattagedara Udagama, Embilipitiye" },
  "fardar international": { name: "Fardar International", phone: "0779607472 / 0779607472", address: "International Logistics Gateway" },
  "galle": { name: "Galle", phone: "0912222882 / 0760980141", address: "no. 41 1, Sri Devamiththa Road, China Garden, Galle" },
  "gampola": { name: "Gampola", phone: "0812352387 / 0760980165", address: "No. 39 J, Gagasiri Road, Gampola" },
  "hanwella": { name: "Hanwella", phone: "0362250613 / 0761480229", address: "no 62, Parna para, Hanwella" },
  "hatton": { name: "Hatton", phone: "0512230510 / 0760979987", address: "no 30 circular road hatton" },
  "hingurakgoda": { name: "Hingurakgoda", phone: "0272246269 / 0768178541", address: "664, 3rd cross street, higurakgoda" },
  "homagama": { name: "Homagama", phone: "0112042464 / 0761488099", address: "209 Highlevel Road, Kendalanda, Homagama" },
  "horana": { name: "Horana", phone: "0342265022 / 0760980166", address: "563 B Galledadugoda, Horana" },
  "imaduwa": { name: "Imaduwa", phone: "0912222973 / 0771079728", address: "Imaduwa Station" },
  "jaffna": { name: "Jaffna", phone: "0212211080 / 0761489666", address: "sivan pannei road, jaffna" },
  "kahawatta": { name: "Kahawatta", phone: "0452271424 / 0768178531", address: "Ketethanna Kahawatta" },
  "kalawana": { name: "Kalawana", phone: "0452121883 / 0763865071", address: "No 1 55, Hospital Road, Manana, Kalawana." },
  "kalmunai": { name: "Kalmunai", phone: "0672050849 / 0760980188", address: "Main Street, Pandiruppu - 2, Kalmunai." },
  "kalutara": { name: "Kalutara", phone: "0342220210 / 0762405912", address: "No. 512, Galle road kaluthara south" },
  "kandy": { name: "Kandy", phone: "0812071766 / 0761488112", address: "No. 41-1 Devi Road Watapuluwa, Kandy" },
  "kantale": { name: "Kantale", phone: "0262056050 / 0760980092", address: "303 c, Trincomale Road, Kanthale" },
  "katunayake": { name: "Katunayake", phone: "0112258756 / 0776336720", address: "No. 529 liyanage mulla, siiduwa" },
  "kebithigollewa": { name: "Kebithigollewa", phone: "0252228942 / 0769019870", address: "New Padaviya Road, Kebithigollewa." },
  "kegalle": { name: "Kegalle", phone: "0352225027 / 0760980053", address: "No. 405 ranwala kegalle" },
  "kekirawa": { name: "Kekirawa", phone: "0252263864 / 0772940368", address: "Thibbatuwewa, Kekirawa" },
  "kilinochchi": { name: "Kilinochchi", phone: "0212282528 / 0760980133", address: "No. 352, A9 Road, Kilinochchi" },
  "kirindiwela": { name: "Kirindiwela", phone: "0775267481 / 0775267481", address: "Kirindiwela" },
  "kodikamam": { name: "Kodikamam", phone: "0212050695 / 0761489674", address: "A9 Road, Puttor Junction, Meesalai, Jaffna" },
  "kohuwala": { name: "Kohuwala", phone: "0112812512 / 0761488089", address: "No. 38, Sunethradevi Road, kohuwala." },
  "kotte": { name: "Kotte", phone: "0112820368 / 0760980082", address: "No. 284-1, Kotte Road, Kotte." },
  "kuliyapitiya": { name: "Kuliyapitiya", phone: "0373155373 / 0760980065", address: "Meegahakotuwaj, Kuliyapitiya." },
  "kurunegala": { name: "Kurunegala", phone: "0372222842 / 0761488088", address: "No. 262-A, Puttlam Road Kurunegala" },
  "mahawa": { name: "Mahawa", phone: "0372041462 / 0766248815", address: "Hospital Junction, Mahawa." },
  "mahiyanganaya": { name: "Mahiyanganaya", phone: "0552257075 / 0760980077", address: "No. 40-41, kandy road, mahiyangana" },
  "malabe": { name: "Malabe", phone: "0112413978 / 0768178560", address: "No. 292-5 Kothalawala Kaduwela." },
  "mannar": { name: "Mannar", phone: "0232223205 / 0760980023", address: "Telecom Junction, Mannar." },
  "matale": { name: "Matale", phone: "0662224034 / 0760980043", address: "No. 59-9D2, Kandy Road, Elwela, Ukuwela, Matale." },
  "matara": { name: "Matara", phone: "0412230060 / 0760980054", address: "No .206-B, Anagarika Darmapala Mawatha, Matara." },
  "matugama": { name: "Matugama", phone: "0342210998 / 0760980178", address: "No. 305, Kalutara Road, Kadawatha, Matugama." },
  "mawanella": { name: "Mawanella", phone: "0352247657 / 0776441459", address: "Old Colombo Road, Anwarama, Mawanella." },
  "mawathagama": { name: "Mawathagama", phone: "0767087041", address: "23 1, Hospital Road, Mawathagama" },
  "medawachchiya": { name: "Medawachchiya", phone: "0252245362 / 0761489672", address: "Jaffna Road, Medawachchiya." },
  "melsiripura": { name: "Melsiripura", phone: "0372064199 / 0760980068", address: "Karandagolla handiya, Kurunegala Road, Melsiripura." },
  "monaragala": { name: "Monaragala", phone: "0552276492 / 0760980003", address: "No. 228 Wellawaya Road, Kachcheriya Junctiion, Monaragala." },
  "morawaka": { name: "Morawaka", phone: "0771200019", address: "Nilwala Building, Morawaka." },
  "mullaitivu": { name: "Mullaitivu", phone: "0212290874 / 0771200054", address: "Karachchikkudiyiruppu, Mankulam Road, Mullaitivu." },
  "narammala": { name: "Narammala", phone: "0372248898 / 0761375126", address: "No. 139, Kuliyapiti Road, Narammala." },
  "nawalapitiya": { name: "Nawalapitiya", phone: "0776919366", address: "Nawalapitiya Center" },
  "negombo": { name: "Negombo", phone: "0312121323 / 0769048570", address: "No. 363 -3, Main Street, Negambo." },
  "nelliady": { name: "Nelliady", phone: "0212050986 / 0764424468", address: "No. 16, Kodikakam Rd, Karaveddi, Nelliady." },
  "nikaweratiya": { name: "Nikaweratiya", phone: "0372053038 / 0768178565", address: "Puttalam Road, Nikaweratiya." },
  "nuwara eliya": { name: "Nuwara Eliya", phone: "0522235974 / 0764424460", address: "Nuwara Eliya, Chapal Street, No.10" },
  "panadura": { name: "Panadura", phone: "0382232022 / 0760980047", address: "41B, Jayathilaka Mawatha, Panadura" },
  "pannipitiya": { name: "Pannipitiya", phone: "0112847642 / 0779635648", address: "Pannipitiya" },
  "pasyala": { name: "Pasyala", phone: "0332286758 / 0760980137", address: "No. 180-6-1, Aththanagalla Road, Pasyala." },
  "peradeniya": { name: "Peradeniya", phone: "0812573582 / 0760980153", address: "No. 2-4-B-2-2, Gannoruwa road, peradeniya" },
  "piliyandala": { name: "Piliyandala", phone: "0112613463 / 0764424452", address: "No.18, Saranapala Mawatha, Piliyandala" },
  "polonnaruwa": { name: "Polonnaruwa", phone: "0272223430 / 0760980185", address: "No. 504-1-A, Near YMM, Circular Road, Polonnaruwa." },
  "pottuvil": { name: "Pottuvil", phone: "0632050173 / 0761488121", address: "Pottuvil Town, Jayawikrama Building." },
  "puttalam": { name: "Puttalam", phone: "0322265525 / 0760980095", address: "No. 71, Kurunegala Road, Puttalam." },
  "ranna": { name: "Ranna", phone: "0473121680 / 0760980155", address: "Rathna Road, Agunukolapelessa" },
  "ratmalana": { name: "Ratmalana", phone: "0112718683 / 0772783028", address: "No 218 A, Galle Road, Ratmalana" },
  "ratnapura": { name: "Ratnapura", phone: "0452121545 / 0771200069", address: "No. 86-10, Inner Circular Road, Ratnapura." },
  "rikillagaskada": { name: "Rikillagaskada", phone: "0812081960 / 0762403324", address: "Kandy Road, Rikillagaskada." },
  "siyambalanduwa": { name: "Siyambalanduwa", phone: "0552275260 / 0761488113", address: "Madulla Town, Damdagalla." },
  "thambuttegama": { name: "Thambuttegama", phone: "0252276579 / 0761393780", address: "Anuradapura Road, Musalpitiya, Thambuttegama" },
  "tissamaharama": { name: "Tissamaharama", phone: "0760980040 / 0760980027", address: "No. 491-C, Debarawewa, Tissa." },
  "trincomalee": { name: "Trincomalee", phone: "0262228052 / 0760980052", address: "No. 130 A, Power Strok, Trincomalee" },
  "uragasmanhandiya": { name: "Uragasmanhandiya", phone: "0912265768 / 0761480248", address: "Aluthgama Road, Urugasmanhandiya." },
  "valaichchenai": { name: "Valaichchenai", phone: "0652051629", address: "Main Street, Valachenai" },
  "vavuniya": { name: "Vavuniya", phone: "0242280010 / 0764424465", address: "No.89-A1, Soosaipillayarkulam, Vavuniya." },
  "walapane": { name: "Walapane", phone: "0769388039 / 0769388039", address: "Siridarmaya, Walapane" },
  "walasmulla": { name: "Walasmulla", phone: "0472249844 / 0760980139", address: "No. 184, Middeniya Road, Walasmulla." },
  "wariyapola": { name: "Wariyapola", phone: "0372273064 / 0768178532", address: "Kurunegala Road, Wariyapola." },
  "wattala": { name: "Wattala", phone: "0112982737 / 0761480250", address: "No. 134, Negambo Road, Wattala." },
  "welimada": { name: "Welimada", phone: "0572243279 / 0760980156", address: "No. 167, Nuwaraeliya Road, Welimada." },
  "wellampitiya": { name: "Wellampitiya", phone: "0112547685 / 0762405833", address: "No. 693-2, Avissawella Road, Wellampitiya." },
  "wellawaya": { name: "Wellawaya", phone: "0552275036 / 0760980085", address: "Haputhale Road, Wellawaya." },
  "wennappuwa": { name: "Wennappuwa", phone: "0312249596 / 0771200073", address: "Kolinjagiya, Wennappuwa" },
  "yakkala": { name: "Yakkala", phone: "0332230805 / 0760979986", address: "No. 1 -A, Henpitamulla, Yakkala." },
  "yatiyanthota": { name: "Yatiyanthota", phone: "0762759779 / 0762759779", address: "No 53 1, Karawanella Road, Yatiyanthota." }
};

// ── LIVE STRING PARSER: CONVERTS JARGON TO PROFESSIONAL UPDATES ──
function formatShortStatus(rawText) {
  if (!rawText) return { title: 'Status Update', desc: '' };
  
  const text = rawText.toLowerCase();

  if (text.includes('add a ccp') || text.includes('add a cre') || text.includes('add a parcel')) {
    return { title: '📦 Parcel Registered', desc: 'Package registered into Fardar logistics network.' };
  }
  if (text.includes('mark as pickup') || text.includes('marked as pickup')) {
    return { title: '🚚 Package Picked Up', desc: 'Collected successfully by the courier agent.' };
  }
  if (text.includes('marked as transfer')) {
    return { title: '🔄 In Transit', desc: 'Dispatched to central transit hub sorting facility.' };
  }
  
  if (text.includes('received to hub')) {
    const hubMatch = rawText.match(/hub\s+([A-Za-z\s]+)\s*\(/i);
    const hubName = hubMatch ? hubMatch[1].trim() : 'Local Hub';
    return { title: '📍 Arrived at Hub', desc: `Package safely received at the ${hubName} Hub.` };
  }
  
  if (text.includes('dispatched to')) {
    return { title: '🛵 Out for Delivery', desc: 'Your package is out with the local rider and on its way to you!' };
  }
  if (text.includes('mark as delivered') || text.includes('delivered')) {
    return { title: '🎉 Delivered Successfully', desc: 'Hardware safely handed over to the customer.' };
  }

  return { title: rawText.split('|')[0].trim(), desc: '' };
}

// ── AUTOMATED BRANCH MATCHING FUNCTION ──
function getBranchDetails(historyLogs) {
  if (!historyLogs || historyLogs.length === 0) return null;
  
  for (let i = historyLogs.length - 1; i >= 0; i--) {
    const text = (historyLogs[i].status || '').toLowerCase();
    
    for (const key of Object.keys(BRANCH_DATA)) {
      if (text.includes(key)) {
        return BRANCH_DATA[key];
      }
    }
  }
  return null;
}

export default function TrackPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    const query = searchQuery.trim().toUpperCase()
    if (!query) return

    setLoading(true)
    setHasSearched(true)
    setOrder(null)

    try {
      const { data: matchedByOrder, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', query)
        .maybeSingle()

      if (orderError) throw orderError

      let matchedOrder = matchedByOrder

      if (!matchedOrder) {
        const { data: trackingData, error: trackingError } = await supabase
          .from('orders')
          .select('*')
          .eq('tracking_number', query)
          .maybeSingle()

        if (trackingError) throw trackingError
        matchedOrder = trackingData
      }

      if (matchedOrder) {
        setOrder(matchedOrder)
        toast.success('Tracking data loaded!')
      } else {
        toast.error('No matching records found. Please double-check your number.')
      }
    } catch (err) {
      console.error('Tracking fetch error:', err)
      toast.error('Could not retrieve tracking details.')
    } finally {
      setLoading(false)
    }
  }

  const renderSearchForm = () => (
    <div className="tc-card" style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📡</div>
      <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Track Your Antenna Delivery</h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
        Enter your official Techo Connect order number below to check live shipping milestones.
      </p>
      
      <form onSubmit={handleSearch} className="tc-search-form" style={{ display: 'flex', gap: '0.5rem', maxWidth: '460px', margin: '0 auto' }}>
        <input 
          type="text" 
          placeholder="e.g. TC-20260515-1569" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', textTransform: 'uppercase' }}
          required
        />
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          {loading ? 'Searching...' : 'Track Order'}
        </button>
      </form>
    </div>
  )

  const renderOrderDetails = () => {
    const historyLogs = Array.isArray(order.courier_history) ? order.courier_history : []
    const matchedBranch = getBranchDetails(historyLogs)
    
    const isDelivered = (order.status || '').toLowerCase() === 'delivered' || 
                        (order.courier_status || '').toLowerCase().includes('deliver')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* TOP META LINE BAR */}
        <div className="tc-meta-bar tc-card" style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--muted)', marginRight: '0.5rem' }}>Order Reference:</span>
            <strong style={{ color: 'var(--ink)' }}>#{order.order_number}</strong>
            <span className="tc-meta-divider" style={{ color: 'var(--border-light)', margin: '0 0.5rem' }}>|</span>
            <span className="tc-meta-date" style={{ color: 'var(--muted)' }}>Date: {new Date(order.created_at || order.date).toLocaleDateString()}</span>
          </div>
          <div style={{ background: 'rgba(10, 173, 110, 0.08)', color: 'var(--green)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {order.status || 'Processing'}
          </div>
        </div>

        {/* TWO COLUMN COMPACT CONSOLIDATED VIEWPORT FRAMEWORK */}
        <div className="tc-main-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* TIMELINE PROGRESS HOUSING LEFT CARD MODULE */}
          <div className="tc-card" style={{ flex: '1 1 340px', background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span>Live Shipment Progress</span>
              {order.tracking_number && <small style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--muted)' }}>Waybill: {order.tracking_number}</small>}
            </div>

            {order.tracking_number ? (
              historyLogs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', paddingLeft: '1.25rem', borderLeft: '2px solid var(--border-light)', margin: '0.25rem 0 0.25rem 0.25rem' }}>
                  {historyLogs.map((checkpoint, idx) => {
                    const isLatest = idx === historyLogs.length - 1
                    const cleanData = formatShortStatus(checkpoint.status);

                    return (
                      <div key={idx} style={{ position: 'relative', fontSize: '0.82rem' }}>
                        <div style={{ 
                          position: 'absolute', 
                          left: '-1.725rem', 
                          top: '4px', 
                          width: isLatest ? '10px' : '8px', 
                          height: isLatest ? '10px' : '8px', 
                          borderRadius: '50%', 
                          background: isLatest ? 'var(--green)' : 'var(--muted)',
                          border: isLatest ? '2px solid rgba(10, 173, 110, 0.25)' : 'none',
                          boxSizing: 'content-box',
                          zIndex: 2
                        }} />
                        <div className="tc-timeline-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                          <span style={{ fontWeight: isLatest ? 700 : 600, color: isLatest ? 'var(--green)' : 'var(--ink)' }}>
                            {cleanData.title}
                          </span>
                          <span className="tc-timeline-time" style={{ fontSize: '0.68rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                            {checkpoint.time ? new Date(checkpoint.time).toLocaleDateString([], {month: 'short', day: 'numeric'}) + ' ' + new Date(checkpoint.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                          </span>
                        </div>
                        {cleanData.desc && (
                          <p style={{ color: 'var(--muted)', margin: '0.15rem 0 0', fontSize: '0.75rem', lineHeight: 1.35 }}>
                            {cleanData.desc}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div style={{ padding: '0.75rem 1rem', background: 'var(--bg)', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.4 }}>
                  🚚 <strong>Manifest Registered:</strong> Your tracking sticker has been successfully linked. Shipment is packed and awaiting loading scans at the local terminal depot.
                </div>
              )
            ) : (
              <div style={{ padding: '0.75rem 1rem', background: 'var(--bg)', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.4 }}>
                📦 <strong>Order Processing:</strong> Your signal hardware items are being prepared. Live milestones will populate as soon as the carrier vehicle registers the entry manifest barcode scan.
              </div>
            )}
          </div>

          {/* RIGHT SIDE DETAILS COLUMN PANELS */}
          <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* LIVE COURIER BRANCH INFRASTRUCTURE DETAILS CARD */}
            {order.tracking_number && historyLogs.length > 0 && matchedBranch && (
              <div className="tc-card" style={{ background: 'white', borderRadius: 12, border: '2px solid var(--green)', padding: '1rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--green)', marginBottom: '0.5rem', borderBottom: '1px solid var(--bg)', paddingBottom: '0.25rem', letterSpacing: '0.03em' }}>
                  {isDelivered ? "🎉 Delivering Hub Facility" : "📍 Current Handling Branch"}
                </div>
                <div style={{ fontSize: '0.8rem', lineHeight: 1.4, color: 'var(--slate)' }}>
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.7rem' }}>Courier Partner</span>
                  <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: '0.25rem' }}>Fardar Express Domestic</strong>
                  
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.7rem', marginTop: '0.4rem' }}>Station Location</span>
                  <strong style={{ color: 'var(--ink)' }}>Fardar {matchedBranch.name} Branch</strong>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.1rem', color: 'var(--slate)' }}>{matchedBranch.address}</div>
                  
                  <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.7rem', marginTop: '0.4rem' }}>Branch Contact Hotline</span>
                  <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '0.78rem', marginTop: '0.05rem' }}>📞 {matchedBranch.phone}</div>
                </div>
              </div>
            )}

            {/* SHIPPING PROFILE COMPONENT */}
            <div className="tc-card" style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem', borderBottom: '1px solid var(--bg)', paddingBottom: '0.25rem' }}>
                Delivery Destination
              </div>
              <div style={{ fontSize: '0.8rem', lineHeight: 1.4, color: 'var(--slate)' }}>
                <strong style={{ color: 'var(--ink)' }}>{order.customer_name}</strong>
                <div style={{ marginTop: '0.15rem' }}>{order.customer_address}</div>
                <div style={{ fontWeight: 600 }}>{order.customer_district} District</div>
                <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--muted)' }}>📞 Contact Number: {order.customer_phone1}</div>
              </div>
            </div>

            {/* ACCOUNTING TRANSACTIONS COMPONENT */}
            <div className="tc-card" style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem', borderBottom: '1px solid var(--bg)', paddingBottom: '0.25rem' }}>
                Receipt Breakdown
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}><span>Method</span><span style={{ fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase' }}>{order.payment_method}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}><span>Shipping</span><span>{formatLKR(order.delivery_charge || 0)}</span></div>
                {order.discount_applied > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#0D9B6A', fontWeight: 600 }}><span>Discount</span><span>-{formatLKR(order.discount_applied)}</span></div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-light)', marginTop: '0.35rem', paddingTop: '0.35rem', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--ink)' }}>
                  <span>Grand Total</span><span style={{ color: 'var(--green)' }}>{formatLKR(order.grand_total)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RESET CONTROL LINK */}
        <button 
          onClick={() => { setHasSearched(false); setOrder(null); setSearchQuery(''); }} 
          className="btn btn-ghost" 
          style={{ width: 'fit-content', margin: '0.5rem auto 0', fontSize: '0.78rem', padding: '0.5rem 1rem' }}
        >
          &larr; Track Another Package
        </button>

      </div>
    )
  }

  return (
    <>
      {/* ── 📱 HIGH INTENSITY RESPONSIVE MOBILE OVERRIDE STYLE ENGINE ── */}
      <style>{`
        @media (max-width: 576px) {
          .tc-section {
            padding: 1.5rem 1rem 3rem !important;
          }
          .tc-card {
            padding: 1.25rem 1rem !important;
          }
          .tc-search-form {
            flex-direction: column !important;
          }
          .tc-search-form input, 
          .tc-search-form button {
            width: 100% !important;
            flex: none !important;
          }
          .tc-meta-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
          .tc-meta-divider {
            display: none !important;
          }
          .tc-meta-date {
            display: block !important;
            margin-top: 0.15rem !important;
          }
          .tc-main-grid {
            gap: 0.75rem !important;
          }
          .tc-timeline-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.15rem !important;
          }
          .tc-timeline-time {
            white-space: normal !important;
            display: block !important;
            font-size: 0.7rem !important;
            margin-top: 0.05rem !important;
          }
        }
      `}</style>

      <Nav />
      <div style={{ paddingTop: '5.5rem', minHeight: '85vh', background: 'var(--bg)' }}>
        <section className="tc-section" style={{ padding: '3rem 0 5rem' }}>
          <div className="container-sm" style={{ maxWidth: '640px' }}>
            
            {!hasSearched || loading || !order ? renderSearchForm() : renderOrderDetails()}
            
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}