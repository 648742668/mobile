<template>
  <div style="height:100vh;background: #f2f2f2;">
    <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
    />
    <div>
      <van-cell
          v-if="show"
          style="margin-top: 10px"
          size="large" title="根据原密码修改"
          is-link @click="changeByPwd"/>
    </div>
    <div>
      <van-cell
          style="margin-top: 10px"
          size="large" title="根据密保问题修改"
          is-link @click="changeByQuestion"/>
    </div>
    <div>
      <van-cell
          style="margin-top: 10px"
          size="large" title="根据邮箱修改修改"
          is-link @click="changeByEmail"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "passwordIndex",
  data() {
    return {
      title: '账号安全',
      show:true
    }
  },
  created() {
    if (!this.$store.getters.GET_TOKEN) {
      this.show = false
      this.title = ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    changeByPwd() {
      this.$router.push({
        path: '/pwdByPwd'
      })
    },
    changeByQuestion() {
      this.$router.push({
        path: '/pwdByQuestion'
      })
    },
    changeByEmail() {
      this.$router.push({
        path: '/pwdByEmail'
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
