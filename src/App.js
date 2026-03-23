import { useState, useMemo, useEffect } from "react";
import { emojiMap } from "./helpers/emojiMap";

const categories = ["All", "Plant", "Mushroom"];
const categoryColors = {
  Plant: { bg: "#e4edd8", text: "#3a5a2a" },
  Mushroom: { bg: "#f0e6d8", text: "#6b3a1f" },
};

function Badge({ category }) {
  const c = categoryColors[category] || { bg: "#eee", text: "#333" };
  return <span style={{ background: c.bg, color: c.text, fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "100px" }}>{category}</span>;
}

function Tag({ label }) {
  return <span style={{ background: "#f0f4eb", color: "#4a7c59", fontSize: "0.72rem", padding: "3px 10px", borderRadius: "100px", border: "1px solid #d0ddc8" }}>{label}</span>;
}

function InfoBlock({ label, value }) {
  return (
    <div style={{ background: "#fff", borderRadius: "10px", padding: "0.75rem 1rem" }}>
      <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7a8c72", marginBottom: "0.35rem" }}>{label}</div>
      <div style={{ fontSize: "0.88rem", color: "#3a4f3c", lineHeight: 1.7 }}>{value}</div>
    </div>
  );
}

function Card({ item, onClick }) {
  return (
    <div onClick={() => onClick(item)}
      style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: "16px", padding: "1.5rem", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", display: "flex", flexDirection: "column", gap: "0.75rem" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(90,122,74,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: "2rem" }}>{emojiMap[item.name] || "🌿"}</span>
        <Badge category={item.category} />
      </div>
      <div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: "#1c2b1e", marginBottom: "0.2rem" }}>{item.name}</div>
        <div style={{ fontSize: "0.82rem", color: "#7a8c72", fontStyle: "italic" }}>{item.tagline}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {item.properties.slice(0, 3).map(p => <Tag key={p} label={p} />)}
        {item.properties.length > 3 && <span style={{ fontSize: "0.72rem", color: "#7a8c72", padding: "3px 6px" }}>+{item.properties.length - 3} more</span>}
      </div>
      <div style={{ fontSize: "0.78rem", color: "#7a8c72", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid #f0ebe0" }}>
        🗓 {item.season}
      </div>
    </div>
  );
}

