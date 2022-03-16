import { IComponentItem } from '@/hooks/hooks.dto'

export const formComponentsMap:IComponentItem[] = [
  {
    label: '输入框',
    value: 'value',
    component: 'ElInput',
    propValue: {
      placeholder: '请输入',
      disabled: false,
      clearable: true,
      type: 'text'
    }
  },
  {
    label: '选择框',
    value: 'value',
    component: 'ELSelect'
  },
  {
    label: '单选框',
    value: 'value',
    component: 'ELRadio'
  }
]

export const ComponentPropsNameMap = {
  placeholder: 'placeholder',
  disabled: '是否禁用',
  clearable: '是否清除',
  type: '类型'
}
