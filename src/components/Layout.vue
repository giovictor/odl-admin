<template>
    <div class="wrapper">
        <v-app-bar app color="#e9954b" dark dense clipped-left>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="subtitle-1">Orlando's Des Legumes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-btn icon @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app clipped dark v-model="drawer" class="py-4">
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
        <slot></slot>
    </div>
</template>

<script>
import axios from '../plugins/axios'
import Cookies from 'js-cookie'

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
    },
    methods: {
        logout() {
            axios.post('auth/logout', {})
            .then(() => {
                Cookies.remove('access_token')
                this.$router.go('/login')
            })
            .catch(err => {
                console.log(err)
            }) 
        }
    }
}
</script>

<style>
    a {
        text-decoration: none;
    }

    .logo {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        margin:0 auto;
        display: block;
    }
</style>