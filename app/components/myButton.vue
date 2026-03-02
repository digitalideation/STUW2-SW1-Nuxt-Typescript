<template>

    <button @click="showMessage">Klick mich!</button>

</template>

<script setup>
// hier kommt JavaScript rein

const showMessage = () => {
  alert("Geklickt!");
}
</script>

<style scoped>

button {
    color: white;
    background-color: darkblue;
    padding: 20px;
}

</style>