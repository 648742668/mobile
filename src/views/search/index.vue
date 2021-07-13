<template>
    <div>

        <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" @search="enter" show-action>
            <van-icon name="arrow-left" slot="left"/>
            <span slot="action">搜索</span>
        </van-search>

        <div class="recent-search">
            <div class="recent-search-title">
                <span class="left">最近搜索</span>
                <span class="right">
                    <img src="~@/assets/img/delete.svg" @click="clearHistory">
                </span>
            </div>
            <div>
                <span v-for="(item,index) in history" :key="index" class="search-content">
                    {{item}}
                </span>
            </div>
        </div>
        <div class="recent-search">
            <div class="recent-search-title">
                <span class="left">热门搜索</span>
                <span class="right">
                    隐藏
                </span>
            </div>
            <div>
                <span v-for="(item,index) in history" :key="index" class="search-content">
                    {{item}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import ZtHistoryItem from "./component/ZtHistoryItem";
    import {getHistory} from "../../utils/auth";

    export default {
        name: "SearchInput",
        components: {ZtHistoryItem},
        data() {
            return {
                value: "",
                history: ['mate40', 'p30', 'iPhone12 pro max', '小米11 ultra'],
                hot: ['mate40', 'p30', 'iPhone12 pro max', '小米11 ultra'],
            }
        },
        methods:{
            clearHistory(){

            },
            enter(value){
                console.log(value)
                let history = getHistory();
            },
            clickSearch(){
                this.enter(this.value)
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
    .recent-search-title .left{
        font-weight: bold;
        font-size: 15px;
    }
    .recent-search-title .right{
        font-size: 15px;
    }
    .search-content{
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
