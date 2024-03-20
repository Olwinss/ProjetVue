<template>
    <div id="Content">
      <div id="title">
        <h1>Page des livres</h1>
      </div>
      <form id="search">
        Search <input name="search" v-model="searchQuery">
      </form>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Autheur</th>
            <th>Date de publication</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in paginatedbooks" :key="book.id">
            <td>{{ book.attributes.title }}</td>
            <td>{{ book.attributes.author }}</td>
            <td>{{ book.attributes.release_date }}</td>
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
  
  const books = ref([])
  const searchQuery = ref('')
  const itemsPerPage = 10
  let currentPage = ref(1)
  
  onMounted(async () => {
    try {
      const response = await axios.get('https://api.potterdb.com/v1/books')
      books.value = Object.values(response.data)[0] // récupère les valeurs sous forme d'array
    } catch (error) {
      console.error("Problème de chargement des books via l'api", error)
    }
  })
  
  const filteredbooks = computed(() => {
    return books.value.filter(book => {
      return book.attributes.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.attributes.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        book.attributes.release_date.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  })
  
  const paginatedbooks = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredbooks.value.slice(startIndex, endIndex)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(filteredbooks.value.length / itemsPerPage)
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
  