<template>
  <div>
    <van-nav-bar
        title="密码验证"
        left-arrow
        :border="false"
        @click-left="$router.back()">
      <van-icon slot="left" size="25px"
                color="#9E9999"
                name="arrow-left"/>
    </van-nav-bar>
    <div id="top">
      <van-image
          class="img"
          alt="APP logo"
          :src="appImgUrl">
      </van-image>
    </div>
    <div id="main">
      <van-form
          ref="forgetPwdForm"
          class="forgetPwdForm"
          :validate-first="true"
          @submit="save">
        <van-field
            v-if="nameShow"
            v-model="form.username"
            label-width="4em"
            clearable
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="rules.username"
        ></van-field>
        <SwitchPasswordType
            v-model="form.password"
            label="密码"
            placeholder="请输入密码"
        ></SwitchPasswordType>
        <van-button
            class="button"
            plain
            type="info"
            style="background: #4BC386"
            round
            size="small"
        >下一步
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import SwitchPasswordType from "@/components/password/switchPasswordType";
import {Notify} from 'vant';
export default {
  name: "pwdByPwd",
  components: {SwitchPasswordType,[Notify.Component.name]: Notify.Component,},
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.nameShow = false
      this.form.username = this.$store.getters.GET_CONSUMER.username
    }
  },
  data() {
    const module = '/consumer'
    return {
      url: {
        pwdByPwd: module + '/pwdByPwd'
      },
      appImgUrl: require('../../../../assets/password/pwdByPwd.png'),
      form: {
        username: '',
        password:'',
      },
      rules: {
        username: [
          {required: true, message: '请填写用户名'},
          {pattern: /^[a-zA-Z]\w{5,50}$/, message: '第一个字符必须是英文，长度超过5个字符'},
        ],
      },
      nameShow: true,
    }
  },
  methods: {
    save() {
      this.post(this.url.pwdByPwd,
          {
            username: this.form.username,
            password: this.form.password
          },
          response => {
            if (response.check) {
              this.$store.commit('SET_TOKEN', response.token)
              this.$store.commit('SET_CONSUMER', response.consumer)
              this.$store.commit('SET_CHANGEPWD', response.changePwd)
              Notify({type: 'success', message: '验证成功'});
              this.$router.push({
                path: '/changePwd',
              })
            }
          })
    },
  }
}
</script>

<style scoped lang="less">
@top_top: 15vh;
@top_left: 35vw;
@img: 100px;
#top {
  margin-top: @top_top;
  text-align:center;
}

#main {
  margin-left: 30px;
  margin-top: 30px;
}

.img {
  width: @img;
  height: @img;
  display: inline-block;
}

.button {
  height: 50px;
  width: 70vw;
  border: none;
  background: #1989fa;
  color: white;
  margin-left: 5vw;
  margin-top: 3vh;
}
</style>

