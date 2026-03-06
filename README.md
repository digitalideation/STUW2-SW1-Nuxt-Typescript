# STUW2-SW2 — TypeScript & Nuxt

Dieses Projekt ist eine Lernumgebung für **TypeScript in Nuxt 4**.
Es enthält eine Demo-App (Cocktail-Suche) und begleitende Dokumentation.

---

## Aktuelles Setup

Aktuell gibt es in der App **ein Thema**:

- `TypeScript & Composables` unter `/typescript`

Die Startseite (`/`) dient als Einstieg und verlinkt auf dieses Thema.

---

## Projekt starten

```bash
npm install
npm run dev
```

Die App läuft auf `http://localhost:3000`.

---

## Projektstruktur

```
app/
  components/        → Vue-Komponenten (z.B. CocktailKarte.vue)
  composables/       → Composables mit TypeScript (z.B. useCocktails.ts)
  pages/             → Seiten (index.vue, typescript.vue)
```

---

## Dokumentation

| Datei                                                    | Inhalt                                                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [`typescript-setup.md`](typescript-setup.md)             | Nuxt & TypeScript einrichten (neues/bestehendes Projekt, `nuxt.config.ts`)                                                                    |
| [`typescript-komponenten.md`](typescript-komponenten.md) | TypeScript-Konzepte erklärt: Primitive Typen, Interfaces, Generics, Inferenz, Union Types, Nullish Coalescing — alles anhand der Cocktail-App |
| [`tailwind-v4-install.md`](tailwind-v4-install.md)       | Tailwind CSS v4 in Nuxt 4 installieren                                                                                                        |
