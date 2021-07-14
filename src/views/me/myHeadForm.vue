<template>
  <div>
    <div class="head">
      <van-icon
          @click="setting"
          style="float: right;"
          name="setting-o"
          size="25"/>
      <van-icon
          @click="login"
          style="float: right;margin-right: 5vw"
          size="25"
          name="user-circle-o" />
    </div>
    <div
        class="main"
        @click="login">
      <van-image
          style="margin-left: 5vw"
          round
          width="15vw"
          height="15vw"
          :src="loginImg">
      </van-image>
      <span  class="title">{{ name }}</span>
    </div>
  </div>
</template>

<script>

import {IMG_URL} from "@/config/config";
export default {
  name: "myHeadForm",
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.loginImg = IMG_URL + this.$store.getters.GET_CONSUMER.img
      this.name = this.$store.getters.GET_CONSUMER.nickname
    }
  },
  data(){
    return {
      loginImg:require('../../assets/my/my_login.png'),
      name:'登录/注册 >',
    }
  },
  methods:{
    login(){
      if (!this.$store.getters.GET_TOKEN) {
        this.$router.push({
          path: '/login'
        })
      }
    },
    setting(){
      this.$router.push({
        path: '/userSetting'
      })
    }
  }
}
</script>

<style scoped lang="less">
.head{
  width: 100vw;
  height: 5vh;
}
.main{
  display: flex;
  height: 15vw;
  line-height: 15vw;
  .title{
    margin-left: 3vw;
    font-size: 20px;
    display: inline-block;
    vertical-align: middle;
  }
}

</style>
