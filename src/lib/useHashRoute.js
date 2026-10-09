import { useEffect, useState } from 'react';

// Hash routes keep deep links working on GitHub Pages without a server:
//   #/                 species plates
//   #/calendar         harvest calendar
//   #/species/<slug>   one entry
const read = () => {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'calendar') return { view: 'calendar' };
  if (parts[0] === 'species' && parts[1]) return { view: 'entry', slug: decodeURIComponent(parts[1]) };
  return { view: 'plates' };
};

export default function useHashRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
