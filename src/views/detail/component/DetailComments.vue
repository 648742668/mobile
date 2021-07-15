<template>
    <div class="container">
        <van-cell
                style="border-radius: 10px"
                is-link
                :clickable="true"
                title="商品评价"
                value="查看更多"
                title-class="pick-title"
                value-class="pick-value"
                @click="goComments()">
        </van-cell>
        <div class="comments">
            <comment-item v-for="(comment,index) in comments" :key="index" :comment="comment" />
        </div>
    </div>
</template>

<script>
    import CommentItem from "../../../components/content/commentslist/CommentItem";

    export default {
        name: "DetailComments",
        props: {
            productId:{
              type: Number,
              required:true
            },
            comments: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        components: {CommentItem},
        data() {
            return {
                data: [1, 2]
            }
        },
        methods:{
            goComments(){
                this.$router.push({path:"/comments",query:{productId:this.productId}})
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 10px;
        border-radius: 10px;
        background: white;
        margin-bottom: 10px;
    }

    .pick-title {
        font-size: 17px;
        font-weight: bold
    }

    .pick-value {
        color: red;
    }
</style>
