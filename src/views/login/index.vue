<template>
  <div id="my_login">
    <div id="content">
      <div style="color: red">test</div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Login",
  created() {
    console.log(this.$route.path.indexOf("login"))
  }
}
</script>

<style scoped lang="less">
.my_login {
  height: 100vh;
  background: linear-gradient(0deg,#ffffff,#00ffff);
  display: flex;
  .content{
    width: 500px;
    height: 300px;
  }
}

</style>
