<template>
    <div class="container" @click="goToDetail">
        <div class="goods-img">
            <img v-lazy="getFullUrl(goods.img)" @load="imgLoad">
        </div>
        <div class="goods-info">
            <span class="goods-title">{{goods.title}}</span>
            <div class="goods-price">
                <span class="goods-price-prefix">￥</span>
                {{goods.price}}</div>
            <div class="goods-other">
                <span class="goods-favor left">{{goods.favor|getFavor}}</span>
                <span class="goods-pay right">{{goods.pay_count|getPayCount}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {IMG_URL} from "../../../config/config";

    export default {
        name: "GoodsRowItem",
        props:{
            goods:{
                default:()=>{
                    return {
                        img:"http://192.168.216.32:9000/image/40790746644600whhm.jpg",
                        title:"泰山原浆啤酒干啤10度全麦芽酿造高发酵度啤酒整箱330ml*24听 24听",
                        price:9999,
                        favor:3200,
                        pay_count:11111
                    }
                },
                type:Object
            }
        },
        methods:{
            getFullUrl(value){
                return IMG_URL + value
            },
            imgLoad() {
                this.$bus.$emit("imgLoad")
            },
            goToDetail(){
                this.$router.push({path:"/detail",query:{id:this.goods.id}})
            }
        },
        filters:{
            getFavor(value){
                if (value <= 1000){
                    return value + '人收藏';
                }else if (value <= 10000) {
                    let count = value / 1000
                    return count + '千人收藏'
                }else {
                    let count = value / 10000
                    return count + '万人收藏'
                }
            },
            getPayCount(value){
                if (value <= 1000){
                    return value + '人购买';
                }else if (value <= 10000) {
                    let count = value / 1000
                    return count + '千人购买'
                }else {
                    let count = value / 10000
                    return count + '万人购买'
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        max-height: 15vh;
        padding: 5px;

    }

    .goods-img {
        flex: 1;
    }

    .goods-info {
        flex: 2;
        position: relative;
        padding-right: 10px;
        padding-left: 10px;
    }

    .goods-info .goods-title {
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .goods-info .goods-price{
        position: absolute;
        font-size: 20px;
        color: #FF0000;
        font-weight: bolder;
        bottom: 18px;
    }
    .goods-price-prefix{
        font-size: 15px;
    }
    .goods-img img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: 7px;
    }
    .goods-other{
        font-size: 12px;
        position: absolute;
        bottom: 0;
        left: 10px;
        right: 10px;
    }
</style>
