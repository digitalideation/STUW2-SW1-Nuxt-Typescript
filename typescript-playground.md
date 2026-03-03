# TypeScript Playground — Beispiele ausführen

Im Ordner `playground/` liegen einfache `.ts`-Dateien zum Experimentieren.
Sie sind unabhängig von der Nuxt-App und können direkt im Terminal ausgeführt werden.

---

## Voraussetzung

`tsx` ist als Dev-Dependency installiert und erlaubt es, TypeScript-Dateien direkt auszuführen — ohne manuelles Kompilieren.

```bash
npm install -D tsx
```

---

## Dateien ausführen

Einzelne Datei im Terminal starten:

```bash
npx tsx playground/01-variablen.ts
npx tsx playground/02-interfaces-types.ts
npx tsx playground/03-funktionen.ts
npx tsx playground/04-unions-nullish.ts
```

Oder alle auf einmal:

```bash
for f in playground/*.ts; do echo "--- $f ---"; npx tsx "$f"; echo; done
```

---

## Übersicht der Dateien

| Datei | Thema |
|---|---|
| `01-variablen.ts` | Primitive Typen (`string`, `number`, `boolean`), `let` vs `const`, Arrays, Union Types |
| `02-interfaces-types.ts` | `interface`, `extends`, `type` Alias, Nullable, Tuples |
| `03-funktionen.ts` | Funktionssignaturen, optionale Parameter, Typ-Inferenz, Generics |
| `04-unions-nullish.ts` | Union Types als Werteliste, `as` Casting, `??` vs `||`, Optional Chaining (`?.`) |

---

## Fehler ausprobieren

In jeder Datei gibt es auskommentierte Zeilen mit `// ❌`. Kommentar entfernen, um den TypeScript-Fehler im Editor zu sehen:

```ts
// vorname = 42;  // ❌ Type 'number' is not assignable to type 'string'
```

→ Kommentar vor `vorname = 42;` entfernen → rote Unterstreichung im Editor.

---

## Eigene Experimente

Einfach eine neue Datei anlegen, z.B. `playground/05-mein-test.ts`, und mit `npx tsx` ausführen:

```bash
npx tsx playground/05-mein-test.ts
```

TypeScript-Fehlermeldungen erscheinen sowohl im Editor (rote Unterstreichung) als auch beim Ausführen im Terminal.
