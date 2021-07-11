"use strict";

import Vue from 'vue';
import axios from "axios";
import {Loading, Notification} from "element-ui";
import store from '@/store'
import qs from 'qs'
import {BASE_URL} from "../config/config";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: BASE_URL
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

//请求过滤器
_axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (store.getters.GET_TOKEN){
        config.headers['token'] = store.getters.GET_TOKEN
      }
      //重新定义数组序列化
      config.paramsSerializer = (params) =>{
        return qs.stringify(params,{arrayFormat: 'repeat'})
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
//响应过滤器
_axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
);

const request = (url, method, params, callback) => {
  const myloading = Loading.service({
    text: "拼命加载中",
    // 前三个就是颜色 最后一位为透明度
    background: 'rgba(255,255,255,0.7)'
  })

  const myconfig = {
    //前端后端通讯的接口
    url: url,
    method: method,
  }
  if (method === 'get') {
    myconfig.params = params
  } else {
    const formData = new FormData()
    for (let key in params) {
      if (params[key] instanceof Array){
        for(let i = 0 ; i < params[key].length ; i++){
          formData.append(key, params[key][i])
        }
      }else{
        formData.append(key, params[key])
      }
    }
    myconfig.data = formData
  }

  _axios.request(myconfig).then(response => {
    if (response.data.code === 200) {
      callback(response.data)
    } else {
      Notification.error({
        title: '错误',
        message: response.data.message
      })
    }
  }).catch(error => {
    Notification.error({
      title: '错误',
      message: error
    })
  }).finally(() => {
    myloading.close()
  })
}

Vue.prototype.axios = _axios
Vue.prototype.request = request

Vue.prototype.get = (url, params, callback) => {
  request(url, 'get', params, response =>{
    callback(response.obj)
  })
}

Vue.prototype.post = (url, params, callback) => {
  request(url, 'post', params,response =>{
    Notification.success({
      title: '成功',
      message: response.message
    })
    callback(response.obj)
  })
}
