<script setup lang="ts">
const { cocktails, loading, error, ladeCocktails } = useCocktails();

await ladeCocktails();
</script>

<template>
  <main class="m-8">
    <h1 class="mb-2 text-4xl font-bold">TypeScript Demo – CocktailDB</h1>
    <p class="mb-6 text-gray-500">Daten von thecocktaildb.com</p>

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
  </main>
</template>
