export default function Header({ view }) {
  return (
    <header className="masthead">
      <div className="masthead-name">
        <a className="wordmark" href="#/">Forage &amp; Heal</a>
        <span className="strapline">a Minnesota field guide</span>
      </div>
      <nav className="masthead-nav" aria-label="Sections">
        <a href="#/" className="smallcaps" aria-current={view === 'plates' ? 'page' : undefined}>Species</a>
        <a href="#/calendar" className="smallcaps" aria-current={view === 'calendar' ? 'page' : undefined}>Harvest calendar</a>
      </nav>
    </header>
  );
}
