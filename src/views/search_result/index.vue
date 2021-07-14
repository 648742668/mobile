<template>
    <div class="container">
        <zt-search-navbar @searchEnter="enter" v-model="value" class="zt-search-navbar"/>
        <!--        <van-list-->
        <!--                v-model="loading"-->
        <!--                :finished="finishing"-->
        <!--                finished-text="没有更多了"-->
        <!--                @load="onLoad"-->
        <!--        >-->
        <scroll class="content-a"
                ref="scroll"
                :probeType='3'
                @scrollToEnd='scrollToEnd'
                :pullup="true"
                :listenScroll="true"
                @scroll='scroll'
                :data="dataList">
            <good-row-list :goods="dataList"/>
        </scroll>
        <!--            <goods-row-item v-for="i in dataList" :goods="i"></goods-row-item>-->
        <!--        </van-list>-->
        <back-top ref='backtop' @click.native='backTop'/>
    </div>
</template>

<script>
    import ZtSearchNavbar from "../../components/content/searchnavbar/SearchNavbar";
    import GoodsRowItem from "../../components/content/goodslist/GoodsRowItem";
    import GoodRowList from "../../components/content/goodslist/GoodRowList";
    import BackTop from "../../components/content/backtop/BackTop";
    import {backTopMixin, itemLoadListenerMixin} from "../../common/mixin";
    import Scroll from "../../components/common/scroll/Scroll";

    const basePrefix = "/mb-product"
    export default {
        name: "SearchResults",
        components: {
            GoodRowList,
            GoodsRowItem,
            ZtSearchNavbar,
            BackTop, Scroll
        },
        mixins: [backTopMixin, itemLoadListenerMixin],
        created() {
            this.value = this.$route.query['content']
            this.get(basePrefix + "/list-search", {content: this.value}, obj => {
                this.dataList = obj.records
            })
        },
        data() {
            return {
                page: 1,
                value: "",
                loading: false,
                finishing: false,
                dataList: []
            }
        },
        methods: {
            scroll(position) {
                this.$refs.backtop.isShow = position.y < -1050;
            },
            enter(value) {
                console.log(value)
            },
            onLoad() {
                this.page++
                this.get(basePrefix + "/list-search", {content: this.value, pageNum: this.page}, obj => {
                    this.dataList.push(...obj.records)
                    this.loading = false;
                })
            }, scrollToEnd() {
                this.onLoad()
            },
        }
    }
</script>

<style scoped>
    .content-a {

        position: absolute;
        top: 48px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .zt-search-navbar {
        z-index: 10;
    }
</style>
