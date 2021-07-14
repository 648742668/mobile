<template>
    <swiper v-if="topImgs.length">
        <swiper-item v-for="(item, index) in topImgs" :key="index">
            <a>
                <img :src="getFullUrl(item)">
            </a>
        </swiper-item>
    </swiper>

</template>

<script>
    import Swiper from "../../../components/common/swiper/Swiper";
    import SwiperItem from "../../../components/common/swiper/SwiperItem";
    import {IMG_URL} from "../../../config/config";

    export default {
        name: "DetailImgSwiper",
        components: {Swiper, SwiperItem},
        props: {
            topImgs: {
                type: Array,
                default: () => {
                    return [
                        '40192419930800HDwL.jpg',
                        '40192464231900tOcM.jpg',
                        '40192508022100NdvA.jpg',
                        '40192316617200yTOE.jpg',
                        '40192253848300MBEm.jpg',
                        '40192290713300GXaj.jpg',
                    ]
                }
            }
        },
        methods: {
            getFullUrl(name) {
                return IMG_URL + name
            }
        }
    }
</script>

<style scoped>

</style>
