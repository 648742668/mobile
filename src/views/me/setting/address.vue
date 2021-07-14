<template>
  <div>
    <div id="head">
      <van-nav-bar
          title="地址管理"
          left-arrow
          @click-left="onClickLeft"
      />
    </div>
    <div id="main">
      <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
      />
    </div>
    <div id="footer">
      <van-button @click="query">
        查看
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addressList",
  data(){
    return{
      chosenAddressId:'2',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
    }
  },
  created() {
    if (!this.$store.getters.GET_TOKEN) {
      this.$router.push({
        path: '/login'
      })
    }else{
      this.getData()
    }
  },
  methods:{
    getData(){
      console.log("test")
    },
    onClickLeft() {
      this.$router.back();
    },
    onLoad(){

    },
    query(){
      this.loading = false;
      this.finished = true;
    }
  }
}
</script>

<style scoped lang="less">

</style>
