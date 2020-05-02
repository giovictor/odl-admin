<template>
    <div class="wrapper">
        <v-app-bar app color="#e9954b" dark dense clipped-left>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="subtitle-1">Orlando's Des Legumes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item>
                        <v-list-item-title>
                            <router-link to="/profile" class="body-2 grey--text text--darken-4">Profile</router-link>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <a href="#" class="body-2 grey--text text--darken-4">Logout</a>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer app clipped color="#ffffff" v-model="drawer">
            <v-list dense>
                <router-link class="grey--text text--darken-4" :to="page.link" v-for="page in pages" :key="page.title">
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>{{page.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>   
                            <v-list-item-title class="subtitle-2">{{page.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            pages: [
                {
                    icon: 'mdi-view-dashboard',
                    title: 'Dashboard',
                    link: '/'
                },
                {
                    icon: 'mdi-food-apple',
                    title: 'Products',
                    link: '/products'
                },
                {
                    icon: 'mdi-bookshelf',
                    title: 'Categories',
                    link: '/categories'
                },
                {
                    icon: 'mdi-account',
                    title: 'Users',
                    link: '/users'
                },
            ]
        }
    }
}
</script>

<style>
    a {
        text-decoration: none;
    }
</style>