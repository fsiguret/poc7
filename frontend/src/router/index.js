import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user-profile',
      name: 'UserProfile',
      component: () => import('../views/About.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/newArticle',
      name: 'NewArticle',
      component: () => import('../views/CreateArticle.vue')
    },
    {
      path: '/editArticle/:id',
      name: 'EditArticle',
      component: () => import('../views/EditArticle')
    }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
