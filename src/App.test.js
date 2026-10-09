import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { captionFromFile, photosFor } from './lib/media';
import { slugify, tidy } from './lib/text';
import { namedParts, nextActiveMonth, partsIn } from './data/harvest';

const elderberry = {
  id: 5,
  name: 'Elderberry',
  category: 'Plant',
  tagline: 'Flower tea doubles as a gentle eye wash',
  properties: ['Antiviral', 'Immune support'],
  habitat: 'Forest edges, roadsides, moist lowlands',
  season: 'Flowers in early summer, leaves in spring, berries in early autumn when fully ripe',
  parts: 'Flowers, leaves, berries',
  uses: 'Tea, salves, tonics',
  identification: 'Wide woody shrub up to 12 feet tall.',
  harvesting: 'Flowers: Cut stem 1 inch above bloom cluster.',
  storage: 'Rinse in cool water, dry thoroughly.',
  warnings: 'Never eat raw berries, leaves, bark, or roots — they are toxic.',
};

beforeEach(() => {
  window.scrollTo = jest.fn();
  window.location.hash = '';
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ forageables: [elderberry] }) }));
});

test('lists the species from the guide', async () => {
  render(<App />);
  expect(await screen.findByText('Plate I. Plants')).toBeInTheDocument();
  expect(screen.getByText('Elderberry')).toBeInTheDocument();
});

test('search has a visible label, and a suggested word filters the plates', async () => {
  render(<App />);
  const box = await screen.findByLabelText('Search the guide');
  fireEvent.click(screen.getByRole('button', { name: 'immune' }));
  expect(box).toHaveValue('immune');
  expect(screen.getByText('1 of 1 species match “immune”.')).toBeInTheDocument();
  fireEvent.change(box, { target: { value: 'zzz' } });
  expect(screen.queryByText('Plate I. Plants')).not.toBeInTheDocument();
});

test('an entry leads with its warning and hides the photo section when there are no photos', async () => {
  window.location.hash = '#/species/elderberry';
  render(<App />);
  expect(await screen.findByText('Never eat raw berries, leaves, bark, or roots. They are toxic.')).toBeInTheDocument();
  expect(screen.queryByText('From the field')).not.toBeInTheDocument();
});

test('an entry shows the photo section once the species has a photo', async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ forageables: [{ ...elderberry, photos: [{ src: 'berries.jpg', caption: 'Ripe berries' }] }] }) }));
  window.location.hash = '#/species/elderberry';
  render(<App />);
  expect(await screen.findByText('From the field')).toBeInTheDocument();
  expect(screen.getByText('Ripe berries')).toBeInTheDocument();
});

test('winter says plainly that nothing is gathered', async () => {
  const january = jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(0);
  render(<App />);
  expect(await screen.findByText('Winter is quiet')).toBeInTheDocument();
  expect(screen.getByText(/Nothing in this guide can be gathered in January\. Gathering starts again in April, with elderberry\./)).toBeInTheDocument();
  expect(screen.queryByText(/Ready now/)).not.toBeInTheDocument();
  january.mockRestore();
});

test('says so when the guide cannot be loaded', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')));
  render(<App />);
  expect(await screen.findByText(/could not be loaded/)).toBeInTheDocument();
});

test('helpers', () => {
  expect(slugify("Lion's Mane")).toBe('lions-mane');
  expect(slugify('Chicken of the Woods')).toBe('chicken-of-the-woods');
  expect(tidy('Not just for cats — a powerful calming herb')).toBe('Not just for cats. A powerful calming herb');
  expect(captionFromFile('./elderberry/02-ripe-berries_early-autumn.jpg')).toBe('Ripe berries early autumn');
  expect(captionFromFile('./elderberry/IMG_1234.jpg')).toBe('');
  expect(photosFor({ name: 'Elderberry', photos: ['a.jpg'] })).toEqual([{ src: 'a.jpg', caption: '' }]);
  expect(partsIn('Burdock', 10)).toEqual(['roots', 'seeds']);
  expect(namedParts('Chanterelle', 7)).toEqual([]);
  expect(partsIn('Morel', 10)).toEqual([]);
  expect(partsIn('Chaga', 1)).toEqual([]);
  expect(partsIn('Yellow Dock', 12)).toEqual([]);
  expect(partsIn('Chaga', 3)).toEqual(['fruiting']);
  expect(nextActiveMonth(['Chaga', 'Morel'], 1)).toBe(3);
});
