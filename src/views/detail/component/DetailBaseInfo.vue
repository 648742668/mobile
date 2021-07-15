<template>
    <div class="container">
        <detail-img-swiper :top-imgs="images"/>

        <div class="wrapper">
            <div class="noname">
            <span class="goods-price left">
                <span class="goods-price-prefix">￥</span>{{baseInfo.price}}
            </span>
                <span class="right goods-favor">
                <van-icon name="like" style="display: block" size="16"/>
                收藏
            </span>
            </div>
            <div class="goods-title">
                {{baseInfo.title}}
            </div>
        </div>


    </div>
</template>

<script>
    import DetailImgSwiper from "./DetailImgSwiper";

    export default {
        name: "DetailBaseInfo",
        props: {
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
                    return {
                        price: 9999,
                        name: "iPhone 12",
                        title: " Apple iPhone 12 (A2404) 128GB 黑色 支持移动联通电信5G 双卡双待手机 "
                    }
                },
                type: Object
            }
        },
        components: {
            DetailImgSwiper
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
