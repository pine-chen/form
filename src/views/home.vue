<template>
  <el-container class="create-form">
    <el-aside width="300px">
      <component-list
        ref="list"
        @from-dragend="() => $refs.content.setDragging(true)"
        @from-component="(item) => $refs.content.addComponent(item)"
      ></component-list>
    </el-aside>
    <el-main>
      <render-content
        ref="content"
        @set-props="(item) => $refs.config.setItem(item)"
      ></render-content>
    </el-main>
    <el-aside width="300px">
      <config-content
        ref="config"
        @value-change="(name, value) => $refs.content.valueChange(name, value)"
      ></config-content>
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ComponentList from '@/components/component-list.vue'
import RenderContent from '@/components/render-content.vue'
import ConfigContent from '@/components/config-content.vue'

export default defineComponent({
  name: 'home',
  components: {
    ComponentList,
    RenderContent,
    ConfigContent
  }
})
</script>

<style lang="less" scoped>
.create-form{
  height: 100%;
  .el-main{
    padding: 0;
  }
}
</style>
