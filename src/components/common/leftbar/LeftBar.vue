<template>
    <div class="container">
        <div class="left-place">
            <scroll class="content-a"
                    ref="scroll"
                    :probeType='3'
                    :data="items"
                    >
                <div ref="item"
                     @click="change(index)"
                     v-for="(item,index) in items"
                     class="bar-item"
                     :class="{active:currentIndex === index}"
                     >
                    <div class="bar-item-text"
                         :class="{active:currentIndex === index,disActive:currentIndex !== index}">
                        {{item.name}}
                    </div>
                </div>
            </scroll>

        </div>

        <div class="right-place">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    import Scroll from "../scroll/Scroll";

    export default {
        name: "LeftBar",
        components: {
            Scroll
        },
        props: {
            items: {
                required: true,
                type: Array
            }
        },
        data() {
            return {
                loading: false,
                finished: false,
                currentIndex: 0
            }
        },
        methods: {
            change(index) {
                this.currentIndex = index
                this.$emit("onChange", index)
            }
        },
        computed: {

        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        height: 100%;
    }

    .left-place {
        flex: 1;
        background: #F2F2F2;
    }

    .right-place {
        flex: 2;
        background: #ffffff;
    }

    .content-a {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: calc(100% - 33.3%);
    }
    .content-a .content{
        height: 100%;
    }
    .bar-item .active::before {
        content: '';
        border-left: #ea5e5e solid 4px;
        margin-right: 10px;
    }

    .active {
        background: white;
    }

    .disActive {
        padding-left: 14px;
    }

    .bar-item-text {
        width: 100%;
    }

    .bar-item {
        width: 100%;
        padding-left: 10px;

        height: 6vh;
        line-height: 6vh;
    }
</style>
