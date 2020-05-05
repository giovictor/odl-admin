<template>
    <div class="categories pa-6">
        <v-container>
            <v-btn color="#e9954b" class="mb-4" dark>
                <v-icon left>mdi-plus</v-icon>
                <span class="caption">Add Category</span>
            </v-btn>
            <v-row>
                <v-col>
                    <p class="title">Categories</p>
                </v-col>
                <v-col></v-col>
                <v-col>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" hide-details class="body-2"></v-text-field>
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="categories" :items-per-page="10" :search="search" :loading="isLoadingCategories" loading-text="Loading Categories">
                <template v-slot:item.actions="{ item }">
                    <v-icon small :id="item.id">mdi-pencil</v-icon>
                    <v-icon small :id="item.id">mdi-delete</v-icon>
                </template>
            </v-data-table>
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
                { text: 'Actions', value: 'actions'}
            ], 
            search: '',
            isLoadingCategories: true
        }
    },
    mounted() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            axios.get('categories')
            .then(response => {
                this.categories = response.data.data
                this.isLoadingCategories = false
            })
            .catch(err => console.log(err))
        }
    }
}
</script>
