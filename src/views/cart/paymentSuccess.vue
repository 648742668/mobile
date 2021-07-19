<template>
    <div class="waitingContainer">
        <van-nav-bar title="支付完成"/>
        <div class="innerContainer">
            <van-icon name="passed" size="80" color="#28A745"/>
        </div>
        <div class="text">支付成功！</div>
        <div class="text">订单号：<em>{{this.orderId}}</em></div>
        <div style="width: 100%;margin-top: 50px">
            <van-button type="danger" round plain size="medium" style="width: 300px; margin: 0 50px"
                        @click="goback">查看订单详情</van-button>
        </div>
    </div>
</template>

<script>
	export default {
		name: "PaymentSuccess",
		data() {
			return {
				orderId: null
            }
        },
		methods: {
			goback() {
				let orderId = this.$route.query.orderId
				this.$router.push({
					path: '/orderDetail',
					query: {
						orderId: this.orderId
					}
				})
			}
		},
        created() {
			this.orderId = this.$route.query.out_trade_no
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
