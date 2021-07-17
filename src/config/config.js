export const BASE_URL = "http://192.168.42.171:9999"

import Vue from 'vue'
Vue.prototype.img = (path) => {
	return "http://192.168.42.171:9000/images/" + path
}
