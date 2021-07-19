<template>
    <div class="checkoutContainer">
        <van-sticky>
            <van-nav-bar
                    title="填写订单"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"/>
        </van-sticky>
        <van-cell icon="location-o"
                  center
                  is-link
                  :to="toAddressPage"
                  style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;"
                  :label="addr.address">
            <template #title>
                {{addr.name + ' ' + addr.phone}}
                <van-tag type="danger" v-if="addr.isDefault"> 默认</van-tag>
            </template>
        </van-cell>

        <div class="itemList">
            <div v-for="item in cartItems" :key="item.cartItemId">
                <div class="itemCard">
                    <div class="left">
                        <van-image
                                width="85"
                                height="85"
                                fit="fill"
                                :src="img(item.productImg)"/>
                    </div>
                    <div class="right">
                        <div class="title">
                            {{ item.productName }}
                        </div>
                        <div class="sku">
                            {{ getSku(item) }}
                        </div>
                        <div class="price">
                            ￥
                            <span style="font-weight: bolder; font-size: 22px">
                                {{Number(item.price * item.count).toFixed(2)}}
                            </span>
                            <van-stepper v-model="item.count"
                                         disable-input
                                         :max="item.stock"
                                         style="float: right;margin-top: -6px;"
                                         @change="changeCount"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 5px">
            <van-cell style="border-radius: 10px" is-link title="支付方式" @click="show = true" value="支付宝"/>
            <van-action-sheet v-model="show" :actions="payMethod" close-on-click-action cancel-text="取消"/>
        </div>

        <van-submit-bar :price="total * 100"
                        button-text="提交订单"
                        :disabled="total === 0"
                        @submit="submitOrder">
        </van-submit-bar>
    </div>
</template>

