<template>
  <div style="height:100vh;background: #f2f2f2;">
    <div class="head" style="background: white">
      <van-nav-bar
          title="用户设置"
          left-arrow
          @click-left="onClickLeft"
      />
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
        <span class="title">{{ name }}</span>
        <van-icon size="35px" class="arrow" name="arrow"/>
      </div>
    </div>
    <div>
      <van-cell style="margin-top: 10px"
                size="large" title="地址管理"
                is-link @click="address"/>
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
      this.loginImg = IMG_URL+this.$store.getters.GET_CONSUMER.img
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
      }
    },
    address() {
      this.$router.push({
        path: '/address'
      })
    }
  }
}
</script>

<style scoped lang="less">
.head {
  height: 13vh;
}

.main {
  display: flex;
  height: 15vw;
  line-height: 15vw;

  .title {
    margin-left: 3vw;
    font-size: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  .arrow {
    margin-top: 3vw;
    margin-left: 40vw;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
