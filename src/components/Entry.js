import { HARVEST, MONTHS } from '../data/harvest';
import { capitalize, tidy } from '../lib/text';
import FieldPhotos from './FieldPhotos';
import { Drawing } from './Plates';

function Facts({ item }) {
  const facts = [
    ['Where it grows', item.habitat],
    ['Parts used', item.parts],
    ['Ways to use it', item.uses],
    ['Known for', (item.properties || []).join(', ')],
  ].filter(([, value]) => value);
  return (
    <dl className="facts">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt className="smallcaps">{label}</dt>
          <dd>{tidy(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

function GatherStrips({ item }) {
  const parts = HARVEST[item.name];
  if (!parts) return item.season ? <p className="prose">{tidy(item.season)}</p> : null;
  const wash = item.category === 'Mushroom' ? 'is-mushroom' : 'is-plant';
  return (
    <div className="strips">
      <div className="strip strip-months smallcaps" aria-hidden="true">
        <span />
        {MONTHS.map((name) => <span key={name}>{name.charAt(0)}</span>)}
      </div>
      {Object.keys(parts).map((part) => {
        const months = parts[part];
        const named = months.map((m) => MONTHS[m - 1]).join(', ');
        return (
          <div className="strip" key={part} role="img" aria-label={`${capitalize(part)}: ${named}`}>
            <span className="strip-name">{capitalize(part)}</span>
            {MONTHS.map((name, i) => {
              const m = i + 1;
              if (!months.includes(m)) return <span key={name} className="cell" />;
              const start = m === 1 || !months.includes(m - 1);
              const end = m === 12 || !months.includes(m + 1);
              return <span key={name} className={`cell is-on ${wash}${start ? ' is-start' : ''}${end ? ' is-end' : ''}`} />;
            })}
          </div>
        );
      })}
      {item.season && <p className="strip-note">{tidy(item.season)}</p>}
    </div>
  );
}

function Prose({ title, text }) {
  if (!text) return null;
  return (
    <section className="prose-block">
      <h2>{title}</h2>
      <p className="prose">{tidy(text)}</p>
    </section>
  );
}

export default function Entry({ item }) {
  const plateNumber = item.category === 'Mushroom' ? 'II' : 'I';
  const funFact = item.funFact || item.fun_fact;

  return (
    <>
      <article className="entry">
        <header className="entry-head">
          <h1>{item.name}</h1>
          {item.tagline && <p className="entry-tagline">{tidy(item.tagline)}.</p>}
        </header>

        <figure className="entry-plate">
          <Drawing name={item.name} />
          <figcaption><span className="smallcaps">Plate {plateNumber}, Fig. {item.fig}.</span> <em>{item.name}.</em></figcaption>
          <Facts item={item} />
        </figure>

        <div className="entry-text">
          {item.warnings && (
            <section className="caution" aria-label="Safety">
              <h2 className="smallcaps">Take care</h2>
              <p>{tidy(item.warnings)}</p>
            </section>
          )}

          <section className="prose-block">
            <h2>When to gather it</h2>
            <GatherStrips item={item} />
          </section>

          <Prose title="How to harvest it" text={item.harvesting} />
          <Prose title="How to recognize it" text={item.identification} />
          <Prose title="Storing it" text={item.storage} />

          {funFact && (
            <section className="from-the-book">
              <div className="smallcaps">From the book</div>
              <p>{tidy(funFact)}</p>
            </section>
          )}
        </div>
      </article>

      <FieldPhotos item={item} />

      <p><a className="text-link" href="#/">Back to all species</a></p>
    </>
  );
}
