import styles from './index.module.scss'
import { Button } from '@material-ui/core'

interface Props {
    text: string,
    method?: Function,
    className?: any,
    innerClass?: any
}

const SecondaryButton=({ text, method, className , innerClass }: Props)=>{
    return (<div className={`${styles.secondaryBackbtn} ${className ? className : ''}`}>
        {method?<Button className={`${styles.backBtnall} ${innerClass ? innerClass : ''}`} type='button' onClick={()=>method()}>{text}</Button>:<Button className={styles.btn} type='submit'>{text}</Button>}
    </div>)
}    
 

export default SecondaryButton



  