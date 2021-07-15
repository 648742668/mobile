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
        <SwitchPasswordType
            class="password"
            v-model="form.password"
            label="新密码"
            placeholder="请输入新密码"
        ></SwitchPasswordType>
        <SwitchPasswordType
            v-model="validValue"
            class="password"
            label="新密码"
            placeholder="请再次输入新密码"
        ></SwitchPasswordType>
        <van-button
            class="button"
            plain
            type="info"
            round
            size="small"
        >修改
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import SwitchPasswordType from "@/components/password/switchPasswordType";
import {Notify} from "vant";

export default {
  name: "changePassword",
  components: {SwitchPasswordType, [Notify.Component.name]: Notify.Component,},
  created() {
    if (this.$store.getters.GET_CHANGEPWD) {
      this.form.username = this.$store.getters.GET_CONSUMER.username
    } else {
      this.$router.push({
        path: '/login'
      })
    }
  },
  data() {
    const module = '/consumer'
    return {
      url: {
        changePwd: module + '/changePwd'
      },
      appImgUrl: require('../../assets/password/changePassword.png'),
      form: {
        username: '',
        password: '',
      },
      rules: {},
      validValue: ''
    }
  },
  methods: {
    save() {
      if (this.form.password !== this.validValue) {
        Notify({type: 'danger', message: '两次密码不一致'});
        return
      }
      this.post(this.url.changePwd, this.form, response => {
        if (response) {
          Notify({type: 'success', message: '修改成功'});
          this.$store.commit('SET_TOKEN', '')
          this.$store.commit('SET_CONSUMER', {})
          this.$store.commit('SET_CHANGEPWD', '')
          console.log(this.$store.getters.GET_TOKEN)
          console.log(this.$store.getters.GET_CONSUMER)
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
