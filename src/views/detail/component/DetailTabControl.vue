<template>
    <tab-control
            :style="{opacity: opacity}"
            class="tab-control"
            :titles="['商品','评价','详情']"
            ref="tabControl2"
            @tabControlClick='tabClick'/>
</template>

<script>
    import TabControl from "../../../components/content/tabcontrol/TabControl";

    export default {
        name: "DetailTabControl",
        components: {
            TabControl
        },
        props: {
            opacity: 1
        },
        data() {
            return {
                isShow: true
            }
        },
        methods: {
            tabClick(index) {

            }
        }
    }
</script>

<style scoped>
    .tab-control {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;

    }
</style>
