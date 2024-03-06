<script setup>

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
                    HomePage
                </h1>
            </li>
            <li>
                <h1>
                    Potions
                </h1>
            </li>
            <li>
                <h1>
                    Spells
                </h1>
            </li>
            <li>
                <h1>
                    Books
                </h1>
            </li>
            <li>
                <h1>
                    Characters
                </h1>
            </li>
        </ul>
    </nav>

    <div id="HeaderContent">
        <div id="title">
            <h1>Harry Potter Encyclopedia</h1>
            <p>
                Ce site vous permet d'explorer l'univers d'Harry Potter par le biais d'une encyclopédie.
                Vous retrouverez la liste des potions ainsi que leurs détails,la liste complète des livres et
                 finalement la liste des personnages de HP 
            </p>
        </div>

    </div>

    </body>
    
</template>

<style scoped>

</style>
