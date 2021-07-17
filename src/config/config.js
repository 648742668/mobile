export const BASE_URL = "http://192.168.42.171:9999"
export const IMG_URL = "http://192.168.42.171:9001/images/"
import Vue from 'vue'

Vue.prototype.img = (path) => {
	return IMG_URL + path
}

