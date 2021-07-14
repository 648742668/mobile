<template>
  <div style="height:95vh ; background: #f2f2f2;">
    <div id="my_head">
      <component
          :is="myHeadForm"></component>
    </div>
    <div id="my_main">
      <component
          :is="myMainForm"></component>
    </div>
    <div id="my_footer">
      <component
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
      exist: false
    }
  },
  methods:{

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
