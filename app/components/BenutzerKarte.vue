<script setup lang="ts">
// ============================================================
// BenutzerKarte.vue
// Demonstriert: defineProps<T>(), interface, optionale Props
// ============================================================

// Interface für die Props dieser Komponente.
// Wird direkt an defineProps übergeben — kein separates defineProps({}) nötig.
interface Props {
  name: string;
  email?: string;  // optional — wird nur angezeigt wenn vorhanden
  id: number;
}

// defineProps<Props>() liest die Typen aus dem Interface.
// TypeScript prüft automatisch, ob die übergebenen Werte korrekt sind.
const props = defineProps<Props>();

// Typ-Inferenz: TypeScript erkennt, dass formatted ein string ist
const formatted = computed(() => `#${props.id} – ${props.name}`);
</script>

<template>
  <div class="benutzer-karte">
    <!-- formatted ist ein computed string — kein expliziter Typ nötig -->
    <p class="id">{{ formatted }}</p>

    <!-- props.email ist string | undefined — mit v-if absichern -->
    <p v-if="props.email" class="email">{{ props.email }}</p>
    <p v-else class="email kein-email">Keine E-Mail angegeben</p>
  </div>
</template>

<style scoped>
.benutzer-karte {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
}
.id {
  font-weight: bold;
}
.email {
  color: #555;
  font-size: 0.9rem;
}
.kein-email {
  color: #aaa;
  font-style: italic;
}
</style>
