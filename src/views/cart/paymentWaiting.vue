<template>
    <div class="waitingContainer">
        <van-nav-bar
                title="支付中"
                left-text="返回"
                left-arrow
                @click-left="goback"/>
        <div class="innerContainer">
            <van-loading color="#1989fa" size="80px"/>
        </div>
        <div class="text">等待支付完成...</div>
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
				this.$router.push({
					path: '/order'
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
