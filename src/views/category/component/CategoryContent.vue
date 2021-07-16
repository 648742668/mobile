<template>
    <div class="content-wrapper">

        <scroll class="content-a"
                ref="scroll"
                :probeType='3'
                @scrollToEnd='scrollToEnd'
                :pullup="true"

                :data="items">
            <content-item @searchCategory="searchCategory" v-for="(item,index) in items" :category="item"
                          :key="index">

            </content-item>
        </scroll>
    </div>
</template>

<script>
    import ContentItem from "./ContentItem";
    import Scroll from "../../../components/common/scroll/Scroll";

    export default {
        name: "CategoryContent",
        components: {ContentItem, Scroll},
        props: {
            items: {
                required: true,
                type: Array
            }
        },
        data() {
            return {}

        }, methods: {
            scrollToEnd() {
                this.$emit("loadMore")
            }, searchCategory(name) {
                this.$emit('searchCategory', name)
            }
        }
    }
</script>

<style scoped>
    .content-wrapper {
    }

    .content-a {

        position: absolute;
        top: 3px;
        bottom: 0;
        left: 33.3%;
        right: 0;
        padding: 10px;
    }

</style>
