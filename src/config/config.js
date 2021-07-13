export const BASE_URL = "http://localhost:9999"

import Vue from 'vue'
Vue.prototype.img = (path) => {
	return "http://192.168.3.109:9000/images/" + path
}
