<template>
    <div class="waitingContainer">
        <van-nav-bar
                title="支付完成"
                left-text="返回"
                left-arrow
                @click-left="goback"/>
        <div class="innerContainer">
            <van-icon name="passed" size="80" color="#28A745"/>
        </div>
        <div class="text">支付成功！</div>
    </div>
</template>

<script>
	export default {
		name: "PaymentSuccess",
		data() {},
		methods: {
			goback() {
				let orderId = this.$route.query.out_trade_no
				this.$router.push({
					path: '/orderDetail',
                    query: {
						orderId: orderId
                    }
				})
			}
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
            width: 90px;
            margin: 30px auto;
            font-size: 18px;
        }
    }
</style>
