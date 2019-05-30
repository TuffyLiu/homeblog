import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import Axios from 'axios';

Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

declare module 'vue/types/vue' {
    interface VueConstructor {
        $axios: any;
        router: any;
    }
    interface Vue {
        $axios: any;
        router: any;
    }
}

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
