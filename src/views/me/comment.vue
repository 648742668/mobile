<template>
    <div class="commentContainer">
        <van-sticky>
            <van-nav-bar
                    title="评价"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"/>
            <van-notice-bar
                    left-icon="info-o"
                    text="请为您本次订单内的商品做出您的评价！"/>
        </van-sticky>

        <div v-for="(item,index) in order.orderItems" class="itemCard">
            <van-cell style="border-radius: 10px">
                <template #title>
                    <div class="image">
                        <van-image fit="contain"
                                   width="75px"
                                   height="75px"
                                   :src="img(item.productImg)"></van-image>
                    </div>
                    <div class="name">
                        <div class="text">
                            {{ item.productName }}
                        </div>
                    </div>
                    <div class="van-clearfix"></div>
                </template>
                <template #label>
                    <div style="color: #333333; margin-top: 10px; font-size: 14px">
                        <div class="rating">
                            <div style="display: inline-block;line-height: 25px; vertical-align: text-bottom">您的评分：</div>
                            <van-rate
                                    style="margin-left: 50px;"
                                v-model="comments[index].rank"
                                :size="25"
                                color="#ffd21e"
                                void-icon="star"
                                void-color="#eee"/>
                            <div style="position: absolute; top: 2px; left: 280px;">
                                <span v-if="comments[index].rank === 5">妈妈我还要！</span>
                                <span v-if="comments[index].rank === 4">针不戳~</span>
                                <span v-if="comments[index].rank === 3">诶，有点意思</span>
                                <span v-if="comments[index].rank === 2">你不太行</span>
                                <span v-if="comments[index].rank === 1">辣鸡</span>
                            </div>
                        </div>
                        <div class="content">
                            您的评价：
                            <van-field
                                    style="background-color: #f9f9f9; border-radius: 10px; margin-top: 5px"
                                    v-model="comments[index].content"
                                    rows="2"
                                    autosize
                                    type="textarea"
                                    maxlength="200"
                                    placeholder="请输入您对此商品的评价"
                                    show-word-limit
                            />
                        </div>
                        <div class="content">
                            上传配图：
                            <van-uploader v-model="comments[index].images"
                                          multiple
                                          :max-count="3"
                                          image-fit="contain"/>
                        </div>
                    </div>
                </template>
            </van-cell>
        </div>

        <van-submit-bar
                button-text="提交评价"
                @submit="submitComment">
        </van-submit-bar>

    </div>
</template>

<script>
	export default {
		name: "Comment",
        data() {
			return {
				test: true,
				order: null,
                comments: [],
            }
        },
        methods: {
			onClickLeft() {
				this.$router.push({
					path: '/me'
				})
			},
			submitComment() {
				let images = []
                for(let i = 0; i < this.comments.length; i++) {
                	this.comments[i].imageCount = this.comments[i].images.length
					for(let j = 0; j < this.comments[i].images.length; j++) {
						images.push(this.comments[i].images[j].file)
					}
					delete this.comments[i].images
                }
				console.log(this.comments)
                this.post("/comment/submit", {orderId: this.order.orderId, comments: JSON.stringify(this.comments), images: images}, _ => {
					this.order.status = 5
                	this.$router.push({
						path: '/orderDetail',
						query: {
							orderId: this.order.orderId
						}
                    })
                })
            }
        },
        created() {
			this.order = this.$route.query.order
            for(let i = 0; i < this.order.orderItems.length; i++) {
            	this.comments.push({
                    content: '',
                    rank: 0,
                    consumerId: this.order.consumerId,
                    productItemId: this.order.orderItems[i].orderItemId,
                    images:[]
                })
            }
            console.log(this.order)
		}
	}
</script>

<style scoped lang="less">
    @height: 75px;
    .commentContainer {
        width: 100vw;
        height: calc(100vh - 50px);
        background-color: #F2F2F2;
        overflow: scroll;

        .itemCard {
            margin: 10px 0;

            .image {
                width: @height;
                height: 75px;
                border-radius: 10px;
                float: left;
            }

            .name {
                height: @height;
                width: calc(100vw - 110px);
                float: left;
                color: black;
                font-size: 14px;
                vertical-align: middle;
                display: flex;

                .text {
                    width: 100%;
                    max-height: 50px;
                    margin: auto 5px;
                }
            }

            .rating{
                height: 25px;
                line-height: 25px;
                position: relative;
            }

            .content{
                margin-top: 10px;
            }
        }
    }
</style>
