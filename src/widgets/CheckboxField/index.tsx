import { useEffect, useState } from 'react'
import { Checkbox } from '@material-ui/core'
import styles from './index.module.scss'
export interface Props  {
    name?: string,
    value?: any,
  handleChange: any,
  className?: any,
  text?: any
}

const CheckboxField = ({ name, value, handleChange, className , text }: Props) => {
  const [checked, setChecked]=useState<boolean>(value)
  useEffect(()=>  {
    setChecked(value)
  },[value])
  return (
    <div className={` ${styles.commonInputfields} ${className ? className : ''}`}>
      <Checkbox name={name} color='primary' checked={value} size='small' disableRipple={true} className={` ${styles.sfn_checkbox} `} onChange={(e)=> {
      setChecked(!checked);
      handleChange(e);
      
      }} />  &nbsp;&nbsp; {text}
         
        </div>)
}                            
 
export default CheckboxField
