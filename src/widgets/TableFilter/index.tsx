import {useEffect} from 'react'
import styles from './index.module.scss'
interface Props {
    filterBody: any,
    onReset?: any
}
const TableFilter=({filterBody, onReset=()=>{} }:Props)=>   {

    useEffect(()=>  {
       
    },[])
    return (
        <div className={`${styles.filter_background}`}>
            <div className={`${styles.filter_head} d-flex justify-content-between `}>
                <div className={`${styles.filter_text} align-self-center`}>Filter</div>
                <div onClick={onReset} className={`${styles.reset_text} align-self-center`}>Reset</div>
            </div>
            <div className={styles.filter_body}>
                {filterBody}
            </div>
        </div>
    )
}

export default TableFilter