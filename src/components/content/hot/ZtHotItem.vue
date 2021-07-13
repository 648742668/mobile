<template>
    <div class="zt-hot-item">
        <strong class="zt-hot-item-title">{{item.title}}</strong>
        <span class="zt-hot-item-desc" :style="{background:item.descBack}">
            <van-icon name="gift"/>
            {{item.desc}}
        </span>
        <div class="zt-hot-item-keywords" :style="{color:item.keywordsBack}">
            {{item.keywords}}
        </div>
        <div class="zt-hot-item-imgs">
            <img :src="item.img1">
            <img :src="item.img2">
        </div>
    </div>
</template>

<script>
    export default {
        name: "ZtHotItem",
        props: {
            item:{
                type:Object,
                default:()=>{
                    return     {
                        img1: "https://i.loli.net/2021/07/13/aQlZmexdIiFEsTM.jpg",
                        img2: "https://i.loli.net/2021/07/13/aQlZmexdIiFEsTM.jpg",
                        title: "东软直播",
                        desc: "图书暑假到",
                        keywords: "心选好物",
                        descBack:"#42b983",
                        keywordsBack:"#ff5777"
                    }

                }
            },
        }
    }
</script>

<style scoped>
    .zt-hot-item-title {
        font-size: 15px;
    }

    .zt-hot-item-desc {
        margin-left: 5px;
        padding: 2px 5px 2px 5px;
        border-radius: 5px;
        font-size: 12px;
        color: white;
    }

    .zt-hot-item-keywords {
        margin-top: 2px;
        font-size: 12px;
    }
    .zt-hot-item-imgs{
        width: 100%;
    }
    .zt-hot-item-imgs img {
        width: auto;
        height: auto;
        max-width: 50%;
        max-height: 50%;
    }
</style>
