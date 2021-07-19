<template>
    <div class="container" v-html="html">

    </div>
</template>

<script>
    export default {
        name: "DetailContent",
        props:{
            html:{
                type:String,
                default:`<h1>暂无数据</h1>`
            }
        }
    }
</script>

<style scoped>
 .container{
     text-align: center;
 }
</style>
