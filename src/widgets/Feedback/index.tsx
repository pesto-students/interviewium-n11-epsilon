import styles from './index.module.scss'
import {FeedbackProps} from '../../types/index'
import { Card } from 'react-bootstrap' 
import PrimaryButton from '../../widgets/PrimaryButton'

const Feedback=({ title, content, IconData, }:FeedbackProps)=>    {
    return (
    <div className={styles.background}>

            <Card className={`mx-auto ${styles.customloginMain}`}>
                    <Card.Body className='text-center p-0'>                    
                    
                    <div><div className={styles.feedback_icon}>{IconData}</div></div>
                        <h4 className={styles.commonTitle}>{title}</h4>                 
                        <div className={styles.content}>{content}</div>
                        <div className={styles.primary_button}>
                            <PrimaryButton className={styles.resetfeedbackBtn} text='OK' method={()=>{}}   />
                        </div>
                    </Card.Body>
            </Card>
    </div>)
}


export default Feedback