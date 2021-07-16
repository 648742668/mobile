<template>
  <div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
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
