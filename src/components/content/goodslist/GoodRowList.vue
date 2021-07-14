<template>
    <div class="content">
        <goods-row-item class="goods-item" v-for="(item,index) in goods" :goods='item' :key="index"/>

    </div>
</template>

<script>
    import GoodsRowItem from "./GoodsRowItem";

    export default {
        name: "GoodRowList",
        data() {
            return {}
        },
        props: {
            goods: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        components: {
            GoodsRowItem
        }
    }
</script>

<style scoped>

</style>
