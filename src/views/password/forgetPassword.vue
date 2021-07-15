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
        <van-field
            readonly
            clickable
            label="密保问题"
            label-width="56px"
            :value="form.rawQuestion"
            placeholder="选择问题"
            @click="showPicker = true"
        />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
              show-toolbar
              :columns="questList"
              @cancel="oncancel"
              @confirm="onConfirm"
          />
        </van-popup>
        <van-field
            v-model="form.rawAnswer"
            label-width="4em"
            clearable
            :disabled="answerShow"
            name="密保答案"
            label="密保答案"
            placeholder="密保答案"
            :rules="rules.rawAnswer"
        ></van-field>
        <van-button
            class="button"
            plain
            :disabled="answerShow"
            type="info"
            round
            size="small"
        >下一步
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import {Notify} from 'vant';

export default {
  name: "forgetPassword",
  components: {[Notify.Component.name]: Notify.Component,},
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.nameShow = false
      this.rules.username.push()
      this.form.username = this.$store.getters.GET_CONSUMER.username
    }
  },
  data() {
    const module = '/consumer'
    return {
      url: {
        forgetPwd: module + '/forgetPwd'
      },
      appImgUrl: require('../../assets/password/securityQuestion.png'),
      form: {
        rawQuestion: '',
        rawAnswer: '',
        username: '',
      },
      rules: {
        username: [
          {required: true, message: '请填写用户名'},
          {pattern: /^[a-zA-Z]\w{5,50}$/, message: '第一个字符必须是英文，长度超过5个字符'},
        ],
        rawAnswer: [
          {required: true, message: '请填写密保答案'},
        ]
      },
      nameShow: true,
      answerShow: true,
      showPicker: false,
      questList: [
        '没安全提示问题',
        '你喜欢的格言',
        '你家乡的名称',
        '你读的小学叫什么',
        '你的父亲叫什么名字',
        '你的母亲叫什么名字',
        '你最喜欢的偶像是谁',
        '你最喜欢的歌曲是什么'],
    }
  },
  methods: {
    save() {
      this.post(this.url.forgetPwd,
          {
            username: this.form.username,
            rawQuestion: this.form.rawQuestion,
            rawAnswer: this.form.rawAnswer
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
    oncancel() {
      this.showPicker = false;
    },
    onConfirm(value) {
      this.form.rawQuestion = value;
      this.showPicker = false;
      this.answerShow = false;
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
