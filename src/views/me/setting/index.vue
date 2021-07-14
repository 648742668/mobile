<template>
  <div style="height:100vh;background: #f2f2f2;">
    <div class="head">
      <van-nav-bar
          class="title"
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
        <span  class="title">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settingIndex",
  data(){
    return{
      loginImg: ('../../assets/my/'),
      name:'登录/注册',
    }
  },
  created() {
    if (this.$store.getters.GET_TOKEN) {

    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    login(){
      if (!this.$store.getters.GET_TOKEN) {
        this.$router.push({
          path: '/login'
        })
      }
    },
  }
}
</script>

<style scoped lang="less">
.head{
  height: 20vh;
  .title{

  }
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
