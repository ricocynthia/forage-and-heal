import { useState, useMemo } from "react";

const data = [
  // PLANTS
  {
    id: 1, name: "Burdock", category: "Plant", emoji: "🌿",
    tagline: "A common ingredient in root beer recipes",
    properties: ["Antibacterial", "Anti-cancer", "Anti-fungal", "Antioxidant", "Liver support", "Immune support", "Hormone balance"],
    habitat: "Roadsides, woodland edges, disturbed soils",
    season: "Roots in fall, leaves in spring, seeds in fall/winter",
    parts: "Roots, leaves, seeds",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Large fuzzy triangular leaves with wavy edges. Purple thistle-like flowers in summer that develop into brown burrs in fall. Can grow 4–10 feet tall.",
    harvesting: "Roots: Loosen soil, grip base and gently pull. Leaves: Cut healthy leaves closest to base. Seeds: Harvest when burrs form Velcro-like hooks.",
    storage: "Roots: Scrub clean, cut to size, dry thoroughly, store in airtight container away from sunlight. Leaves & seeds: Dry thoroughly and store in airtight container away from sunlight.",
    warnings: "Avoid in large amounts during pregnancy.",
    funFact: "Burdock is a common ingredient in traditional root beer recipes.",
  },
  {
    id: 2, name: "Catnip", category: "Plant", emoji: "🌱",
    tagline: "Not just for cats — a powerful calming herb",
    properties: ["Anti-inflammatory", "Sleep aid", "Digestive support", "Fever reducer", "Anxiety relief", "Headache relief"],
    habitat: "Gardens, roadsides, woodland edges",
    season: "When flowers are in full bloom",
    parts: "Leaves, flowers",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Grows 9 inches to 3 feet tall. Coarse fuzzy gray-green to medium green heart-shaped leaves with scalloped edges. Sturdy hairy stems. Small clusters of lavender flowers with a minty aromatic smell.",
    harvesting: "Leaves: Cut stems with sharp scissors, leaving about 3 inches. Flowers: Remove the flowering top of the stem with scissors.",
    storage: "Leaves: Rinse, dry, pinch from stem, store in airtight container. Flowers: Dry thoroughly and store away from sunlight.",
    warnings: "Generally safe. Use with caution during pregnancy.",
    funFact: "Catnip can be used in veterinary clinics and shelters to help lower cats' stress levels.",
  },
  {
    id: 3, name: "Dandelion", category: "Plant", emoji: "🌼",
    tagline: "The lion's tooth — medicine hiding in plain sight",
    properties: ["Antibacterial", "Anti-cancer", "Anti-inflammatory", "Antiviral", "Diuretic", "Liver cleanser", "Blood purifier"],
    habitat: "Lawns, meadows, roadsides — almost everywhere",
    season: "Roots in fall, leaves in early spring, flowers in spring/early summer",
    parts: "Roots, leaves, flowers",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Grows up to a foot high with a deep tap root. Yellow flower head of florets blooms April to June. Elongated leaves with highly jagged edges growing from the base.",
    harvesting: "Roots: Loosen soil and pull from base. Leaves: Cut with scissors leaving 3 inches. Flowers: Cut the flowering top with scissors.",
    storage: "Roots: Scrub, cut, dry thoroughly, store in airtight container. Leaves & flowers: Dry thoroughly and store away from sunlight.",
    warnings: "Generally very safe. Avoid large amounts if on blood thinners.",
    funFact: "Dandelion leaves have highly jagged edges said to resemble a lion's tooth — giving the plant its name.",
  },
  {
    id: 4, name: "Echinacea", category: "Plant", emoji: "💜",
    tagline: "Nature's immune booster — belongs to the daisy family",
    properties: ["Anti-fungal", "Antiviral", "Cold & flu relief", "Immune support", "Wound healing", "UTI treatment"],
    habitat: "Prairies, open woodlands, roadsides",
    season: "Roots in fall (2nd year+ plant), leaves in early spring, flowers when in full bloom",
    parts: "Roots, leaves, flowers",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Perennial herb 6–24 inches tall with woody tap root. Rough hairy stems with purple or green tinge. Narrow lance-shaped leaves with three distinct veins. Purple flower heads bloom in summer.",
    harvesting: "Roots: Loosen soil and gently pull. Leaves: Cut stems above lowest healthy leaf pairs. Flowers: Remove flowering top with scissors.",
    storage: "Roots: Scrub, cut, dry thoroughly, store in airtight container. Leaves: Rinse, pinch from stem, dry and store. Flowers: Dry thoroughly and store away from sunlight.",
    warnings: "Avoid if allergic to daisies. Not recommended for long-term continuous use.",
    funFact: "Echinacea belongs to the daisy family.",
  },
  {
    id: 5, name: "Elderberry", category: "Plant", emoji: "🫐",
    tagline: "Flower tea doubles as a gentle eye wash",
    properties: ["Anti-cancer", "Anti-inflammatory", "Antiviral", "Rich in antioxidants", "Immune support", "Cold & flu relief"],
    habitat: "Forest edges, roadsides, moist lowlands",
    season: "Flowers in early summer, leaves in spring, berries in early autumn when fully ripe",
    parts: "Flowers, leaves, berries",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Wide woody shrub up to 12 feet tall. Clusters of small white flowers turning into drooping purple fruit. Green bark when young, hardening with vertical furrows with age.",
    harvesting: "Flowers: Cut stem 1 inch above bloom cluster. Leaves: Firmly pinch from stem. Berries: Cut main stem 1 inch above berry cluster.",
    storage: "All parts: Rinse in cool water, dry thoroughly, store in airtight container away from sunlight.",
    warnings: "Never eat raw berries, leaves, bark, or roots — they are toxic. Always cook berries before consuming.",
    funFact: "Elderberry flower tea can be used as a gentle eye wash for eye irritations.",
  },
  {
    id: 6, name: "Goldenrod", category: "Plant", emoji: "🌾",
    tagline: "Leaves can be cooked and eaten like spinach",
    properties: ["Antibacterial", "Anti-fungal", "Anti-inflammatory", "Antiseptic", "Diuretic", "Kidney support", "Cardiovascular support"],
    habitat: "Meadows, roadsides, open sunny areas",
    season: "Leaves in spring/summer, flowers in summer",
    parts: "Leaves, flowers",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Grows 2–5 feet tall. Flowers about 1/4 inch wide in tight lengthy clusters. Leaves climb the plant with slightly jagged edges and smooth texture.",
    harvesting: "Leaves: Firmly pinch healthy leaves from stem. Flowers: Cut at base of stem holding the flowering head.",
    storage: "Leaves: Rinse, dry and store in airtight container. Flowers: Dry thoroughly and store away from sunlight.",
    warnings: "May cause allergic reactions in people sensitive to ragweed.",
    funFact: "Goldenrod leaves can be cooked and eaten like spinach.",
  },
  {
    id: 7, name: "Motherwort", category: "Plant", emoji: "🌸",
    tagline: "Lion's Tail — a powerful herb for heart and hormones",
    properties: ["Anti-inflammatory", "Sleep aid", "PMS relief", "Menopause support", "Heart health", "Anxiety relief"],
    habitat: "Roadsides, disturbed areas, woodland edges",
    season: "Leaves in spring/early summer, flowers end of summer/fall",
    parts: "Leaves, flowers",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Upright bush up to 6.5 feet tall. Opposite leaves resembling maple or oak. Square hairy stems. Pale pink-lavender flowers bloom June through early September.",
    harvesting: "Cut the top third of the stems including leaves and flowers.",
    storage: "Leaves: Rinse, dry, pinch from stem, store in airtight container. Flowers: Dry thoroughly and store away from sunlight.",
    warnings: "Avoid during pregnancy. May interact with heart medications.",
    funFact: "Motherwort's scientific name Leonurus is the Greek word for 'Lion's Tail', referring to its resemblance.",
  },
  {
    id: 8, name: "Mullein", category: "Plant", emoji: "🌿",
    tagline: "Nature's toilet paper — and a powerful lung herb",
    properties: ["Anti-cancer", "Anti-inflammatory", "Antiseptic", "Respiratory support", "Wound healing", "Earache treatment"],
    habitat: "Roadsides, disturbed ground, open sunny areas",
    season: "Leaves in spring/summer (2nd year most potent), flowers in late summer/early fall",
    parts: "Leaves, flowers",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Velvety soft plant with long large oval gray-green leaves up to 20 inches. Second year plant has erect flowering spike up to 8 feet tall with small yellow 5-petal flowers.",
    harvesting: "Leaves: Gently pull healthy leaves from stem. Flowers: Gently remove from stalks when in full bloom.",
    storage: "Leaves: Rinse, dry, store in airtight container. Flowers: Dry thoroughly and store away from sunlight.",
    warnings: "Generally safe. Fine leaf hairs may irritate throat if inhaled.",
    funFact: "Mullein is often referred to as 'nature's toilet paper' due to its large, soft leaves.",
  },
  {
    id: 9, name: "Stinging Nettle", category: "Plant", emoji: "🌿",
    tagline: "Blanch to remove the sting — then it's pure medicine",
    properties: ["Antihistamine", "Anti-inflammatory", "Diuretic", "Allergy relief", "Arthritis relief", "Anemia support", "Hair growth"],
    habitat: "Moist woodland edges, riverbanks, disturbed soils",
    season: "Leaves in early spring, roots in late fall",
    parts: "Roots, leaves",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Grows 3–8 feet tall. Soft green oval to occasionally heart-shaped leaves 1–4 inches long. Both leaves and stems have stinging and non-stinging hairs. Greenish-brown flowers in branched clusters June–September.",
    harvesting: "Always wear gloves! Leaves: Cut plant at nodes. Roots: Wear gloves and long sleeves, loosen soil and gently pull.",
    storage: "Leaves: Rinse, pinch from stem, dry and store in airtight container. Roots: Scrub, cut, dry thoroughly, store away from sunlight.",
    warnings: "Always wear gloves when harvesting — the sting is painful. Avoid large amounts during pregnancy.",
    funFact: "If blanched in hot water, the stinging hairs on nettles will no longer sting.",
  },
  {
    id: 10, name: "Yellow Dock", category: "Plant", emoji: "🌱",
    tagline: "Seeds can be pounded into flour",
    properties: ["Digestive support", "Skin health", "Cleansing", "High in iron", "Laxative", "Liver support", "Gallbladder support"],
    habitat: "Roadsides, fields, disturbed ground",
    season: "Leaves in spring, roots in early fall through winter",
    parts: "Seeds, roots, leaves",
    uses: "Tea, salves, tonics, tinctures, poultice, culinary",
    identification: "Flower stalks grow from base about 3 feet high with small green flowers in clusters. Coarse curly-edged leaves up to 2 feet long. Older leaves sometimes have red-tinged central veins.",
    harvesting: "Seeds: Rub clusters and let seeds fall into palm. Roots: Loosen soil and pull firmly. Leaves: Cut healthy leaves from base.",
    storage: "All parts: Dry thoroughly and store in airtight container in cool place away from sunlight.",
    warnings: "High in oxalates — use with caution if prone to kidney stones.",
    funFact: "Yellow dock seeds can be pounded into flour.",
  },

  // MUSHROOMS
  {
    id: 11, name: "Chaga", category: "Mushroom", emoji: "🍄",
    tagline: "Black on the outside, golden on the inside",
    properties: ["Anti-cancer", "Anti-inflammatory", "Antioxidant", "Immune support", "Heart health", "Liver support"],
    habitat: "Grows on birch trees in cold northern climates",
    season: "Year-round",
    parts: "The growth (conk)",
    uses: "Tea, tinctures",
    identification: "Grows on birch trees with black, charcoal-like appearance and crusty or cracked surface. Inside is a beautiful yellowish-gold color. Never harvest from dead or fallen trees — it will appear black inside and out and may be contaminated with mycotoxins.",
    harvesting: "Use a sharp knife or ax to cut into it. Leave a portion attached to help the tree and chaga survive longer for future harvests.",
    storage: "Chop into small pieces, air dry on a flat surface for a couple of days. Once dry, store in a jar.",
    warnings: "May interact with blood thinners and diabetes medication. High in oxalates. Never harvest dead chaga from fallen trees.",
    funFact: "The inside of fresh chaga is a beautiful yellowish-gold color, very different from its black exterior.",
  },
  {
    id: 12, name: "Morel", category: "Mushroom", emoji: "🍄",
    tagline: "A prized spring mushroom — use it fresh",
    properties: ["Anti-inflammatory", "Rich in antioxidants", "High in protein", "Rich in vitamin D", "Immune support"],
    habitat: "Woodlands and woody edges near sycamore, hickory, ash, and elm trees",
    season: "Spring to early summer",
    parts: "Cap and stem",
    uses: "Culinary",
    identification: "Honeycomb-like texture on cap. Tan to brown, ranging from beige to almost black depending on age. Very hollow stem making it lighter than the cap.",
    harvesting: "Pinch or cut the stem just above the soil to leave the base in the ground.",
    storage: "Use as soon as possible — best fresh. A good reminder to only forage what you need.",
    warnings: "Do not confuse with false morels. When in doubt, do not eat it.",
    funFact: "The morel's hollow stem makes it much lighter than its cap — a unique trait among mushrooms.",
  },
  {
    id: 13, name: "Maitake (Hen of the Woods)", category: "Mushroom", emoji: "🍄",
    tagline: "Resembles a hen's ruffled feathers",
    properties: ["Anti-inflammatory", "Antioxidant", "Blood sugar regulation", "Immune support"],
    habitat: "Base of oak trees and other hardwoods",
    season: "Late summer through late fall",
    parts: "Entire mushroom",
    uses: "Culinary — meat substitute",
    identification: "Grows in a cluster, ranging from a few inches to several feet in diameter. Resembles ruffled feathers of a hen. Brownish-gray to tan on top. Found at the base of oak or other hardwood trees.",
    harvesting: "Use a knife to cut off what you need from the top. Stems grow thick so cutting is easier than pulling.",
    storage: "Best cooked right away. Can refrigerate for up to one week. Only wash before use to prevent spoilage.",
    warnings: "Generally safe. Confirm identification carefully.",
    funFact: "Maitake means 'dancing mushroom' in Japanese — said to be named because people would dance with joy upon finding it.",
  },
  {
    id: 14, name: "Lion's Mane", category: "Mushroom", emoji: "🍄",
    tagline: "Food for the brain — looks like a cheerleader pom-pom",
    properties: ["Cognitive support", "Memory improvement", "Digestive support", "Cardiovascular support", "Immune support"],
    habitat: "Dead or dying hardwood trees like oak, maple, or beech",
    season: "Late summer through fall",
    parts: "Entire mushroom",
    uses: "Culinary, supplements",
    identification: "Round, spherical shape resembling a cheerleader pom-pom. White or cream colored. Can range from a few inches to over a foot in diameter. Found on dead or dying hardwood trees.",
    harvesting: "Wait until dry to harvest as it retains a lot of water. Cut the top with a knife, leaving the base attached so it can regrow.",
    storage: "Best fresh, but can refrigerate for up to one week. Use a brush to clean rather than water — it retains moisture.",
    warnings: "Generally very safe. Rare allergic reactions reported.",
    funFact: "Lion's mane got its nickname because of its fuzzy, furry appearance — similar to a lion's mane.",
  },
  {
    id: 15, name: "Oyster Mushroom", category: "Mushroom", emoji: "🍄",
    tagline: "Fan-shaped and delicate — beat the bugs to it",
    properties: ["High in protein", "Rich in vitamin B", "Immune boosting", "Anti-inflammatory", "Lowers cholesterol"],
    habitat: "Trees, logs, and stumps — commonly on beech and aspen",
    season: "Late spring through early summer",
    parts: "Cap",
    uses: "Culinary — grilling, roasting, sauteing, stir-frying, soups, meat substitute",
    identification: "Fan or oyster shaped, up to 10 inches across. White, gray, or brown with slightly velvety texture. Found growing on trees, logs, or stumps.",
    harvesting: "Cut the top off leaving the base attached. If you see lots of bugs and holes, leave it for the bugs.",
    storage: "Extremely delicate and spoils quickly. Use fresh. Can refrigerate for up to one week.",
    warnings: "Confirm identification carefully. Eat cooked, not raw.",
    funFact: "If you see lots of bugs and holes in the mushroom, it is no longer a good harvest — leave it for the bugs and try to beat them to it next time.",
  },
  {
    id: 16, name: "Cauliflower Mushroom", category: "Mushroom", emoji: "🍄",
    tagline: "Looks like lasagna noodles — found at the base of trees",
    properties: ["Anti-inflammatory", "Antioxidant", "Rich in potassium & magnesium", "Blood sugar support", "Immune support"],
    habitat: "Base of trees or tree roots",
    season: "Spring through late fall",
    parts: "Entire mushroom",
    uses: "Culinary — sauté, meat substitute, pasta dishes, soups and stews, grilled",
    identification: "Large irregular shape resembling lasagna noodles, 2–6 inches in diameter. Cream to pale yellowish or tan with firm meaty texture. Found at the base of a tree or tree roots.",
    harvesting: "Can sometimes pull out by hand keeping some of the base. If unsure, use a knife to cut off what you need.",
    storage: "Best eaten fresh. Can last about 3 days in the refrigerator.",
    warnings: "Confirm identification carefully before eating.",
    funFact: "Its irregular ruffled shape really does resemble a pile of lasagna noodles.",
  },
  {
    id: 17, name: "Chicken of the Woods", category: "Mushroom", emoji: "🍄",
    tagline: "Bright orange and bold — one of the easiest to identify",
    properties: ["Anti-inflammatory", "Antioxidant", "Rich in vitamin B", "Rich in potassium", "Immune support"],
    habitat: "Trunks of living, dead, or dying trees like oak and beech",
    season: "Late spring to late fall",
    parts: "Entire mushroom",
    uses: "Culinary — sauté, fried, grilled, roasted, soups, stews, meat substitute",
    identification: "Grows in clusters, few inches to over a foot in diameter. Bright orange-yellow color with smooth leathery texture. Found on oak and beech trunks.",
    harvesting: "Inspect for bugs first — lots of holes means leave it. Cut at the base. Clean by brushing off debris then rinsing in cold water.",
    storage: "Best eaten fresh. Can last up to a week in the refrigerator.",
    warnings: "Some people experience GI upset, especially in large quantities. Start with a small amount.",
    funFact: "Its bright orange-yellow color makes it one of the easiest wild mushrooms to identify confidently.",
  },
  {
    id: 18, name: "Chanterelle", category: "Mushroom", emoji: "🍄",
    tagline: "Golden and funnel-shaped — a prized find",
    properties: ["Anti-inflammatory", "Rich in antioxidants", "Rich in vitamin D", "Immune support", "Low in calories"],
    habitat: "Wooded areas, particularly near oak and pine trees",
    season: "Summer through fall",
    parts: "Cap and stem",
    uses: "Culinary — sauteed, soups, stews, pickled, grilled, roasted, omelets",
    identification: "Funnel-like shape with bright yellow to orange color. Cap 2–10 cm wide. Found growing in wooded areas near oak and pine.",
    harvesting: "Cut the stem near the base with a knife. Handle with care as they are fragile. Gently place in basket to avoid crushing.",
    storage: "Best used right away. Can refrigerate for up to 3–5 days.",
    warnings: "Can be confused with the toxic jack-o-lantern mushroom. Confirm identification carefully.",
    funFact: "Chanterelles are one of the most prized wild mushrooms in the world, featured in fine dining restaurants everywhere.",
  },
  {
    id: 19, name: "Giant Puffball", category: "Mushroom", emoji: "🍄",
    tagline: "Can grow over a foot wide — only harvest when pure white inside",
    properties: ["Anti-inflammatory", "Antioxidant", "Rich in fiber & protein", "Rich in vitamin C", "Immune support"],
    habitat: "Meadows, fields, woodland edges",
    season: "Late summer through fall",
    parts: "Entire mushroom",
    uses: "Culinary — sauteed, grilled, fried, meat substitute, soups",
    identification: "Large white round or slightly oval shape with smooth leathery texture. Can range over a foot in diameter. Must be pure white and firm inside — yellow or brown color means past prime.",
    harvesting: "Confirm still white and firm. Cut at base with sharp knife. Brush off debris. Slice and discard any discolored or soft sections.",
    storage: "Can refrigerate for a few days but best used immediately after harvest.",
    warnings: "Never eat if the inside is not pure white — discoloration means it is past its prime or potentially unsafe.",
    funFact: "A single giant puffball can contain trillions of spores — one of the most prolific spore producers in the mushroom world.",
  },
  {
    id: 20, name: "Turkey Tail", category: "Mushroom", emoji: "🍄",
    tagline: "Rainbow of colors — one of the most studied medicinal mushrooms",
    properties: ["Anti-cancer", "Anti-inflammatory", "Antioxidant", "Digestive support", "Immune support", "Respiratory health"],
    habitat: "Trunks and branches of dead or dying hardwood trees like oak",
    season: "Year-round",
    parts: "Entire mushroom",
    uses: "Tea, tincture, capsules, extract, powder",
    identification: "Thin flexible fan-like shape with velvety texture, 2–8 cm in diameter, 1–3 mm thick. Colors range from brown to green, gray, and shades of blue. Found on dead or dying hardwood trees.",
    harvesting: "Look for healthy brightly colored turkey tail. Cut at the base with knife or scissors. Clean gently with a brush or cloth.",
    storage: "Refrigerate fresh for up to one week. Or dry thinly sliced — once crisp store in airtight container for several months to a year.",
    warnings: "Generally very safe. May cause digestive upset in large amounts.",
    funFact: "Turkey tail is one of the most extensively researched medicinal mushrooms in the world, with studies exploring its role in cancer support.",
  },
];

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
        <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
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
          <span style={{ fontSize: "2.5rem" }}>{item.emoji}</span>
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

  const filtered = useMemo(() => data.filter(item => {
    const matchCat = category === "All" || item.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || item.name.toLowerCase().includes(q) ||
      item.properties.some(p => p.toLowerCase().includes(q)) ||
      item.uses.toLowerCase().includes(q) || item.tagline.toLowerCase().includes(q) ||
      item.habitat.toLowerCase().includes(q);
    return matchCat && matchSearch;
  }), [search, category]);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f3ec", fontFamily: "'Jost', system-ui, sans-serif" }}>
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

      <div style={{ padding: "1.25rem 2rem 0.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.8rem", color: "#7a8c72", letterSpacing: "0.05em" }}>
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
          {search && ` for "${search}"`}
          {category !== "All" && ` in ${category}s`}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem", padding: "1rem 2rem 4rem", maxWidth: "1100px", margin: "0 auto" }}>
        {filtered.length > 0
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

      <div style={{ background: "#2d4a35", color: "rgba(240,244,235,0.5)", textAlign: "center", padding: "1.5rem", fontSize: "0.78rem", letterSpacing: "0.05em" }}>
        Built with 🌿 by Cynthia Rico Cook &nbsp;·&nbsp; Content from Nature's Cookbook &nbsp;·&nbsp; Not medical advice
      </div>
    </div>
  );
}