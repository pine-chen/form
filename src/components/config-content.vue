<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="tabHandleClick"
  >
    <el-tab-pane label="组件配置" name="component">
      <div>
        <label>label设置：</label>
        <el-input v-model="currentComponent.label" @input="valueChange('label', $event)"></el-input>
      </div>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="config"></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { IComponentItem } from '@/hooks/hooks.dto'

export default defineComponent({
  name: 'config-content',
  setup (props, { emit }) {
    const activeName = ref('component')
    const currentComponent = reactive({})

    const tabHandleClick = (tab:string, event:Event) => {
      console.log(tab, event, 111)
    }
    const setItem = (item:IComponentItem) => {
      Object.assign(currentComponent, item)
    }
    const valueChange = (name:string, value: Event) => {
      emit('value-change', name, value)
    }
    return {
      activeName,
      currentComponent,
      tabHandleClick,
      setItem,
      valueChange
    }
  }
})
</script>

<style scoped lang="less">

</style>
