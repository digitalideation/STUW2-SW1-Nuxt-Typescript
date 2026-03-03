// ============================================
// 04 — Union Types, Type Casting & Nullish Coalescing
// ============================================
// Ausführen: npx tsx playground/04-unions-nullish.ts

// --- Union Types als Werteliste ---
type AlcoholStatus = "Alcoholic" | "Non Alcoholic" | "Optional Alcohol";

let status: AlcoholStatus = "Alcoholic"; // ✅
console.log("status:", status);
// status = "Bier"; // ❌ Type '"Bier"' is not assignable to type 'AlcoholStatus'

// --- Type Casting mit "as" ---
// Stell dir vor, die API liefert einen string:
const apiValue: string = "Alcoholic";

// Mit "as" sagst du TypeScript: "Vertrau mir, das ist ein AlcoholStatus"
const casted: AlcoholStatus = apiValue as AlcoholStatus;
console.log("casted:", casted);

// ⚠️ Vorsicht: TypeScript prüft den Wert zur Laufzeit NICHT!
const gefaehrlich: AlcoholStatus = "Quatsch" as AlcoholStatus; // Kein Compile-Fehler!
console.log("gefaehrlich:", gefaehrlich); // "Quatsch" — TypeScript hat NICHT gewarnt

// --- Nullish Coalescing: ?? ---
// Gibt die rechte Seite zurück, wenn links null oder undefined ist

const drinks: string[] | null = null; // API hat nichts gefunden

const result = drinks ?? []; // → [] weil drinks null ist
console.log("result:", result);

const drinksMitWert: string[] | null = ["Mojito", "Caipirinha"];
const result2 = drinksMitWert ?? []; // → ["Mojito", "Caipirinha"] — links ist nicht null
console.log("result2:", result2);

// --- ?? vs || — der wichtige Unterschied ---
interface UserData {
  loginCount: number;
  nickname: string;
}

const userData: UserData = { loginCount: 0, nickname: "" };

// ?? reagiert NUR auf null/undefined:
const count1 = userData.loginCount ?? 99;
console.log("?? mit 0:", count1); // 0 — bleibt korrekt! ✅

// || reagiert auf ALLE falsy-Werte (null, undefined, 0, "", false):
const count2 = userData.loginCount || 99;
console.log("|| mit 0:", count2); // 99 — falsch! 0 ist falsy ⚠️

// Gleich bei leeren Strings:
const nick1 = userData.nickname ?? "Anonym";
console.log("?? mit '':", nick1); // "" — bleibt leer ✅

const nick2 = userData.nickname || "Anonym";
console.log("|| mit '':", nick2); // "Anonym" — leerer String ist falsy ⚠️

// --- Optional Chaining: ?. ---
interface Profile {
  name: string;
  address?: {
    street: string;
    city: string;
  };
}

const mitAdresse: Profile = {
  name: "Anna",
  address: { street: "Hauptstr. 1", city: "Wien" },
};

const ohneAdresse: Profile = {
  name: "Bob",
};

// ?. stoppt sicher, wenn address undefined ist:
console.log("Anna city:", mitAdresse.address?.city); // "Wien"
console.log("Bob city:", ohneAdresse.address?.city); // undefined (kein Crash!)

// Kombiniert mit ??:
console.log("Bob city:", ohneAdresse.address?.city ?? "Unbekannt"); // "Unbekannt"
