<template>
    <div class="nav-bar" :style="{background:background}">
        <div class="left">
            <slot name="left"/>
        </div>
        <div class="middle">
            <slot name="middle"/>
        </div>
        <div class="right">
            <slot name="right"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props: {
            background: {
                type: String,
                default: "transparent"
            }
        }
    }
</script>

<style scoped>
    .nav-bar {
        position: relative;
        z-index: 10;

        display: flex;

        height: 44px;
        line-height: 44px;
        text-align: center;
    }

    .left, .right {
        width: 15%;
    }

    .middle {
        flex: 1;
    }
</style>
