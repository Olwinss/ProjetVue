<template>
  <div id="Content">
    <div id="title">
      <h1>Page des personnages</h1>
    </div>
    <form id="search"> Search <input name="search" v-model="searchQuery">
      <input type="number" v-model="desiredPage" min="1" :max="nbpage">
      <button @click="goToPage">Go</button>
      <div id="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === nbpage">Next</button>
      </div>
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
        <tr v-for="character in filteredCharacters" :key="character.id">
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
import { ref, onMounted, computed} from 'vue'
import axios from 'axios'

const Characters = ref([])
const searchQuery = ref('')
const itemsPerPage = 20 // un trop gros nombre ne fonctionnera pas pour la pagination
let currentPage = ref(1)
const desiredPage = ref(1)
let nbpage = ref(1);

onMounted(async () => {
  try {
    await fetchData()
  } catch (error) {
    console.error("Problème de chargement des Characters via l'api", error)
  }
})

async function fetchData() {
  try {
    // Réinitialisation de la liste des personnages à chaque appel
    Characters.value = []
    const response = await axios.get(`https://api.potterdb.com/v1/characters?page[size]=${itemsPerPage}&page[number]=${currentPage.value}`)
    Characters.value = response.data.data
    nbpage = Math.floor((response.data.meta.pagination.records+itemsPerPage)/itemsPerPage) // permet de s'assurer qu'un élement ne soit pas exclu 
  } catch (error) {
    console.error("Problème de chargement des Characters via l'api", error)
  }
}

const filteredCharacters = computed(() => {
  return Characters.value.filter(character => {
    return character.attributes.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      character.attributes.born.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      character.attributes.house.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

async function nextPage() {
  if (currentPage.value < nbpage) {
    currentPage.value++
    await fetchData() // Appel de fetchData pour charger les données de la nouvelle page
  }
}

async function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    await fetchData() // Appel de fetchData pour charger les données de la nouvelle page
  }
}

async function goToPage() {
  if (desiredPage.value >= 1 && desiredPage.value <= nbpage) {
    currentPage.value = desiredPage.value
    await fetchData() // Appel de fetchData pour charger les données de la nouvelle page
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
