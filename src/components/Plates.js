import { MONTHS, inSeason, namedParts } from '../data/harvest';
import { plateFor } from '../lib/media';
import { capitalize, joinWords, slugify, tidy } from '../lib/text';
import KindFilter from './KindFilter';

const PLATES = [
  ['Plant', 'Plate I. Plants', 'wild herbs, with the part to gather'],
  ['Mushroom', 'Plate II. Mushrooms', 'medicinal and edible fungi'],
];

function Drawing({ name, className }) {
  const src = plateFor(name);
  if (!src) return <div className={`drawing drawing-missing ${className || ''}`} aria-hidden="true" />;
  return <img className={`drawing ${className || ''}`} src={src} alt={`Ink and watercolor drawing of ${name}`} loading="lazy" />;
}

function matches(item, needle) {
  if (!needle) return true;
  const haystack = [item.name, item.tagline, item.habitat, item.uses, item.season, ...(item.properties || [])].join(' ').toLowerCase();
  return haystack.includes(needle);
}

export default function Plates({ data, month, search, onSearch, kind, onKind }) {
  const ready = data.filter((item) => inSeason(item.name, month));
  const phrases = ready.map((item) => {
    const parts = namedParts(item.name, month);
    return item.name.toLowerCase() + (parts.length ? ` ${joinWords(parts)}` : '');
  });
  const heroLine = phrases.length
    ? `${capitalize(phrases.join(', '))}.`
    : 'Nothing in this guide is ready this month. A good time for reading ahead.';

  // One plant and two mushrooms when the season allows, so the opening shows both plates.
  const readyPlants = ready.filter((item) => item.category === 'Plant');
  const readyMushrooms = ready.filter((item) => item.category === 'Mushroom');
  const featured = [...readyPlants.slice(0, 1), ...readyMushrooms.slice(1, 3)];
  ready.forEach((item) => {
    if (featured.length < 3 && !featured.includes(item)) featured.push(item);
  });

  const needle = search.trim().toLowerCase();
  const shown = data.filter((item) => (kind === 'All' || item.category === kind) && matches(item, needle));
  const plates = PLATES.map(([category, title, note]) => ({
    title,
    note,
    figures: shown.filter((item) => item.category === category),
  })).filter((plate) => plate.figures.length);

  return (
    <>
      <section className="opening">
        <div className="opening-text">
          <h1>Ready to gather in {MONTHS[month - 1]}</h1>
          <p className="opening-list">{heroLine}</p>
          <p><a className="text-link" href="#/calendar">See the whole harvest year</a></p>
        </div>
        {featured.length > 0 && (
          <div className="opening-plates">
            {featured.map((item) => {
              const parts = namedParts(item.name, month);
              return (
                <a key={item.name} href={`#/species/${slugify(item.name)}`}>
                  <Drawing name={item.name} />
                  <span className="figure-name">{item.name}</span>
                  <span className="figure-now">{parts.length ? joinWords(parts) : tidy(item.season).toLowerCase()}</span>
                </a>
              );
            })}
          </div>
        )}
      </section>

      <section className="caution" aria-label="Safety">
        <h2 className="smallcaps">Check every find twice</h2>
        <p>
          Several of these have toxic lookalikes or toxic parts. Each entry opens with its warning. Confirm with a
          second guide or a local expert before you eat anything.
        </p>
      </section>

      <section className="plates">
        <div className="plates-tools">
          <KindFilter kind={kind} onChange={onKind} total={data.length} />
          <div className="find">
            <label htmlFor="find" className="smallcaps">Find</label>
            <input
              id="find"
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="a name, or a use like sleep or liver"
            />
          </div>
        </div>

        {plates.map((plate) => (
          <div className="plate" key={plate.title}>
            <div className="plate-title">
              <h2>{plate.title}</h2>
              <span>{plate.note}</span>
            </div>
            <div className="figures">
              {plate.figures.map((item) => {
                const now = inSeason(item.name, month);
                const parts = namedParts(item.name, month);
                return (
                  <a className="figure" key={item.name} href={`#/species/${slugify(item.name)}`}>
                    <Drawing name={item.name} />
                    <span className="figure-number smallcaps">Fig. {item.fig}</span>
                    <span className="figure-name">{item.name}</span>
                    {now && <span className="figure-now">Ready now{parts.length ? `: ${joinWords(parts)}` : ''}</span>}
                    <span className="figure-season">{tidy(item.season)}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}

        {plates.length === 0 && (
          <p className="nothing">
            Nothing here matches “{search}”. Try a use like immune, sleep or liver.
          </p>
        )}
      </section>
    </>
  );
}

export { Drawing };
