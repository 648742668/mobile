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
        <van-grid :column-num="3" v-show="getImages.length > 0" class="comment-grid" :gutter="3" square>
            <van-grid-item v-for="value in getImages" :key="value" style="border-radius: 7px">
                <img v-lazy="getFullUrl(value)" @load="imgLoad" class="comment-image">
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    import {IMG_URL} from "../../../config/config";

    export default {
        name: "CommentItem",
        created() {
        },
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
        methods: {
            imgLoad() {
                this.$bus.$emit("imgLoad")
            },
            getFullUrl(value) {
                return IMG_URL + value
            }
        },
        computed: {
            getSkuList() {
                let skus = ""
                for (let i = 0; i < this.comment.skuList.length; i++) {
                    skus += this.comment.skuList[i] + ","
                }
                return skus.substring(0, skus.length - 1)
            },
            getFullUri() {
                return IMG_URL + this.comment.img
            },
            getImages() {
                let images = []
                let temp = this.comment.images.split(", ")
                for (let i = 0; i < 6 && temp.length; i++) {
                    if (temp[i]) {
                        images.push(temp[i])
                    }
                }
                return images
            }
        }
    }
</script>

<style scoped>
    .comment-image {

    }

    .comment-grid {
        margin-top: 10px;
    }

    .container {
        background: white;
        border-radius: 10px;
        font-size: 15px;
        padding: 10px 20px;
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

    .comment-image {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
</style>
