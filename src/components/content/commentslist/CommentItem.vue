<template>
    <div class="container">
        <div class="first-line">
            <div class="comment-consumer left">
                <img width="30" height="30" :src="getFullUri">
                <span class="consumer-nick">{{comment.nickname}}</span>
            </div>
            <div class="comment-time right">{{comment.createTime}}</div>
        </div>
        <div class="second-line">
            <div>
                <van-rate v-model="comment.rank" :size="15"/>
            </div>
            <span>{{getSkuList}}</span>
        </div>
        <div class="third-line van-multi-ellipsis--l3">
            {{comment.content}}
        </div>
    </div>
</template>

<script>
    import {IMG_URL} from "../../../config/config";

    export default {
        name: "CommentItem",
        props: {
            comment: {
                type: Object,
                default: () => {
                    return {
                        id: -1,
                        content: "非常好用，非常好用，非常好用，非常好用，非常好用，非常好用，非常好用，非常好用，非常好用，非常好用非常好用，非常好用，非常好用，非常好用，非常好用，",
                        rank: 4,
                        skuList: ["128G", "64G", "墨绿色"],
                        images: "",
                        createTime: "2021-4-2",
                        nickname: "haha",
                        img: "40790746644600whhm.jpg",

                    }
                }
            }
        },
        computed:{
            getSkuList(){
                let skus = ""
                for (let i = 0; i < this.comment.skuList.length; i++) {
                    skus+=this.comment.skuList[i]+","
                }
                return skus.substring(0,skus.length - 1)
            },
            getFullUri(){
                return IMG_URL + this.comment.img
            }
        }
    }
</script>

<style scoped>
    .container {
        background: white;
        border-radius: 10px;
        margin-top: 10px;
        padding-right: 20px;
        padding-left: 20px;
        font-size: 15px;
        padding-bottom: 10px;
    }

    .first-line {
        min-height: 35px;
    }

    .comment-consumer {
        display: flex;
    }

    .comment-consumer .consumer-nick {
        margin-left: 5px;
        display: inline-block;
        font-weight: bold;
        color: #000000;
        flex: 1;
    }

    .second-line {
        display: flex;
    }

    .second-line > div {
        border-right: red solid 3px;
        padding-right: 5px;
        height: 17px;
        line-height: 17px
    }

    .second-line > span {
        margin-left: 5px;
        font-size: 12px;
        height: 17px;
        line-height: 17px
    }

    .third-line {
        margin-top: 3px;
    }
</style>
