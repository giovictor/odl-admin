<template>
    <v-card :loading="isLoadingData">
        <v-container>
            <v-card-title>{{this.id ? 'Update Category' : 'Add Category' }}</v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col cols="12" class="dialogInput">
                            <v-text-field label="Category" outlined dense v-model="category"></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#efefef" class="mb-4" @click="closeDialog">
                    <span class="caption">Close</span>
                </v-btn>
                <v-btn color="#e9954b" class="mb-4" dark @click="submitForm" :disabled="isLoadingData">
                    <span v-if="isSubmittingForm" class="caption">{{this.id ? 'Updating...' : 'Adding...' }}</span>
                    <span v-else class="caption">{{this.id ? 'Update' : 'Add' }}</span>
                </v-btn>
            </v-card-actions>
            <snackbar></snackbar>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../../plugins/axios'
import bus from '../../helpers/eventBus'
import Snackbar from '../../components/Snackbar'

export default {
    name: 'CategoryForm',
    components: {
        Snackbar
    },
    props: {
        id: {
            type: Number,
            required: false,
        }
    },
    data() {
        return {
            category: '',
            isLoadingData: true,
            isSubmittingForm: false
        }
    },
    computed: {
        ...mapState('categories', ['categories'])
    },
    mounted() {
        this.getCategory()
    },
    methods: {
        getCategory() {
            if(this.id) {
                axios.get(`categories/${this.id}`)
                .then(response => {
                    this.category = response.data.data.name
                    this.isLoadingData = false
                })
                .catch(err => console.log(err))
            } else {
                this.isLoadingData = false
            }
        },
        addCategory() {
            axios.post('categories', { name: this.category })
            .then(response => {
                bus.$emit('SHOW_SNACKBAR', { color: 'success', text: response.data.message })
                this.$store.dispatch('categories/getCategories')
                this.isSubmittingForm = false
                this.category = ''
            })
            .catch(err => {
                bus.$emit('SHOW_SNACKBAR', { color: 'error', text: err.response.data.message })
                this.isSubmittingForm = false
                console.log(err)
            })
        },
        updateCategory() {
            axios.patch(`categories/${this.id}`, { name: this.category })
            .then(response => {
                bus.$emit('SHOW_SNACKBAR', { color: 'success', text: response.data.message })
                this.isSubmittingForm = false
                this.categories.map(category => {
                    if(category.id == this.id) {
                        this.$set(category, 'name', this.category)
                    }
                })
            })
            .catch(err => {
                bus.$emit('SHOW_SNACKBAR', { color: 'error', text: err.response.data.message })
                this.isSubmittingForm = false
                console.log(err)
            })
        },
        submitForm() {
            this.isSubmittingForm = true
            if(this.id) {
                this.updateCategory()
            } else {
                this.addCategory()
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