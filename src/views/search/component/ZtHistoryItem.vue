<template>
    <span class="zt-history-item">
        {{item}}
    </span>
</template>

<script>
    export default {
        name: "ZtHistoryItem",
        props: {
            item: {
                default: "",
                type: String
            }
        }
    }
</script>

<style scoped>
    .zt-history-item {
        border-radius: 2px;
        padding: 2px;
        margin: 3px;
        background: #eceaea;
    }
</style>
