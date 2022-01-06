import styles from './index.module.scss'
import { GoogleDocs, Download, Visibility} from '../../utilities/images/icons/index'
import {ListFileProps} from '../../types/index'
interface Props {
    documentFile: ListFileProps
    dateTime: string
    downloadMethod?: Function
}
const AttachedDocument=({ documentFile,
    dateTime,
    downloadMethod,
}: Props)=> {
    return (
        <div className={`${styles.attached_document_background} d-flex `}>
            <div className='align-self-center mr-2'>
                <GoogleDocs className={styles.left_icon} />
            </div>
            <div>
                <div className={styles.title}>{documentFile.filename}</div>
                <div className={styles.dateTime}>{dateTime}</div>
            </div>
            <div className={`align-self-center d-flex ml-4`}>
                <div><Visibility className={`${styles.right_icons} mr-3`} /></div>
                <div onClick={()=>{
                    if(downloadMethod){downloadMethod(documentFile)}}}><Download className={styles.right_icons}/></div>                
            </div>
        </div>
    )
}
export default AttachedDocument