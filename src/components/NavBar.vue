<script setup>

import { router } from '../router';
import '/public/homepage.css';

defineProps({
    msg: String,
})

</script>


<template>
    <body>
        <nav>
        <ul>
            <li>
                <h1>
                    <router-link to="/">HomePage</router-link>
                </h1>
            </li>
            <li>
                <h1>
                    <router-link to="/potions">Potions</router-link>
                </h1>
            </li>
            <li>
                <h1>
                    <router-link to="/spells">Spells</router-link>
                </h1>
            </li>
            <li>
                <h1>
                    <router-link to="/books" >Books</router-link>
                </h1>
            </li>
            <li>
                <h1>
                    <router-link to="/characters">Characters</router-link>
                </h1>
            </li>
        </ul>
    </nav>

    <router-view></router-view>


    </body>
    
</template>

<style scoped>

</style>
