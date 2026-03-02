// ============================================================
// useUserListe.ts
// Demonstriert: Interface, Type Alias, Generics, Typ-Inferenz
// ============================================================

// --- Interface: Struktur eines Benutzers ---
// interface definiert, welche Felder ein Objekt haben muss.
// Das ? macht ein Feld optional.
interface User {
  id: number;
  name: string;
  email?: string; // optional — kann fehlen
}

// --- Type Alias: erlaubte Status-Werte ---
// type alias mit Union — nur diese zwei Strings sind erlaubt.
type Status = "active" | "inactive";

// --- Type Alias: ID kann string oder number sein ---
type ID = string | number;

// --- Generic Hilfsfunktion ---
// wrap<T> nimmt einen Wert beliebigen Typs und gibt ihn als Array zurück.
// T ist ein Platzhalter — der echte Typ wird beim Aufruf bestimmt.
function wrap<T>(val: T): T[] {
  return [val];
}

// ============================================================
// Composable: useUserListe
// Verwaltet eine typisierte Liste von Benutzern.
// ============================================================
export function useUserListe() {
  // Typ-Inferenz: TypeScript erkennt automatisch Ref<User[]>
  // weil wir ein leeres Array als Initialwert übergeben
  const users = ref<User[]>([]);

  // Typ-Inferenz: TypeScript erkennt Ref<boolean>
  const loading = ref(false);

  // --- Funktion mit explizitem Rückgabetyp ---
  // User | undefined — weil find() nichts finden könnte
  function findById(id: ID): User | undefined {
    return users.value.find((u) => u.id === id);
  }

  // --- Funktion mit Parameter-Typ ---
  // status ist explizit als Status-Typ angegeben
  // → nur "active" oder "inactive" sind erlaubt
  function filterByStatus(status: Status): User[] {
    // Demo: alle User als "active" behandeln (keine echte Status-Logik hier)
    if (status === "active") {
      return users.value;
    }
    return [];
  }

  // --- Generic Funktion im Composable ---
  // Demonstriert, wie Generics in der Praxis eingesetzt werden
  function wrapUser(user: User): User[] {
    // wrap<T> aus dem äußeren Scope — T wird hier zu User
    return wrap<User>(user);
  }

  // --- Benutzer hinzufügen ---
  function addUser(user: User): void {
    users.value.push(user);
  }

  // --- Demo-Daten laden ---
  // Simuliert einen API-Aufruf mit setTimeout
  async function ladeDemoUser(): Promise<void> {
    loading.value = true;

    // In einer echten App: const data = await $fetch<User[]>('/api/users')
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Typ-Inferenz: TypeScript weiß, dass dies User[] sein muss
    users.value = [
      { id: 1, name: "Anna Muster", email: "anna@example.com" },
      { id: 2, name: "Ben Beispiel" }, // email fehlt — ist optional, kein Fehler
      { id: 3, name: "Clara Code", email: "clara@example.com" },
    ];

    loading.value = false;
  }

  return {
    users,
    loading,
    findById,
    filterByStatus,
    wrapUser,
    addUser,
    ladeDemoUser,
  };
}
