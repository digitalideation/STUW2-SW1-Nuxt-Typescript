interface Cocktail {
  id: string;
  name: string;
  alcoholic: AlcoholStatus;
  category: string;
  glass: string;
  thumbnail: string;
}

type AlcoholStatus = "Alcoholic" | "Non Alcoholic" | "Optional Alcohol";

interface CocktailApiResponse {
  drinks: CocktailRaw[] | null;
}

interface CocktailRaw {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strGlass: string;
  strDrinkThumb: string;
}

export function useCocktails() {
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

  async function ladeCocktails(
    suchbegriff: string = "margarita",
  ): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<CocktailApiResponse>(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${suchbegriff}`,
      );

      cocktails.value = (data.drinks ?? []).map(mapCocktail);

      console.log(cocktails.value);
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
    ladeCocktails,
  };
}
