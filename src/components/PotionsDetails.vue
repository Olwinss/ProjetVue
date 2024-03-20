<template>
    <div id="HeaderContent">
        <div id="title">
            <h1> Page de la potion :</h1>
            <h2 v-if="isPotionLoaded">Nom de la potion : {{ potion.data.attributes.name }}</h2>
            <div v-else>
                Chargement en cours...
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const potion = ref([]);
const isPotionLoaded = ref(false);
const route = useRoute();

// Remplace les espaces par des tirets dans l'ID de la potion
const potionId = decodeURIComponent(route.params.id)
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/'/g, '-'); // Remplace les apostrophes par des tirets

axios.get('https://api.potterdb.com/v1/potions/' + potionId.toLowerCase())
    .then(response => {
        potion.value = response.data;
        isPotionLoaded.value = true;
        console.log(potion.value);
    })
    .catch(error => {
        console.error("Problème de chargement des détails de la potion", error);
        isPotionLoaded.value = false;
    });
</script>


