<template>
    <div class="categories pa-6">
        <v-container>
            <v-row>
                <v-col>
                    <p class="title">Categories</p>
                </v-col>
                <v-col>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="body-2"></v-text-field>
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="categories" :items-per-page="10" :search="search"></v-data-table>
        </v-container>
    </div>
</template>

<script>
import axios from '../../plugins/axios'

export default {
    name: 'Categories',
    data() {
        return {
            categories: [],
            headers: [
                { text: 'Category ID', value: 'id'},
                { text: 'Category Name', value: 'name'},
            ], 
            search: ''
        }
    },
    mounted() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            axios.get('categories')
            .then(response => this.categories = response.data.data)
            .catch(err => console.log(err))
        }
    }
}
</script>
