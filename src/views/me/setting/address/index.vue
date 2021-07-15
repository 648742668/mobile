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
          @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import {areaList} from '@/config/address'
export default {
  name: "addressList",
  data(){
    const module = '/address'
    return{
      chosenAddressId:'',
      url:{
        getByConsumerId:module + '/getByConsumerId'
      },
      id:'',
      list: [],
    }
  },
  created() {
    if (!this.$store.getters.GET_TOKEN) {
      this.$router.push({
        path: '/login'
      })
    }else{
      this.id = this.$store.getters.GET_CONSUMER.id
      this.getData()
    }
  },
  methods:{
    getData(){
      this.get(this.url.getByConsumerId,{id:this.id},response=>{
        for (let i = 0 ; i< response.length;i++){
          this.list.push({
            id:response[i].id,
            name:response[i].recvName,
            tel:response[i].recvPhone,
            address: areaList.province_list[response[i].province]
                +areaList.city_list[response[i].city]
                +areaList.county_list[response[i].county]
                +response[i].address
          })
          if (response[i].firstPick === 1){
            this.list[i].isDefault=true
            this.chosenAddressId = response[i].id
          }else{
            this.list[i].isDefault=false
          }
        }
      })
    },
    onClickLeft() {
      this.$router.back();
    },
    onEdit(item, index){
      this.$router.push({
        name:'addressEdit',
        params:{
          addressId:item.id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
