<template>
    <div class="container">
        <zt-search-navbar @searchEnter="enter" v-model="value" class="zt-search-navbar"/>
        <div class="wrapper">

            <left-bar @onChange="onChange" :items="items">
                <category-content slot="content" :items="subCategory" @loadMore="loadOthers(currentId)"
                                  @searchCategory="enter"/>
            </left-bar>
        </div>
    </div>
</template>

<script>
    import ZtSearchNavbar from "../../components/content/searchnavbar/SearchNavbar";
    import LeftBar from "../../components/common/leftbar/LeftBar";
    import Content from "./component/CategoryContent";
    import CategoryContent from "./component/CategoryContent";
    import {Notify, Toast} from "vant";
    import {getHistory, setHistory} from "../../utils/auth";

    const basePrefix = "/mb-category"
    export default {
        name: "Category",
        components: {
            CategoryContent,
            Content,
            LeftBar,
            ZtSearchNavbar
        },
        created() {
            this.loadData()
        },
        data() {
            return {
                value: "",
                currentIndex: 0,
                items: [],
                subCategory: [],
                page: 0,
                currentId: -1,
                hasMore: true
            }
        },
        methods: {
            loadData() {
                this.get(basePrefix + "/get_first", null, obj => {
                    this.items = obj
                    this.currentId = obj[0].id
                    this.loadOthers(obj[0].id)
                })
            },
            loadOthers(id) {
                if (this.hasMore) {
                    this.page++
                    this.get(basePrefix + "/get_second", {cid: id, pageNum: this.page}, obj => {
                        if (obj.records.length > 0) {
                            this.subCategory.push(...obj.records)
                        } else {
                            this.hasMore = false
                            Toast("没有更多分类了")
                        }
                    })
                } else {
                    Toast("没有更多分类了")
                }

            },
            onChange(index) {
                this.hasMore = true
                this.page = 0
                this.subCategory = []
                this.currentIndex = index
                this.currentId = this.items[index].id
                this.loadOthers(this.items[index].id)
            }, enter(value) {
                console.log(value)
                if (value.trim().length > 0) {
                    let history = getHistory();
                    if (history === undefined) {
                        setHistory("," + value)
                    } else {
                        setHistory("," + value + history)
                    }
                    this.$router.push({path: "/search_results", query: {content: value}})
                } else {
                    Notify({type: 'warning', message: '请输入内容', duration: 1000,});
                }
            },
        }
    }
</script>

<style scoped>
    .container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        background: #F2F2F2;
        overflow: hidden;
    }

    .wrapper {
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 50px;
        margin-top: 10px;
    }

    .categories {
    }
</style>


