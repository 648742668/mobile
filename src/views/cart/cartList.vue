<template>
    <div class="container">
        <van-checkbox-group v-model="checked">
            <van-checkbox v-for="item in cart" :name="item.cartItemId"  class="cartItem">
                <cart-item :item="item">

                </cart-item>
            </van-checkbox>
        </van-checkbox-group>
        <div v-for="item in cart" class="cartItem">

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
                default() {return []}
            }
        },
        data(){
			return {
				url: {
					getCart: module + '/getCart'
				},
				cart: [],
				checked:[]
            }
        },
        created() {
			console.log(this.category)
            this.get(this.url.getCart,{userId: 1, categories: this.category}, res => {
            	console.log(res)
            	this.cart = res
            })
		}
	}
</script>

<style scoped>
    .container {
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .cartItem{
        background-color: white;
        margin-bottom: 10px;
    }
</style>
