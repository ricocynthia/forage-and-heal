import { useState } from 'react';
import { MONTHS, inSeason, namedParts } from '../data/harvest';
import { slugify } from '../lib/text';
import KindFilter from './KindFilter';
import { Drawing } from './Plates';

// What a month's cell stands for: null when out of season, otherwise the parts to gather
// (an empty label for mushrooms, which are gathered whole).
const cellKey = (item, month) => (inSeason(item.name, month) ? namedParts(item.name, month).join(', ') : null);

export default function Calendar({ data, thisMonth, kind, onKind }) {
  const [month, setMonth] = useState(thisMonth);
  const ready = data.filter((item) => inSeason(item.name, month)).length;
  const rows = data.filter((item) => kind === 'All' || item.category === kind);

  return (
    <>
      <section className="calendar-head">
        <div>
          <h1>The harvest year</h1>
          <p className="opening-list">
            {ready} of the {data.length} can be gathered in {MONTHS[month - 1]}. Pick a month to look ahead.
          </p>
        </div>
        <KindFilter kind={kind} onChange={onKind} total={data.length} />
      </section>

      <section className="calendar-scroll">
        <div className="calendar">
          <div className="calendar-row calendar-months">
            <span />
            {MONTHS.map((name, i) => (
              <button key={name} type="button" className="smallcaps" aria-label={`Show ${name}`} aria-pressed={month === i + 1} onClick={() => setMonth(i + 1)}>
                {name.slice(0, 3)}
              </button>
            ))}
          </div>

          {rows.map((item) => (
            <div className={`calendar-row${inSeason(item.name, month) ? '' : ' is-resting'}`} key={item.name}>
              <a className="calendar-name" href={`#/species/${slugify(item.name)}`}>
                <Drawing name={item.name} className="calendar-thumb" />
                <span>{item.name}</span>
              </a>
              {MONTHS.map((name, i) => {
                const m = i + 1;
                const key = cellKey(item, m);
                const selected = m === month ? ' is-selected' : '';
                if (key === null) return <span key={name} className={`cell${selected}`} />;
                const start = m === 1 || cellKey(item, m - 1) !== key;
                const end = m === 12 || cellKey(item, m + 1) !== key;
                const kindClass = item.category === 'Mushroom' ? ' is-mushroom' : ' is-plant';
                return (
                  <span key={name} className={`cell is-on${kindClass}${selected}${start ? ' is-start' : ''}${end ? ' is-end' : ''}${start && end ? ' is-solo' : ''}`}>
                    {start ? key : ''}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <div className="calendar-key">
        <span><i className="swatch is-plant" />plant part to gather</span>
        <span><i className="swatch is-mushroom" />mushroom fruiting</span>
        <span>Months are approximate for Minnesota. Weather moves them a few weeks either way.</span>
      </div>
    </>
  );
}
