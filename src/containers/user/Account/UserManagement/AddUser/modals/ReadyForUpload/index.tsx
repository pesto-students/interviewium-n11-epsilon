import { useEffect, useState, ForwardRefRenderFunction, forwardRef, useImperativeHandle } from 'react'
import { Modal } from 'react-bootstrap'
import { ForwardMultipleMethod } from '../../../../../../../types/index'

import PrimaryButton from '../../../../../../../widgets/PrimaryButton'
import SecondaryButton from '../../../../../../../widgets/SecondaryButton'
import {AddUserDialogProps} from '../../../../../../../types/index'
import styles from './index.module.scss'
import { CSVFileFormatExtension } from '../../../../../../../utilities/images/icons/index'

const ReadyForUpload: ForwardRefRenderFunction<ForwardMultipleMethod, AddUserDialogProps> = ({dialogHandle}, ref) => {
        useImperativeHandle(ref, () => ({
            method: () => {
                setShow(true)    
            },
            method1: (fileName: string)=>{
                setFileSize(fileName)
            }
          }))
    
    const [show, setShow] = useState<boolean>(false)
    const [fileSize, setFileSize]=useState<any>('')
    const [currentDate, setCurrentDate]=useState<string>('')

    useEffect(()=>    {
        if(!currentDate)    {
            const date=new Date()
            setCurrentDate(`${date.toLocaleString('default', { month: 'long' })}, ${date.getDate()} ${date.getFullYear()}`)
        }
    })
    const handleClose = () => {
        setShow(false)
        dialogHandle(null, true)
    }
    return (
        <Modal size='lg' centered show={show} onHide={handleClose} className={styles.modalCustomcard}>
            <Modal.Header className={styles.modal_header} closeButton>
                <h4 className={styles.commonTitle}>Import File</h4>
            </Modal.Header>
            <Modal.Body>
                <div className={`${styles.modal_body}`}>
                        <div className={`d-flex align-items-center p-5`}>                            
                            <div className='mr-3'><CSVFileFormatExtension className={styles.icon} /></div>
                            <div className='ml-2'>
                                <h5>Ready For Upload</h5>
                                <span>{currentDate}</span>
                                <div className="mt-2">{fileSize} Bytes</div>
                            </div>
                        </div>
                </div>    
                <div className="d-flex align-items-center justify-content-center mt-5">
                    <div className={`${styles.modal_left_back_btn} mr-2`}><SecondaryButton text='BACK' method={() => { setShow(false); dialogHandle(2); }} /></div> 

                    <div className="ml-2">
                        <PrimaryButton text='Next' method={() => { 
                            setShow(false);
                            dialogHandle(4);  
                           
                        }} />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default forwardRef(ReadyForUpload)