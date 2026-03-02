# Tailwind CSS v4 in Nuxt 4 installieren

Tailwind v4 benötigt keine `tailwind.config.js`-Datei mehr und verwendet ein Vite-Plugin anstelle eines PostCSS-Plugins.

## 1. Pakete installieren

```bash
npm install tailwindcss @tailwindcss/vite
```

## 2. `nuxt.config.ts` anpassen

Das Vite-Plugin hinzufügen und die CSS-Datei registrieren:

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss() as any], // `as any` umgeht einen TypeScript-Fehler durch unterschiedliche Vite-Versionen von Nuxt und @tailwindcss/vite
  },
});
```

## 3. CSS-Datei erstellen

`app/assets/css/main.css` erstellen:

```css
@import "tailwindcss";
```

Dieser einzelne Import ersetzt die alten `@tailwind base/components/utilities`-Direktiven aus v3.

## 4. Installation testen

Tailwind-Klassen in einer beliebigen Komponente verwenden und `npm run dev` starten:

```html
<div class="bg-blue-500 text-white p-4 rounded-xl">
  Tailwind CSS v4 funktioniert!
</div>
```
