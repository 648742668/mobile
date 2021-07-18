<template>
    <div class="container">
        <div class="header">
            <van-sticky>
                <van-nav-bar
                        title="我的订单"
                        left-text="返回"
                        left-arrow
                        @click-left="onClickLeft"/>
                <van-tabs v-model="active" sticky @change="getOrders">
                    <van-tab title="全部" name="0"></van-tab>
                    <van-tab title="待付款" name="1"></van-tab>
                    <van-tab title="待收货" name="2"></van-tab>
                    <van-tab title="待评价" name="3"></van-tab>
                    <van-tab title="已完成" name="4"></van-tab>
                    <van-tab title="已取消" name="5"></van-tab>
                </van-tabs>
            </van-sticky>
        </div>
        <van-empty v-if="orders.length === 0" image="search" description="暂无信息" />
        <div v-for="order in orders"
             :key="order.id"
             class="order">
            <van-cell style="border-radius: 10px" @click="detail(order.id)">
                <template #title>
                    订单号: {{ order.id }} <br/>
                    订单状态： <van-tag plain :type="getType(order)">{{ getStatus(order) }}</van-tag>
                </template>
                <template #label>
                    <div v-for="orderItem in order.orderItemList"
                         class="orderItem">
                        <order-item-card :order-item="orderItem">
                        </order-item-card>
                        <div class="van-clearfix"></div>
                    </div>
                </template>
            </van-cell>
            <div class="btnGroup">
                <div v-if="order.status === 1" class="btn">
                    <van-button round type="default" plain size="small" @click="cancel(order.id)">取消订单</van-button>&nbsp;
                    <van-button round type="danger" plain size="small" @click="checkout(order.id)">去支付</van-button>
                </div>
                <div v-if="order.status === 2 || order.status === 3" class="btn">
                    <van-button round type="danger" plain size="small" @click="delivered(order.id)">确认收货</van-button>
                </div>
                <div v-if="order.status === 4" class="btn">
                    <van-button round type="default" plain size="small">退货/换货</van-button>&nbsp;
                    <van-button round type="danger" plain size="small" @click="goToComment(order.id)">去评价</van-button>
                </div>
                <div v-if="order.status === 5" class="btn">
                    <van-button round type="default" plain size="small">退货/换货</van-button>&nbsp;
                    <van-button round type="danger" plain size="small" @click="buyAgain(order.id)">再次购买</van-button>
                </div>
                <div v-if="order.status === 6" class="btn">
                    <van-button round type="danger" plain size="small" @click="buyAgain(order.id)">重新购买</van-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import orderItemCard from "./components/orderItemCard";
	export default {
		name: "Order",
        components: { orderItemCard },
        data() {
            return {
            	active: null,
                orders: null
            }
		},
        methods: {
			onClickLeft() {
				this.$router.push({
                    path: '/me'
                })
            },
		    getOrders() {
		    	let status = []
		    	if(parseInt(this.active) < 2) {
		    		status.push(parseInt(this.active))
                }else if(parseInt(this.active) === 2) {
					status.push(2)
					status.push(3)
                }else {
					status.push(parseInt(this.active) + 1)
                }
                this.get('/order/getOrders', {consumerId: this.$store.getters.GET_CONSUMER.id , status: status}, res => {
                	this.orders = res.reverse()
					// console.log(res)
                })
            },
			getStatus(order) {
		    	switch (order.status) {
                    case 1: return '待付款'
                    case 2: return '待收货'
					case 3: return '待收货'
					case 4: return '待评价'
					case 5: return '已完成'
					case 6: return '已取消'
				}
            },
			getType(order) {
				switch (order.status) {
					case 1: return 'warning'
					case 2: return 'warning'
					case 3: return 'warning'
					case 4: return 'warning'
					case 5: return 'success'
					case 6: return 'danger'
				}
            },
			detail(orderId) {
				this.$router.push({
					path: '/orderDetail',
					query: {
						orderId: orderId
					}
				})
				// this.get('order/getOrderDetail', {orderId: orderId}, res => {
				// 	this.$router.push({
				// 		path: '/orderDetail',
				// 		query: {
				// 			order: res
				// 		}
				// 	})
                // })
            },
			checkout(orderId) {
		    	console.log(orderId)
				this.$router.push({
					path: '/paymentWakeup',
					query: {
						orderId: orderId
					}
				})
			},
			cancel(orderId) {
				this.$dialog.confirm({
					title: '提示',
					message: '确认取消该订单吗？',
                }).then(() => {
					this.post('/order/cancel', {orderId: orderId}, res => {
						this.getOrders()
					})
                })
			},
			buyAgain(orderId) {
				this.post('/order/buyAgain', {orderId: orderId}, res => {
				})
			},
			goToComment(orderId) {
		    	for(let i = 0; i < this.orders.length; i++) {
		    		if (orderId === this.orders[i].orderId) {
						this.$router.push({
							path: '/comment',
							query: {
								order: this.orders[i]
							}
						})
                    }
                }
			},
			delivered(orderId) {
				this.$dialog.confirm({
					title: '提示',
					message: '确认商品已经送达吗？',
				}).then(() => {
					this.post('/order/deliveredConfirm', {orderId: orderId}, res => {
						this.getOrders()
					})
				})
            }
        },
		created() {
			this.active = this.$route.query.active
            console.log(this.active)
			this.getOrders()
		}
	}
</script>

<style scoped lang="less">
    .container {
        width: 100vw;
        height: calc(100vh);
        background-color: #F2F2F2;
        overflow: scroll;

        .header {
            /*border-bottom: 1px solid #DDDDDD;*/
            /*box-shadow: 0 5px 5px #DDDDDD;*/
        }

        .order {
            margin: 10px 0;
            position: relative;

            .orderItem {
                margin: 6px 0;
            }

            .btnGroup {
                position: absolute;
                right: 10px;
                top: 32px;
            }
        }
    }

</style>
