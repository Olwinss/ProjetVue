<template>
    <div id="Content">
      <div id="title">
        <h1>Page des personnages</h1>
      </div>
      <form id="search">
        Search <input name="search" v-model="searchQuery">
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
          <tr v-for="Character in paginatedCharacters" :key="Character.id">
            <td>{{ Character.attributes.name }}</td>
            <td>{{ Character.attributes.born }}</td>
            <td>{{ Character.attributes.house }}</td>
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
  
  const Characters = ref([])
  const searchQuery = ref('')
  const itemsPerPage = 10
  let currentPage = ref(1)
  
  onMounted(async () => {
    try {
      const response = await axios.get('https://api.potterdb.com/v1/characters')
      Characters.value = Object.values(response.data)[0] // récupère les valeurs sous forme d'array
    } catch (error) {
      console.error("Problème de chargement des Characters via l'api", error)
    }
  })
  
  const filteredCharacters = computed(() => {
    return Characters.value.filter(Character => {
      return Character.attributes.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      Character.attributes.born.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        Character.attributes.house.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  })
  
  const paginatedCharacters = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredCharacters.value.slice(startIndex, endIndex)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(filteredCharacters.value.length / itemsPerPage)
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
  