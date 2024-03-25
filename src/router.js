import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './components/HomePage.vue';
import Potions from './components/Potions.vue';
import Spells from './components/Spells.vue';
import Books from './components/Books.vue';
import Characters from './components/Characters.vue';
import PotionsDetails from './components/PotionsDetails.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/potions', name: "Potions", component: Potions },
    { path: '/spells', name: "Sorts", component: Spells },
    { path: '/books', name: "Livres", component: Books },
    { path: '/characters', name: "Personnage", component: Characters },
    { path: '/potions/:id', name: ":id", component: PotionsDetails },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
