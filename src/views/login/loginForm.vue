<template>
  <div>
    <div id="top">
      <template>
        <van-image
            round
            class="img"
            alt="APP logo"
            :src="require('../../assets/APP.png')">
          <template slot="login-name">
            <span>{{name}}</span>
          </template>
        </van-image>
      </template>

    </div>
    <div id="loginMain">
      <van-form  @submit="">
        <van-field
            v-model="form.username"
            name="用户名"
            label="登录名"
            clearable
            placeholder="用户名/手机号/邮箱"
            :rules="this.rules.username"
        />
        <van-field
            v-model="form.password"
            type="password"
            clearable
            name="密码"
            label="密码"
            placeholder="输入密码"
            :rules="this.rules.password"
        />
        <SwitchPasswordType v-model="form.password" label="密码" placeholder="请输入旧密码"></SwitchPasswordType>
        <div style="margin: 16px;">
          <van-button
              round
              icon="arrow"
              block
              type="info"
              native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script>
import SwitchPasswordType from "@/components/password/switchPasswordType";
export default {
  name: "loginForm",
  components: {SwitchPasswordType},
  data() {
    return {
      name: '电商APP',
      form:{
        username:'',
        password:'',
      },
      rules:{
        username:[
          { required: true, message: '请填写用户名/手机号/邮箱' }
        ],
        password: [
          { required: true, message: '请填写密码' }
        ]
      }
    }
  }
}
</script>

<style scoped lang="less">
.img {
  width: 100px;
  height: 100px;
}
.logo{
  display: inline-block;
}
#top{
  margin-top: 80px;
  margin-left: 120px;
}

</style>
