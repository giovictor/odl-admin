import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import products from './products' 
import categories from './categories' 

export default new Vuex.Store({
    modules: {
        products,
        categories
    }
})
