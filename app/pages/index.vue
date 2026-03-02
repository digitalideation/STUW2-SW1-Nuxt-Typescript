<script setup lang="ts">
const { cocktails, loading, error, ladeCocktails, filterByAlcohol } =
  useCocktails();

// Sucht nach Cocktails mit "rum"
await ladeCocktails("rum");
</script>

<template>
  <main class="m-8">
    <h1 class="mb-2 text-4xl font-bold">TypeScript Demo – CocktailDB</h1>
    <p class="mb-6 text-gray-500">Daten von thecocktaildb.com</p>

    <p v-if="loading">Laden…</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <section v-else>
      <!-- filterByAlcohol() demonstriert Type Alias als Parameter -->
      <h2 class="mb-4 text-2xl font-semibold">
        Alkoholische Cocktails ({{ filterByAlcohol("Alcoholic").length }})
      </h2>

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
