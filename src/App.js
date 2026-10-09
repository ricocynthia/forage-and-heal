import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Entry from './components/Entry';
import Footer from './components/Footer';
import Header from './components/Header';
import Plates from './components/Plates';
import { slugify } from './lib/text';
import useHashRoute from './lib/useHashRoute';

const API_URL = 'https://botanica-production.up.railway.app/forageables';

export default function ForageAndHeal() {
  const route = useHashRoute();
  const [raw, setRaw] = useState([]);
  const [status, setStatus] = useState('loading');
  const [search, setSearch] = useState('');
  const [kind, setKind] = useState('All');
  const [focusSearch, setFocusSearch] = useState(0);
  const month = new Date().getMonth() + 1;

  const load = useCallback(() => {
    setStatus('loading');
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`The guide answered with ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setRaw(json.forageables || []);
        setStatus('ready');
      })
      .catch((err) => {
        console.error('Failed to fetch forageables:', err);
        setStatus('failed');
      });
  }, []);

  useEffect(() => { load(); }, [load]);

  // The Search button in the masthead works from any page: go to the plates, then put the cursor in the box.
  const goToSearch = () => {
    if (route.view !== 'plates') window.location.hash = '#/';
    setFocusSearch((n) => n + 1);
  };

  // Plants first, then mushrooms, numbered like figures on a plate.
  const data = useMemo(() => {
    const ordered = [...raw.filter((item) => item.category !== 'Mushroom'), ...raw.filter((item) => item.category === 'Mushroom')];
    return ordered.map((item, i) => ({ ...item, properties: item.properties || [], fig: i + 1 }));
  }, [raw]);

  const entry = route.view === 'entry' ? data.find((item) => slugify(item.name) === route.slug) : null;

  let page;
  if (status === 'loading') {
    page = <p className="notice">Laying out the plates…</p>;
  } else if (status === 'failed') {
    page = (
      <div className="notice">
        <p>The guide could not be loaded. Check your connection and try again.</p>
        <button type="button" className="smallcaps text-button" onClick={load}>Try again</button>
      </div>
    );
  } else if (route.view === 'calendar') {
    page = <Calendar data={data} thisMonth={month} kind={kind} onKind={setKind} />;
  } else if (route.view === 'entry') {
    page = entry
      ? <Entry item={entry} />
      : <div className="notice"><p>That species is not in the guide.</p><a className="text-link" href="#/">Back to all species</a></div>;
  } else {
    page = <Plates data={data} month={month} search={search} onSearch={setSearch} kind={kind} onKind={setKind} focusSearch={focusSearch} />;
  }

  return (
    <div className="page">
      <Header view={route.view} onSearch={goToSearch} />
      <main>{page}</main>
      <Footer />
    </div>
  );
}
