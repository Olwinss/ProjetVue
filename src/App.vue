<script setup>

import HomePage from './components/HomePage.vue'
</script>

<template>
  <router-link to="/">Go to Home</router-link>

  <router-link to="/potions">Go to Potions</router-link>
  <router-link to="/spells">Go to Spells</router-link>
  <router-view></router-view>
  <HomePage msg="Vite + Vue" />

  <HomePage msg="Vite + Vue" />
</template>

<style scoped>

</style>

