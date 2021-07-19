<template>
  <div>
    <div id="head">
      <van-nav-bar
          title="地址管理"
          left-arrow
          @click-left="onClickLeft">
        <van-icon slot="left" size="25px"
                  color="#9E9999"
                  name="arrow-left"/>
      </van-nav-bar>
    </div>
    <div id="main">
      <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @edit="onEdit"
          @add="onAdd"
      />
    </div>
  </div>
</template>

<script>
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
      let addressId = this.$route.query.addressId

      this.get(this.url.getByConsumerId,{id:this.id},response=>{
        for (let i = 0 ; i< response.length;i++){
          this.list.push({
            id:response[i].id,
            name:response[i].recvName,
            tel:response[i].recvPhone,
            address: response[i].province +response[i].city +response[i].county +response[i].address
          })
          if(addressId && addressId == response[i].id) {
            this.chosenAddressId = response[i].id
          }
          if (response[i].firstPick === 1){
            this.list[i].isDefault=true
            if(!addressId) {
              this.chosenAddressId = response[i].id
            }
          }else{
            this.list[i].isDefault=false
          }
        }
      })
    },
    onClickLeft() {
      let query = this.$route.query
      if(query.cartselectedItem || query.piid) {
        console.log(this.chosenAddressId)
        query.addressId = this.chosenAddressId
        this.$router.push({
          path:'/checkout',
          query: query
        })
      } else {
        this.$router.back()
      }

    },
    onEdit(item, index){
      this.$router.push({
        name:'addressEdit',
        query:{
          addressId:JSON.stringify(item.id)
        }
      })
    },
    onAdd(){
      this.$router.push({
        path:'/addressEdit',
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
