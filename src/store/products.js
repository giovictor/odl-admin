import axios from '../plugins/axios'

const state = {
    products: [],
    isLoadingProducts: true
}

const mutations = {
    SET_PRODUCTS: (state, data) => {
        state.products = data
    },
    SET_LOADING_PRODUCTS: (state, data) => {
        state.isLoadingProducts = data
    }
}

const actions = {
    getProducts({commit}) {
        return axios.get('products')
        .then(response => {
            commit('SET_PRODUCTS', response.data.data)
            commit('SET_LOADING_PRODUCTS', false)
        })
        .catch(err => console.log(err))
    }
}

export default {
    state, mutations, actions, namespaced: true
}