import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Game from './Game.vue'
import Login from './Login.vue'
import Signup from './Signup.vue'

const app = createApp(App);
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/level/:id', component: Game },
        { path: '/', component: Login },
        { path: '/signup', component: Signup },
    ]
});

app.use(router);
app.mount('#app');