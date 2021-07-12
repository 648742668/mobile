<template>
    <div>
        <van-nav-bar title="购物车" right-text="编辑">

        </van-nav-bar>
        <van-tabs v-model="active">
            <van-tab title="全部">
                <cart-list>

                </cart-list>
            </van-tab>
            <van-tab title="分类">
                <cart-list :category="this.category">

                </cart-list>
            </van-tab>
        </van-tabs>

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
                cart: []
            }
        }
    }
</script>

<style scoped>

</style>
