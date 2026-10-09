export default function Header({ view, onSearch }) {
  return (
    <header className="masthead">
      <div className="masthead-name">
        <a className="wordmark" href="#/">Forage &amp; Heal</a>
        <span className="strapline">a Minnesota field guide</span>
      </div>
      <nav className="masthead-nav" aria-label="Sections">
        <a href="#/" className="smallcaps" aria-current={view === 'plates' ? 'page' : undefined}>Species</a>
        <a href="#/calendar" className="smallcaps" aria-current={view === 'calendar' ? 'page' : undefined}>Harvest calendar</a>
        <button type="button" className="smallcaps masthead-search" onClick={onSearch}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M15.5 15.5 21 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Search
        </button>
      </nav>
    </header>
  );
}
