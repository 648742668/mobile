<template>
    <div>
        <van-sticky>
            <van-nav-bar title="购物车" :right-text="!edit ? '编辑' : '完成'" @click-right="changeEdit">

            </van-nav-bar>
        </van-sticky>
<!--        <van-tabs v-model="active">-->
<!--            <van-tab title="全部">-->
<!--                <cart-list :edit="edit" ref="cartList" :show.sync="show">-->
<!--                </cart-list>-->
<!--            </van-tab>-->
<!--            <van-tab title="分类">-->
<!--                <cart-list :edit="edit"-->
<!--                           :category="this.category" ref="cartList"-->
<!--                           :show.sync="show">-->
<!--                </cart-list>-->
<!--            </van-tab>-->
<!--        </van-tabs>-->
        <cart-list :edit="edit" ref="cartList" :show.sync="show">
        </cart-list>

        <van-dialog v-model="show" title="选择收货地址" show-cancel-button
                    confirm-button-text="提交订单">
            <van-picker
                    @confirm="submit"
                    :columns="addrs"
                    item-height="70px"
                    class="picker">
            </van-picker>
        </van-dialog>
    </div>
</template>

<script>
    import cartList from "./cartList";
    export default {
        name: "Cart",
        components: { cartList },
        data() {
        	return {
        		active: 0,
				category: [],
                cart: [],
				edit: false,
                show: false,
				addrs: [],
            }
        },methods: {
			changeEdit() {
				this.edit = !this.edit
				this.$refs.cartList.changeEdit()
            },
			submit(value, index) {
				console.log(index)
				console.log(value)
			},
        },
        created() {
			this.addrs = []
            this.get('/address/getByConsumerId', {id: 1}, res => {
            	// this.addrs = res
            	for (let i = 0; i < res.length; i++) {
            		let addr = res[i]
					this.addrs.push(
						addr.province + ' '
						+ addr.city + ' '
                        + addr.county + ' '
                        + addr.address + '<br/>'
                        + addr.recvName + '<br/>'
                        + addr.recvPhone
                    )
                }
            })
		}
	}
</script>

<style scoped>

</style>
