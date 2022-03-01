<template>
  <el-container class="create-form">
    <el-aside width="300px">Aside</el-aside>
    <el-main>Main</el-main>
    <el-aside width="300px">Aside</el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
  }
})
</script>

<style lang="less">
.create-form{
  height: 100%;
  .el-main{
    padding: 0;
  }
}
</style>
