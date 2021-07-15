<template>
    <div class="container">
        <van-nav-bar
                class="nav-bar"
                title="商品评价"
                @click-left="onClickLeft"
        >
            <van-icon name="arrow-left" slot="left" size="23"/>
        </van-nav-bar>
        <scroll class="content-a"
                ref="scroll"
                :probeType='3'
                @scrollToEnd='scrollToEnd'
                :pullup="true"
                :listenScroll="true"

                :data="comments">

            <comment-item v-for="(comment,index) in comments" :key="index" :comment="comment" class="comment-item"/>
        </scroll>
    </div>

</template>

<script>
    import CommentItem from "../../components/content/commentslist/CommentItem";
    import Scroll from "../../components/common/scroll/Scroll";
    import {itemLoadListenerMixin} from "../../common/mixin";

    const basePrefix = "/mb-comments"
    export default {
        name: "Comments",
        components: {CommentItem, Scroll},
        data() {
            return {
                productId: -1,
                page: 0,
                comments: []
            }
        },
        mixins:[itemLoadListenerMixin],
        created() {
            this.productId = parseInt(this.$route.query["productId"])
            this.loadComments()
        },
        methods: {
            scroll(pos) {
            },
            scrollToEnd() {
                this.loadComments()
            },
            loadComments() {
                this.page++
                this.get(basePrefix + "/load-comments", {pageNum: this.page, pid: this.productId}, obj => {
                    this.comments.push(...obj.records)
                })
            }, onClickLeft() {
                this.$router.back()
            }
        }

    }
</script>

<style scoped>
    .content-a {
        /*height: calc(100% - 93px);*/
        /*overflow: hidden;*/
        /*margin-top: 44px;*/
        position: absolute;
        top: 46px;
        bottom: 0;
        left: 0;
        right: 0;
        background: #F2F2F2;
    }
    .nav-bar{
        z-index: 10;
        position: relative;
    }
    .container{
        background: #F2F2F2;
    }
    .comment-item{
        margin-top: 10px;
        background: white;
    }
</style>
