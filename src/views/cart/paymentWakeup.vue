<template>
    <payment-waiting></payment-waiting>
</template>

<script>
    import paymentWaiting from "./paymentWaiting";
	export default {
		name: "PaymentWakeup",
        components: { paymentWaiting },
        data() {
			return {
				orderId: null
            }
        },
        created() {
			this.orderId = this.$route.query.orderId
            this.get('/pay/payCalled',{orderId: this.orderId}, res => {
                // this.$loading.hide()
                const div = document.createElement('div')
                /* 此处form就是后台返回接收到的数据 */
                div.innerHTML = res
                document.body.appendChild(div)
                document.forms[document.forms.length - 1].submit()
            })
		}
	}
</script>

<style scoped>

</style>
