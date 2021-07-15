<template>
    <div>
        <van-tabbar
                :border="true"
                v-model="getActive"
                @change="onChange"
                active-color="#ff0000">
            <van-tabbar-item icon="wap-home" name="/main">主页</van-tabbar-item>
            <van-tabbar-item icon="bag" name="/category">目录</van-tabbar-item>
            <van-tabbar-item icon="cart" name="/cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="manager" name="/me">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

    export default {

        name: "MainTabBar",
        components: {},
        data() {
            return {
                active: "/main",
                paths: ["/main", "/category", "/cart", "/me"]
            }
        },
        methods: {
            onChange(index) {
                if (index !== this.$route.path)
                    this.$router.push(index)
                console.log(index)
            },
        },
        computed: {
            getActive: {
                get() {
                    return this.$route.path
                },
                set(value) {
                    this.active = value
                }
            }
        }
    }
</script>

<style scoped lang="less">

</style>
