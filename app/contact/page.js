export default function Contact() {
  return (
    <main className="section-padding">
      <div className="container" style={{ marginTop: '4rem', maxWidth: '800px' }}>
        <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>Inquiry</h1>
          <p style={{ opacity: 0.6, letterSpacing: '0.2rem', textTransform: 'uppercase' }}>Connect with our artisan team</p>
        </header>

        <form className="glass" style={{ padding: '4rem', borderRadius: '4px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.1rem' }}>FULL NAME</label>
              <input type="text" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', padding: '1rem 0', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.1rem' }}>EMAIL ADDRESS</label>
              <input type="email" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', padding: '1rem 0', color: 'white', outline: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
            <label style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.1rem' }}>MESSAGE</label>
            <textarea rows="4" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', padding: '1rem 0', color: 'white', outline: 'none', resize: 'none' }}></textarea>
          </div>

          <button className="btn-premium" style={{ width: '100%', padding: '1.5rem' }}>Send Inquiry</button>
        </form>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '6rem', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem', letterSpacing: '0.1rem' }}>EMAIL</p>
            <p>hello@aurasilver.com</p>
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem', letterSpacing: '0.1rem' }}>STUDIO</p>
            <p>London, UK</p>
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem', letterSpacing: '0.1rem' }}>SOCIAL</p>
            <p>@aura_silver</p>
          </div>
        </div>
      </div>
    </main>
  );
}
