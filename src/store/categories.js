import axios from '../plugins/axios'

const state = {
    categories: [],
    isLoadingCategories: true
}

const mutations = {
    SET_CATEGORIES: (state, data) => {
        state.categories = data
    },
    SET_LOADING_SET_CATEGORIES: (state, data) => {
        state.isLoadingCategories = data
    }
}

const actions = {
    getCategories({commit}) {
        return axios.get('categories')
        .then(response => {
            commit('SET_CATEGORIES', response.data.data)
            commit('SET_LOADING_SET_CATEGORIES', false)
        })
        .catch(err => console.log(err))
    }
}

export default {
    state, mutations, actions, namespaced: true
}