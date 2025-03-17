import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import './assets/tailwind.css'

import Home from "./views/Home.vue"
import Gacha from "./views/Gacha.vue"
import Import from './views/Import.vue'
import Calculator from './views/Calculator.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'

const routes = [
    { path: "", component: Home },
    { path: "/gacha", component: Gacha },
    { path: "/gacha/import", component: Import},
    { path: "/calculator", component: Calculator },
    { path: "/privacy-policy", component: PrivacyPolicy }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    scrollBehavior() {return { top: 0 }},
    routes
})

const app = createApp(App)
app.use(router)
app.mount("#app")