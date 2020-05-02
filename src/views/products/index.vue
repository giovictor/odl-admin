<template>
    <div class="products pa-6">
        <v-container>
            <v-row>
                <v-col>
                    <p class="title">Products</p>
                </v-col>
                <v-col>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="body-2"></v-text-field>
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="products" :items-per-page="10" :search="search">
                <template v-slot:item.categories="{ item }">
                    <template v-for="category in item.categories">{{category.name}}</template>
                </template>
                <template v-slot:item.is_featured="{ item }">
                    <v-switch false-value="0" true-value="1" v-model="item.is_featured"></v-switch>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
import axios from '../../plugins/axios'

export default {
    name: 'Products',
    data() {
        return {
            products: [],
            headers: [
                { text: 'Product ID', value: 'id'},
                { text: 'Product Name', value: 'name'},
                { text: 'Description', value: 'description', sortable: false},
                { text: 'Price', value: 'price'},
                { text: 'Stock', value: 'stock'},
                { text: 'Weight', value: 'weight'},
                { text: 'Categories', value: 'categories', sortable: false},
                { text: 'Featured', value: 'is_featured', sortable: false }
            ], 
            search: ''
        }
    },
    mounted() {
        this.getProducts()
    },
    methods: {
        getProducts() {
            axios.get('products')
            .then(response => this.products = response.data.data)
            .catch(err => console.log(err))
        }
    }
}
</script>
