// ============================================
// 02 — Interfaces & Type Aliases
// ============================================
// Ausführen: npx tsx playground/02-interfaces-types.ts

// --- Interface: definiert die Struktur eines Objekts ---
interface User {
  id: number;
  name: string;
  email?: string; // ? = optional
}

const anna: User = {
  id: 1,
  name: "Anna",
  email: "anna@example.com",
};

// email ist optional — geht auch ohne:
const bob: User = {
  id: 2,
  name: "Bob",
};

console.log("anna:", anna);
console.log("bob:", bob);

// Fehler ausprobieren:
// const kaputt: User = { id: 3 };           // ❌ Property 'name' is missing
// const kaputt: User = { id: "3", name: 1 } // ❌ Falsche Typen

// --- Interface erweitern mit extends ---
interface AdminUser extends User {
  role: string;
}

const admin: AdminUser = {
  id: 3,
  name: "Chef",
  role: "admin", // AdminUser hat alle User-Felder + role
};

console.log("admin:", admin);

// --- Type Alias: gibt einem Typ einen Spitznamen ---
type Status = "active" | "inactive"; // nur diese zwei Werte erlaubt

let userStatus: Status = "active"; // ✅
console.log("status:", userStatus);
// userStatus = "deleted";          // ❌ nicht erlaubt

type ID = string | number;

let visitorId: ID = 42; // ✅
visitorId = "guest-abc"; // ✅ auch erlaubt

// --- Nullable Type ---
type MaybeUser = User | null;

let currentUser: MaybeUser = null; // noch nicht geladen
console.log("currentUser (vorher):", currentUser);

currentUser = { id: 1, name: "Anna" }; // jetzt geladen
console.log("currentUser (nachher):", currentUser);

currentUser = null; // zurücksetzen
console.log("currentUser (reset):", currentUser);

// --- Tuple: Array mit fixer Länge und Typen ---
type Pair = [string, number];

let entry: Pair = ["Anna", 25]; // ✅
console.log("entry:", entry);
// let falsch: Pair = [25, "Anna"]; // ❌ Falsche Reihenfolge
// let zuKurz: Pair = ["Anna"];     // ❌ Zu wenig Elemente
