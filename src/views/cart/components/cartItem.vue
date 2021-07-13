<template>
    <div class="container">
<!--        <van-card :thumb="item.productImg"-->
<!--                  :title="item.productName"-->
<!--                  :num="item.count"-->
<!--                  :price="item.price"></van-card>-->
        <div class="left">
            <van-image
                    width="100"
                    height="100"
                    fit="fill"
                    :src="img(item.productImg)"/>
        </div>
        <div class="right">
            <div class="title">
                {{ item.productName }}
            </div>
            <div class="sku" @click="changeSku">
                {{ getSku() }}
                <van-icon name="arrow-down"/>
            </div>
            <div class="price">
                ￥
                <span style="font-weight: bolder; font-size: 22px">{{ item.price * item.count }}</span>
                <van-stepper v-model="item.count"
                             disable-input
                             :max="item.stock"
                             style="float: right;margin-top: -6px"
                             @change="changeCount"/>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "cartItem",
		props: {
			item: {
                type: Object,
                required: true,
                default() {return null}
            }
        },
        methods: {
			getSku() {
				let str = ''
				for (let i = 0; i < this.item.selectedSkus.length; i++) {
					str += this.item.selectedSkus[i].value + ','
                }
				return str.substr(0, str.length-1)
            },
			changeSku() {
				console.log('TODO')
            },
            changeCount() {
				this.$emit('changeCount')
            }
        }
	}
</script>

<style scoped lang="less">
    .container {
        height: 104px;
        width: 100%;

        .left {
            float: left;
            width: 100px;
            height: 100%;
            border-radius: 10px;
        }
        .right {
            margin-left: 5px;
            float: left;
            width: 210px;
            height: 100%;

            .title {
                height: 32px;
                line-height: 16px;
                font-size: 14px;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient: vertical;
            }

            .sku {
                display: inline-block;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                background-color: #f7f7f7;
                color: #a4a4a4;
                border-radius: 10px;
                margin-top: 15px;
                margin-bottom: 15px;
                padding-left: 3px;
                padding-right: 3px;
                vertical-align: middle;
            }

            .price {
                color: #F4381C;
                vertical-align: bottom;
                height: 25px;
            }

        }
    }
</style>
