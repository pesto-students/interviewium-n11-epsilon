import { useState, useRef,useEffect,ForwardRefRenderFunction, forwardRef, useImperativeHandle } from 'react'
// import styles from './index.module.scss'
// import PrimaryButton from '../../../../widgets/PrimaryButton'
import UsersModalFeedback from '../../../../../widgets/UsersModalFeedback'

import AddSingleUser from './modals/AddSingleUser'
import ImportFile from './modals/ImportFile'
import ReadyForUpload from './modals/ReadyForUpload'
import UserTable from './modals/UserTable'
import styles from './index.module.scss'
import {RootState} from '../../../../../_store/reducer/rootReducer'
import { Like } from '../../../../../utilities/images/icons/index'
import { useSelector, } from 'react-redux'
import { ForwardMethod, ForwardMultipleMethod, UsersModalFeedbackProps, AddUserDialogProps } from '../../../../../types/index'

const AddUser: ForwardRefRenderFunction<ForwardMethod, AddUserDialogProps> = ({ parentMethod, }, ref) => {
    useImperativeHandle(ref, () => ({
        method: () => {
            dialogHandle(1)
        },
    }))
    const addSingleUserRef = useRef<ForwardMethod>(null)
    const importFileRef = useRef<ForwardMultipleMethod>(null)
    const readyForUploadRef = useRef<ForwardMultipleMethod>(null)
    const userTableRef = useRef<ForwardMultipleMethod>(null)
    const feedbackModalRef5 = useRef<ForwardMethod>(null)

    let [csvData, setCSVData]=useState<string>('')
    const [departmentId, setDepartmentId]=useState<string>('')
    const [departments]=useSelector((state:RootState)=>{
        if(state.departments.id && departmentId!==state.departments.id) {
            setDepartmentId(state.departments.id);
        }
        return [state.departments.departments];
    })
   useEffect(()=>{
    // feedbackModalRef5?.current?.method()
    if(false)   {
        console.log(csvData, setCSVData)
    }
   },[departmentId])
   
   const uploadUsersFile=()=>    {

   }
   const handleFiles = files => {
    const reader = new FileReader();
    reader.onload =  () => {
        csvData=reader?.result?.toString()!
        setCSVData(reader?.result?.toString()!)
        importFileRef?.current?.method1(files[0].name)        
        readyForUploadRef?.current?.method1(files[0].size.toString())
        userTableRef?.current?.method1(csvData)
    }
    reader.readAsText(files[0]);
  }
  const dialogHandle=(dialogNumber: number, close: boolean=false)=>    {
    switch(dialogNumber)    {
        case 1:
            addSingleUserRef?.current?.method()
            break
        case 2:
            importFileRef?.current?.method()
            break
        case 3:
            readyForUploadRef?.current?.method()
            break
        case 4:
            userTableRef?.current?.method()
            break                
        case 5:
            feedbackModalRef5?.current?.method()
            break
    }
    if(close)   {
        importFileRef.current?.method1('')
        setCSVData('')
        importFileRef?.current?.method1('')        
        readyForUploadRef?.current?.method1('')
    }
}

    const addSingleUserModalFeedbackProps={
        content: <h4 className={`text-center font-weight-bold ${styles.FeedbackTitle}`}>Your list has been created!</h4>,
        IconData: <Like />,
        rightBtnText: 'OK',
        rightBtnMethod:()=> {
            if(parentMethod)    {
                parentMethod();
            }
        },
        dialogHandle: ()=>{
            dialogHandle(5);
        }
    } as UsersModalFeedbackProps

   
    return (<>{departmentId?(<>
            
            <AddSingleUser ref={addSingleUserRef} departmentsParent={departments} dialogHandle={dialogHandle} />
            <ImportFile ref={importFileRef} dialogHandle={dialogHandle} parentMethod={handleFiles} />            
            <ReadyForUpload ref={readyForUploadRef} dialogHandle={dialogHandle} parentMethod={handleFiles} />
            <UserTable ref={userTableRef} departmentsParent={departments} dialogHandle={dialogHandle} parentMethod={uploadUsersFile}  />
            <UsersModalFeedback ref={feedbackModalRef5}  dialogHandle={dialogHandle} content={addSingleUserModalFeedbackProps.content} IconData={addSingleUserModalFeedbackProps.IconData} leftBtnText={addSingleUserModalFeedbackProps.leftBtnText} rightBtnText={addSingleUserModalFeedbackProps.rightBtnText} leftBtnMethod={addSingleUserModalFeedbackProps.leftBtnMethod} rightBtnMethod={addSingleUserModalFeedbackProps.rightBtnMethod}   />
        </>):<></>}</>)
    
}
export default forwardRef(AddUser)