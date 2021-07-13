<template>
    <div id="main">
        <search-nav-bar class="home-nav"/>
        <tab-control
                :titles="['流行','新款','精品']"
                class="tab-control"
                ref="tabControl1"
                @tabControlClick='tabClick'
                v-show="isTabFixed"/>
        <scroll class="content-a"
                ref="scroll"
                :probeType='3'
                @scrollToEnd='scrollToEnd'
                :pullup="true"
                :listenScroll="true"
                @scroll='scroll'
                :data="goodList">
            <div  class="swiper-wrapper">
                <home-swiper :banner="banner"
                             @swiperImgLoad="swiperImgLoad"/>
            </div>
            <div style="background: white">
                <div class="recommends-wrapper">
                    <main-recommend
                            :recommends="recommends1"
                    />
                    <main-recommend
                            :recommends="recommends2"
                    />
                </div>
            </div>

                <main-hot :hots="hots"/>
<!--            <future-view/>-->
            <tab-control
                    :titles="['流行','新款','精品']"
                    ref="tabControl2"
                    @tabControlClick='tabClick'/>
            <goods-list :goods="goodList" />
        </scroll>
        <back-top ref='backtop' @click.native='backTop'/>
    </div>
</template>

<script>
    import {banner, hots, recommends1, recommends2} from "../../mock/mock";
    import NavBar from "../../components/common/navbar/NavBar";
    import HomeSwiper from "./component/HomeSwiper";
    import MainRecommend from "./component/MainRecommend";
    import TabControl from "../../components/content/tabcontrol/TabControl";
    import GoodsList from "../../components/content/goodslist/GoodsList";
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/content/backtop/BackTop";
    import {backTopMixin, itemLoadListenerMixin} from "../../common/mixin";
    import SearchNavBar from "../../components/search_input/SearchNavBar";

    import MainHot from "./component/MainHot";

    const basePrefix="/mb-product"
    export default {
        name: "Home",
        data() {
            return {
                hots:[],
                result: null,
                banner: [],
                recommends1: [],
                recommends2: [],
                goods: {
                    pop: {page: 0, list: []},
                    new: {page: 0, list: []},
                    sell: {page: 0, list: []}
                },
                currentType: 'pop',
                offsetTop: -1,
                isTabFixed: false,
                saveY: 0
            }
        },
        components: {
            MainHot,
            SearchNavBar,
            GoodsList,
            NavBar,
            HomeSwiper,
            MainRecommend,
            TabControl,
            Scroll,
            BackTop

        },
        created() {
            this.getHomeMultiData()
            this.getGoodsData('sell');
            this.getGoodsData('new');
            this.getGoodsData('pop');

        },
        methods: {
            getHomeMultiData() {
                // getHomeMultiData().then(res => {
                //     // console.log(res);
                    this.recommends1 = recommends1;
                    this.recommends2 = recommends2;
                    this.banner = banner
                    this.hots=hots
                // })
            },
            getGoodsData(type) {
                let page = this.goods[type].page + 1;
                this.get(basePrefix + "/list-main",{pageNum:page},obj=>{
                    this.goods[type].list.push(...obj.records);
                })
                // getGoodsData(type, page).then(res => {
                //     this.goods[type].page++;
                //     this.goods[type].list.push(...goodsList);
                // })
            },
            //    tab control 自定义事件
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break

                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            scroll(pos) {
                this.isTabFixed = -pos.y > this.offsetTop;
                this.$refs.backtop.isShow = pos.y < -1050;
            },
            scrollToEnd() {
                this.getGoodsData(this.currentType)
            },
            swiperImgLoad() {
                this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
            }
            //    防抖函数

        },
        mixins: [backTopMixin, itemLoadListenerMixin],
        computed: {
            goodList() {
                return this.goods[this.currentType].list
            }
        },
        activated() {
            this.$refs.scroll.refresh();
            this.$refs.scroll.scrollTo(0, this.saveY, 0);
        },
        deactivated() {
            this.saveY = this.$refs.scroll.scrollY();
            this.$refs.scroll.refresh()

            this.$bus.$off('imgLoad', this.itemLoadListener)
        },

    }
</script>

<style scoped>
    #main {
        /*padding-top: 44px;*/
        /*viewport height 如果不设置这个，原有的大量商品会把home撑开5000px*/
        height: 100vh;
        background: var(--color-tint);
    }

    .home-nav {
        background-color: var(--color-tint);
        font-weight: 700;
        color: #fff;

        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*!*设置防遮盖*!*/
        z-index: 9;
    }

    /*当tab control变化到44px时 属性由static变成fixed*/
    .tab-control {
        position: relative;
        /*top: 44px;*/
        /*background: white;*/
        z-index: 9;
    }

    .content-a {
        /*height: calc(100% - 93px);*/
        /*overflow: hidden;*/
        /*margin-top: 44px;*/
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .fix {
        position: absolute;
        top: 44px;
        right: 0;
        left: 0;
        z-index: 9;
    }
    .swiper-wrapper{
        padding: 10px;
        background: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>
