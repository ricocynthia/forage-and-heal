// Which months each part can be gathered in Minnesota, keyed by species name.
//
// These months are a reading of the season text in Nature's Cookbook:
//   early spring = April          spring = April, May        late spring = May
//   early summer = June           summer = June to August    late summer = August
//   full bloom   = July, August   early fall = September     fall = September, October
//   late fall    = November       winter = December to February
// Edit the numbers below (1 = January, 12 = December) if a month is off.

const span = (from, to) => {
  const months = [];
  for (let m = from; m <= to; m += 1) months.push(m);
  return months;
};
const ALL_YEAR = span(1, 12);

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const HARVEST = {
  Burdock: { roots: [9, 10], leaves: [4, 5], seeds: [9, 10, 11, 12, 1, 2] },
  Catnip: { leaves: [7, 8], flowers: [7, 8] },
  Dandelion: { roots: [9, 10], leaves: [4], flowers: [5, 6] },
  Echinacea: { roots: [9, 10], leaves: [4], flowers: [7, 8] },
  Elderberry: { leaves: [4, 5], flowers: [6], berries: [9] },
  Goldenrod: { leaves: span(4, 8), flowers: [6, 7, 8] },
  Motherwort: { leaves: [4, 5, 6], flowers: [8, 9, 10] },
  Mullein: { leaves: span(4, 8), flowers: [8, 9] },
  'Stinging Nettle': { leaves: [4], roots: [11] },
  'Yellow Dock': { leaves: [4, 5], roots: [9, 10, 11, 12, 1, 2] },
  Chaga: { fruiting: ALL_YEAR },
  Morel: { fruiting: [4, 5, 6] },
  Maitake: { fruiting: span(8, 11) },
  "Lion's Mane": { fruiting: [8, 9, 10] },
  'Oyster Mushroom': { fruiting: [5, 6] },
  'Cauliflower Mushroom': { fruiting: span(4, 11) },
  'Chicken of the Woods': { fruiting: span(5, 11) },
  Chanterelle: { fruiting: span(6, 10) },
  'Giant Puffball': { fruiting: [8, 9, 10] },
  'Turkey Tail': { fruiting: ALL_YEAR },
};

// Parts of a species that can be gathered in a month (1 to 12). Empty when out of season or unknown.
export const partsIn = (name, month) => {
  const parts = HARVEST[name];
  if (!parts) return [];
  return Object.keys(parts).filter((part) => parts[part].includes(month));
};

export const inSeason = (name, month) => partsIn(name, month).length > 0;

// Plant parts worth naming. Mushrooms are gathered whole, so they have none.
export const namedParts = (name, month) => partsIn(name, month).filter((part) => part !== 'fruiting');
