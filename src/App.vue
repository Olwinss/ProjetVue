<script setup>
// import Potions from './components/Potions.vue'
</script>

<template>
  <router-link to="/">Go to Home</router-link>

  <router-link to="/potions">Go to Potions</router-link>
  <router-link to="/spells">Go to Spells</router-link>

  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
