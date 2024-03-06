import {createRouter, createWebHashHistory} from 'vue-router';


import Potions from './components/Potions.vue';
import Spells from './components/Spells.vue';

const routes = [
    { path: '/potions', name: "Potions", component: Potions},
    { path: '/spells', name: "Sorts", component: Spells},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
