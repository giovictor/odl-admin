import router from './index'
import token from '../helpers/token'

router.beforeEach((to, from, next) => {
    let authRoutes = ['/login']
    if (token) {
        if(authRoutes.includes(to.matched[0].path)) {
            next('/')
        } else {
            next()
        }
    } else {
        if(authRoutes.includes(to.matched[0].path)) {
            next()
        } else {
            next('/login')
        }
    }
})