<script>

	export default {
		name: "checkout",
		data() {
			return {
				payMethod: [
                    {name: '支付宝'},
                    {name: '微信', disabled: true}
                ],
				show: false,
				consumerId: this.$store.getters.GET_CONSUMER.id,

				piid: null,
				count: null,

				cartItems: [],

				addr: {
					id: '',
					address: '',
					name: '',
					phone: '',
					isDefault: false
				},
				toAddressPage: {
					path: '/address',
                    query: {

                    }
                },

				total: 0,
			}
		},
		methods: {
			onClickLeft() {
				let flag = this.$route.query.addressId
                if(flag) {
					this.$router.go(-2)
                } else {
                	this.$router.back()
                }

			},
			getSku(item) {
				let str = ''
				for (let i = 0; i < item.selectedSkus.length; i++) {
					str += item.selectedSkus[i].value + ','
				}
				return str.substr(0, str.length - 1)
			},
			changeCount() {
				this.total = 0;
				for (let i = 0; i < this.cartItems.length; i++) {
					this.total += this.cartItems[i].price * this.cartItems[i].count
				}
			},
			submitOrder() {
				// console.log(this.cartItems)
                // console.log(this.consumerId)
                // console.log(this.addr.id)
                this.post('/order/submitOrder', {cartItemVOS: JSON.stringify(this.cartItems), consumerId: this.consumerId, addressId: this.addr.id}, res => {
					this.$router.push({
						path: '/paymentWakeup',
						query: {
                            orderId: res
						}
					})
                })
			}
		},
		created() {
			let addressId = this.$route.query.addressId
			this.cartItems = []
            if(addressId) {
				this.toAddressPage.query.addressId = addressId
            }
			if (this.$route.query.piid) {
				this.piid = this.$route.query.piid
				this.count = this.$route.query.count
				this.toAddressPage.query.piid = this.piid
				this.toAddressPage.query.count = this.count
                this.get('/cart/productCheckout', {consumerId: this.consumerId, productItemId: this.piid}, res => {
					this.cartItems.push(res.item)
                    this.cartItems[0].count = this.count
                    this.changeCount()
					let addressList = res.addressList
                    if(addressId) {
						for (let i = 0; i < addressList.length; i++) {
							let addr = addressList[i]
							if (addr.id == addressId) {
								this.addr.id = addr.id
								this.addr.address = addr.province + addr.city + addr.county + addr.address
								this.addr.name = addr.recvName
								this.addr.phone = addr.recvPhone
								this.addr.isDefault = addr.firstPick === 1
								return
							}
						}
                    }
					for (let i = 0; i < addressList.length; i++) {
						let addr = addressList[i]
						if (addr.firstPick === 1) {
							this.addr.id = addr.id
							this.addr.address = addr.province + addr.city + addr.county + addr.address
							this.addr.name = addr.recvName
							this.addr.phone = addr.recvPhone
							this.addr.isDefault = true
							return
						}
					}
					if (addressList.length > 0) {
						this.addr.id = addressList[0].id
						this.addr.address = addressList[0].province + addressList[0].city + addressList[0].county + addressList[0].address
						this.addr.name = addressList[0].recvName
						this.addr.phone = addressList[0].recvPhone
					}
                })
			} else {
				this.cartItems = this.$route.query.cartselectedItem
				this.toAddressPage.query.cartselectedItem = this.cartItems
				this.get('/cart/cartCheckout', {consumerId: this.consumerId, cartItemIds: this.cartItems}, res => {
					this.cartItems = res.cartItems
					this.changeCount()
					let addressList = res.addressList
					if(addressId) {
						for (let i = 0; i < addressList.length; i++) {
							let addr = addressList[i]
							if (addr.id == addressId) {
								this.addr.id = addr.id
								this.addr.address = addr.province + addr.city + addr.county + addr.address
								this.addr.name = addr.recvName
								this.addr.phone = addr.recvPhone
								this.addr.isDefault = addr.firstPick === 1
								return
							}
						}
					}
					for (let i = 0; i < addressList.length; i++) {
						let addr = addressList[i]
						if (addr.firstPick === 1) {
							this.addr.id = addr.id
							this.addr.address = addr.province + addr.city + addr.county + addr.address
							this.addr.name = addr.recvName
							this.addr.phone = addr.recvPhone
							this.addr.isDefault = true
							return
						}
					}
					if (addressList.length > 0) {
						this.addr.id = addressList[0].id
						this.addr.address = addressList[0].province + addressList[0].city + addressList[0].county + addressList[0].address
						this.addr.name = addressList[0].recvName
						this.addr.phone = addressList[0].recvPhone
					}
				})
			}

		}
	}
</script>

<style scoped lang="less">
    .checkoutContainer {
        width: 100vw;
        height: calc(100vh - 50px);
        background-color: #F2F2F2;
        overflow-x: hidden;
        overflow-y: scroll;

        .itemList {
            background-color: white;
            margin-top: 15px;
            margin-bottom: 15px;
            border-radius: 10px;

            .itemCard {
                width: 103vw;
                height: 135px;
                padding: 10px 15px;
                border-bottom: 0.5px solid #F2F2F2;

                .left {
                    float: left;
                    width: 85px;
                    height: 85px;
                    border-radius: 10px;
                    /*margin-top: 5%;*/

                }

                .right {
                    margin-left: 10px;
                    margin-top: 10px;
                    float: left;
                    width: calc(100vw - 120px);
                    height: 100%;

                    .title {
                        height: 32px;
                        line-height: 16px;
                        font-size: 15px;
                        word-wrap: break-word;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }

                    .sku {
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        font-size: 12px;
                        color: #a4a4a4;
                        border-radius: 10px;
                        margin-top: 15px;
                        margin-bottom: 15px;
                        padding-left: 3px;
                        padding-right: 3px;
                        vertical-align: middle;
                    }

                    .price {
                        color: #F4381C;
                        vertical-align: bottom;
                        height: 25px;
                    }
                }
            }


        }


    }

</style>
