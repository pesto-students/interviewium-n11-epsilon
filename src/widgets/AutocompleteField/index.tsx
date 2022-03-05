import styles from './index.module.scss'
import {AutocompleteProps} from '../../types/index'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField, InputAdornment, } from '@material-ui/core'


const AutocompleteField = ({ placeholder, options, IconData, className }: AutocompleteProps) => (<Autocomplete autoComplete includeInputInList className={`${styles.customAutocomp} ${className ? className : ''}`} options={options} getOptionLabel={(option)=>option.title} renderInput={(params)=><TextField variant={undefined}  {...params}  InputProps={{...params.InputProps, disableUnderline: true,startAdornment:(<InputAdornment position="start" className={styles.basicInt}>
        <div className={styles.search_icon}>
            {IconData}
        </div>
      </InputAdornment>),endAdornment: null}}
         placeholder={placeholder} className={styles.search_text_field} />}   />)


export default AutocompleteField