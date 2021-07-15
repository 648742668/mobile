<template>
    <div class="container">
        <div class="header">
            <van-sticky>
                <van-tabs v-model="active" sticky @change="getOrders">
                    <van-tab title="全部"></van-tab>
                    <van-tab title="待付款"></van-tab>
                    <van-tab title="待收货"></van-tab>
                    <van-tab title="待评价"></van-tab>
                    <van-tab title="已完成"></van-tab>
                    <van-tab title="已取消"></van-tab>
                </van-tabs>
            </van-sticky>
        </div>

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
                    <van-button round type="default" plain size="mini" @click="cancel(order.orderId)">取消订单</van-button>
                    <van-button round type="danger" plain size="mini" @click="checkout(order.orderId)">去支付</van-button>
                </div>
                <div v-if="order.status === 2 || order.status === 3" class="btn">
                    <van-button round type="default" plain size="mini" @click="cancel(order.orderId)">取消订单</van-button>
                    <van-button round type="danger" plain size="mini" @click="buyAgain(order.orderId)">再次购买</van-button>
                </div>
                <div v-if="order.status === 4" class="btn">
                    <van-button round type="default" plain size="mini">退货/换货</van-button>
                    <van-button round type="danger" plain size="mini" @click="goToComment(order.orderId)">去评价</van-button>
                </div>
                <div v-if="order.status === 5" class="btn">
                    <van-button round type="default" plain size="mini">退货/换货</van-button>
                    <van-button round type="danger" plain size="mini" @click="buyAgain(order.orderId)">再次购买</van-button>
                </div>
                <div v-if="order.status === 6" class="btn">
                    <van-button round type="danger" plain size="mini" @click="buyAgain(order.orderId)">重新购买</van-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import orderItemCard from "./components/orderItemCard";
	export default {
		name: "order",
        components: { orderItemCard },
        data() {
            return {
            	active: 0,
                orders:[]
            }
		},
        methods: {
		    getOrders() {
		    	let status = []
		    	if(this.active < 2) {
		    		status.push(this.active)
                }else if(this.active === 2) {
					status.push(2)
					status.push(3)
                }else {
					status.push(this.active + 1)
                }
                this.get('/order/getOrders', {consumerId: 1, status: status}, res => {
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
				this.get('order/getOrderDetail', {orderId: orderId}, res => {
					this.$router.push({
						path: '/orderDetail',
						query: {
							order: res
						}
					})
				})

            },
			checkout(orderId) {
				// TODO
			},
			cancel(orderId) {
				this.post('/order/cancel', {orderId: orderId}, res => {
					this.onClickLeft()
				})
			},
			buyAgain(orderId) {
				this.post('/order/buAgain', {orderId: orderId}, res => {
					this.onClickLeft()
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
			}
        },
        created() {
			this.getOrders()
		}
	}
</script>

<style scoped lang="less">
    .container {
        width: 100vw;
        height: calc(100vh - 50px);
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
