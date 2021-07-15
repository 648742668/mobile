<template>
  <div id="my_login">
    <div class="content">
      <component :is="loginform"></component>
    </div>
  </div>
</template>


<script>

export default {
  name: "loginIndex",
  created() {

  },
  computed:{
    loginform(){
      return () => import('./loginForm')
    }
  },
}
</script>

<style scoped lang="less">
#my_login {
  height: 100vh;
  display: flex;
  .content {
    background:#ffffff;
    height: 100vh;
    width: 100vw;
    border-radius: 15px;
    position: relative;
  }
}

</style>
