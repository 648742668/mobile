<template>
    <swiper v-if="banner.length">
        <swiper-item v-for="(item, index) in banner" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgLoad" class="swiper_item_img">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    // import {Swiper, SwiperItem} from "components/common/swiper/index";
    import Swiper from "../../../components/common/swiper/Swiper";
    import SwiperItem from "../../../components/common/swiper/SwiperItem";

    export default {
        name: "HomeSwiper",
        data() {
            return {isLoad: false}
        },
        props: {
            banner: Array
        },
        components: {
            Swiper, SwiperItem
        }, methods: {
            imgLoad() {
                if (!this.isLoad) {
                    this.isLoad = !this.isLoad;
                    this.$emit('swiperImgLoad')
                }
            }
        }
    }
</script>

<style scoped>
.swiper_item_img{
    border-radius: 10px;
}
</style>
