<template>
  <div>
    <van-form
        ref="signForm"
        class="signForm"
        :validate-first="true"
        @submit="save">
      <div class="title">{{ title }}</div>
      <van-field
          v-model="form.username"
          label-width="4em"
          clearable
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="rules.username"
      ></van-field>
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
      <van-field
          v-model="form.nickname"
          label-width="4em"
          clearable
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="rules.nickname"
      ></van-field>
      <van-field
          v-model="form.email"
          label-width="4em"
          clearable
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="rules.email"
      ></van-field>
      <van-field
          v-model="form.phone"
          label-width="4em"
          clearable
          name="电话"
          label="电话"
          placeholder="电话"
          :rules="rules.phone"
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
      >提交
      </van-button>
    </van-form>
  </div>
</template>

<script>
import { Notify } from 'vant';
import SwitchPasswordType from "@/components/password/switchPasswordType";

export default {
  name: "signForm",
  props: {},
  components: {SwitchPasswordType,  [Notify.Component.name]: Notify.Component,},
  created() {

  },
  data() {
    const module = '/consumer'
    return {
      url: {
        getData: module + '/getData',
        add: module + '/add',
        checkName: module + '/checkName',
        checkPhone: module + '/checkPhone',
        checkPassword: module + '/checkPassword'
      },
      title: '注册用户',
      validValue: '',
      form: {
        rawQuestion: '',
        username: '',
        rawPassword: '',
        nickname: '',
        phone: '',
        email:'',
        img: '20210713114025958634367.png',
        rawAnswer: '',
      },
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
      answerShow: true,
      rules: {
        username: [
          {required: true, message: '请填写用户名'},
          {pattern: /^[a-zA-Z]\w{5,50}$/, message: '第一个字符必须是英文，长度超过5个字符'},
        ],
        nickname: [
          {required: true, message: '请填写昵称'},
        ],
        email:[
          {required: true, message: '请填写邮箱'},
          {pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱'}
        ],
        phone: [
          {pattern: /^1([38][0-9]|4[5-9]|5[0-3,5-9]|66|7[0-8]|9[89])[0-9]{8}$/, message: '请输入正确的手机号'},
        ],
        rawAnswer: [
          {required: true, message: '请填写密保答案'},
        ]
      }
    }
  },
  methods: {
    onConfirm(value) {
      this.form.rawQuestion = value;
      this.showPicker = false;
      this.answerShow = false;
    },
    oncancel() {
      this.showPicker = false;
    },
    save() {
      if (this.form.rawPassword !== this.validValue) {
        Notify({type: 'danger', message: '两次密码不一致'});
        return
      }
      this.post(this.url.add, this.form, response => {
        if (response === true) {
          Notify({type: 'success', message: '注册成功'});
          this.$router.push({
            path: '/login'
          })
        }
      })
    },
  }
}
</script>

<style scoped lang="less">

.signForm {
  text-align:center;
  margin-top: 100px;
  .title {
    margin-bottom: 3vh;
    display: inline-block;
  }

  .button {
    height: 50px;
    width: 60vw;
    border: none;
    background: #1989fa;
    color: white;
    margin-top: 3vh;
    display: inline-block;
  }

}
</style>
