import styles from './index.module.scss'
import {  Button } from '@material-ui/core'

interface Props {
    text: string,
    method?: Function,
    className?: any,
}

const TertiaryButton=({ text, method, className }: Props)=>{
    return (<div className={`${styles.teritiary_btn} ${className ? className : ''}`}>
        <Button variant='contained'  type='button' onClick={()=>method!==undefined?method():null}>{text}</Button>
    </div>)
}    
 

export default TertiaryButton



  