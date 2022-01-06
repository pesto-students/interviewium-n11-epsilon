
import styles from './index.module.scss'

const CustomerHome = () => {
    return (
        <>
           <div className={styles.container}>
                <div className={styles.subContainer1}>
                    <div className={styles.greetings}>
                        <div>Hello, Rushikesh 👋</div>
                        <div>14 Ongoing Interviews</div>
                    </div>
                    <div className={styles.statsCardHolder} >
                        <div  className={styles.statsCard}></div>
                        <div  className={styles.statsCard}></div>
                        <div  className={styles.statsCard}></div>
                    </div>
                    <div className='d-flex justify-content-center'>
                    <div className={styles.onGoingPosition}></div>
                    </div>
                    <div className={styles.panel}>
                        <div className={styles.onGoingInterviews}></div>
                        <div className={styles.disputes}></div>
                    </div>
                </div>
                <div className={styles.subContainer2}>
                    <div className={styles.rightBarUp}>
                        <div className={styles.SLACard}></div>
                        <div className={styles.SLACard}></div>
                    </div>
                    <div className={styles.rightBarDown}></div>
                </div>
           </div>
        </>
    )
}

export default CustomerHome
