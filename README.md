# STUW2-SW1 — TypeScript & Nuxt

Dieses Projekt ist eine Lernumgebung für **TypeScript in Nuxt 4**.
Es enthält eine Demo-App (Cocktail-Suche) und begleitende Dokumentation.

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
  pages/             → Seiten (index.vue)
playground/          → TypeScript-Beispieldateien zum Experimentieren
```

---

## Dokumentation

| Datei                                                    | Inhalt                                                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [`typescript-setup.md`](typescript-setup.md)             | Nuxt & TypeScript einrichten (neues/bestehendes Projekt, `nuxt.config.ts`)                                                                    |
| [`typescript-komponenten.md`](typescript-komponenten.md) | TypeScript-Konzepte erklärt: Primitive Typen, Interfaces, Generics, Inferenz, Union Types, Nullish Coalescing — alles anhand der Cocktail-App |
| [`typescript-playground.md`](typescript-playground.md)   | Anleitung zum Ausführen der Playground-Beispiele                                                                                              |
| [`tailwind-v4-install.md`](tailwind-v4-install.md)       | Tailwind CSS v4 in Nuxt 4 installieren                                                                                                        |

---

## Playground

Im Ordner `playground/` liegen einfache `.ts`-Dateien zum Ausprobieren von TypeScript-Grundlagen — unabhängig von der Nuxt-App.

```bash
npx tsx playground/01-variablen.ts
```

Mehr dazu in [`typescript-playground.md`](typescript-playground.md).
