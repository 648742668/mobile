<template>
    <div class="container">
        <zt-search-navbar @searchEnter="enter" v-model="value" class="zt-search-navbar"/>
        <scroll class="content-a"
                ref="scroll"
                :probeType='3'
                @scrollToEnd='scrollToEnd'
                :pullup="true"
                :listenScroll="true"
                @scroll='scroll'
                :data="dataList">
            <good-row-list :goods="dataList" v-if="dataList.length > 0"/>
            <span v-else class="prop-msg">无搜索结果,请换个商品试一试!</span>
        </scroll>
        <back-top ref='backTop' @click.native='backTop'/>
        <van-loading color="#FF0000" v-show="showLoading" class="zt-loading" size="30" vertical>加载中...</van-loading>
    </div>
</template>

<script>
    import ZtSearchNavbar from "../../components/content/searchnavbar/SearchNavbar";
    import GoodsRowItem from "../../components/content/goodslist/GoodsRowItem";
    import GoodRowList from "../../components/content/goodslist/GoodRowList";
    import BackTop from "../../components/content/backtop/BackTop";
    import {backTopMixin, itemLoadListenerMixin} from "../../common/mixin";
    import Scroll from "../../components/common/scroll/Scroll";
    import {getHistory, setHistory} from "../../utils/auth";
    import {Notify} from "vant";

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
            this.loadData(this.value)
        },
        data() {
            return {
                showLoading:false,
                page: 1,
                value: "",
                finishing: false,
                dataList: []
            }
        },
        methods: {
            loadData(content){

                this.showLoading = true
                this.page = 1
                this.get(basePrefix + "/list-search", {content: content}, obj => {
                    this.dataList = obj.records
                    this.showLoading = false
                })
            },
            scroll(position) {
                this.$refs.backTop.isShow = position.y < -1050;
            },
            enter(value) {
                if (value.trim().length > 0) {
                    let history = getHistory();
                    if (history === undefined) {
                        setHistory("," + value)
                    } else {
                        setHistory("," + value + history)
                    }
                    this.value = value
                    this.loadData(value)
                } else {
                    Notify({ type: 'warning', message: '请输入内容',duration: 1000, });
                }
            },
            onLoad() {
                this.page++
                this.showLoading = true
                this.get(basePrefix + "/list-search", {content: this.value, pageNum: this.page}, obj => {
                    this.dataList.push(...obj.records)
                    this.showLoading = false
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
        top: 54px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .prop-msg{
        margin-top: 15px;
        padding-left: 12px;
        font-size: 15px;
        vertical-align: center;
    }
    .zt-loading{
        position: absolute;
        top: 45%;
        left: 45%;
    }

</style>
