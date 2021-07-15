<template>
    <div class="listContainer">
        <van-sticky>
            <van-nav-bar
                    title="历史足迹"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"/>
        </van-sticky>
        <div v-for="item in products" style="margin-bottom: 8px; margin-top: 8px">
            <van-swipe-cell>
                <van-card
                        :price="Number(item.price).toFixed(2)"
                        :title="item.name"
                        style="background-color: white;"
                        :thumb="img(item.img)"
                />
                <template #right>
                    <van-button square text="删除" type="danger" style="height: 100%"
                        @click="del(item.id)"/>
                </template>
            </van-swipe-cell>

        </div>
    </div>
</template>

<script>
	export default {
		name: "FootPrint",
        data(){
			return {
				consumerId: 1,
				products:[]
            }
        },
        methods: {
			getData() {
				this.get("/footPrint/getHistory", {consumerId: this.consumerId}, res => {
					this.products = res
					// console.log(this.products)
				})
            },
			onClickLeft() {
				this.$router.push({
					path: '/me'
				})
            },
			del(productId) {
				this.post("/footPrint/del", {consumerId: this.consumerId, productId: productId}, res => {
					this.getData()
                })
            }
        },
        created() {
			this.getData()
		}
	}
</script>

<style scoped>
    .listContainer {
        width: 100vw;
        height: 100vh;
        background-color: #F2F2F2;
        overflow: scroll;
    }
</style>
