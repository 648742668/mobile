<template>
    <div id="app">
        <router-view/>
        <main-tab-bar/>
    </div>
</template>
<script>
    import MainTabBar from "./components/tabbar/MainTabBar";
    export default {
        name: 'app',
        components: {
            MainTabBar
        },
        computed: {
            isShowMainBar() {
                return this.$route.path.indexOf("detail") <= -1
            }
        }

    }
</script>
<style lang="less">
</style>
