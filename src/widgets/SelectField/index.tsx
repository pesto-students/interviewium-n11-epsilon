import styles from './index.module.scss'

import { InputLabel, MenuItem, Select } from '@material-ui/core'
import { useEffect, useState } from 'react'
import ListIcon from '@material-ui/icons/List';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import Icon from '../IconComponent'
interface Props {
  name: string,
  label?: string,
  options?: Array<any>,
  error?: boolean,
  touched?: boolean,
  handleChange?: any,
  className?: any,
  value: any,
  methodHandleChange: any,
  attributeName: string
  disabled?: boolean
  placeholder?: any
  startAdornment?: string
}


const SelectField = ({ disabled = false, name, label, options, className, value = '', startAdornment = '', methodHandleChange, attributeName, placeholder, error = false }: Props) => {
  let [displayValue, setDisplayValue] = useState<any>()
  useEffect(() => {
  }, [options])

  useEffect(() => {
    setDisplayValue(value)
  }, [value])
  return options ? (
    <div className={`${styles.commonInputfields} ${className ? className : ''}`}>
      {label && <InputLabel className={styles.label_text} htmlFor={name}>{label}</InputLabel>}
      <Select
        startAdornment={startAdornment === "List" ?
          <Icon icon={<ListIcon />} /> : startAdornment === "Save" ? <Icon icon={<VerticalSplitIcon />} /> : <></>}
        value={displayValue ? displayValue[attributeName] : ''}
        displayEmpty={true}
        disabled={disabled}
        disableUnderline
        fullWidth={true}
        name={name}
        className={`${disabled ? styles.disabled_text_field : styles.select_field}`}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((item, index) => <MenuItem key={index} onClick={() => methodHandleChange(item)} value={(item[attributeName!])}>{item[attributeName!]}</MenuItem>)}

      </Select>
      {error ? (
        <div className={styles.helperText}>
          <img alt="" className={styles.error_outline_icon} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI3Ljk2MyAyNy45NjMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9ImMxMjlfZXhjbGFtYXRpb24iPgoJCTxwYXRoIGQ9Ik0xMy45ODMsMEM2LjI2MSwwLDAuMDAxLDYuMjU5LDAuMDAxLDEzLjk3OWMwLDcuNzI0LDYuMjYsMTMuOTg0LDEzLjk4MiwxMy45ODRzMTMuOTgtNi4yNjEsMTMuOTgtMTMuOTg0ICAgIEMyNy45NjMsNi4yNTksMjEuNzA1LDAsMTMuOTgzLDB6IE0xMy45ODMsMjYuNTMxYy02LjkzMywwLTEyLjU1LTUuNjItMTIuNTUtMTIuNTUzYzAtNi45Myw1LjYxNy0xMi41NDgsMTIuNTUtMTIuNTQ4ICAgIGM2LjkzMSwwLDEyLjU0OSw1LjYxOCwxMi41NDksMTIuNTQ4QzI2LjUzMSwyMC45MTEsMjAuOTEzLDI2LjUzMSwxMy45ODMsMjYuNTMxeiIgZmlsbD0iI2M0MDEwMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJCTxwb2x5Z29uIHBvaW50cz0iMTUuNTc5LDE3LjE1OCAxNi4xOTEsNC41NzkgMTEuODA0LDQuNTc5IDEyLjQxNCwxNy4xNTggICAiIGZpbGw9IiNjNDAxMDEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcG9seWdvbj4KCQk8cGF0aCBkPSJNMTMuOTk4LDE4LjU0NmMtMS40NzEsMC0yLjUsMS4wMjktMi41LDIuNTI2YzAsMS40NDMsMC45OTksMi41MjgsMi40NDQsMi41MjhoMC4wNTZjMS40OTksMCwyLjQ2OS0xLjA4NSwyLjQ2OS0yLjUyOCAgICBDMTYuNDQxLDE5LjU3NSwxNS40NjgsMTguNTQ2LDEzLjk5OCwxOC41NDZ6IiBmaWxsPSIjYzQwMTAxIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+Cgk8ZyBpZD0iQ2FwYV8xXzIwN18iPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4=" />
          &nbsp;{placeholder}</div>
      ) : null}
    </div>) : <></>
}


export default SelectField
