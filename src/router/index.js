import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../views/products')
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import('../views/categories')
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import('../views/users')
    }
]

const router = new VueRouter({
    routes, 
    mode: 'history'
})

export default router
