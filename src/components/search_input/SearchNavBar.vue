<template>
    <div class="nav-bar">
        <van-search
                class="van-search"
                v-model="value"
                shape="round"
                :background="background"
                :placeholder="placeholder"
                placeholder="请输入搜索关键词"
        />
    </div>
</template>

<script>
    export default {
        name: "SearchNavBar",
        props:{
            value: {
                type: String,
                default: ""
            },
            background:{
                type: String,
                default: "#ea5e5e"
            },
            placeholder:{
                type: String,
                default: "#"
            }

        }
    }
</script>

<style scoped>
.van-search{
    padding: 5px 10px;
}
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
