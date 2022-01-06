import styles from './index.module.scss'
import { Box, Button } from '@material-ui/core'

interface Props {
    text: string,
    method?: Function,
    className?: any,
    disabled?: boolean,
    type?: any
}

const PrimaryButton=({ text, method, className,disabled=false }: Props)=>{
    return (<Box textAlign='center' className={`${styles.primary_btn} ${className ? className : ''}`}>
        <Button disabled={disabled} variant='contained' className={`${styles.btn} `} type='button' onClick={()=>method!==undefined?method():null}>{text}</Button>
    </Box>)
}    
 

export default PrimaryButton



  