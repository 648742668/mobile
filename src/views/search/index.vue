<template>
    <div>

        <zt-search-navbar @searchEnter="enter" v-model="value"/>
        <div class="recent-search" v-show="history.length > 0">
            <div class="recent-search-title">
                <span class="left">最近搜索</span>
                <span class="right">
                    <img src="~@/assets/img/delete.svg" @click="clearHistory">
                </span>
            </div>
            <div>
                <span v-for="(item,index) in history" :key="index" class="search-content" @click="enter(item)">
                    {{item}}
                </span>
            </div>
        </div>
        <div class="recent-search">
            <div class="recent-search-title">
                <span class="left">热门搜索</span>
                <span class="right" @click="showHot=!showHot" v-if="showHot">
                    隐藏
                </span>
                <span class="right" @click="showHot=!showHot" v-else>
                    显示
                </span>
            </div>
            <div v-show="showHot">
                <span v-for="(item,index) in hot" :key="index" class="search-content" @click="enter(item)">
                    {{item}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import ZtHistoryItem from "./component/ZtHistoryItem";
    import {getHistory, removeHistory, setHistory} from "../../utils/auth";
    import {Notify} from "vant";
    import ZtSearchNavbar from "../../components/content/searchnavbar/SearchNavbar";

    export default {

        name: "SearchInput",
        components: {ZtSearchNavbar, ZtHistoryItem},
        data() {
            return {
                value: "",
                history: [],
                hot: ['mate40', 'p30', 'iPhone12 pro max', '小米11 ultra'],
                showHot: true
            }
        },
        created() {
            let history = getHistory()
            if (history !== undefined) {
                let temp = history.split(",")
                for (let i = 0; i < 20 && i < temp.length; i++) {
                    if (temp[i].trim().length > 0) {
                        this.history.push(temp[i])
                    }
                }
            }
        },
        methods: {
            clearHistory() {
                removeHistory()
                this.history = []
            },
            enter(value) {
                if (value.trim().length > 0) {
                    this.history.unshift(value)
                    let history = getHistory();
                    if (history === undefined) {
                        setHistory("," + value)
                    } else {
                        setHistory("," + value + history)
                    }
                    this.$router.push({path:"/search_results",query:{content:value}})
                } else {
                    Notify({ type: 'warning', message: '请输入内容',duration: 1000, });
                }
            }

        }
    }
</script>

<style scoped>
    .recent-search {
        padding-right: 15px;
        padding-left: 15px;
        margin-top: 3px;
        margin-bottom: 20px;
    }

    .recent-search-title {
        min-height: 30px;
    }

    .recent-search-title .left {
        font-weight: bold;
        font-size: 15px;
    }

    .recent-search-title .right {
        font-size: 15px;
    }

    .search-content {
        display: inline-block;
        background: #F0F2F5;
        margin-right: 5px;
        border-radius: 8px;
        padding: 3px;
        margin-bottom: 5px;
        font-size: 15px;
        font-weight: bold;
    }
</style>
