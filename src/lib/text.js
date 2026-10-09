// Small text helpers shared by the views.

export const slugify = (name) =>
  String(name || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// The guide's copy uses spaced dashes as asides. Set them as two sentences instead.
export const tidy = (text) =>
  String(text || '')
    .split(/\s+[—–]\s+/)
    .map((part, i) => (i ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join('. ')
    .replace(/\.\.+/g, '.');

export const capitalize = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : '');

export const joinWords = (words) => {
  if (words.length < 2) return words.join('');
  return words.slice(0, -1).join(', ') + ' and ' + words[words.length - 1];
};
