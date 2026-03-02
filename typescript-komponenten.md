# TypeScript in Nuxt – Tutorial

Dieses Tutorial erklärt die wichtigsten TypeScript-Konzepte anhand eines praktischen Beispiels.
Die Demo-Dateien befinden sich in:

- `app/composables/useCocktails.ts` – Generics, Inferenz, Typen (echte Daten von thecocktaildb.com)
- `app/components/CocktailKarte.vue` – Komponente mit TypeScript Props

---

## 1. Komponenten mit `<script setup lang="ts">`

In Nuxt 4 ist `<script setup lang="ts">` der empfohlene Weg, um Komponenten zu schreiben.
TypeScript ist direkt eingebaut — kein Extra-Setup nötig.

```vue
<script setup lang="ts">

interface Props {
  title: string;
  count?: number; // ? = optional
}

const props = defineProps<Props>();

</script>
```

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
interface User { name: string }

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

let currentUser: MaybeUser = null;       // noch nicht geladen
currentUser = { id: 1, name: "Anna" };   // ✅ User zuweisen
currentUser = null;                      // ✅ zurücksetzen erlaubt

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
const count = 0;       // wird als number erkannt
const label = "hi";    // wird als string erkannt
const list = [1, 2];   // wird als number[] erkannt

// Fehler, weil count als number inferiert wurde:
// count = "hallo"; // ❌ Type 'string' is not assignable to type 'number'

// Ref<T> in Vue/Nuxt — Inferenz funktioniert auch hier:
const n = ref(0);      // TypeScript erkennt: Ref<number>
const s = ref("");     // TypeScript erkennt: Ref<string>
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
wrap<number>(42);      // gibt [42] zurück    — Typ: number[]

// Ref<T> aus Vue ist selbst ein Generic:
const n = ref<number>(0);  // explizit: Ref<number>
const s = ref<string>(""); // explizit: Ref<string>
```

> Generics sind besonders nützlich in Composables, Utilities und API-Responses.

---

## 7. Praxisbeispiel

Die folgenden Dateien zeigen alle Konzepte im Zusammenspiel:

### `app/composables/useCocktails.ts`
Ein Composable, das echte API-Daten von thecocktaildb.com lädt — demonstriert Interfaces (inkl. API-Response-Typen), Type Aliases, Generics, Typ-Inferenz und `$fetch<T>()`.

### `app/components/CocktailKarte.vue`
Eine Komponente, die einen Cocktail als Prop erhält und anzeigt — demonstriert `defineProps<T>()` mit TypeScript.
