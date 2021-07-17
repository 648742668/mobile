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
        :show-delete="this.showDel"
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
    />
  </div>

</template>

<script>
import {Toast} from 'vant';
import {Dialog} from 'vant';
import {areaList} from '@/mock/address'

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
      if (this.$route.query.addressId) {
        this.getone();
        this.AddressInfo.id = this.$route.query.addressId
        this.showDel = true
      }
    }
  },
  data() {
    const module = '/address'
    return {
      url: {
        getone: module + '/getone',
        update: module + '/update',
        add: module + '/add',
        del: module + '/del'
      },
      showDel: false,
      AddressInfo: {
        id: '',
        name: '',//姓名
        tel: '',//电话
        province: '',//省份
        city: '',//城市
        county: '',//区县
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
      this.get(this.url.getone, {id: this.$route.query.addressId}, response => {
        this.AddressInfo.id = response.id
        this.AddressInfo.name = response.recvName
        this.AddressInfo.tel = response.recvPhone
        this.AddressInfo.addressDetail = response.address
        this.AddressInfo.province = response.province
        this.AddressInfo.city = response.city
        this.AddressInfo.county = response.county
        let province = ''
        let city = ''
        let county = ''
        for (let key in areaList.province_list) {
          if (areaList.province_list[key] === response.province) {
            province = key.substring(0, 2)
            break
          }
        }
        for (let key in areaList.city_list) {
          if (areaList.city_list[key] === response.city && key.substring(0, 2) === province) {
            city = key.substring(0, 4)
            break
          }
        }
        for (let key in areaList.county_list) {
          if (areaList.county_list[key] === response.county && key.substring(0, 4) === city) {
            county = key
            break
          }
        }
        this.AddressInfo.areaCode = county
        if (response.firstPick === 1) {
          this.AddressInfo.isDefault = true
        }
      })
    },
    onSave(content) {
      content.id = this.AddressInfo.id
      content.recvName = content.name
      content.recvPhone = content.tel
      content.address = content.addressDetail
      content.consumerId = this.$store.getters.GET_CONSUMER.id
      if (content.isDefault) {
        content.firstPick = 1
      } else {
        content.firstPick = 0
      }
      this.post(this.$route.query.addressId ? this.url.update : this.url.add, content, response => {
        this.$router.back();
      })
    },
    onDelete() {
      this.post(this.url.del,{id:this.AddressInfo.id}, response => {
        this.$router.back();
      })
    },
    onClickLeft() {
      this.$router.back();
    },
  }
}
</script>

<style scoped lang="less">

</style>
