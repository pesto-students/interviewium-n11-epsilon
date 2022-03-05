import {  useState, ForwardRefRenderFunction, forwardRef, useImperativeHandle } from 'react'
import { Modal } from 'react-bootstrap'
import { ForwardMultipleMethod } from '../../../../../../../types/index'

import PrimaryButton from '../../../../../../../widgets/PrimaryButton'
import SecondaryButton from '../../../../../../../widgets/SecondaryButton'
import { AddUserDialogProps } from '../../../../../../../types/index'
import styles from './index.module.scss'
import { CloudComputing, GoogleDocs} from '../../../../../../../utilities/images/icons/index'
import ReactFileReader from 'react-file-reader'

interface SelectProps {
    IconData: any,
    text?: string,

}
const Select = ({ IconData, text }: SelectProps) => {
    return (
        <div className={`${styles.select_file}`}>
            <div className='align-self-center text-center mb-3'>
                {IconData}
            </div>
            <div className={styles.select_file_text}>
                {text}
            </div>
        </div>
    )
}


const ImportFile: ForwardRefRenderFunction<ForwardMultipleMethod, AddUserDialogProps> = ({ dialogHandle, parentMethod, }, ref) => {
    useImperativeHandle(ref, () => ({
        method: () => {
            setShow(true)
        },
        method1: (fileName: string) => {
            setFileText(fileName)
        }
    }))

    const [show, setShow] = useState<boolean>(false)
    const [fileText, setFileText] = useState<string>('')

    const handleClose = () => {
        setShow(false)
        dialogHandle(null, true)
    }
    window.addEventListener("dragover",function(e){
        e.preventDefault()
    },false)

    return (
        <Modal onDrop={(e)=>{
            e.preventDefault()
                if(parentMethod)    {
                    parentMethod(e?.dataTransfer?.files);
                }
            }} size='lg' centered show={show} onHide={handleClose} className={styles.modalCustomcard}>
            <Modal.Header className={styles.modal_header} closeButton>
                <h4 className={styles.commonTitle}>Import File</h4>
            </Modal.Header>
            <Modal.Body>
                <div  className={`${styles.modal_body} py-2`}>
                    <div>
                        <div className='d-flex justify-content-center'>
                            <div className={styles.cloud_computing}><CloudComputing /></div>
                        </div>
                        <div className={`${styles.import_file_text} d-flex justify-content-center`}>Drag &#38; drop a CSV here</div>
                        <div className={`${styles.import_file_border} d-flex justify-content-center`}>————— or —————</div>
                    </div>
                    <br />
                    <div className='d-flex justify-content-center'>
                        <ReactFileReader
                            multipleFiles={false}
                            fileTypes={[".csv"]}
                            handleFiles={parentMethod}>
                            <div className="text-center">
                                <Select text={fileText?fileText:'Select a CSV file'} IconData={<GoogleDocs className={styles.select_file_icon} />} />
                            </div>
                        </ReactFileReader>
                        {/* <div className='ml-3'>
                            <Select text='TEXTAREA INPUT' IconData={<Back className={styles.select_file_icon} />} />
                        </div> */}
                    </div>
                </div>

            </Modal.Body>
            <div className="d-flex align-items-center justify-content-center mt-4">
                <div className={`${styles.modal_left_back_btn} mr-2`}><SecondaryButton text='BACK' method={() => { setShow(false); dialogHandle(1, true); }} /></div>

                <div className="ml-2">
                    <PrimaryButton disabled={!fileText.length} text='Next' method={() => {
                        setShow(false);
                        dialogHandle(3);

                    }} />
                </div>
            </div>
        </Modal>
    )
}

export default forwardRef(ImportFile)