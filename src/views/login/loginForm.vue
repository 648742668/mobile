<template>
  <div>
    <div id="top">
      <template>
        <van-image
            round
            class="img"
            alt="APP logo"
            :src="appImgUrl">
          <template slot="login-name">
            <span>{{ name }}</span>
          </template>
        </van-image>
      </template>
    </div>
    <div id="loginMain">
      <van-form ref="loginform" class="myform"  @submit="login">
        <van-field
            v-model="form.username"
            name="用户名"
            clearable
            placeholder="用户名/手机号"
            :rules="this.rules.username">
          <template slot="left-icon">
            <van-image
                style="width: 25px;margin-right: 20px"
                :src="imgUrl"/>
          </template>
        </van-field>
        <SwitchPasswordType
            v-model="form.password"
            label="密码"
            placeholder="请输入密码"
        ></SwitchPasswordType>
        <div style="margin: 16px;">
          <van-button
              round
              icon="arrow"
              block
              :disabled="(this.form.password === '' || this.form.username ==='')"
              type="info"
              native-type="submit">登录
          </van-button>
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
  created() {
    // console.log(this.$store.getters.GET_TOKEN)
    // if (this.$store.getters.GET_TOKEN ===""){
    //   this.imgUrl = this.img(this.$store.getters.GET_CONSUMER.img)
    // }
  },
  data() {
    const module = '/consumer'
    return {
      url:{
        login: module+'/login',
        getImg:module+'/getImg'
      },
      imgUrl:'https://b.yzcdn.cn/vant/icon-demo-1126.png',
      name: '电商APP',
      appImgUrl:require('../../assets/APP.png'),
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '请填写用户名/手机号', trigger: 'blur'},
          {pattern:/^[a-zA-Z]\w{0,50}$|^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/,message: '请输入正确的用户名/手机号'}
        ],
        password: [
          {required: true, message: '请填写密码'}
        ]
      },
    }
  },
  methods: {
    login() {
      this.get(this.url.login,{username:this.form.username,password:this.form.password},response =>{
        this.$store.commit('SET_TOKEN',response.token)
        this.$store.commit('SET_CONSUMER',response.consumer)
        this.$router.push("/")
      });
    },
  }
}
</script>

<style scoped lang="less">
.myform{
  margin-top: 10px;
  width: 80vw;
  margin-left: 10vw
}
.img {
  width: 100px;
  height: 100px;
}

.logo {
  display: inline-block;
}

#top {
  margin-top: 15vh;
  margin-left: 35vw;
}

</style>
