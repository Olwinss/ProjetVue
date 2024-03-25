<template>
  <div id="Content">
    <div id="title">
      <h1>Page des personnages</h1>
    </div>
    <div id="pagination">

      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === nbpage">Next</button>
      <br>
    </div>

    <form id="search">

      <input type="text" v-model="filterName" placeholder="Entrez un nom de personnage">
      <button @click="fetchData">Rechercher</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Date de naissance</th>
          <th>Maison</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="character in Characters" :key="character.id">
          <td>{{ character.attributes.name }}</td>
          <td>{{ character.attributes.born }}</td>
          <td>{{ character.attributes.house }}</td>
        </tr>
      </tbody>
    </table>
    <div id="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === nbpage">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const Characters = ref([])
const itemsPerPage = 20
let currentPage = ref(1)
let nbpage = ref(1)
const filterName = ref('')

onMounted(async () => {
  try {
    await fetchData()
  } catch (error) {
    console.error("Problème de chargement des Characters via l'api", error)
  }
})

async function fetchData() {
  try {
    Characters.value = []
    const response = await axios.get(`https://api.potterdb.com/v1/characters?filter[name_cont]=${filterName.value}&page[size]=${itemsPerPage}&page[number]=${currentPage.value}`)
    Characters.value = response.data.data
    nbpage = Math.ceil(response.data.meta.pagination.records / itemsPerPage)
  } catch (error) {
    console.error("Problème de chargement des Characters via l'api", error)
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
</script>