function Modal({ item, onClose }) {
  if (!item) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(28,43,30,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 1000 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#f7f3ec", borderRadius: "20px", padding: "2rem", maxWidth: "560px", width: "100%", maxHeight: "85vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: "2.5rem" }}>{emojiMap[item.name] || "🌿"}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#7a8c72", padding: "4px 8px" }}>✕</button>
        </div>
        <div>
          <Badge category={item.category} />
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, color: "#1c2b1e", margin: "0.5rem 0 0.25rem" }}>{item.name}</h2>
          <p style={{ fontSize: "0.9rem", color: "#7a8c72", fontStyle: "italic" }}>{item.tagline}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {item.properties.map(p => <Tag key={p} label={p} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <InfoBlock label="Habitat" value={item.habitat} />
          <InfoBlock label="Season" value={item.season} />
          <div style={{ gridColumn: "1/-1" }}><InfoBlock label="Parts used" value={item.parts} /></div>
          <div style={{ gridColumn: "1/-1" }}><InfoBlock label="Methods of use" value={item.uses} /></div>
        </div>
        <InfoBlock label="How to identify" value={item.identification} />
        <InfoBlock label="How to harvest" value={item.harvesting} />
        <InfoBlock label="How to store" value={item.storage} />
        {item.warnings && (
          <div style={{ background: "#fff8f0", borderRadius: "10px", padding: "0.75rem 1rem", border: "1px solid #f0d8c0" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8733a", marginBottom: "0.35rem" }}>Safety notes</div>
            <div style={{ fontSize: "0.85rem", color: "#6b3a1f", lineHeight: 1.7 }}>{item.warnings}</div>
          </div>
        )}
        {item.funFact && (
          <div style={{ background: "#e4edd8", borderRadius: "10px", padding: "0.75rem 1rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3a5a2a", marginBottom: "0.35rem" }}>Fun fact</div>
            <div style={{ fontSize: "0.85rem", color: "#2d4a2a", lineHeight: 1.7, fontStyle: "italic" }}>{item.funFact}</div>
          </div>
        )}
        <p style={{ fontSize: "0.72rem", color: "#7a8c72", textAlign: "center", marginTop: "0.5rem" }}>
          Content from <em>Nature's Cookbook</em> by Cynthia Rico Cook et al. — not medical advice.
        </p>
      </div>
    </div>
  );
}

export default function ForageAndHeal() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://botanica-production.up.railway.app/forageables")
      .then(res => res.json())
      .then(json => {
        setData(json.forageables || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch forageables:", err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => data.filter(item => {
    const matchCat = category === "All" || item.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || item.name.toLowerCase().includes(q) ||
      item.properties.some(p => p.toLowerCase().includes(q)) ||
      item.uses.toLowerCase().includes(q) || item.tagline.toLowerCase().includes(q) ||
      item.habitat.toLowerCase().includes(q);
    return matchCat && matchSearch;
  }), [data, search, category]);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Jost', system-ui, sans-serif" }}>

      {/* HEADER */}
      <div style={{ background: "#2d4a35", padding: "3rem 2rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "12rem", opacity: 0.04, lineHeight: 1 }}>❧</div>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌿</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#f0f4eb", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>Forage & Heal</h1>
        <p style={{ color: "rgba(240,244,235,0.5)", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Minnesota Field Guide</p>
        <p style={{ color: "rgba(240,244,235,0.65)", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
          A reference guide to wild plants and medicinal mushrooms found in Minnesota. Content from <em>Nature's Cookbook</em> by Cynthia Rico Cook et al.
        </p>
        <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
          <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", opacity: 0.5 }}>🔍</span>
          <input type="text" placeholder="Search by name or property (e.g. immune, sleep, liver)..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "0.85rem 1rem 0.85rem 2.75rem", borderRadius: "100px", border: "none", fontSize: "0.9rem", background: "rgba(255,255,255,0.12)", color: "#f0f4eb", outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", padding: "1.25rem 1rem", flexWrap: "wrap", background: "#f0ebe0", borderBottom: "1px solid #e0d8cc" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            padding: "0.45rem 1.25rem", borderRadius: "100px",
            border: category === cat ? "none" : "1px solid #c8b8a0",
            background: category === cat ? "#4a7c59" : "transparent",
            color: category === cat ? "#fff" : "#5a7a4a",
            fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.15s",
          }}>
            {cat === "All" ? `All (${data.length})` : `${cat}s (${data.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* RESULTS COUNT */}
      <div style={{ padding: "1.25rem 2rem 0.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.8rem", color: "#7a8c72", letterSpacing: "0.05em" }}>
          {loading ? "Loading..." : `${filtered.length} ${filtered.length === 1 ? "result" : "results"}${search ? ` for "${search}"` : ""}${category !== "All" ? ` in ${category}s` : ""}`}
        </p>
      </div>

      {/* GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem", padding: "1rem 2rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        {loading ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem 0", color: "#7a8c72" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌿</div>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.1rem" }}>Gathering from the forest...</p>
          </div>
        ) : filtered.length > 0
          ? filtered.map(item => <Card key={item.id} item={item} onClick={setSelected} />)
          : (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem 0", color: "#7a8c72" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌱</div>
              <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.1rem" }}>Nothing found for "{search}"</p>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Try "immune", "sleep", "digestive", or "liver"</p>
            </div>
          )
        }
      </div>

      <Modal item={selected} onClose={() => setSelected(null)} />

      {/* FOOTER */}
      <div style={{ background: "#2d4a35", color: "rgba(240,244,235,0.5)", textAlign: "center", padding: "1.5rem", fontSize: "0.78rem", letterSpacing: "0.05em" }}>
        Built with 🌿 by Cynthia Rico Cook &nbsp;·&nbsp; Content from Nature's Cookbook &nbsp;·&nbsp; Not medical advice
      </div>

    </div>
  );
}