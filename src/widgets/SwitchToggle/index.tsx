import { useState, useEffect } from 'react'
import Switch from '@material-ui/core/Switch'
import styles from './index.module.scss'

interface Props {
    name: any,
    value: boolean,
    disabled?: boolean
    handleChange: any,
    className?:any,
}
const SwitchToggle=({name,disabled=false, value,handleChange,className}:Props)=>{
    const [checked, setChecked]=useState<boolean>(value)
    useEffect(()=>  {
        setChecked(value)
    },[value])
    return (  <Switch
    disabled={disabled}
        className={className?className:styles.switch_toggle}
        checked={checked}
        onChange={e=>  {
            handleChange(e);
            setChecked(!checked);
        }}
        name={name}
        color='primary'
        size='medium'
      />)
}

export default SwitchToggle