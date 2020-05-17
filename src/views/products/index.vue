<template>
    <div class="products pa-6">
        <v-container>
            <add-dialog label="Add Product">
                <product-form></product-form>
            </add-dialog>
            <v-row>
                <v-col>
                    <p class="title">Products</p>
                </v-col>
                <v-col></v-col>
                <v-col>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" hide-details class="body-2"></v-text-field>
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="products" :items-per-page="10" :search="search" :loading="isLoadingProducts" loading-text="Loading Products">
                <template v-slot:item.categories="{ item }">
                    <div v-for="(category, index) in item.categories" :key="category.id">{{category.name}}<span v-if="index + 1 < item.categories.length">,</span></div>
                </template>
                <template v-slot:item.is_featured="{ item }">
                    <v-switch false-value="0" true-value="1" v-model="item.is_featured"></v-switch>
                </template>
                <template v-slot:item.actions="{ item }">
                    <update-dialog>
                        <product-form :id="item.id"></product-form>
                    </update-dialog>
                    <delete-dialog label="product" :id="item.id" @delete="deleteProduct"></delete-dialog>
                </template>
            </v-data-table>
            <snackbar></snackbar>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '../../helpers/eventBus'
import axios from '../../plugins/axios'
import AddDialog from '../../components/AddDialog'
import UpdateDialog from '../../components/UpdateDialog'
import DeleteDialog from '../../components/DeleteDialog'
import Snackbar from '../../components/Snackbar'
import ProductForm from './ProductForm'

export default {
    name: 'Products',
    components: {
        AddDialog,
        UpdateDialog,
        DeleteDialog,
        Snackbar,
        ProductForm
    },
    data() {
        return {
            headers: [
                { text: 'Product ID', value: 'id'},
                { text: 'Product Name', value: 'name'},
                { text: 'Price', value: 'price'},
                { text: 'Stock', value: 'stock'},
                { text: 'Weight', value: 'weight'},
                { text: 'Categories', value: 'categories'},
                { text: 'Featured', value: 'is_featured', sortable: false },
                { text: 'Actions', value: 'actions' , sortable: false }
            ], 
            search: ''
        }
    },
    computed: {
        ...mapState('products', ['products', 'isLoadingProducts'])
    },
    mounted() {
        this.$store.dispatch('products/getProducts')
    },
    methods: {
        async deleteProduct(id) {
            bus.$emit('IS_DELETING', true)
            try {
                let response = await axios.delete(`products/${id}`)
                await this.$store.dispatch('products/getProducts')
                bus.$emit('SHOW_SNACKBAR', { color: 'success', text: response.data.message })
                bus.$emit('CLOSE_DIALOG')
                bus.$emit('IS_DELETING', false)
            } catch(err) {
                console.log(err)
                bus.$emit('SHOW_SNACKBAR', { color: 'error', text: err.response.data.message })
                bus.$emit('CLOSE_DIALOG')
                bus.$emit('IS_DELETING', false)
            }
        }
    }
}
</script>
