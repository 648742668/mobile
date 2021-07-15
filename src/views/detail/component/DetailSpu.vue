<template>
    <div class="container">
        <div style="color: #000000;border-left: red 3px solid;padding-left: 3px"><strong>详情</strong></div>
        <div style="font-size: 12px;margin-top: 10px;font-weight: bold">参数详情</div>
        <table class="info-param">
            <tr v-for="(spu,index) in spuList" :key="index">
                <td class="info-param-key">{{spu.key}}</td>
                <td class="param-value">{{spu.value}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "DetailSpu",
        props:{
            spuList:{
                type:Array,
                default:()=>{
                    return [
                        {key:"屏幕大小",value:"6.5 inch"},
                        {key:"屏幕大小",value:"6.5 inch"},
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        border-radius: 10px;
        padding: 20px;
        background: white;
    }

    .info-param-key {
        /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
        width: 80px;
        border-left: 1px solid #dadada;
        border-top: 1px solid #dadada;
    }

    .param-value {
        border-top: 1px solid #dadada;
        border-right: 1px solid #dadada;
        border-left: 1px solid #dadada;
    }

    .info-param {
        margin-top: 10px;
        width: 100%;
        font-size: 12px;
        border-bottom: 1px solid #dadada;
    }


    .info-param td {
        padding: 8px;
        text-align: left;
    }
</style>
