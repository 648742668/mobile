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
            <div v-else class="prop-msg s_null">

                <i class="icon"></i>
                <p class="tip">抱歉！暂无相关商品</p>
            </div>
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
    .s_null .icon {
        display: block;
        margin: 40px auto 14px;
        width: 90px;
        height: 90px;
        background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0BAMAAADP4xsBAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURQAAAEdwTAAAAFNTU/b29v39/fn5+ZycnOXl5e/v79fX17u7u////+LcYNsAAAAMdFJOUxQACh2769QvephcQRpw79QAAAUISURBVGjexZs9TxtBEIbnzhCDSWHuF/juF7gIXQqkKEUkFxRRPhQKpChKChc0RJHigiaKhCgokiaiQEpDJAqaKA1FJGITiH9U7sM2Pnvn43Z3zHZg/Ojlndm9vdkdWJeNKEkgH0mSCL8Ckj9KWlAaYeIJnYBhJB7QRrAIzqCjFqAjjF3QCZAjsUe3gBmhJTpiybQpODoC0Yiro4Vkgg2uZJyNoaHCqIZuVUGHVdCVyBjbiG5CxRFI0RFUHrEQ3aqODmVoC7KRDT7sMFsCThlNZjc4ZweaJeDHDpMl4COG5kiCN9FzssGb6DnZ4E/0rGzwJ3o2AcGj6BnZ4FN02W3wKbosG3yKLssGr6JLssHD6oGsJOC+5GH5B35FT8sGn0EsBxK8BrEUSPDsx5Qj4DeI04EE337cOgK+/bh1BLz7MXEEvPsxcQS8+zFxBLzOl9KsAZHVtdMvb7b7z54ctCuYDRI/fnSHozH4JncEeD/Wvg6nxstzqSPA+tHoDktjcCJ0BLjUmyWL2PEETVi91hnOjT+7IrOBsfq4oD09+NWufTx9XPx0LTIbaKvfFzI/j3/+UPwTbyVm0+jGdgZ6MWVA/VP2m/6JEN2k7XhXmie1nP1XEEcSvZprnp2ZOfuIjyNQUewY06He4SMZjtCkaIOrKwLZBTqinH5l+uAn73ZMohvZzDPOjnrX/O/MobEo7qXff42n+3MujoBGsZZKG7SJz7g44uhVStkeF8gCjXzYS7+Nrs1r6Yf/mBQBNIodMgsO04xn4oiis/zYxL+5xOVIhkYS5F66CBHrcj1duHboFEHRZ8ysSB254dBIgnQZVRuM2SGKzlJgn/rqCpVAIzSa1X16P7PNZDaK3mAXoNTsLRodoVG8otE9ZtLEGPqYzOpsPGCeByi6y0Qxj+OARpvTupbGn9nIZDlEBTpA0A1u0SxS5NwCvcKtPsX6tW+BXuW3Glmkj0h0C1vYbjj0GZ1EIYK+x6306bigVxkMvczOmBy9ZYG+PxxecuieNfo3h37IoUELDTj6UgktCWPPDi1IvhqTfMRegJ0yh+y6qzXRicX42nF5Anxv3XdcVNEYuT8K0OH+AKNitMkm0bUV2n2zAMjylE1Hxy0OtvLlGzM60NzGDEU7bydxNLsJXuae+Tjadeueopug88KB7kPcX5MItOvLHYW+cHslTdERVQ2xf5Em9tdF+tm//tNop6JFhl6nHgf2pRbiDYwtEA3aPLpFPXuNxcK8rDV8xNXMKDRVjEs/aLPoJrllwEqIrOyARpsKn5CTB6zsgKji5EmClWu/dzjZMYPGi8xLnOyYKGsVxqKlcU42VYwbrUNYQZ+RHfJo/BiClh2ShU+EPT7goGUHdCV47Aly5EPKjkVo7KCKlB3TpfGpRDEer1GyuYI+/1aCyQ7ZEw7+vQCRPT6GsD59xWXHrmhctuCgyla25HjNTnYoORS0kx2IjjIFsjeNURQcwPKyr4xWS46N6XnaMaBD+WE3I3vHaLXwiJ58w5zfYfm6WFDbNfuxgOsQipc4FK+e+HQkWNw1H8XLSf4cCRZ5EUzx+povR4LFXhX0IztY9LVMxcukmldgFS/ual43Vrwk7Zp/8d1cSNe8Rq94+V+zZcE+kmyjhWZ7iGZTi2Irjp0ld9/2VD1LxM1ami1mmo1xmu18mk2Iiq2Tmg2fMr/t2lQ1m2tVW4I1G5k1269Vm8ZVW91tG/T/Axo5ZbhhT+hwAAAAAElFTkSuQmCC) no-repeat;
        background-size: 90px auto;
    }
    .s_null .tip{
        margin-bottom: 15px;
        font-size: 16px;
        color: #333;
        line-height: 1;
        text-align: center;
    }
</style>
