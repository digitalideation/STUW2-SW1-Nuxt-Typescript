// ============================================================
// Pinia Store: useCocktailStore
// Demonstriert: defineStore(), state, getters, actions
// Vergleich: composable (useCocktails.ts) → Pinia Store
// ============================================================

import { defineStore } from "pinia";

// ---------- Typen (gleich wie im Composable) ----------

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

// ---------- Store ----------

export const useCocktailStore = defineStore("cocktails", {
  // STATE — die reaktiven Daten des Stores
  state: () => ({
    cocktails: [] as Cocktail[],
    loading: false,
    error: null as string | null,
    suchbegriff: "margarita",
  }),

  // GETTERS — berechnete Werte, ähnlich wie computed()
  getters: {
    // Anzahl der gefundenen Cocktails
    anzahl: (state): number => state.cocktails.length,

    // Nur alkoholische Cocktails
    alkoholische: (state): Cocktail[] =>
      state.cocktails.filter((c) => c.alcoholic === "Alcoholic"),

    // Nur alkoholfreie Cocktails
    alkoholfreie: (state): Cocktail[] =>
      state.cocktails.filter((c) => c.alcoholic !== "Alcoholic"),

    // Hat der Store bereits Daten geladen?
    hatDaten: (state): boolean => state.cocktails.length > 0,
  },

  // ACTIONS — Methoden, die den State verändern (sync + async)
  actions: {
    // API-Objekt → unser internes Modell umwandeln
    mapCocktail(raw: CocktailRaw): Cocktail {
      return {
        id: raw.idDrink,
        name: raw.strDrink,
        alcoholic: raw.strAlcoholic as AlcoholStatus,
        category: raw.strCategory,
        glass: raw.strGlass,
        thumbnail: raw.strDrinkThumb,
      };
    },

    // Cocktails von der API laden
    async ladeCocktails(suchbegriff?: string): Promise<void> {
      if (suchbegriff !== undefined) {
        this.suchbegriff = suchbegriff;
      }

      this.loading = true;
      this.error = null;

      try {
        const data = await $fetch<CocktailApiResponse>(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.suchbegriff}`,
        );

        this.cocktails = (data.drinks ?? []).map(this.mapCocktail);
      } catch {
        this.error = "API-Fehler: Cocktails konnten nicht geladen werden.";
      } finally {
        this.loading = false;
      }
    },

    // State zurücksetzen
    zuruecksetzen(): void {
      this.cocktails = [];
      this.suchbegriff = "margarita";
      this.error = null;
    },
  },
});
