<template>
  <div style="background: #f2f2f2;">
    <van-grid style="margin-bottom: 2vh;" border clickable :column-num="2">
      <van-grid-item
          v-for="(item,index) in myList"
          :key="index"
          :icon="item.img"
          :text="item.message"
          :to="item.to">
      </van-grid-item>
    </van-grid>
    <van-cell size="large"
              title="我的订单"
              is-link
              :to="this.url.toAll"
              value="全部"/>
    <van-grid border clickable :column-num="5">
      <van-grid-item
          v-for="(item,index) in myItemList"
          :key="index"
          :icon="item.img"
          :text="item.message"
          :to="item.to">
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {IMG_URL} from "@/config/config";

export default {
  name: "myMainForm",
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.url.toAll = {path: '/order', query: {active: 0}}
      this.myList = [
        {message: '收藏', img: 'star-o', to: '/favorite'},
        {message: '足迹', img: 'clock-o', to: '/footPrint'},
      ]
      this.myItemList=[
        {message: '待付款', img: 'balance-list-o', to: {path: '/order', query: {active: 1}}},
        {message: '待收货', img: 'logistics', to: {path: '/order', query: {active: 2}}},
        {message: '待评价', img: 'chat-o', to: {path: '/order', query: {active: 3}}},
        {message: '已完成', img: 'completed', to: {path: '/order', query: {active: 4}}},
        {message: '已取消', img: 'failure', to: {path: '/order', query: {active: 5}}},
      ]
    }
  },
  data() {
    return {
      url: {
        toAll: '/login'
      },
      myList: [
        {message: '收藏', img: 'star-o', to: '/login'},
        {message: '足迹', img: 'clock-o', to: '/login'},
      ],
      myItemList: [
        {message: '待付款', img: 'balance-list-o', to: '/login'},
        {message: '待收货', img: 'logistics', to: '/login'},
        {message: '评价', img: 'chat-o', to: '/login'},
        {message: '已完成', img: 'completed', to: '/login'},
        {message: '已取消', img: 'failure', to: '/login'},
      ],
    }
  },
}
</script>

<style scoped lang="less">
.van-grid{
  border-radius: 10px;
}
</style>
