<template>

  <div style="height:95vh ; background: #f2f2f2;">
    <div id="my_head">
      <component
          v-if="isRouterAlive"
          :is="myHeadForm"></component>
    </div>
    <div id="my_main">
      <component
          v-if="isRouterAlive"
          :is="myMainForm"></component>
    </div>
    <div id="my_footer">
      <component
          v-if="isRouterAlive"
          @reload="reload"
          :is="myFooterForm"></component>
    </div>
  </div>
</template>

<script>


import {IMG_URL} from "@/config/config";

export default {
  name: "Me",
  data() {
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload () {
      console.log()
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  },
  computed: {
    myHeadForm() {
      return () => import('./myHeadForm')
    },
    myMainForm() {
      return () => import('./myMainForm')
    },
    myFooterForm() {
      return () => import('./myFooterForm')
    }
  },

}
</script>

<style scoped lang="less">
#my_head {
  width: 100vw;
  height: 12vh;
}

#my_main {
  margin-top: 3vh;
  width: 100vw;
  height: 30vh;
}

#my_footer {
  width: 100vw;
  height: 30vh;
}

</style>
