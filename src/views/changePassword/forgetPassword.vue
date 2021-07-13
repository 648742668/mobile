<template>
  <div>
    <div id="top">
      <van-image
          round
          class="img"
          alt="APP logo"
          :src="appImgUrl">
      </van-image>
    </div>
    <div id="main">
      <SwitchPasswordType
          class="password"
          v-model="form.rawPassword"
          label="密码"
          placeholder="请输入密码"
      ></SwitchPasswordType>
      <SwitchPasswordType
          v-model="validValue"
          class="password"
          label="密码"
          placeholder="请再次输入密码"
      ></SwitchPasswordType>
    </div>
  </div>
</template>

<script>
import SwitchPasswordType from "@/components/password/switchPasswordType";

export default {
  name: "forgetPassword",
  components: {SwitchPasswordType},
  data(){
    return{
      appImgUrl:require('../../assets/changePassword.png'),
      form:{
        rawPassword:'',
      },
      validValue:''
    }
  }
}
</script>

<style scoped lang="less">
  @top_top: 15vh;
  @top_left: 35vw;
  @img: 100px;
  #top{
    margin-top: @top_top;
    margin-left: @top_left;
  }
  .img{
    width: @img;
    height: @img;

  }
</style>
