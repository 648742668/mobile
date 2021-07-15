<template>
  <div>
    <div id="head">
      <van-nav-bar
          title="编辑收货地址"
          left-arrow
          @click-left="onClickLeft"
      />
    </div>
    <van-address-edit
        :address-info="AddressInfo"
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
    />
    <div>
      <van-button @click="query">查看</van-button>
    </div>
  </div>

</template>

<script>

import {Dialog} from 'vant';
import {areaList} from '@/config/address'

export default {
  name: "addressEdit",
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  created() {
    if (!this.$store.getters.GET_TOKEN) {
      this.$router.push({
        path: '/login'
      })
    } else {
      if (this.$route.params.addressId) {
        this.getone();
      } else {
        this.$router.push({
          path: '/userSetting'
        })
      }
    }
  },
  data() {
    const  module = '/address'
    return {
      url:{
        getone:module+'/getone'
      },
      AddressInfo:{
        name:'',//姓名
        tel:'',//电话
        province:'',//省份
        city:'',//城市
        country:'',//区县
        areaCode:'',//地址code：ID
        addressDetail:'',//详细地址
        isDefault:false,//是否选择默认
      },
      areaList: areaList,
      searchResult: [],
    }
  },
  methods: {
    getone(){
      this.get(this.url.getone,{id:this.$route.params.addressId},response=>{
        console.log(response)
      })
    },
    onSave(content) {
      console.log(content)
    },
    onDelete() {
      console.log(this.$route.params.address)
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    query() {
    }
  }
}
</script>

<style scoped lang="less">

</style>
