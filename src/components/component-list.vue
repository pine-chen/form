<template>
  <div class="left-content" @dragstart="handleDragStart">
    <div>基础组件</div>
    <div
      class="button-item"
      v-for="(item, index) in formComponentsMap"
      :key="index"
      draggable="true"
      :data-compontent="item.component"
      @dragend="onDragend()"
    >
      <el-button
        size="small"
        @click="addComponent(item)"
      >{{item.label}}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formComponentsMap } from '@/hooks/componentsMap'

export default defineComponent({
  name: 'component-list',
  setup (props, { emit }) {
    const handleDragStart = (e:any) => {
      e.dataTransfer.setData('name', e.target.dataset.compontent)
    }

    const onDragend = () => {
      emit('from-dragend')
    }
    const addComponent = (item:Event) => {
      emit('from-component', item)
    }
    return {
      formComponentsMap,
      handleDragStart,
      onDragend,
      addComponent
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.left-content{
  height: 100%;
  padding: 10px;
  overflow: auto;
  .button-item{
    padding-top: 20px;
    text-align: center;
  }
}
</style>
