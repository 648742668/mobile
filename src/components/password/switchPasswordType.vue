<template>
  <div>
    <template>
      <van-field
          v-model="password"
          :type="passwordType"
          :placeholder="placeholder"
          round
          @input="$emit('input',password)"
          clearable
          :rules="[{required: true, message: '请填写密码' , trigger: 'blur'}]">
        <template slot="left-icon">
          <van-image
              style="width: 25px;margin-right: 20px"
              :src="img"
          @click.stop="switchPasswordType">
          </van-image>
        </template>
      </van-field>
    </template>
  </div>
</template>

<script>
export default {
  name: "switchPasswordType",
  props: {
    /**
     * 密码输入的值
     * */
    inputValue: {
      type: String,
      default: '',
    },
    /**
     * 密码提示词
     * */
    placeholder: {
      type: String,
      default: '请输入密码'
    },
  },
  created() {
    this.password = this.inputValue
    this.img = this.passwordType ==='password'?this.closeImg:this.openImg
  },
  data() {
    return {
      password: '',
      passwordType: 'password',
      openImg:require('../../assets/passwordOpen.png'),
      closeImg:require('../../assets/passwordClose.png'),
      img:''
    }
  },
  methods:{
    switchPasswordType(){
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
      this.img = this.passwordType ==='password'?this.closeImg:this.openImg
    }
  }
}
</script>

<style scoped>

</style>
