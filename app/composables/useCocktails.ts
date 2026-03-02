// ============================================================
// useCocktails.ts
// Demonstriert: Interface, Type Alias, Generics, Typ-Inferenz
// Daten von: https://www.thecocktaildb.com
// ============================================================

// Interface: beschreibt die Struktur unseres Cocktail-Objekts
interface Cocktail {
  id: string;
  name: string;
  alcoholic: AlcoholStatus; // → siehe Type Alias unten
  category: string;
  glass: string;
  thumbnail: string;
}

// Type Alias: nur diese drei Werte sind für "alcoholic" erlaubt
type AlcoholStatus = "Alcoholic" | "Non alcoholic" | "Optional alcohol";

// Interface: beschreibt die rohe API-Antwort von thecocktaildb.com
// Wir tippen die API-Antwort, damit TypeScript uns beim Zugriff hilft
interface CocktailApiResponse {
  drinks: CocktailRaw[] | null; // null wenn nichts gefunden wurde
}

interface CocktailRaw {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strGlass: string;
  strDrinkThumb: string;
}

// Generic Hilfsfunktion — T ist ein Platzhalter für jeden Typ
// Demonstriert: wrap<string>("hallo") → ["hallo"]
function wrap<T>(val: T): T[] {
  return [val];
}

// ============================================================
// Composable
// ============================================================
export function useCocktails() {
  // Typ-Inferenz: TypeScript erkennt Ref<Cocktail[]> automatisch
  const cocktails = ref<Cocktail[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // API-Objekt → unser internes Modell umwandeln
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

  // Gibt Cocktail | undefined zurück — weil find() nichts finden könnte
  function findById(id: string): Cocktail | undefined {
    return cocktails.value.find((c) => c.id === id);
  }

  // Type Alias als Parameter — nur erlaubte Status-Werte können übergeben werden
  function filterByAlcohol(status: AlcoholStatus): Cocktail[] {
    return cocktails.value.filter((c) => c.alcoholic === status);
  }

  // Generic in Aktion: wrap<Cocktail> gibt einen Cocktail als Array zurück
  function wrapFirst(): Cocktail[] {
    if (cocktails.value.length === 0) return [];
    return wrap<Cocktail>(cocktails.value[0]!);
  }

  // API-Aufruf — $fetch ist Nuxts eingebautes fetch
  // Das Generic <CocktailApiResponse> sagt TypeScript, was die API zurückgibt
  async function ladeCocktails(
    suchbegriff: string = "margarita",
  ): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<CocktailApiResponse>(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${suchbegriff}`,
      );

      // data.drinks ist CocktailRaw[] | null — mit ?? absichern
      cocktails.value = (data.drinks ?? []).map(mapCocktail);
    } catch {
      error.value = "API-Fehler: Cocktails konnten nicht geladen werden.";
    } finally {
      loading.value = false;
    }
  }

  return {
    cocktails,
    loading,
    error,
    findById,
    filterByAlcohol,
    wrapFirst,
    ladeCocktails,
  };
}
