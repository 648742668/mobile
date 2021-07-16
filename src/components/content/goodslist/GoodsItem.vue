<template>
    <div class="goods" @click="loadDetail(goodsItem.id)">
        <a>
            <img v-lazy="showImg" @load="imgLoad">
            <!--            <img :src="showImg" @load="imgLoad">-->
        </a>
        <!--        <img v-l>-->
        <div class="goods-info">

            <div class="goods-title">{{goodsItem.title}}</div>
            <span class="price">{{'￥'+goodsItem.price}}</span>
            <span class="collect">{{goodsItem.favor +"人收藏"}}</span>
        </div>

    </div>
</template>

<script>
    import {IMG_URL} from "../../../config/config";

    export default {
        name: "GoodsItem",
        components: {},
        props: {
            goodsItem: {
                type: Object, default() {
                    return {}
                }
            }
        },
        created() {
        },
        methods: {
            imgLoad() {
                this.$bus.$emit("imgLoad")
            },
            loadDetail(id) {
                this.$router.push({path: "/detail", query: {id: id}})
            }
        }, computed: {
            showImg() {
                // return "http://192.168.216.32:9000/image/40790746644600whhm.jpg";
                if (this.goodsItem.show)
                    return IMG_URL+this.goodsItem.show.img
                else
                    return IMG_URL+this.goodsItem.img
            }
        }
    }
</script>

<style scoped>
    .goods {
        padding-bottom: 70px;
        position: relative;
        width: 47%;
        margin-right: 5px;
        margin-left: 5px;
        border-radius: 7px;
        background: white;
        margin-top: 10px;
    }

    .goods a img {
        width: 100%;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    .goods-info .goods-title {
        margin-top: 5px;
        padding-right: 10px;
        padding-left: 10px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .goods-info .price {
        font-weight: bold;
        margin-top: 10px;
        font-size: 18px;
        color: var(--color-high-text);
        margin-left: 10px;
    }
    .goods-info .price ::after{
        content: '卷后价';
        position: absolute;
        right: 15px;
        top:0;
        height: 20px;
        width: 50px;
    }
    .goods-info .collect {
        position: absolute;
        right: 8px;
        top: 36px;
    }

</style>
