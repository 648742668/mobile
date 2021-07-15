<template>
    <div class="container">
        <van-checkbox-group v-if="!edit" v-model="checked" ref="cartCheck" @change="checkChange">
            <van-checkbox v-for="item in cart"
                          :name="item.cartItemId"
                          :key="item.cartItemId"
                          class="cartItem"
                          checked-color="#ee0a24"
                          label-disabled>
                <cart-item :item="item"
                            @changeCount="changeCount(item)">
                </cart-item>
            </van-checkbox>
        </van-checkbox-group>

        <van-checkbox-group v-if="edit" v-model="editChecked" ref="editCheck" @change="editChange">
            <van-checkbox v-for="item in cart"
                          :name="item.cartItemId"
                          :key="item.cartItemId"
                          class="cartItem"
                          label-disabled>
                <cart-item :item="item"
                           @changeCount="changeCount(item)">
                </cart-item>
            </van-checkbox>
        </van-checkbox-group>

        <van-submit-bar v-if="!edit"
                        :price="totalPrice"
                        button-text="去结算"
                        :disabled="totalPrice == 0"
                        @submit="checkout">
            <van-checkbox v-model="select" @click="selectAll" checked-color="#ee0a24">全选</van-checkbox>
        </van-submit-bar>
        <div class="delBar" v-if="edit">
            <van-checkbox class="btnAll" v-model="select" @click="selectAll"
                            style="margin-left: 16px">全选</van-checkbox>
            <van-button @click="del"
                        type="default"
                        class="btnDel">删除</van-button>
        </div>
    </div>
</template>

<script>
    import cartItem from "./components/cartItem";
	const module = '/cart'
	export default {
		name: "cartList",
        components: { cartItem },
        props: {
			category: {
				type: Array,
                default() {
					return []
				}
            },
            edit: {
				type: Boolean,
                default() {
					return false
				}
			}
        },
        data(){
			return {
				url: {
					getCart: module + '/getCart'
				},
				cart: [],
				checked:[],
				editChecked:[],
				select: false,
                totalPrice: 0.00
            }
        },
        created() {
			console.log(this.category)
            this.get(this.url.getCart,{userId: 1, categories: this.category}, res => {
            	console.log(res)
            	this.cart = res.reverse()
            })
		},
        methods: {
			selectAll() {
				if(this.select) {
					if(this.edit) {
						this.$refs.editCheck.toggleAll(true)
                    } else {
						this.$refs.cartCheck.toggleAll(true)
                    }
                }else {
					if(this.edit) {
						this.$refs.editCheck.toggleAll(false)
					} else {
						this.$refs.cartCheck.toggleAll(false)
					}
                }
            },
			checkChange() {
				this.totalPrice = 0.00
				for(let i = 0; i < this.checked.length; i++) {
					for (let j = 0; j < this.cart.length; j++) {
						if (this.cart[j].cartItemId === this.checked[i]) {
							this.totalPrice += this.cart[j].count * this.cart[j].price * 100
                        }
                    }
                }
				this.select = this.checked.length === this.cart.length;
            },
			editChange() {
				this.select = this.editChecked.length === this.cart.length;
            },
            changeCount(item) {
				this.get('/cart/setCount', {id: item.cartItemId, count: item.count}, _ => {
				})
				this.checkChange()
			},
			changeEdit() {
				this.editChecked = []
                this.checked = []
            },
			del() {
                this.post('/cart/del', {ids: this.editChecked}, _ => {
					for (let i = 0; i < this.editChecked.length; i++) {
						for (let j = 0; j < this.cart.length; j++) {
							if (this.editChecked[i] === this.cart[j].cartItemId) {
								this.cart.splice(j,1)
                            }
                        }
					}
                	this.editChecked = []
                })
			},
			checkout() {

            }
        },
	}
</script>

<style scoped lang="less">
    .container {
        padding-top: 15px;
        padding-left: 7px;
        padding-right: 7px;
    }
    .cartItem{
        background-color: white;
        margin-bottom: 15px;
    }
    .van-submit-bar {
        bottom: 50px;
    }
    .delBar {
        height: 50px;
        line-height: 50px;
        width: 100vw;
        z-index: 100;
        position: fixed;
        bottom: 50px;
        left: 0;
        background-color: white;

        .btnAll {
            float: left;
            height: 100%;
            line-height: 100%;
            font-size: 14px;
        }
        .btnDel {
            float: right;
            width: 110px;
            height: 40px;
            font-weight: 500;
            border: 1px solid #333333;
            border-radius: 999px;
            margin-top: 5px;
            margin-right: 16px;
        }
    }
</style>
