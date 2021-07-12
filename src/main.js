import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import Vant from 'vant';
import { Image as VanImage } from 'vant';
import 'vant/lib/index.css';
Vue.prototype.img = (path) =>{
  return 'http://192.168.221.192:9000/images/'+path
}
Vue.use(Vant);
Vue.use(VanImage);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
