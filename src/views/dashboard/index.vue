<template>
  <div class="dashboard-container">
     <img src="@/assets/HomePage.jpg" width="100%" height=600>
  </div>
</template>

<script>
import { getIndexData } from "@/api/index.js";
export default {
  name: 'Dashboard',
  mounted () {
    getIndexData().then((result) => {
        console.log(result);
        //TODO
    });
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
