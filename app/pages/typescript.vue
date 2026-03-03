<script setup lang="ts">
const { cocktails, loading, error, ladeCocktails } = useCocktails();

const suchbegriff = ref("margarita");

await ladeCocktails(suchbegriff.value);
</script>

<template>
  <main class="m-8">
    <h1 class="mb-2 text-4xl font-bold">TypeScript Demo – CocktailDB</h1>
    <p class="mb-6 text-gray-500">Daten von thecocktaildb.com</p>

    <form class="mb-6 flex gap-2" @submit.prevent="ladeCocktails(suchbegriff)">
      <input
        v-model="suchbegriff"
        type="text"
        placeholder="Cocktail suchen…"
        class="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Suchen
      </button>
    </form>

    <p v-if="loading">Laden...</p>
    <p v-else-if="error">{{ error }}</p>

    <section v-else>
      <CocktailKarte
        v-for="cocktail in cocktails"
        :key="cocktail.id"
        :name="cocktail.name"
        :category="cocktail.category"
        :glass="cocktail.glass"
        :thumbnail="cocktail.thumbnail"
        :alcoholic="cocktail.alcoholic"
      />
    </section>

    <!-- Navigation -->
    <div class="mt-8">
      <NuxtLink to="/" class="text-blue-600 underline hover:text-blue-800">
        ← Zurück zur Übersicht
      </NuxtLink>
    </div>
  </main>
</template>
