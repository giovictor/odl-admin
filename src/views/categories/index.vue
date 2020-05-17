<template>
    <div class="categories pa-6">
        <v-container>
            <add-dialog label="Add Category">
                <category-form></category-form>
            </add-dialog>
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
                    <update-dialog>
                        <category-form :id="item.id"></category-form>
                    </update-dialog>
                    <delete-dialog label="category" :id="item.id" @delete="deleteCategory"></delete-dialog>
                </template>
            </v-data-table>
            <snackbar></snackbar>
        </v-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../../plugins/axios'
import bus from '../../helpers/eventBus'
import AddDialog from '../../components/AddDialog'
import UpdateDialog from '../../components/UpdateDialog'
import DeleteDialog from '../../components/DeleteDialog'
import Snackbar from '../../components/Snackbar'
import CategoryForm from './CategoryForm'

export default {
    name: 'Categories',
    components: {
        AddDialog,
        UpdateDialog,
        DeleteDialog,
        Snackbar,
        CategoryForm
    },
    data() {
        return {
            headers: [
                { text: 'Category ID', value: 'id'},
                { text: 'Category Name', value: 'name'},
                { text: 'Actions', value: 'actions'}
            ], 
            search: '',
        }
    },
    computed: {
        ...mapState('categories', ['categories', 'isLoadingCategories'])
    },
    mounted() {
        this.$store.dispatch('categories/getCategories')
    },
    methods: {
        async deleteCategory(id) {
            bus.$emit('IS_DELETING', true)
            try {
                let response = await axios.delete(`categories/${id}`)
                await this.$store.dispatch('categories/getCategories')
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
