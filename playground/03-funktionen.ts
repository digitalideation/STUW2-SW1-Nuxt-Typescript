// ============================================
// 03 — Funktionen, Inferenz & Generics
// ============================================
// Ausführen: npx tsx playground/03-funktionen.ts

// --- Funktionssignatur: Parameter + Rückgabetyp ---
function greet(name: string): string {
  return "Hallo, " + name;
}

console.log(greet("Welt")); // "Hallo, Welt"
// greet(42);                // ❌ Argument of type 'number' is not assignable

// --- Mehrere Parameter ---
function add(a: number, b: number): number {
  return a + b;
}

console.log("add(3, 4):", add(3, 4)); // 7
// add("3", "4"); // ❌ Strings statt Numbers

// --- Optionale Parameter ---
function greetOptional(name: string, greeting?: string): string {
  return (greeting ?? "Hallo") + ", " + name;
}

console.log(greetOptional("Anna")); // "Hallo, Anna"
console.log(greetOptional("Anna", "Servus")); // "Servus, Anna"

// --- Typ-Inferenz: TypeScript erkennt Typen automatisch ---
const count = 0; // TypeScript inferiert: number
const label = "hi"; // TypeScript inferiert: string
const list = [1, 2, 3]; // TypeScript inferiert: number[]

// Hover über die Variablen in deinem Editor um den Typ zu sehen!

// Auch bei Funktions-Rückgaben:
function double(n: number) {
  // Rückgabetyp wird automatisch als number erkannt
  return n * 2;
}

console.log("double(5):", double(5)); // 10

// --- Generics: wiederverwendbarer Code für verschiedene Typen ---

// Ohne Generics — nur für number nutzbar:
function wrapNumber(val: number): number[] {
  return [val];
}

// Mit Generics — funktioniert für jeden Typ:
function wrap<T>(val: T): T[] {
  return [val];
}

console.log("wrap string:", wrap<string>("hallo")); // ["hallo"]
console.log("wrap number:", wrap<number>(42)); // [42]
console.log("wrap boolean:", wrap(true)); // TypeScript inferiert: wrap<boolean>

// --- Generics mit Interfaces ---
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const userResponse: ApiResponse<string> = {
  data: "Anna",
  success: true,
};

const numberResponse: ApiResponse<number[]> = {
  data: [1, 2, 3],
  success: true,
};

console.log("userResponse:", userResponse);
console.log("numberResponse:", numberResponse);

// --- Generische Funktion mit Constraint ---
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log("length 'hallo':", getLength("hallo")); // 5
console.log("length [1,2,3]:", getLength([1, 2, 3])); // 3
// getLength(42); // ❌ number hat keine .length Property
