<template>
    <div>
        <van-sticky>
            <van-nav-bar title="购物车" :right-text="!edit ? '编辑' : '完成'" @click-right="changeEdit">
            </van-nav-bar>
<!--            <van-cell is-link :title="'配送至： '+ getAddr()" @click="show = true" style="border-bottom: 0.5px solid #F2F2F2;"></van-cell>-->
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
        <cart-list :edit="edit" ref="cartList" style="height: calc(100vh - 150px); overflow: scroll">
        </cart-list>

<!--        <van-dialog v-model="show" title="选择收货地址" show-cancel- -->
<!--                    close-on-click-overlay>-->
<!--            <van-picker-->
<!--                    @confirm="submit"-->
<!--                    :columns="addrs"-->
<!--                    item-height="70px"-->
<!--                    class="picker">-->
<!--            </van-picker>-->

<!--            <van-address-list-->
<!--                    v-model="chosenAddressId"-->
<!--                    :list="addrs"-->
<!--                    default-tag-text="默认"-->
<!--                    @click-item="show=false"-->
<!--            />-->
<!--        </van-dialog>-->


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
            // getAddr() {
			// 	for(let i = 0; i < this.addrs.length; i++) {
			// 		if(this.addrs[i].id === this.chosenAddressId) {
			// 			return this.addrs[i].address + '-' + this.addrs[i].name
            //         }
            //     }
            // }
        },
        created() {
			// this.addrs = []
            // this.get('/address/getByConsumerId', {id: 1}, res => {
            	// this.addrs = res
            	// for (let i = 0; i < res.length; i++) {
            	// 	let addr = res[i]
				// 	this.addrs.push(
				// 		addr.province + ' '
				// 		+ addr.city + ' '
                //         + addr.county + ' '
                //         + addr.address + '<br/>'
                //         + addr.recvName + '<br/>'
                //         + addr.recvPhone
                //     )
                // }
                // for(let i = 0; i < res.length; i++) {
                // 	let addr = res[i]
				// 	if(addr.firstPick === 1) {
				// 		this.chosenAddressId = addr.id
                //     }
                //     this.addrs.push({
                //         id: addr.id,
                //         name: addr.recvName,
                //         tel: addr.recvPhone,
                //         address: addr.province + addr.city + addr.county + addr.address,
                //         isDefault: addr.firstPick === 1
                //     })
                // }
            // })
		}
	}
</script>

<style scoped>

</style>
