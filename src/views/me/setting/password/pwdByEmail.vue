<template>
  <div>
    <van-nav-bar
        title="邮箱验证"
        left-arrow
        :border="false"
        @click-left="$router.back()">
      <van-icon slot="left" size="25px"
                color="#9E9999"
                name="arrow-left"/>
    </van-nav-bar>
    <div id="top">
      <van-image
          round
          class="img"
          alt="APP logo"
          :src="appImgUrl">
      </van-image>
    </div>
    <div id="main">
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
      <h4>{{ title }}</h4>
      <span style="margin-top: 10px">{{ message }}</span>
      <div class="code">
        <van-field
            v-model="form.code"
            center
            clearable
            label="验证码"
            label-width="55px"
            placeholder="请输入验证码">
          <template #button>
            <van-button
                native-type="button"
                style="border: none;background:#50D3C1;color: white"
                @click.self="sendCode"
                size="small" >发送验证码
            </van-button>
          </template>
        </van-field>
      </div>
      <van-button
          class="button"
          plain
          :disabled="nextShow"
          type="info"
          round
          style="background: #50D3C1"
          @click="save"
          size="small"
      >下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import {Notify,Toast} from 'vant';

export default {
  name: "pwdByEmail",
  components: {[Notify.Component.name]: Notify.Component,},
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.nameShow = false
      this.form.username = this.$store.getters.GET_CONSUMER.username
      this.message = '请输入' + this.$store.getters.GET_CONSUMER.email.substring(0, 3) + "*****"
          + '@qq.com收到的邮箱验证码'
    }
  },
  data() {
    const module = '/consumer'
    return {
      url: {
        sendEmail: module + '/sendEmail',
        pwdByEmail: module + '/pwdByEmail'
      },
      title: '请完成以下认证',
      message: '',
      appImgUrl: require('../../../../assets/password/pwdByEmail.png'),
      form: {
        username: '',
        code: '',
      },
      rules: {
        username: [
          {required: true, message: '请填写用户名'},
          {pattern: /^[a-zA-Z]\w{5,50}$/, message: '第一个字符必须是英文，长度超过5个字符'},
        ],
      },
      nameShow: true,
      nextShow: true,
    }
  },
  methods: {
    save() {
      if (this.form.code.length != 6){
        Toast.fail('请输入正确的验证码');
        return
      }
      this.post(this.url.pwdByEmail,
          {
            username: this.form.username,
            code: this.form.code
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
    sendCode() {
      if (this.form.username.length<=0){
        Toast.fail("请输入用户名")
        return
      }
      this.nextShow = false
      this.post(this.url.sendEmail, {username: this.form.username,kind: 2}, response => {
          if(response){
            Toast.success("邮件发送成功")
          }
      })
    }
  }
}
</script>

<style scoped lang="less">
@top_top: 15vh;
@top_left: 35vw;
@img: 100px;
#top {
  margin-top: @top_top;
  text-align: center;
}

#main {
  margin-left: 30px;
  margin-top: 30px;
}

.code {
  margin-top: 20px;
  display: flex;

  .send {
    width: 30vw;
  }
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
