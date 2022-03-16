<template>
  <div class="middle-content">
    <div class="operate">
      <el-button size="small">编辑</el-button>
      <el-button size="small">展示</el-button>
      <el-button size="small">清空</el-button>
    </div>
    <div
      v-show="editing"
      class="middle-zone"
      :class="{border: showBorder}"
      @drop="handleDrop"
      @dragover="handleDragOver"
    >
      <el-form label-width="100px">
        <div
          class="field-wrapper"
          :class="{active: item.id === currentComponent.id}"
          v-for="(item, index) in componentList"
          :key="item.id"
        >
          <el-form-item
            :label="item.label"
            @click="selectCurrentComponent($event, item)"
          >
            <component
              :is="item.component"
              v-bind="item.propValue"
              v-model="item.value"
            ></component>
          </el-form-item>
          <el-button-group class="item-actions">
            <el-button
              size="small"
              @click="copyItem(item, index)"
              :icon="CopyDocument"
            ></el-button>
            <el-button
              size="small"
              @click="deleteItem(item, index)"
              :icon="Delete"
            ></el-button>
          </el-button-group>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { Delete, CopyDocument } from '@element-plus/icons-vue'
import { v4 as uuidv4 } from 'uuid'
import { formComponentsMap } from '@/hooks/componentsMap'
import { IComponentItem } from '@/hooks/hooks.dto'

export default defineComponent({
  name: 'render-content',
  setup (props, { emit }) {
    const editing = ref(true) // 编辑模式
    const showBorder = ref(false) // 拖拽显示
    const currentComponent = reactive({}) // 当前item
    const componentList:IComponentItem[] = reactive([]) // 组件list
    /**
     * 对外方法，设置拖拽添加数据
     * @param e 拖拽数据
     */
    const handleDrop = (e:any) => {
      e.preventDefault()
      e.stopPropagation()
      const name = e.dataTransfer.getData('name')
      const component = formComponentsMap.find((item) => item.component === name)
      if (component) {
        addComponent(component)
        clearCurrentComponent()
      }
    }
    /**
     * 对外方法，设置是否结束拖拽
     */
    const handleDragOver = (e:Event) => {
      e.preventDefault()
      showBorder.value = true
    }
    /**
     * 对外方法，设置是否正在拖拽
     * @param { Boolean } dragging 是否正在拖拽
     */
    const setDragging = (dragging:boolean) => {
      showBorder.value = dragging
    }
    /**
     * 对外方法，设置添加数据
     * @param { IComponentItem } component 添加的组件信息
     */
    const addComponent = (component:IComponentItem) => {
      const item = {
        id: uuidv4(),
        component: component.component,
        value: component.value,
        label: component.label,
        propValue: component.propValue
      }
      componentList.push(item)
      editing.value = true
      showBorder.value = true
    }
    /**
     * 拷贝数据
     * @param item 添加的组件信息
     * @param index 索引
     */
    const copyItem = (item:IComponentItem, index:number) => {
      componentList.splice(index + 1, 0, {
        ...item,
        propValue: { ...item.propValue },
        id: uuidv4()
      })
    }
    /**
     * 删除数据
     * @param item  添加的组件信息
     * @param index 索引
     */
    const deleteItem = (item:IComponentItem, index:number) => {
      componentList.splice(index, 1)
      clearCurrentComponent()
    }
    /**
     * 设置选中当前组件
     * @param e
     * @param item 添加的组件信息及索引
     */
    const selectCurrentComponent = (e:Event, item:IComponentItem) => {
      Object.assign(currentComponent, item)
      emit('set-props', item)
    }
    /**
     * 清除选中当前组件
     */
    const clearCurrentComponent = () => {
      Object.assign(currentComponent, {})
      emit('set-props', {})
    }
    /**
     * 对外方法
     * 设置组件值
     */
    const valueChange = (name:string, value: string) => {
      console.log(name, value, 22222)
    }

    return {
      Delete,
      CopyDocument,
      editing,
      showBorder,
      currentComponent,
      componentList,
      handleDrop,
      handleDragOver,
      setDragging,
      addComponent,
      selectCurrentComponent,
      copyItem,
      deleteItem,
      valueChange
    }
  }
})
</script>

<style lang="less" scoped>
.middle-content{
  height: 100%;
  padding: 10px;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .operate{
    margin-bottom: 10px;
  }
  .middle-zone{
    background: #fafafa;
    flex: 1;
    border: 1px solid #eaeefb;
    &.border {
      border-color: #409eff;
    }
    .field-wrapper {
      background: #fff;
      border: 1px dashed #eaeefb;
      margin: 10px;
      // padding: 20px;
      position: relative;
      animation: bg-flash 0.3s;
      .el-form-item {
        margin-bottom: 0;
        padding: 20px;
      }
      &.active {
        border-color: #409eff;
        .item-actions {
          display: block;
        }
      }
      .item-actions {
        position: absolute;
        left: -1px;
        top: -20px;
        display: none;
      }
    }
  }
}

@keyframes bg-flash {
  0% {
    background: #fff;
  }
  50% {
    background: rgb(248, 237, 153);
  }
  100% {
    background: #fff;
  }
}
</style>
