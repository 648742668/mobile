<template>
    <div>
        <h1>
            category
            <button @click="goFootPrint">足迹</button>
            <button @click="goFavorite">收藏</button>
        </h1>
    </div>
</template>

<script>
    export default {
        name: "Category",
        methods:{
			goFootPrint(){
				this.$router.push({
                    path: '/footPrint'
                })
            },
			goFavorite() {
				this.$router.push({
					path: '/favorite'
				})
            }
        }
    }
</script>

<style scoped>

</style>
