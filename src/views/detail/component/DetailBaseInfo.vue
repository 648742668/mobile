<template>
    <div class="container">
        <detail-img-swiper :top-imgs="images"/>

        <div class="wrapper">
            <div class="noname">
            <span class="goods-price left">
                <span class="goods-price-prefix">￥</span>{{baseInfo.price}}
            </span>
                <span class="right goods-favor" @click="doFavor" v-if="!isFavored">
                <van-icon name="like" style="display: block" size="16"/>
                收藏
            </span>
                <span v-else class="right goods-favor"><van-icon name="like" color="#ff0000" style="display: block" size="16"/>已收藏</span>
            </div>
            <div class="goods-title">
                {{baseInfo.title}}
            </div>
        </div>


    </div>
</template>

<script>
    import DetailImgSwiper from "./DetailImgSwiper";
    import {Toast} from "vant";

    const basePrefix = "/mb-product"
    export default {
        name: "DetailBaseInfo",
        props: {
            id: {
                required: true,
                type: Number,
            },
            images: {
                default: () => {
                    return [
                        '40192419930800HDwL.jpg',
                        '40192464231900tOcM.jpg',
                        '40192508022100NdvA.jpg',
                        '40192316617200yTOE.jpg',
                        '40192253848300MBEm.jpg',
                        '40192290713300GXaj.jpg',
                    ]
                },
                type: Array
            },
            baseInfo: {
                default: () => {
                    return null
                },
                type: Object
            }
        },
        data() {
            return {
                isFavored: false
            }
        },
        components: {
            DetailImgSwiper
        },
        mounted() {
            this.isFavor()

        },
        methods: {
            isFavor() {

                if (this.$store.getters.GET_TOKEN) {
                    let cid = this.$store.getters.GET_CONSUMER.id
                    this.get(basePrefix + '/get_favor', {pid: this.id, cid: cid}, obj => {
                        this.isFavored = obj
                    })
                }
            },
            doFavor() {
                if (this.$store.getters.GET_TOKEN) {
                    let cid = this.$store.getters.GET_CONSUMER.id
                    this.post(basePrefix + '/add_favor', {pid: this.baseInfo.id, cid: cid}, obj => {
                        Toast("收藏成功")
                    })
                } else {
                    Toast("请先登录!")
                }
            }
        }

    }
</script>

<style scoped>

    .goods-price-prefix {
        font-size: 18px;
    }

    .wrapper {
        padding-right: 20px;
        padding-left: 20px;

    }

    .goods-title {
        line-height: 24px;
        font-weight: bold;
        color: #000000;
        font-size: 18px;
    }

    .goods-price {
        color: #ff0000;
        font-size: 30px;
        font-weight: bold;
    }

    .noname {
        padding-top: 15px;
        min-height: 50px;
        margin-bottom: 10px;

    }

    .container {
        background: white;

        padding-bottom: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .goods-favor {
        text-align: center;
        font-size: 12px;
    }
</style>
