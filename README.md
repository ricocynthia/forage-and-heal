# 🌿 Forage & Heal — Minnesota Field Guide

A searchable reference app for wild plants and medicinal mushrooms found in Minnesota. Built with React.

**Live app:** https://ricocynthia.github.io/forage-and-heal/

---

## About

This app was born from a personal project close to my heart. I co-authored *Nature's Cookbook — Acknowledging The Gifts of Nature Through Cooking, Gardening & Healing* as part of CEED's educational curriculum, and wanted to bring that content to life in an interactive, searchable format.

I'm a forager, gardener, and certified Integrative Nutrition Health Coach — and I also happen to be a senior software engineer. This project is where those two worlds meet.

All plant and mushroom data comes directly from *Nature's Cookbook*.

---

## Features

- Species plates: all the plants and mushrooms laid out like plates in an old herbal, with hand-drawn figures
- What's ready to gather this month, right at the top
- Search by name or healing property (e.g. "immune", "sleep", "liver") and filter by plants or mushrooms
- Harvest calendar: every species month by month, with the part to gather
- A page for each species that opens with its safety warning, then:
  - When to gather each part
  - How to harvest, identify and store it
  - Where it grows, parts used, ways to use it, health benefits
  - Fun facts from the book
- "From the field" photos on a species page, shown only once that species has photos

---

## Adding your own photos

Drop pictures into `src/photos/<species>/`, for example
`src/photos/elderberry/01-in-flower-early-summer.jpg`, then build or deploy as usual.
The "From the field" section appears on that species' page by itself. The file name becomes
the caption. Details and the list of folder names are in [`src/photos/README.md`](src/photos/README.md).

---

## Where things live

- `src/data/harvest.js`: which months each part can be gathered (edit here if a month is off)
- `src/assets/plates/`: the drawing for each species
- `src/photos/`: your photos, one folder per species
- `src/components/`: the three views (species plates, harvest calendar, species page)

---

## Tech Stack

- **React** (functional components, hooks)
- **JavaScript / JSX**
- Deployed on **GitHub Pages**

---

## Running Locally

```bash
git clone https://github.com/ricocynthia/forage-and-heal.git
cd forage-and-heal
npm install
npm start
```

---

## Disclaimer

This app is for educational and reference purposes only. It is not medical advice. Always consult a qualified healthcare professional before using any plant or mushroom medicinally. When foraging, always confirm identification with multiple sources before consuming anything.

---

## Credits

Plant and mushroom data sourced from:

**Nature's Cookbook — Acknowledging The Gifts of Nature Through Cooking, Gardening & Healing**
By Cynthia Rico Cook, Natalya Arevalo, and Eva Nyrie Garrett
Illustrated by Lynda Grafito
Published as part of CEED's educational curriculum

[Read the book →](https://ceed.org/resource/natures-cookbook/#_)

---

Built with 🌿 by [Cynthia Rico Cook](https://ricocynthia.github.io)
