import Vue from 'vue'
import './plugins/axios'
// import toast from './components/common/toast/'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import Vant from 'vant';
import { Image as VanImage } from 'vant';
import 'vant/lib/index.css';
import FastClick from 'fastclick'
Vue.use(Vant);
Vue.use(VanImage);
Vue.use(VueLazyLoad, {
    loading: require("./assets/img/ddd.png")
})
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// Vue.use(toast)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
FastClick.attach(document.body)
