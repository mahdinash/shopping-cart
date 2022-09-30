import Vue from "vue";
import VueRouter from "vue-router";


import App from "./App.vue";
import Products from "./components/Products.vue";
import Home from "./components/Home.vue";

import "bootstrap/dist/css/bootstrap.css";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
    routes : [
        {
            path : '/',
            component : Home,
            name : 'home'
        },
        {
            path : '/products',
            component : Products,
            name : 'products'
        }
    ]
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
