<template>
    <div class="container">
        <van-cell
                style="border-radius: 10px"
                is-link
                :value="value"
                :clickable="true"
                title="请选择"
                @click="doPick"
                title-class="pick-title" >

        </van-cell>

    </div>
</template>

<script>
    export default {
        name: "DetailPickChoice",
        props:{
            value:{
                type:String,
                default:"请选择颜色/内存/容量"
            },
        },
        methods:{
            doPick(){
                this.$emit('doPick')
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 10px;
        border-radius: 10px;
        background: white;
    }
    .pick-title{
        font-size: 17px;font-weight: bold
    }

</style>
