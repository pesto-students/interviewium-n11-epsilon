import { forwardRef, useState, ForwardRefRenderFunction, useImperativeHandle } from 'react'
import { Modal } from 'react-bootstrap'
import {UsersModalFeedbackProps, ForwardMethod} from '../../types/index'
import styles from './index.module.scss'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'
// import { Error } from '../../utilities/images/icons/index'

const UsersModalFeedback: ForwardRefRenderFunction<ForwardMethod, UsersModalFeedbackProps> = ({IconData,content,leftBtnMethod,rightBtnMethod, leftBtnText, rightBtnText, dialogHandle,}, ref) => {
    useImperativeHandle(ref, () => ({
        method: () => {
            setShow(!show)  
            if(false){
                dialogHandle()
            }
        },
      }))

const [show, setShow] = useState<boolean>(false)

    return (
        <Modal size='sm'  centered show={show} onHide={() => setShow(false)} className={styles.modalCustomcard}>
          
            <Modal.Body>
                {/* <div className='d-flex'><Error className={`${styles.error_icon} ml-auto`} /></div> */}
                <div className='d-flex justify-content-center'>
                    <div>
                        <div className={styles.feedback_icon}>{IconData}</div>
                        <div>
                            {/* <h5 className='text-center font-weight-bold mt-4 mb-4'>{title}</h5> */}
                            <div>{content}</div>
                        </div>
                        <div>
                            <div className="d-flex align-items-center justify-content-center">
                                {leftBtnText && 
                                <div className={`${styles.modal_left_back_btn} mr-2 `}><SecondaryButton text={leftBtnText} method={leftBtnMethod} /></div>}

                                {rightBtnText && 
                                <div>
                                    <PrimaryButton className={styles.feedbackPrimbtn} text={rightBtnText} method={()=>{                                        
                                        setShow(false)
                                        if(rightBtnMethod)  {
                                            rightBtnMethod()
                                        }
                                      
                                    }} />
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
} 

export default forwardRef(UsersModalFeedback)
