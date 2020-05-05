import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/Login.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('../views/Dashboard.vue'),
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
    }
]

const router = new VueRouter({
    routes, 
    mode: 'history'
})

export default router
