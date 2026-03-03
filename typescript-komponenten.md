# TypeScript in Nuxt – Übersicht

Diese Übersicht erklärt die wichtigsten TypeScript-Konzepte anhand eines praktischen Beispiels.
Die Demo-Dateien befinden sich in:

- `app/composables/useCocktails.ts` – Generics, Inferenz, Typen (Daten von thecocktaildb.com)
- `app/components/CocktailKarte.vue` – Komponente mit TypeScript Props

---

## 1. Komponenten mit `<script setup lang="ts">`

In Nuxt 4 ist `<script setup lang="ts">` der empfohlene Weg, um Komponenten zu schreiben.
TypeScript ist direkt eingebaut. Normalerweise ist kein Extra-Setup nötig.

---

## 2. Primitive Typen

TypeScript kennt dieselben Grundtypen wie JavaScript, erzwingt aber deren korrekte Verwendung.

```ts
let name: string = "Anna";
let age: number = 25;
let active: boolean = true;
let tags: string[] = ["ts", "nuxt"]; // Array von strings

// Union Type: eine Variable kann mehrere Typen haben
let id: string | number = 42;
id = "abc"; // auch erlaubt

// Readonly mit const — Wert kann nicht neu zugewiesen werden
const PI: number = 3.14;
```

> Faustregel: Explizite Typen schreiben, wenn der Typ nicht offensichtlich ist. Ansonsten kann TypeScript ihn selbst erkennen (→ Inferenz, Kapitel 5).

---

## 3. Interface & Type Alias

Für komplexere Datenstrukturen verwendet man `interface` oder `type`.

```ts
// interface: definiert die Struktur eines Objekts
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

// type alias: gibt einem Typ einen Namen (Spitznamen)
type Status = "active" | "inactive"; // nur diese zwei Werte erlaubt

type ID = string | number; // Kombination von Typen
```

---

## 4. interface vs. type alias

> `type` gibt einem Typ nur einen Alias (Spitznamen) — `interface` definiert eine echte neue Struktur.

### interface — erweiterbar und wiederöffenbar

```ts
interface User {
  name: string;
}

// Erweiterung mit extends:
interface AdminUser extends User {
  role: string;
}
// AdminUser hat jetzt: name + role

// Declaration Merging — interface kann wiedergeöffnet werden:
interface User {
  createdAt: Date; // wird zur bestehenden User-Definition gemergt
}
```

### type alias — flexibler für Kombinationen

```ts
// Unions — das kann interface nicht:
type Status = "active" | "inactive";

let userStatus: Status = "active"; // ✅
// userStatus = "deleted";         // ❌ nicht erlaubt

// Nullable:
type MaybeUser = User | null;

let currentUser: MaybeUser = null; // noch nicht geladen
currentUser = { id: 1, name: "Anna" }; // ✅ User zuweisen
currentUser = null; // ✅ zurücksetzen erlaubt

// Tuple — Array mit fixer Länge und Typen:
type Pair = [string, number]; // z.B. ["Anna", 25]

let entry: Pair = ["Anna", 25]; // ✅
// let wrong: Pair = [25, "Anna"]; // ❌ falsche Reihenfolge
```

> **Faustregel:** `interface` für Objekte & Datenmodelle — `type` für Unions, Kombinationen und Hilfstypen.

---

## 5. Typ-Inferenz

TypeScript erkennt Typen automatisch aus dem zugewiesenen Wert — man muss nicht immer explizit tippen.

```ts
// TS erkennt den Typ selbst:
const count = 0; // wird als number erkannt
const label = "hi"; // wird als string erkannt
const list = [1, 2]; // wird als number[] erkannt

// Fehler, weil count als number inferiert wurde:
// count = "hallo"; // ❌ Type 'string' is not assignable to type 'number'

// Ref<T> in Vue/Nuxt — Inferenz funktioniert auch hier:
const n = ref(0); // TypeScript erkennt: Ref<number>
const s = ref(""); // TypeScript erkennt: Ref<string>
```

---

## 6. Generics

Generics ermöglichen wiederverwendbaren Code, der mit verschiedenen Typen funktioniert.
Man schreibt `<T>` als Platzhalter für einen Typ, der erst beim Aufruf festgelegt wird.

```ts
// Ohne Generics: nur für number nutzbar
function wrapNumber(val: number): number[] {
  return [val];
}

// Mit Generics: funktioniert für jeden Typ
function wrap<T>(val: T): T[] {
  return [val];
}

wrap<string>("hallo"); // gibt ["hallo"] zurück — Typ: string[]
wrap<number>(42); // gibt [42] zurück    — Typ: number[]

// Ref<T> aus Vue ist selbst ein Generic:
const n = ref<number>(0); // explizit: Ref<number>
const s = ref<string>(""); // explizit: Ref<string>
```

> Generics sind besonders nützlich in Composables, Utilities und API-Responses.

---

## 7. Funktionssignaturen verstehen

Eine TypeScript-Funktion hat drei beschriftbare Stellen:

```ts
function mapCocktail  (raw: CocktailRaw)  : Cocktail {
//       ↑             ↑                   ↑
//    Name          Parameter            Rückgabetyp
//                  + sein Typ
```

Der Rückgabetyp nach `)` sagt TypeScript: _"Diese Funktion muss ein Objekt zurückgeben, das dem `Cocktail`-Interface entspricht."_ Fehlt ein Feld oder hat es den falschen Typ, erscheint sofort ein Fehler — noch bevor der Code läuft.

