<template>
    <div class="nav-bar">
        <van-search
                v-model="data"
                placeholder="请输入搜索关键词"
                shape="round"
                @input="input"
                @search="enter"
                show-action>
            <van-icon name="arrow-left" slot="left" @click="$router.back()"/>
            <span slot="action" @click="clickSearch">搜索</span>
        </van-search>
    </div>
</template>

<script>
    export default {
        name: "ZtSearchNavbar",
        created() {
            this.data = this.value
        },
        props:{
            value:{
                default:"",
                type:String
            }
        },
        data(){
            return {
                data:""
            }
        },
        methods:{
            enter(value){
                this.$emit("searchEnter",value)
            },
            clickSearch(){
                this.enter(this.value)
            },
            input(value){
                this.$emit("input",value)
            }

        }

    }
</script>

<style scoped>
    .nav-bar {
        position: relative;
        z-index: 10;

        /*display: flex;*/
        /**/
        /*height: 44px;*/
        /*line-height: 44px;*/
        /*text-align: center;*/
    }
</style>
