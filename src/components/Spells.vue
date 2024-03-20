<template>
  <div id="Content">
    <div id="title">
      <h1>Page des sorts</h1>
    </div>
    <form id="search">
      Search <input name="search" v-model="searchQuery">
    </form>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Effet</th>
          <th>Categorie</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="spell in paginatedSpells" :key="spell.id">
          <td>{{ spell.attributes.name }}</td>
          <td>{{ spell.attributes.effect }}</td>
          <td>{{ spell.attributes.category }}</td>
        </tr>
      </tbody>
    </table>
    <div id="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const spells = ref([])
const searchQuery = ref('')
const itemsPerPage = 10
let currentPage = ref(1)

onMounted(async () => {
  try {
    const response = await axios.get('https://api.potterdb.com/v1/spells')
    spells.value = Object.values(response.data)[0] // récupère les valeurs sous forme d'array
  } catch (error) {
    console.error("Problème de chargement des spells via l'api", error)
  }
})

const filteredSpells = computed(() => {
  return spells.value.filter(spell => {
    return spell.attributes.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    spell.attributes.effect.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      spell.attributes.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const paginatedSpells = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredSpells.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredSpells.value.length / itemsPerPage)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
#Content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 1);
}

td {
  background-color: #f9f9f9;
  color: black;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

#pagination {
  margin-top: 10px;
}

#pagination button {
  margin: 0 5px;
  padding: 5px 10px;
}
</style>