In plain JavaScript würde man einfach schreiben:

```js
function mapCocktail(raw) { // keine Typen, keine Absicherung
```

---

## 8. API-Typen: Warum zwei Interfaces?

Beim Arbeiten mit externen APIs braucht man oft **zwei separate Interfaces** — eines für die rohen API-Daten und eines für das eigene App-Modell.

### Warum kann TypeScript die Typen nicht selbst erkennen (inferieren)?

TypeScript läuft nur zur **Compile-Zeit**. Ein HTTP-Request passiert zur **Laufzeit** — TypeScript kann nicht in eine live API schauen. Man muss ihr selbst sagen, welche Daten zurückkommen.

### Das rohe API-Modell

```ts
interface CocktailRaw {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strGlass: string;
  strDrinkThumb: string;
}
```

Spiegelt **exakt** wider, was die API zurückschickt — inklusive der unschönen Feldnamen wie `idDrink` oder `strDrink`.

### Das interne App-Modell

```ts
interface Cocktail {
  id: string;
  name: string;
  alcoholic: AlcoholStatus;
  category: string;
  glass: string;
  thumbnail: string;
}
```

Das ist die **saubere Struktur**, mit der man in der eigenen App arbeitet.

### Der Ablauf

```
API gibt CocktailRaw zurück  →  Mapping  →  Cocktail wird in der App verwendet
```

Diese Trennung ist gute Praxis: Ändert die API ihre Feldnamen, passt man nur `CocktailRaw` und die Mapping-Funktion an — nicht die gesamte App.

---

## 9. Union Types & Type Casting

### Union Type als Werteliste

```ts
type AlcoholStatus = "Alcoholic" | "Non Alcoholic" | "Optional Alcohol";
```

`alcoholic` darf **nur** einer dieser drei Strings sein. Schreibt man `alcoholic: "Bier"`, meldet TypeScript sofort einen Fehler. Viel sicherer als einfach `string`.

### Type Casting mit `as`

```ts
alcoholic: raw.strAlcoholic as AlcoholStatus,
```

Die API liefert `strAlcoholic` als normalen `string`. Mit `as AlcoholStatus` sagt man TypeScript: _"Vertrau mir, dieser Wert wird immer einer der drei gültigen Werte sein."_ Das ist ein bewusstes Versprechen an den Compiler — man vertraut der API.

---

## 10. Die Mapping-Funktion

```ts
function mapCocktail(raw: CocktailRaw): Cocktail {
  return {
    id: raw.idDrink,
    name: raw.strDrink,
    alcoholic: raw.strAlcoholic as AlcoholStatus,
    category: raw.strCategory,
    glass: raw.strGlass,
    thumbnail: raw.strDrinkThumb,
  };
}
```

Eine reine Transformationsfunktion: `CocktailRaw` rein, `Cocktail` raus. Nur Feldnamen umbenennen — sonst nichts.

---

## 11. `$fetch<T>()` und Generics in der Praxis

```ts
const data = await $fetch<CocktailApiResponse>(
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${suchbegriff}`,
);
```

`$fetch` ist Nuxts eingebauter Fetch-Helper. Vereinfacht sieht seine Definition so aus:

```ts
function $fetch<T>(url: string): Promise<T>;
```

`T` ist ein Platzhalter — er wird beim Aufruf durch den echten Typ ersetzt:

```ts
$fetch<string>(url); // data ist string
$fetch<number>(url); // data ist number
$fetch<CocktailApiResponse>(url); // data ist CocktailApiResponse
```

Ohne das Generic wäre `data` als `unknown` getypt — TypeScript könnte bei `data.drinks` nicht helfen.

### Die API-Response typen

```ts
interface CocktailApiResponse {
  drinks: CocktailRaw[] | null;
}
```

Die API verpackt alles in ein `drinks`-Array — und gibt `null` zurück, wenn keine Ergebnisse gefunden werden (kein leeres Array!). Das `| null` behandelt genau diesen Fall.

---

## 12. Nullish Coalescing: `??` vs. `||` vs. `|`

```ts
cocktails.value = (data.drinks ?? []).map(mapCocktail);
```

### Was bedeutet `??`?

Der **Nullish Coalescing Operator** `??` gibt die rechte Seite zurück, wenn die linke `null` oder `undefined` ist.

### Unterschied zu `||`

```ts
data.drinks ?? []; // Fallback nur bei null oder undefined
data.drinks || []; // Fallback bei JEDEM falsy-Wert (null, undefined, 0, "", false)
```

Im Cocktail-Beispiel funktionieren beide — `drinks` ist entweder ein Array oder `null`. Aber `??` ist **präziser**, weil es nur genau das behandelt, was man meint.

Wo der Unterschied wirklich wichtig wird:

```ts
const count = userData.loginCount ?? 0;
// loginCount = 0 → bleibt 0  ✅

const count = userData.loginCount || 0;
// loginCount = 0 → wird zu 0 ersetzt... aus dem falschen Grund  ⚠️
```

Mit `||` würde eine legitime `0` ersetzt, weil `0` falsy ist. `??` behält sie korrekt.

### Und `|`?

```ts
data.drinks | []; // ❌ bitweises OR — vergleicht Binärzahlen, hier sinnlos
```

Das `|` (einzeln) ist ein **bitweiser Operator** aus der Mathematik — komplett anderer Kontext. Nicht zu verwechseln mit `||` oder dem `|` in Union Types (`string | number`).
