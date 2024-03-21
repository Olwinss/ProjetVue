<template>
    <div id="Content">
      <div id="title">
        <h1>Page des Potions</h1>
        <p>
          Ici, vous trouverez toutes les informations concernant les potions de l'univers d'Harry Potter.
        </p>
      </div>
      <form id="search">
        <input type="text" v-model="filterName" placeholder="Entrez le nom d'une potion">
        <button @click="fetchData">Rechercher</button>
      </form>
      <ul class="centered-list">
        <li v-for="potion in paginatedPotions" :key="potion.id">
          <router-link style="text-decoration: none; color: inherit;" :to="'/potions/' + potion.attributes.name">
            {{ potion.attributes.name }}
          </router-link>
        </li>
      </ul>
      <div id="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === nbpage">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const Potions = ref([])
  const itemsPerPage = 10
  let currentPage = ref(1)
  let nbpage = ref(1)
  const filterName = ref('')
  
  onMounted(async () => {
    try {
      await fetchData()
    } catch (error) {
      console.error("Problème de chargement des potions", error)
    }
  })
  
  async function fetchData() {
    try {
      Potions.value = []
      const response = await axios.get(`https://api.potterdb.com/v1/potions?filter[name_cont]=${filterName.value}&page[size]=${itemsPerPage}&page[number]=${currentPage.value}`)
      Potions.value = response.data.data
      nbpage = Math.ceil(response.data.meta.pagination.records / itemsPerPage)
    } catch (error) {
      console.error("Problème de chargement des potions", error)
    }
  }
  
  async function nextPage() {
    if (currentPage.value < nbpage) {
      currentPage.value++
      await fetchData()
    }
  }
  
  async function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--
      await fetchData()
    }
  }
  
  const paginatedPotions = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return Potions.value.slice(startIndex, endIndex)
  })
  </script>
  
  <style scoped>
  .centered-list {
    text-align: center;
    list-style-type: none;
    text-decoration: none;
    padding-bottom: 30px;
  }
  
  #pagination {
    margin-top: 10px;
  }
  
  #pagination button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  </style>
  