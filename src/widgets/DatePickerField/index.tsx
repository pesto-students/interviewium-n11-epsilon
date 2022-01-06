import { useEffect, useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import styles from './index.module.scss'
import {KeyboardDatePicker} from '@material-ui/pickers'
import moment from 'moment'
// import { FieldProps } from '../../types/index'

interface Props {
    name: string,
    value: any,
    label_text?: string,
    CalendarIcon?: any,
    className?: any,
    handleChange: any,
}

const DatePickerField=({ name, value, label_text, CalendarIcon, className, handleChange }:Props)=>  {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  useEffect(()=>  {
    setDate(value)
  },[value])
const TextFieldComponent=()=>(<TextField
  className={`${className?className:''}`} 
  value={moment(date).format("DD/MM/YYYY")}
  InputProps={{
    disabled: true,
    disableUnderline: true,
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={()=>setOpen(true)}>
          <div className={styles.calendar_icon}>
            <CalendarIcon />
          </div>
        </IconButton>
      </InputAdornment>
    )
  }}
/>)

 return (<div className={styles.commonInputfields}><div className={styles.label_text}>{label_text}</div>

 <KeyboardDatePicker
  open={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
 TextFieldComponent={TextFieldComponent}
  name={name}
          format="DD/MM/yyyy"
          margin="normal"
          value={date}
          maxDate={moment()}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          className={`${className?className:''}`}
        />
</div>)
}
export default DatePickerField