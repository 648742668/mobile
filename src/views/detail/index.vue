<template>
    <div style="height: 100vh">
        <nav-bar v-show="!showTabControl">
            <span slot="left" class="tab-icon-wrapper middle" @click="$router.back()">
                <van-icon name="arrow-left" color="#ffffff" slot="left" size="25px" style="margin: 0 auto"/>
            </span>
            <span slot="right" class="tab-icon-wrapper middle">
            <img src="~@/assets/img/menu_w.svg" alt="" slot="right" width="25" height="25">
            </span>
        </nav-bar>
        <nav-bar v-show="showTabControl"
                 :style="{opacity: opacity}"
                 background="#ffffff">
            <van-icon name="arrow-left" slot="left" size="25px" class="middle" @click="$router.back()"/>
            <tab-control
                    slot="middle"
                    :titles="['商品','评价','规格','详情']"
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
            <detail-base-info
                    :id="id"
                    ref="baseInfo"
                    :base-info="baseInfo"
                    :images="images"/>
            <detail-pick-choice @doPick="doPick" v-model="skuPicksString"/>
            <detail-comments ref="comment" :comments="comments" :product-id="id"/>
            <detail-spu ref="spu" :spu-list="spuList"/>
            <detail-content :html="detailHtml" ref="detail"/>
        </scroll>
        <van-goods-action class="goods-action">
            <van-goods-action-icon icon="chat-o" text="客服"/>
            <van-goods-action-icon icon="cart-o" text="购物车"/>
            <van-goods-action-icon icon="shop-o" text="店铺"/>
            <van-goods-action-button type="warning" text="加入购物车" @click="doOperation"/>
            <van-goods-action-button
                    @click="doOperation"
                    type="danger"
                    text="立即购买"
            />
        </van-goods-action>
        <van-sku
                ref="sku"
                v-model="showSku"
                :sku="sku"
                :goods="goods"
                :goods-id="id"
                :hide-stock="sku.hide_stock"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked"
                @sku-selected="skuSelected"
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
    import {detailHtml, sku} from "../../mock/mock";
    import DetailComments from "./component/DetailComments";
    import DetailSpu from "./component/DetailSpu";
    import DetailContent from "./component/DetailContent";
    import {IMG_URL} from "../../config/config";
    import {SkuElMixin} from "../../common/mixin";
    import Sku from "../../components/content/sku/Sku";
    import {Toast} from "vant";

    const basePrefix = "/mb-product"
    const cartBasePrefix = "/cart"
    export default {
        name: "Detail",
        components: {
            Sku,
            DetailContent,
            DetailSpu,
            DetailComments,
            DetailPickChoice, DetailBaseInfo, NavBar, DetailTabControl, Scroll, TabControl, DetailImgSwiper
        },
        mixins: [SkuElMixin],
        data() {
            return {
                detailHtml: detailHtml,
                id: -1,
                opacity: 0,
                showTabControl: false,
                showSku: false,
                sku: sku,
                goods: {
                    picture: ""
                },
                baseInfoOffsetTop: 0,
                commentOffsetTop: 0,
                spuOffsetTop: 0,
                detailOffsetTop: 0,
                images: [],
                baseInfo: {
                    price: 9999,
                    name: "iPhone 12",
                    title: " Apple iPhone 12 (A2404) 128GB 黑色 支持移动联通电信5G 双卡双待手机 "
                },
                comments: [],
                spuList: [],
                skuNames: [],
                skuList: [],
                skuPicksString: ""
            }
        }, created() {
            this.id = parseInt(this.$route.query['id'])
            if (this.$store.getters.GET_TOKEN){
                console.log(this.$store.getters.GET_CONSUMER.id)
                let cid = this.$store.getters.GET_CONSUMER.id
                this.post(basePrefix + '/add_footprint',{pid:this.id,cid:cid},obj=>{

                })
            }
            this.get(basePrefix + "/getOne", {id: this.id}, obj => {
                let pics = obj.pics.split(",")
                this.images.push(obj.img)
                this.goods.picture = IMG_URL + obj.img
                this.images.push(...pics)
                this.baseInfo.id = obj.id
                this.baseInfo.price = obj.price
                this.baseInfo.name = obj.name
                this.baseInfo.title = obj.keywords
                this.comments = obj.comments
                this.spuList = obj.spuList
                this.detailHtml = obj.detailHtml
                for (let i = 0; i < obj.skuList.length; i++) {
                    this.skuNames.push(obj.skuList[i].name)
                }
                this.getSkuPicks()
                this.skuList = obj.skuList
                this.genSkuTree(obj.skuList, obj.productItemVos, obj.price)
            })
        },
        mounted() {
            let l = this
            setTimeout(() => {
                l.commentOffsetTop = l.$refs['comment'].$el.offsetTop
                l.detailOffsetTop = l.$refs['detail'].$el.offsetTop
                l.baseInfoOffsetTop = l.$refs['baseInfo'].$el.offsetTop
                l.spuOffsetTop = l.$refs['spu'].$el.offsetTop
            }, 300)

        },

        methods: {
            getSkuPicks() {
                let temp = "选择";
                for (let i = 0; i < this.skuNames.length; i++) {
                    temp += this.skuNames[i] + "/"
                }
                this.skuPicksString = temp.substring(0, temp.length - 1)
            },
            skuSelected(args) {
                let {selectedSku} = args
                let index = 0
                for (let key in selectedSku) {
                    let skuItemId = selectedSku[key]
                    let skuId = parseInt(key.substring(1))
                    for (let sku of this.skuList) {
                        if ('number' === typeof skuItemId && sku.id === skuId) {
                            for (let skuItem of sku.items) {
                                if (skuItem.id === skuItemId) {
                                    this.skuNames[index] = skuItem.value
                                    break
                                }
                            }
                            break
                        }
                    }
                    index++
                }
                this.getSkuPicks()
            },
            onBuyClicked(skuData) {

                this.showSku = false
            }
            ,
            onAddCartClicked(skuData) {
                let data = {
                    consumerId:this.$store.getters.GET_CONSUMER.id,
                    productItemId:skuData.selectedSkuComb.id,
                    count:skuData.selectedNum
                }
                this.post(cartBasePrefix+"/insert_cart",data,obj=>{
                    if (obj){
                        Toast("添加购物车成功")
                        this.showSku = false
                    }
                })
            },
            doOperation() {
                let token = this.$store.getters.GET_TOKEN;
                if (token) {
                    console.log(token)
                    this.showSku = true
                } else {
                    this.$router.push("/login")
                }
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
                dis += 44
                if (dis < this.commentOffsetTop) {
                    this.$refs.tabControl.changeWhite(0)
                } else if (dis >= this.commentOffsetTop && dis < this.spuOffsetTop) {
                    this.$refs.tabControl.changeWhite(1)
                } else if (dis >= this.spuOffsetTop && dis < this.detailOffsetTop) {
                    this.$refs.tabControl.changeWhite(2)
                } else if (dis >= this.detailOffsetTop) {
                    this.$refs.tabControl.changeWhite(3)
                }
            }
            ,
            tabClick(index) {
                switch (index) {
                    case 0: {
                        this.$refs.scroll.scrollTo(0, -this.baseInfoOffsetTop, 500)
                        break
                    }
                    case 1: {
                        this.$refs.scroll.scrollTo(0, -this.commentOffsetTop + 44, 500)
                        break
                    }
                    case 2: {
                        this.$refs.scroll.scrollTo(0, -this.spuOffsetTop + 44, 500)
                        break
                    }
                    case 3: {
                        this.$refs.scroll.scrollTo(0, -this.detailOffsetTop + 44, 500)
                        break
                    }
                }
            }
            ,
            doPick() {
                this.showSku = true
            }
        },
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

    .goods-action {
        z-index: 10;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
