export default function About() {
  return (
    <main className="section-padding">
      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '3rem' }}>Our <span className="text-silver">Heritage</span></h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: '2', marginBottom: '4rem' }}>
            Aura Silver was born from a desire to combine the raw beauty of earth's gemstones with the refined elegance of sterling silver. 
            Each piece is more than just jewelry—it's a testament to the artisan's touch and the timeless nature of noble metals.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The <span className="text-silver">925</span> Standard</h2>
            <p style={{ opacity: 0.7, lineHeight: '1.8' }}>
              We use only .925 sterling silver, an alloy of 92.5% pure silver and 7.5% copper. This ensures the perfect balance of brilliant luster and enduring strength, allowing your pendant to last for generations.
            </p>
          </div>
          <div className="glass" style={{ height: '400px', background: '#121214' }}>
            <img 
               src="/images/WhatsApp Image 2026-03-31 at 2.19.58 PM (1).jpeg" 
               alt="Silver Detail" 
               style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '6rem', alignItems: 'center' }}>
          <div className="glass" style={{ height: '400px', background: '#121214', order: 2 }}>
            <img 
               src="/images/WhatsApp Image 2026-03-31 at 2.19.59 PM (2).jpeg" 
               alt="Gemstone Detail" 
               style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            />
          </div>
          <div style={{ order: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Real <span className="text-silver">Earth</span> Gems</h2>
            <p style={{ opacity: 0.7, lineHeight: '1.8' }}>
              Every gemstone is hand-selected for its clarity, color, and character. We believe in the natural imperfections and unique energy that only real, earth-mined stones can provide. No synthetics. No imitations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
