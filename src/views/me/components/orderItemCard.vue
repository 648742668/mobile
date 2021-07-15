<template>
    <div class="cardContainer">
        <div class="image">
            <van-image fit="contain"
                       width="75px"
                       height="75px"
                       :src="img(orderItem.productImg)"></van-image>
        </div>
        <div class="name">
            <div class="text">
                {{ orderItem.productName }}
            </div>
        </div>
        <div class="price">
            <div class="money">
                ￥{{ Number(orderItem.price * orderItem.count).toFixed(2) }}
            </div>
            <div v-if="orderItem.count > 1" class="cnt">
                <br/>
                <span style="color: #999999">共{{ orderItem.count }}件</span>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "orderItemCard",
        props: {
			orderItem: {
				type: Object,
                default() {return null}
            }
        },
        methods: {

        }
	}
</script>

<style scoped lang="less">
    @height: 75px;

    .cardContainer{
        display: block;
    }

    .image {
        width: @height;
        height: 75px;
        border-radius: 10px;
        float: left;
    }

    .name {
        height: @height;
        width: 53vw;
        float: left;
        color: black;
        font-size: 14px;
        vertical-align: middle;
        display: flex;

        .text {
            width: 100%;
            height: auto;
            margin: auto 5px;
        }
    }

    .price {
        height: @height;
        width: calc(47vw - 110px);
        float: left;
        display: flex;
        text-align: right;
        position: relative;

        .money {
            width: 100%;
            height: auto;
            margin: auto 0;
            font-size: 15px;
            color: black;
        }

        .cnt {
            position: absolute;
            top: 30px;
            right: 0;
        }
    }
</style>
