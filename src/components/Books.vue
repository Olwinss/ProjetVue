<template>
  <div id="Content">
    <div id="title">
      <h1>Page des livres</h1>
    </div>
    <form id="search">
      <input type="text" v-model="filterTitle" placeholder="Entrez un titre de livre">
      <button @click="fetchData">Rechercher</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Date de publication</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in Books" :key="book.id">
          <td>{{ book.attributes.title }}</td>
          <td>{{ book.attributes.author }}</td>
          <td>{{ book.attributes.release_date }}</td>
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

const Books = ref([])
const itemsPerPage = 10
let currentPage = ref(1)
let nbpage = ref(1)
const filterTitle = ref('')

onMounted(async () => {
  try {
    await fetchData()
  } catch (error) {
    console.error("Problème de chargement des livres via l'api", error)
  }
})

async function fetchData() {
  try {
    Books.value = []
    const response = await axios.get(`https://api.potterdb.com/v1/books?filter[title_cont]=${filterTitle.value}&page[size]=${itemsPerPage}&page[number]=${currentPage.value}`)
    Books.value = response.data.data
    nbpage = Math.ceil(response.data.meta.pagination.records / itemsPerPage)
  } catch (error) {
    console.error("Problème de chargement des livres via l'api", error)
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
