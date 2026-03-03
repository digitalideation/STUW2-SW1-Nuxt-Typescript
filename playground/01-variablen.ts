// ============================================
// 01 — Variablen & Primitive Typen
// ============================================
// Ausführen: npx tsx playground/01-variablen.ts

// --- Explizite Typen ---
let vorname: string = "Anna";
let alter: number = 25;
let aktiv: boolean = true;
let tags: string[] = ["ts", "nuxt", "vue"];

console.log("vorname:", vorname); // "Anna"
console.log("alter:", alter); // 25
console.log("aktiv:", aktiv); // true
console.log("tags:", tags); // ["ts", "nuxt", "vue"]

// --- Typ-Fehler ausprobieren ---
// Kommentar entfernen und schauen was passiert:
// vorname = 42;       // ❌ Type 'number' is not assignable to type 'string'
// alter = "fünf";     // ❌ Type 'string' is not assignable to type 'number'
// aktiv = "ja";       // ❌ Type 'string' is not assignable to type 'boolean'

// --- Union Type: mehrere Typen erlaubt ---
let id: string | number = 42;
console.log("id (number):", id); // 42

id = "abc-123";
console.log("id (string):", id); // "abc-123"

// id = true;  // ❌ Type 'boolean' is not assignable to type 'string | number'

// --- const vs let ---
const PI: number = 3.14159;
// PI = 3; // ❌ Cannot assign to 'PI' because it is a constant

// Bei const inferiert TypeScript den "literal type":
const richtung = "links"; // Typ ist nicht string, sondern "links"
let richtung2 = "links"; // Typ ist string (weil let sich ändern kann)

console.log("PI:", PI);
console.log("richtung:", richtung);

// --- Arrays ---
let zahlen: number[] = [1, 2, 3];
zahlen.push(4); // ✅
// zahlen.push("fünf"); // ❌ Argument of type 'string' is not assignable

let gemischt: (string | number)[] = [1, "zwei", 3];
gemischt.push("vier"); // ✅
gemischt.push(5); // ✅

console.log("zahlen:", zahlen);
console.log("gemischt:", gemischt);
