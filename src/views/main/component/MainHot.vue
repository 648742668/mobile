<template>
    <div class="hot">
        <zt-hot-item v-for="(hot,index) in hots"
                     class="hot-item"
                     :item="hot"
                     :key="index"
        ></zt-hot-item>
    </div>
</template>

<script>
    import ZtHotItem from "../../../components/content/hot/ZtHotItem";

    export default {
        name: "MainHot",
        components: {ZtHotItem},
        props: {
            hots: {
                type: Array,
                default: () => {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .hot {
        display: flex;
        width: 100%;
        padding: 10px 10px 0 10px;
        background: white;
        flex-wrap: wrap;
        /*均等分*/
        justify-content: space-around;
    }

    .hot-item {
        width: 47%;
        /*margin: 5px;*/
        /*flex: 1;*/
    }
</style>
