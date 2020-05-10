<template>
    <v-card :loading="isLoadingData">
        <v-container>
            <v-card-title>{{this.id ? 'Update Product' : 'Add Product' }}</v-card-title>
            <v-card-text>
                    <v-form enctype="multipart/form-data">
                        <v-row>
                            <v-col cols="12" class="dialogInput">
                                <v-text-field label="Name" outlined dense placeholder="e.g. Tomato, Eggplant, Cabbage" v-model="product.name"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="dialogInput">
                                <v-textarea label="Description" outlined height="80" placeholder="e.g. Green, leafy or juicy" v-model="product.description"></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="dialogInput">
                                <v-text-field label="Price" type="number" outlined dense placeholder="Price per stock" v-model="product.price"></v-text-field>
                            </v-col>
                            <v-col cols="6" class="dialogInput">
                                <v-text-field label="Weight" type="number" outlined dense placeholder="Weight per stock" v-model="product.weight"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="dialogInput">
                                <v-text-field label="Stock" type="number" outlined dense placeholder="Number of products" v-model="product.stock"></v-text-field>
                            </v-col>
                            <v-col cols="6" class="dialogInput">
                                <v-select label="Categories" outlined dense multiple :items="categories" item-text="name" item-value="id" v-model="product.categories" placeholder="e.g. Fruits, Vegetables"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="dialogInput">
                                <v-file-input label="Image" placeholder="Product Image" outlined dense v-model="product.image"></v-file-input>
                            </v-col>
                        </v-row>
                    </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#efefef" class="mb-4" @click="closeDialog">
                    <span class="caption">Cancel</span>
                </v-btn>
                <v-btn color="#e9954b" class="mb-4" dark @click="submitForm">
                    <span class="caption">{{this.id ? 'Update' : 'Add' }}</span>
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
import axios from '../../plugins/axios'
import bus from '../../helpers/eventBus'

export default {
    name: 'ProductForm',
    props: {
        id: {
            type: Number,
            required: false,
        }
    },
    data() {
        return {
            categories: [],
            product: {
                name: '',
                description: '',
                price: '',
                weight: '',
                stock: '',
                image: [],
                categories: []
            },
            isLoadingData: true
        }
    },
    mounted() {
        this.getCategories()
        this.getProduct()
    },
    methods: {
        getCategories() {
            axios.get('categories')
            .then(response => {
                this.categories = response.data.data
                this.isLoadingData = false
            })
            .catch(err => console.log(err))
        },
        getProduct() {
            if(this.id) {
                axios.get(`products/${this.id}`)
                .then(response => {
                    Object.keys(this.product).map(key => {
                        if(key != 'image' && key != 'categories') {
                            this.product[key] = response.data.data[key]
                        }
                        if(key == 'categories') {
                            this.product.categories = response.data.data.categories.map(category => category.id)
                        }
                    })
                    this.isLoadingData = false
                })
                .catch(err => console.log(err))
            }
        },
        addProduct(formData) {
            axios.post('products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
                console.log(response.data.data)
                this.closeDialog()
            })
            .catch(err => console.log(err))
        },
        updateProduct(formData) {
            axios.post(`products/${this.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(response => {
                console.log(response.data.data)
                this.closeDialog()
            })
            .catch(err => console.log(err))
        },
        submitForm() {
            let formData = new FormData()
            Object.keys(this.product).map(key => {
                formData.append(key, this.product[key])
            })
            if(this.id) {
                formData.append('_method', 'PATCH')
                this.updateProduct(formData)
            } else {
                this.addProduct(formData)
            }
        },
        closeDialog() {
            bus.$emit('CLOSE_DIALOG')
        }
    }
}
</script>

<style>
    .dialogInput {
        padding: 0px 12px;
    }
</style>