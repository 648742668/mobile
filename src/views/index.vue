<template>
  <div>
    <router-view/>
    <main-tab-bar style="height: 20px;"></main-tab-bar>
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
  }
}
</script>

<style scoped>

</style>
