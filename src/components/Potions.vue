<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const potions = ref([])

onMounted(async () => {
    try {
        const response = await axios.get('https://api.potterdb.com/v1/potions')
        potions.value = response.data
    } catch (error) {
        console.error("Problème de chargement des potions", error)
    }
})
</script>

<template>
    <div id="HeaderContent">
        <div id="title">
            <h1>Page des Potions</h1>
            <p>
                Ici, vous trouverez toutes les informations concernant les potions de l'univers d'Harry Potter.
            </p>
        </div>
    </div>
    <div id="potions">
        <ul class="centered-list">
            <li v-for="potion in potions.data" :key="potion.id">
                <router-link style="text-decoration: none; color: inherit;" :to="{ name: potion.name, params: { id: potion.name } }">
                    {{ potion.attributes.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.centered-list {
    text-align: center;
    list-style-type: none;  
    text-decoration: none;
    padding-bottom: 30px;
}
</style>
