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
    const module = '/address'
    return {
      url: {
        getone: module + '/getone'
      },
      AddressInfo: {
        name: '',//姓名
        tel: '',//电话
        province: '',//省份
        city: '',//城市
        country: '',//区县
        areaCode: '',//地址code：ID
        addressDetail: '',//详细地址
        isDefault: false,//是否选择默认
      },
      areaList: areaList,
      searchResult: [],
    }
  },
  methods: {
    getone() {
      this.get(this.url.getone, {id: this.$route.params.addressId}, response => {
        this.AddressInfo.name = response.recvName
        this.AddressInfo.tel = response.recvPhone
        this.AddressInfo.areaCode = response.county
        this.AddressInfo.addressDetail = response.address
        this.AddressInfo.province = areaList.province_list[response.province]
        this.AddressInfo.city = areaList.city_list[response.city]
        this.AddressInfo.country = areaList.county_list[response.county]
        if (response.firstPick === 1) {
          this.AddressInfo.isDefault = true
        }
      })
    },
    onSave(content) {
      console.log(content)
    },
    onDelete() {

    },
    onChangeDetail(val) {

    },
    onClickLeft() {
      this.$router.back();
    },
  }
}
</script>

<style scoped lang="less">

</style>
