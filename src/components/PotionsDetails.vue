<template>
    <div id="Content">
      <div id="title">
        <h1> Page de la potion :</h1>
        <img v-if="potion.data.attributes.image !== null" :src="potion.data.attributes.image" :alt="potion.data.attributes.name" class="potion-image"/>
        <img v-else src="../assets/missing_potion.svg" alt="Missing Potion" class="potion-image"/>
        <h2 v-if="isPotionLoaded">Nom de la potion : {{ potion.data.attributes.name }}</h2>
        <div v-else>
          Chargement en cours...
        </div>
        <p v-if="isPotionLoaded && potion.data.attributes.effect !== null">Effet : {{ potion.data.attributes.effect }}</p>
        <p v-if="isPotionLoaded && potion.data.attributes.ingredients !== null">Ingrédients : {{ potion.data.attributes.ingredients }}</p>
        <a v-if="isPotionLoaded && potion.data.attributes.wiki !== null" :href="potion.data.attributes.wiki" target="_blank">En savoir plus sur le Wiki</a>
      </div>
    </div>
  </template>
  
  <style>
  .potion-container {
    border: 2px solid #ccc; /* Couleur de la bordure */
    border-radius: 10px; /* Bordures arrondies */
    padding: 20px;
    max-width: 600px; /* Largeur maximale de la potion container */
    margin: 0 auto; /* Centrer horizontalement */
  }
  
  .potion-image {
    max-width: 400px;
    max-height: 400px;
    border-radius: 10px; /* Bordures arrondies pour l'image */
  }
  
  #title {
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  a {
    display: block;
    margin-top: 20px;
    font-size: 16px;
    text-decoration: none;
    color: #007bff; /* Couleur bleue par défaut, vous pouvez changer si nécessaire */
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  .loading-message {
    font-size: 18px;
    font-style: italic;
    color: #666;
  }
  
  /* Pour centrer le contenu de chargement */
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px; /* Ajustez en fonction de votre contenu */
  }
  
  /* Pour centrer le contenu lors du chargement */
  #title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  
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
  