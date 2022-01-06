import styles from './index.module.scss'

const Detail=({title, value})=>{
    return (
        <div className={styles.detail_background}>
            <div className={styles.detail_title}>{title}</div>
            
            <div className={styles.detail_value}>{value}</div>
        </div>
    )
}

export default Detail