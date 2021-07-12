<template>
    <div>
<!--        <van-card :thumb="item.productImg"-->
<!--                  :title="item.productName"-->
<!--                  :num="item.count"-->
<!--                  :price="item.price"></van-card>-->
        <div class="left">
            <van-image
                    width="100"
                    height="100"
                    fit=""
                    :src="img(item.productImg)"/>
        </div>
    </div>
</template>

<script>
	export default {
		name: "cartItem",
		props: {
			item: {
                type: Object,
                required: true,
                default() {return null}
            }
        },
	}
</script>

<style scoped>
    .left {
        width: 80px;
        height: 80px;
        border-radius: 10px;
    }
</style>
