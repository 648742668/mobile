<template>
  <div style="height:100vh;background: #f2f2f2;">
    <!--    <div class="head" style="background: white">-->
    <van-nav-bar
        title="用户设置"
        left-arrow
        @click-left="onClickLeft"
    >
      <van-icon slot="left" size="25px"
                color="#9E9999"
                name="arrow-left"/>
    </van-nav-bar>
    <!--    </div>-->
    <div
        class="main">
      <div
          @click="login"
          style="display: flex;background: white;padding-top: 5px;padding-bottom: 5px">
        <div >
          <van-image
              style="margin-left: 5vw"
              radius="10px"
              width="15vw"
              height="15vw"
              :src="loginImg">
          </van-image>
        </div>
        <div class="user">
          <span class="title">{{ name }}</span>
        </div>
      </div>
      <div>
        <van-cell
            style="margin-top: 10px"
            size="large"
            title="地址管理"
            is-link
            to="address"
        />
      </div>
      <div>
        <van-cell
            style="margin-top: 10px"
            size="large"
            title="修改登录密码"
            is-link
            to="passwordWay"/>
      </div>
    </div>
  </div>
</template>

<script>
import {IMG_URL} from "@/config/config";

export default {
  name: "settingIndex",
  data() {
    return {
      loginImg: require('../../../assets/my/my_login.png'),
      name: '登录/注册',
    }
  },
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.name = this.$store.getters.GET_CONSUMER.nickname
      this.loginImg = IMG_URL + this.$store.getters.GET_CONSUMER.img
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    login() {
      if (!this.$store.getters.GET_TOKEN) {
        this.$router.push({
          path: '/login'
        })
      } else {
        this.$router.push({
          path: '/userEdit',
          query: {
            id: JSON.stringify(this.$store.getters.GET_CONSUMER.id)
          }
        })
      }
    },
  }
}
</script>

<style scoped lang="less">


.main {
  padding-top: 10px;
  padding-bottom: 10px;
  height: auto;
  width: 100vw;

  .user {
    line-height: 15vw;

    .arrow {
      margin-top: 15px;
      float: right;
    }

    .title {
      width: 40vw;
      margin-left: 3vw;
      float: left;
      font-size: 20px;
    }
  }
}
</style>
