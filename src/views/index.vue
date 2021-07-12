<template>
  <div>
    <router-view/>
    <main-tab-bar style="height: 20px;" v-if="isShowMainBar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "../components/tabbar/MainTabBar";

export default {
  name: "Index",
  components: {
    MainTabBar
  },
  computed: {
    isShowMainBar() {
      return this.$route.path.indexOf("login") <= -1
    }
  }
}
</script>

<style scoped>

</style>
