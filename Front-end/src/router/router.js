import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue";
import Home from "../components/Home/Home.vue";
import Profile from "../components/Profile/Profile.vue";
import MainPage from "../components/Home/MainPage.vue";
// import ChangePassword from "../components/Form/ChangePassword.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
        },
        {
            path: "/",
            name: "Home",
            component: Home,
            children:[
                {
                    path: "/Home",
                    name: "Home Page",
                    component: MainPage
                },
                {
                    path: "/Profile",
                    name: "Profile",
                    component: Profile
                },

            ]
        },

    ]
})
export default router