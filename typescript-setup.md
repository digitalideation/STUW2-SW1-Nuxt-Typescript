# Nuxt & TypeScript einrichten

## Neues Projekt

```bash
npx nuxi@latest init my-app
# TypeScript ist Standard in Nuxt 4
```

## Bestehendes Projekt

```bash
npm install -D typescript vue-tsc
# .js → .ts Dateien umbenennen
```

## nuxt.config.ts

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
  },
});

// tsconfig.json wird auto-generiert
// → kein manuelles Setup nötig
```
