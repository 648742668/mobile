<template>
    <div style="height: 100vh">
        <nav-bar v-show="!showTabControl">
            <span slot="left" class="tab-icon-wrapper middle">
                <van-icon name="arrow-left" color="#ffffff" slot="left" size="25px" style="margin: 0 auto"/>
            </span>
            <span slot="right" class="tab-icon-wrapper middle">
            <img src="~@/assets/img/menu_w.svg" alt="" slot="right" width="25" height="25">
            </span>
        </nav-bar>
        <nav-bar v-show="showTabControl"
                 :style="{opacity: opacity}"
                 background="#ffffff">
            <van-icon name="arrow-left" slot="left" size="25px" class="middle"/>
            <tab-control
                    slot="middle"
                    :titles="['商品','评价','详情']"
                    ref="tabControl"
                    @tabControlClick='tabClick'/>
            <img src="~@/assets/img/menu.svg" alt="" slot="right" class="middle" width="25" height="25">
        </nav-bar>

        <scroll class="content-a"
                style="background: #F2F2F2"
                ref="scroll"
                @scroll="scroll"
                :pulldown="false"
                :listenScroll="true"
                :probeType='3'>
            <detail-base-info/>
            <detail-pick-choice @doPick="doPick"/>
            <detail-comments/>
            <detail-spu/>
            <detail-content :html="detailHtml"/>
        </scroll>
        <van-goods-action class="goods-action">
            <van-goods-action-icon icon="chat-o" text="客服"/>
            <van-goods-action-icon icon="cart-o" text="购物车"/>
            <van-goods-action-icon icon="shop-o" text="店铺"/>
            <van-goods-action-button type="warning" text="加入购物车"/>
            <van-goods-action-button
                    type="danger"
                    text="立即购买"
            />
        </van-goods-action>
        <van-sku
                v-model="showSku"
                :sku="sku"
                :goods="goods"
                :goods-id="id"
                :hide-stock="sku.hide_stock"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked"
        />
    </div>
</template>

<script>
    import DetailImgSwiper from "./component/DetailImgSwiper";
    import TabControl from "../../components/content/tabcontrol/TabControl";
    import Scroll from "../../components/common/scroll/Scroll";
    import DetailTabControl from "./component/DetailTabControl";
    import NavBar from "../../components/common/navbar/NavBar";
    import DetailBaseInfo from "./component/DetailBaseInfo";
    import DetailPickChoice from "./component/DetailPickChoice";
    import {detailHtml, goods, sku} from "../../mock/mock";
    import Notify from "vant/lib/notify";
    import DetailComments from "./component/DetailComments";
    import DetailSpu from "./component/DetailSpu";
    import DetailContent from "./component/DetailContent";

    export default {
        name: "Detail",
        components: {
            DetailContent,
            DetailSpu,
            DetailComments,
            DetailPickChoice, DetailBaseInfo, NavBar, DetailTabControl, Scroll, TabControl, DetailImgSwiper
        },
        data() {
            return {
                detailHtml:detailHtml,
                id: -1,
                dataList: [],
                opacity: 0,
                showTabControl: false,
                showSku: false,
                sku: sku,
                goods: goods,
            }
        }, created() {
            this.id = this.$route.query['id']
            for (let i = 0; i < 500; i++) {
                this.dataList.push(i)
            }
        },
        methods: {
            onBuyClicked() {
                Notify('已下单');
                console.log(arguments)
                this.showSku = false
            },
            onAddCartClicked() {
                Notify('已加入购物车');
                console.log(arguments)
                this.showSku = false
            },
            scroll(pos) {
                let dis = -pos.y
                if (dis > 0 && dis <= 100) {
                    this.showTabControl = true
                    this.opacity = dis * 2 / 100
                } else if (dis <= 0) {
                    this.showTabControl = false
                    this.opacity = 0
                }
                // this.$refs.tabControl.isShow = pos.y < 0;
            },
            tabClick(index) {
                console.log(index)
            }, doPick() {
                this.showSku = true
            }
        }
    }
</script>

<style scoped>
    .content-a {
        position: absolute;
        top: 0;
        bottom: 50px;
        left: 0;
        right: 0;
    }

    .tab-icon-wrapper {
        width: 30px;
        height: 30px;
        display: inline-block;
        border-radius: 50%;
        background: rgba(111, 108, 108, 0.5);
    }

    .middle {
        vertical-align: middle;
    }
    .goods-action{
        z-index: 10;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
