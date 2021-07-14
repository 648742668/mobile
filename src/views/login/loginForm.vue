<template>
  <div>
    <div id="top" >
        <van-image
            round
            class="img"
            alt="APP logo"
            :src="appImgUrl">
        </van-image>
    </div>
    <div id="loginMain">
      <van-form ref="loginform" class="myform" @submit="login">
        <van-field
            v-model="form.username"
            name="用户名"
            clearable
            @blur="checkImg"
            placeholder="用户名/手机号"
            :rules="this.rules.username">
          <template slot="left-icon">
            <van-image
                style="width: 25px;;margin-right: 38px"
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
              class="submit"
              block
              :disabled="(this.form.password === '' || this.form.username ==='')"
              type="info"
              native-type="submit">登录
          </van-button>
        </div>
      </van-form>
      <div id="footer">
        <van-row gutter="20">
          <van-button
              class="button"
              type="info"
              plain
              :text="message.forget"
              size="normal"
              round
              to="forgetPwd">
          </van-button>
          <van-button
              class="button"
              type="info"
              round
              size="normal"
              :text="message.add"
              plain
              to="sign"></van-button>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
import SwitchPasswordType from "@/components/password/switchPasswordType";
import {IMG_URL} from "@/config/config";

export default {
  name: "loginForm",
  components: {SwitchPasswordType, [Notify.Component.name]: Notify.Component,},
  props: {
    path: {
      type: String,
      default: '/'
    },
    func: {
      type: Function,
      default: () => {
        return obj => {
        }
      }
    }
  },
  created() {
  },
  data() {
    const module = '/consumer'
    return {
      url: {
        login: module + '/login',
      },
      message:{
        add:'新用户注册',
        forget:'忘记密码'
      },
      imgUrl: require('../../assets/login/login.png'),
      name: '电商APP',
      appImgUrl: require('../../assets/login/App.png'),
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '请填写用户名/手机号', trigger: 'blur'},
          {
            pattern: /^[a-zA-Z]\w{0,50}$|^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/,
            message: '请输入正确的用户名/手机号'
          }
        ],
        password: [
          {required: true, message: '请填写密码'}
        ]
      },
    }
  },
  methods: {
    login() {
      this.get(this.url.login, {username: this.form.username, password: this.form.password}, response => {
        Notify({type: 'success', message: '登录成功',duration: 500,});
        this.$store.commit('SET_TOKEN', response.token)
        this.$store.commit('SET_CONSUMER', response.consumer)
        this.imgUrl = require('../../assets/login/login.png')
        this.$router.back()
      });
    },
    checkImg() {
      if (this.$store.getters.GET_TOKEN) {
        if (this.$store.getters.GET_CONSUMER.username === this.form.username ||
            this.$store.getters.GET_CONSUMER.phone === this.form.username) {
          this.imgUrl = IMG_URL + this.$store.getters.GET_CONSUMER.img
        } else {
          this.imgUrl = require('../../assets/login/login.png')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  @top_top: 15vh;
  @top_left: 35vw;
  @img: 100px;
.myform {
  margin-top: 2vh;
  width: 80vw;
  margin-left: 10vw;
}
.img {
  width: @img;
  height: @img;
  display: inline-block;
}
.button{
  border: none;
  color: #323233;
  margin-right: 10vw;
  margin-left: 10vw;
  height: 3vh;
  width: 30vw;
}
.submit{
  background: red;
  border: none
}

#top {
  margin-top: @top_top;
  text-align:center;
}

#footer {
  margin-top: 30px;
}

</style>
