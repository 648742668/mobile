<template>
    <div class="recommends">
        <div class="recommend-item" v-for="item in recommends">
            <a :href="item.link">
                <img :src="item.image">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainRecommend",
        props:{
            recommends:Array
        }
    }
</script>

<style scoped>
    .recommends{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 10px 10px 0 10px;
        background: white;
    }
    .recommend-item{
        margin: 5px;
        flex: 1;
    }
    .recommend-item a img{
        width: 40px;
        height: 40px;
    }
</style>
