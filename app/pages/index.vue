<template>
  <main class="m-8 max-w-2xl">
    <h1 class="mb-2 text-4xl font-bold">STUW2</h1>
    <p class="mb-8 text-gray-500">
      TypeScript in Nuxt 4 mit der Cocktail-Demo.
    </p>

    <div class="grid gap-4">
      <!-- TypeScript + Composable -->
      <NuxtLink
        to="/typescript"
        class="group rounded-xl border border-gray-200 p-6 transition hover:border-blue-400 hover:shadow-md"
      >
        <h2
          class="mb-1 text-xl font-semibold text-gray-800 group-hover:text-blue-600"
        >
          TypeScript &amp; Composables
        </h2>
        <p class="text-sm text-gray-500">
          Cocktail-Suche mit Composable (<code>useCocktails</code>), Interfaces,
          Typen und API-Calls.
        </p>
      </NuxtLink>
    </div>
  </main>
</template>
