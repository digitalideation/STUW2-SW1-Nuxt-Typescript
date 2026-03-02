<script setup lang="ts">
// useUserListe gibt uns reaktive Daten und typisierte Funktionen
const { users, loading, ladeDemoUser, findById } = useUserListe();

// Typ-Inferenz: TypeScript erkennt User | undefined aus findById()
const gefunden = computed(() => findById(2));

// Demo-Daten beim Laden der Seite abrufen
await ladeDemoUser();
</script>

<template>
  <main class="m-8">
    <h1 class="mb-6 text-4xl font-bold">TypeScript Demo</h1>

    <p v-if="loading">Laden…</p>

    <section v-else>
      <h2 class="mb-4 text-2xl font-semibold">Alle Benutzer</h2>

      <!-- BenutzerKarte erwartet: id (number), name (string), email? (string) -->
      <!-- TypeScript prüft beim Build, ob die Props korrekt übergeben werden -->
      <BenutzerKarte
        v-for="user in users"
        :key="user.id"
        :id="user.id"
        :name="user.name"
        :email="user.email"
      />

      <h2 class="mb-2 mt-8 text-2xl font-semibold">findById(2)</h2>
      <!-- gefunden ist User | undefined — mit v-if absichern -->
      <p v-if="gefunden">{{ gefunden.name }} ({{ gefunden.email ?? "keine E-Mail" }})</p>
      <p v-else>Nicht gefunden</p>
    </section>
  </main>
</template>
