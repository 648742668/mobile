<template>
    <div class="container">
        <div class="first-line">
            <div class="comment-consumer left">
                <img width="30" height="30" src="https://i.loli.net/2021/07/13/aQlZmexdIiFEsTM.jpg">
                <span class="consumer-nick">阿巴阿巴</span>
            </div>
            <div class="comment-time right">2021-3-4</div>
        </div>
        <div class="second-line">
            <div>
                <van-rate v-model="comment.rank" :size="15"/>
            </div>
            <span>绿色,128G</span>
        </div>
        <div class="third-line van-multi-ellipsis--l3">
            非常好用，非常好用，非常好用，非常好用，非常好用，   非常好用，非常好用，非常好用，非常好用，非常好用，   非常好用，非常好用，非常好用，非常好用，非常好用，
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommentItem",
        props: {
            comment: {
                type: Object,
                default: () => {
                    return {
                        rank: 4
                    }
                }
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
    .second-line > span{
        margin-left: 5px;
        font-size: 12px;
        height: 17px;
        line-height: 17px
    }
    .third-line{
        margin-top: 3px;
    }
</style>
