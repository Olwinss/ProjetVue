<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const spells = ref([])

onMounted(async () => {
    try {
        const response = await axios.get('https://api.potterdb.com/v1/spells')
        spells.value = response.data
    } catch (error) {
        console.error("Problème de chargement des spells", error)
    }
})
</script>

<template>
<div id="Content">
    <div id="title">
        <h1>Page des sorts</h1>
    </div>
    <table>
    <thead>
      <tr>
        <th>
            Nom
        </th>
        <th>
            Effet
        </th>
        <th>
            Categorie
        </th>
      </tr>
    </thead>
    <tbody>
        <form id="search">
    Search <input name="query" v-model="searchQuery">
  </form>
        <tr v-for="spell in spells.data">
           <td>
                {{ spell.attributes.name }}
           </td>
           <td>
                {{ spell.attributes.effect }}
           </td>
           <td>
                {{ spell.attributes.category }}
           </td>
        </tr>
    </tbody>
</table>

</div>
</template>

<style scoped>
#Content{
    display:flex;
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
</style>

