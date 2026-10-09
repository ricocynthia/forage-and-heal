// Finds the drawings and photos that ship with the app.
//
// Drawings live in src/assets/plates/<species>.webp.
// Photos live in src/photos/<species>/ and are picked up automatically at build time:
// drop a picture in the right folder and the "From the field" section appears for that species.

import { slugify } from './text';

function loadFolder(getContext) {
  try {
    const context = getContext();
    return context
      .keys()
      .filter((key) => key.startsWith('./'))
      .map((key) => {
        const mod = context(key);
        return { key, src: mod && mod.default ? mod.default : mod };
      });
  } catch (err) {
    // No bundler (for example in tests): carry on without pictures.
    return [];
  }
}

const plates = loadFolder(() => require.context('../assets/plates', false, /\.(webp|png|jpe?g)$/i));
const photos = loadFolder(() => require.context('../photos', true, /\.(webp|png|jpe?g|avif)$/i));

export const plateFor = (name) => {
  const slug = slugify(name);
  const match = plates.find((file) => file.key.replace(/^\.\/|\.[a-z]+$/gi, '') === slug);
  return match ? match.src : null;
};

// "02-ripe-berries_early-autumn.jpg" becomes "Ripe berries early autumn".
// Camera names such as IMG_1234.jpg get no caption.
export const captionFromFile = (path) => {
  const base = path.split('/').pop().replace(/\.[a-z0-9]+$/i, '');
  if (/^(img|dsc|dscn|pxl|image|photo|pic)?[-_ ]*\d+$/i.test(base)) return '';
  const words = base.replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : '';
};

// Photos for one species: files in src/photos/<species>/ first, then any the API sends
// in a `photos` field (a list of URLs, or of { src, caption } objects).
export const photosFor = (item) => {
  const slug = slugify(item.name);
  const local = photos
    .filter((file) => file.key.split('/')[1] === slug)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((file) => ({ src: file.src, caption: captionFromFile(file.key) }));
  const remote = (Array.isArray(item.photos) ? item.photos : [])
    .map((photo) => (typeof photo === 'string' ? { src: photo, caption: '' } : { src: photo.src || photo.url, caption: photo.caption || '' }))
    .filter((photo) => photo.src);
  return local.concat(remote);
};
