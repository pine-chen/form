
export interface IPropValue {
  placeholder?: string,
  disabled?: boolean,
  clearable?:boolean,
  type?: string
}

export interface IComponentItem {
  id?:string,
  label:string,
  value?:string
  component:string,
  propValue?: IPropValue
}
