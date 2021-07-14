<template>
  <div>
    <van-dialog
        v-model="show" :message="message"
        :title="title" show-cancel-button
        theme="round-button"
        message-align="left"
        @confirm = "agree"
        @cancel="backLogin"
        confirm-button-text="同意"
        cancel-button-text="不同意">
    </van-dialog>
    <signForm v-if="signShow"></signForm>
  </div>
</template>

<script>
import signForm from "@/views/sign/signForm";
export default {
  name: "signIndex",
  created() {
    // this.$dialog.confirm({
    //   title: this.title,
    //   message: this.message,
    // }).then(() => {
    // }).catch(() => {
    //   this.$router.back();
    // })
  },
  data() {
    return {
      show: true,
      signShow:false,
      title: '注册协议以及隐私政策',
      message: '重要提示： 请您仔细阅读以下条款，并确认您已完全理解本协议之规定，尤其是免除及限制责任的条款、知识产权条款、法律适用及争议解决条款。\n' +
          '\n' +
          '如您对本声明或本协议任何条款有异议，请停止注册或使用电商APP（包括dianshangAPP.com、名称为“电商”的手机端、电脑等设备客户端应用程序，下同）软件及所提供的全部服务。\n' +
          '\n' +
          '作者：ljh\n' +
          '来源：ljh\n' +
          '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。'
    }
  },
  components:{
    signForm
  },
  methods: {
    agree(){
      this.show = false
      this.signShow = true
    },
    backLogin(){
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">


</style>
