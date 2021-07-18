<template>
  <div style="background: #f2f2f2;">
    <van-grid style="margin-bottom: 2vh;" border clickable :column-num="2">
      <van-grid-item
          v-for="(item,index) in myList"
          :key="index"
          :icon="item.img"
          :to="item.to">
        <span slot="text" style="margin-left: 8px">{{item.message}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell size="large"
              title="我的订单"
              is-link
              :to="this.url.toAll"
              value="全部"/>
    <van-grid
        v-if="!show"
        border clickable :column-num="5">
      <van-grid-item
          v-for="(item,index) in myItemList"
          :key="index"
          :icon="item.img"
          :text="item.message"
          :to="item.to">
      </van-grid-item>
    </van-grid>
    <van-grid
        v-if="show"
        border clickable :column-num="5">
      <van-grid-item
          v-for="(item,index) in myItemList"
          :key="index"
          :icon="item.img"
          :text="item.message"
          :to="item.to"
          :badge="item.badge">
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>


export default {
  name: "myMainForm",
  created() {
    if (this.$store.getters.GET_TOKEN) {
      this.url.toAll = {path: '/order', query: {active: 0}}
      this.show = true;
      this.getDate()
    }
  },
  data() {
    const module = '/consumer'
    return {
      show:false,
      url: {
        toAll: '/login',
        getOtherDate: module+'/getOtherDate'
      },
      myList: [
        {message: '收藏', img: 'star-o', to: '/login'},
        {message: '足迹', img: 'clock-o', to: '/login'},
      ],
      myItemList: [
        {message: '待付款', img: 'balance-list-o', to: {path: '/order', query: {active: 1}}},
        {message: '待收货', img: 'logistics', to: {path: '/order', query: {active: 2}}},
        {message: '评价', img: 'chat-o', to: {path: '/order', query: {active: 3}}},
        {message: '已完成', img: 'completed', to: {path: '/order', query: {active: 4}}},
        {message: '已取消', img: 'failure', to: {path: '/order', query: {active: 5}}},
      ],
    }
  },
  methods: {
    getDate(){
      this.myList = [
        {name: 'favorites',message: '收藏', img: 'star-o', to: '/favorite'},
        {name: 'foot',message: '足迹', img: 'clock-o', to: '/footPrint'},
      ]
      this.myItemList = [
        {name:'noPay',message: '待付款', img: 'balance-list-o', to: '/forgetPwd',badge:null},
        {name:'waitProduct',message: '待收货', img: 'logistics', to: '/forgetPwd',badge:null},
        {name:'noAssess',message: '评价', img: 'chat-o', to: '/forgetPwd',badge:null},
        {name:'finish',message: '已完成', img: 'completed', to: '/forgetPwd',badge:null},
        {name:'canel',message: '已取消', img: 'failure', to: '/forgetPwd',badge:null},
      ]
      this.get(this.url.getOtherDate,{id:this.$store.getters.GET_CONSUMER.id},
      response=>{
        for(let key in response){
          for (let i in this.myList){
            if(this.myList[i].name === key){
              this.myList[i].message +="  "+response[key]
              break
            }else{
              continue
            }
          }
          for (let i in this.myItemList){
            if(this.myItemList[i].name === key){
              this.myItemList[i].badge = response[key]
              break
            }else{
              continue
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-grid{
  border-radius: 10px;
}
</style>
