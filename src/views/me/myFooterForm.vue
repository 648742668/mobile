<template>
  <div>
    <van-button
        v-if="showButton"
        class="button"
        plain
        @click="exit"
        type="info"
        round
        size="small"
    >退出登录
    </van-button>
  </div>
</template>

<script>
import {IMG_URL} from "@/config/config";

export default {
  name: "myFooterForm",
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.showButton = true
    }
  },
  data() {
    return {
      showButton: false,
    }
  },
  methods:{
    exit(){
      this.$store.commit('SET_TOKEN', '')
      this.$store.commit('SET_CONSUMER', {})
      this.$store.commit('SET_CHANGEPWD', '')
      this.$emit('reload')
    }
  }
}
</script>

<style scoped lang="less">
.button {
  font-size: 20px;
  height: 50px;
  width: 80vw;
  border: none;
  background: #1989fa;
  color: white;
  margin-left: 8vw;
  margin-top: 3vh;
}
</style>
