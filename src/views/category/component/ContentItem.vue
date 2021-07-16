<template>
    <div class="container">
        <span class="title">{{category.name}}</span>
        <div class="category-wrapper">

            <div class="category-sub-item" v-for="item in category.children" @click="loadRes(item.name)">
                    <img :src="getFullUrl(item.image)" alt>
                    <div style="text-align: center">{{item.name}}</div>
            </div>
        </div>


    </div>
</template>

<script>
    import {IMG_URL} from "../../../config/config";
    import ZtHotItem from "../../../components/content/hot/ZtHotItem";

    export default {
        name: "ContentItem",
        components: {ZtHotItem},
        props:{
            category:{
                required:true,
                type:Object
            }
        },
        data() {
            return {}
        },
        methods: {
            loadRes(name){
                this.$emit("searchCategory",name)
            },
            getFullUrl(value) {
                return IMG_URL + value
            },
            imgLoad() {
                this.$bus.$emit("imgLoad")
            },
        }

    }
</script>

<style scoped>
    .container {
        display: block;
    }

    .container .title {
        display: inline-block;
        font-weight: bolder;
        font-size: 15px;
        margin-bottom: 5px;
    }


    .category-wrapper {
        font-size: 12px;
        display: flex;
        width: 100%;
        background: white;
        flex-wrap: wrap;
        /*均等分*/
        justify-content: flex-start;
        margin-bottom: 5px;
    }

    .category-sub-item {
        width: 33.3%;
        padding: 2px;
    }

    .category-sub-item img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: 7px;
    }

</style>
