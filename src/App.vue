<template>
    <v-app>
        <layout></layout>
        <v-content class="grey lighten-4">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import Layout from './components/Layout'

export default {
    name: 'App',
    components: {
        Layout
    }
};
</script>
