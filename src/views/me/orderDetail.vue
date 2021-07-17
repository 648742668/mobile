<template>
    <div class="container">
        <van-nav-bar
                title="订单详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"/>
        <div class="status">
            <van-steps :active="active" v-if="order.status !== 5 && order.status !== 6"
                       active-icon="circle"
                       finish-icon="success"
                       active-color="#F4381C">
                <van-step>填写订单</van-step>
                <van-step>订单付款</van-step>
                <van-step>商家发货</van-step>
                <van-step>买家收货</van-step>
                <van-step>填写评价</van-step>
            </van-steps>
            <div v-if="order.status === 5" style="display:flex; color: #28A745; margin-top: 8px">
                <van-icon name="passed" size="50px" style="margin-left: 28vw"/>
                <span style="line-height: 50px; margin-left: 20px">订单已完成！</span>
            </div>
            <div v-if="order.status === 6" style="display:flex; color: #FF976A; margin-top: 8px">
                <van-icon name="warning-o" size="50px" style="margin-left: 28vw"/>
                <span style="line-height: 50px; margin-left: 20px">订单已取消！</span>
            </div>
        </div>

        <van-cell v-if="order.status === 1">
            <template #title>
                请在下订单15分钟内支付！
            </template>
            <van-count-down :time="order.timeLeft" @finish="cancel" format="mm 分 ss 秒" style="color: red; text-align: right; margin-top: 2px">
            </van-count-down>
        </van-cell>

        <van-cell icon="location-o"
                  :title="order.address.recvName + ' ' + order.address.recvPhone"
                  :label="'地址： ' + order.address.province + order.address.city + order.address.county + order.address.address">
        </van-cell>

        <van-cell>
            <template #title>订单内包含：</template>
            <template #label>
                <div v-for="item in order.orderItems" :key="item.id">
                    <order-item-card :order-item="item" style="width: 100%"></order-item-card>
                </div>
            </template>
        </van-cell>

        <van-cell>
            <template #title>
                订单编号： &nbsp;&nbsp;&nbsp; {{ order.orderId }}
                <br/>
                下单时间： &nbsp;&nbsp;&nbsp; {{ order.createTime }}
                <br/>
                <span v-if="order.status !==1">更新时间： &nbsp;&nbsp;&nbsp; {{ order.updateTime }}</span>
            </template>
        </van-cell>

        <van-cell v-if="order.payment">
            <template #title>
                支付方式： &nbsp;&nbsp;&nbsp; 支付宝支付
                <br/>
                支付时间： &nbsp;&nbsp;&nbsp; {{ order.payment.payTime }}
                <br/>
                实付金额： &nbsp;&nbsp;&nbsp; ￥{{ order.payment.money }}
            </template>
        </van-cell>

        <div v-if="order.status === 1">
            <van-submit-bar
                    :price="order.totalPrice * 100"
                    button-text="去支付"
                    @submit="checkout">
                <van-button class="btnLeft" @click="cancel">取消订单</van-button>
            </van-submit-bar>
        </div>

        <div v-if="order.status < 4 && order.status > 1">
            <van-submit-bar
                    button-text="确认收货"
                    @submit="delivered">
            </van-submit-bar>
        </div>

        <div v-if="order.status === 4">
            <van-submit-bar
                    button-text="写评价"
                    @submit="goToComment">
                <van-button class="btnLeft" @click="cancel" style="width: 100px; margin-right: 150px">退货/换货</van-button>
            </van-submit-bar>
        </div>

        <div v-if="order.status === 5">
            <van-submit-bar
                    button-text="再次购买"
                    @submit="buyAgain">
                <van-button class="btnLeft" @click="cancel" style="width: 100px; margin-right: 150px">退货/换货</van-button>
            </van-submit-bar>
        </div>

        <div v-if="order.status === 6">
            <van-submit-bar
                    button-text="重新购买"
                    @submit="buyAgain">
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
	import orderItemCard from "./components/orderItemCard";

	export default {

		name: "OrderDetail",
		components: {orderItemCard},
		data() {
			return {
				order: null,
				active: 2
			}
		},
		methods: {
			onClickLeft() {
				this.$router.push({
					path: '/order',
                    query: {
						active: 0
                    }
				})
			},
			checkout() {
				this.$router.push({
					path: '/paymentWakeup',
					query: {
						orderId: this.order.orderId
					}
				})
			},
			cancel() {
				this.post('/order/cancel', {orderId: this.order.orderId}, res => {
					this.onClickLeft()
				})
			},
			buyAgain() {
				this.post('/order/buyAgain', {orderId: this.order.orderId}, res => {
					this.onClickLeft()
				})
			},
			goToComment() {
				this.$router.push({
                    path: '/comment',
                    query: {
                    	order: this.order
                    }
                })
            },
			delivered() {
				this.$dialog.confirm({
					title: '提示',
					message: '确认商品已经送达吗？',
				}).then(() => {
					this.post('/order/deliveredConfirm', {orderId: this.order.orderId}, res => {
						this.getOrders()
					})
				})
            }
		},
		created() {
			let orderId = this.$route.query.orderId
			this.get('order/getOrderDetail', {orderId: orderId}, res => {
				this.order = res
			})
			if (this.order.status !== 5 && this.order.status !== 6) {
				this.active = this.order.status
			}
		}
	}
</script>

<style scoped lang="less">
    .container {
        width: 100vw;
        height: 100vh;
        background-color: #F2F2F2;
        overflow: scroll;

        .status {
            background-color: white;
            padding-top: 15px;
            height: 80px;
            width: 100%;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
            /*margin-bottom: 20px;*/
        }

        .btnLeft {
            float: left;
            width: 90px;
            height: 30px;
            font-weight: 500;
            border: 1px solid #333333;
            border-radius: 999px;
        }
    }

    .van-cell {
        border-radius: 10px;
        margin: 10px 0;
    }

</style>
