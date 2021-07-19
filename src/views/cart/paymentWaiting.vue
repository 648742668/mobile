<template>
    <div class="waitingContainer">
        <van-nav-bar title="支付中"/>
        <div class="innerContainer">
            <van-loading color="#1989fa" size="80px"/>
        </div>
        <div class="text">等待支付完成...</div>
        <div style="width: 100%;margin-top: 50px">
            <van-button type="danger" round plain size="medium" style="width: 300px; margin: 0 50px"
                @click="goback">取消支付</van-button>
        </div>
    </div>

</template>

<script>
	export default {
		name: "PaymentWaiting",
        data() {
			return {
				form: null
            }
        },
        methods: {
			goback() {
				let orderId = this.$route.query.orderId
				this.$router.push({
					path: '/orderDetail',
					query: {
						orderId: orderId
					}
				})
            }
        },
        created() {
			// this.$loading.show()
		}
	}
</script>

<style scoped lang="less">
    .waitingContainer {
        width: 100vw;
        height: 100vh;

        .innerContainer {
            margin-left: 165px;
            margin-top: 50px;
        }
        .text {
            width: 125px;
            margin: 30px auto;
            font-size: 18px;

        }
    }
</style>
