<template>
    <div>
        <van-sticky>
            <van-nav-bar title="购物车" :right-text="!edit ? '编辑' : '完成'" @click-right="changeEdit">
            </van-nav-bar>
        </van-sticky>
        <div v-if="!this.$store.getters.GET_CONSUMER.id">
            <van-empty image="search" description="请先登录！" />
        </div>
        <div v-else>
            <cart-list :edit="edit" ref="cartList" style="height: calc(100vh - 150px); overflow: scroll">
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
				// addrs: [],
				// chosenAddressId: 0,
            }
        },methods: {
			changeEdit() {
				this.edit = !this.edit
				this.$refs.cartList.changeEdit()
            },
        }
	}
</script>

<style scoped>

</style>
