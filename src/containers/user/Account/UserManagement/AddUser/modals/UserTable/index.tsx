import { useEffect, useState, ForwardRefRenderFunction, forwardRef, useImperativeHandle, } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { ForwardMultipleMethod, AddUserDialogProps, } from '../../../../../../../types/index'
import { Close, } from '../../../../../../../utilities/images/icons/index'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import PrimaryButton from '../../../../../../../widgets/PrimaryButton'
import SecondaryButton from '../../../../../../../widgets/SecondaryButton'
import styles from './index.module.scss'
import { useraddmultipleAPI } from '../../../../../../../_store/apis/userManagementAPI'
import { ERROR_MESSAGE } from '../../../../../../../_store/constants/index'
import { nameR, phoneR, emailR } from '../../../../../../../utilities/regEx'
import { DepartmentProps } from '../../../../../../../types'

const UserTable: ForwardRefRenderFunction<ForwardMultipleMethod, AddUserDialogProps> = ({ dialogHandle, parentMethod, departmentsParent }, ref) => {
    useImperativeHandle(ref, () => ({
        method: () => {
            setShow(true)
        },
        method1: (value) => {
            setDisplayedUsers(convertCSVToJSON(value))
        }
    }))
    const dispatch = useDispatch()
    const [show, setShow] = useState<boolean>(false)
    let [hasError, setHasError] = useState<boolean>(false)
    let [hasErrorAfterUpload, setHasErrorAfterUpload] = useState<boolean>(false)

    let [errorUsersCount,seterrorUsersCount] = useState<number>(0)
    let [departments, setDepartments]=useState<Array<DepartmentProps>>([])
    const titles: Array<string> = ['Name', 'Role', 'Email', 'Phone No', 'Department', 'Location','Status','']
    const keyNames: Array<any> = [{name: 'FirstName', regEx: nameR}, {name: 'LastName', regEx: nameR}, {name: 'Role', regEx: nameR}, {name: 'Email', regEx: emailR}, {name: 'PhoneNo', regEx: phoneR}, {name: 'Department', }, {name: 'Location', regEx: nameR},]
    const convertCSVToJSON = (str, delimiter = ',') => {
        const rows = str.slice(str.indexOf('\n') + 1).split('\n')
        let data: Array<any> = []
        hasError=false
        setHasError(false)
        rows.forEach((row) => {
            const dataObject = {}
            const values = row.split(delimiter)  
            console.log('~~~ row: ',row.trim(), ' len: ',row.trim().length)    
            if(row.trim().length) {
            values.forEach((value, valueIndex) => {                
         
              
                if(keyNames[valueIndex].regEx)  {
                    dataObject[keyNames[valueIndex].name] = value.trim()
                    if(!keyNames[valueIndex].regEx.test(value.trim()))   {
                        dataObject['isError'] = true
                        seterrorUsersCount(++errorUsersCount)
                        hasError=true
                        setHasError(true)
                    } 
                }   else    {
                    let doesDepartmentExist=false
                    departments.forEach((item)=>{
                       
                        if(item.department_name===value.trim()) {
                            dataObject[keyNames[valueIndex].name] =item
                            doesDepartmentExist=true
                            return
                        }
                    })
                    if(!doesDepartmentExist)    {
                        dataObject[keyNames[valueIndex].name] ={department_id: null, department_name: value.trim()}
                        dataObject['isError'] = true
                        
                        seterrorUsersCount(++errorUsersCount)
                        console.log('~~~ v2 errorUsersCount: ',errorUsersCount)
                        hasError=true
                        setHasError(true)
                    }
                }
            })
       
                if(values['isError']===undefined)   {
                    values['isError'] = false
                }
                data.push(dataObject)
            }
        })
        return data
    }
    const [displayedUsers, setDisplayedUsers] = useState<Array<any>>([])

    const removeUser = (userIndex) => {
        setDisplayedUsers(items => items.filter((item, index) => {
            if(index === userIndex && item.isError)    {            
               
                seterrorUsersCount(--errorUsersCount)
                if(errorUsersCount===0) {
                    hasError=false
                    setHasError(false)
                }
            }
            return index !== userIndex;
        }))
    }
    useEffect(() => {
        if(!departments.length)  {
            if(departmentsParent)   {
                // departments=departmentsParent
                setDepartments(departmentsParent)
               
            }
        }
    }, [departmentsParent])
  

    const submitData = async () => {
try {
        let payloadUsers:Array<any>=displayedUsers.map(({FirstName,LastName,Email,Department,PhoneNo,Location})=>({FirstName, LastName, Email, PhoneNo,Location, department_id: Department.department_id, }))
        
        const { status, body } = await useraddmultipleAPI({ 'CompanyUsers': payloadUsers })
        if (status === 200 || status === 201) {
            if(body.unSuccessfullEmailIds)    {
                setDisplayedUsers(items => items.map((displayedUsersItem) => {
                   return {...displayedUsersItem, uploadStatus: !body.unSuccessfullEmailIds.includes(displayedUsersItem.Email)}
                }))
                setHasErrorAfterUpload(true)
            }   else    {
                setShow(false)
                dialogHandle(5)
            }
        } else if (status > 399 && status < 500) {
            dispatch({ type: ERROR_MESSAGE, payload: body?.detail === undefined ? 'Unauthorized profile' : body?.detail })
        } else {
            dispatch({ type: ERROR_MESSAGE, payload: body?.detail === undefined ? 'Failed to connect' : body?.detail })
        }
    }
    catch(err)  {
        dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect'  })
    
    }
    }
    const handleClose = () => {
        setShow(false)
        dialogHandle(null, true)
    }
    return (
        <Modal size='xl' centered show={show}  onHide={handleClose} className={styles.modalCustomcard}>
            <Modal.Header className={`${styles.modal_header} ${(hasErrorAfterUpload || hasError)?styles.errorHeader:styles.normalHeader}`} closeButton>
                <h6 className={styles.modal_title}>{hasErrorAfterUpload?'Some emails were already uploaded':hasError?'Please review your list, before you upload this list.':'Please review your list, once you upload this list.'}</h6>
            </Modal.Header>
            <Modal.Body>
                <div className={`${styles.modal_body} py-2`}>
                    <h6 className={`${styles.preview}`}>Preview - Showing  {displayedUsers.length} with {titles.length-1} fields.</h6>
                    <TableContainer>
                        <Table className={`${styles.users_table}`} aria-label="displayedUsers table">
                            <TableHead className={styles.users_table_head}>
                                {<TableRow>
                                    {titles.map((item, index) => <TableCell key={index}><TableSortLabel>{item}</TableSortLabel>
                                    </TableCell>
                                    )}
                                </TableRow>}
                            </TableHead>
                            <TableBody>
                                {displayedUsers.map(({ FirstName, LastName, Role, Email, PhoneNo, Department, Location,isError, uploadStatus=undefined }, index) => (
                                    <TableRow key={index} className={`${index % 2 === 0 ? '' : styles.users_table_shade} ${styles.users_table_row} ${isError?styles.users_table_row_error:''}`}>
                                        <TableCell className={`${isError?styles.users_table_cell_error:''}`}>{FirstName} {LastName}</TableCell>
                                        <TableCell className={`${isError?styles.users_table_cell_error:''}`}>{Role}</TableCell>
                                        <TableCell className={`${isError?styles.users_table_cell_error:''}`}>{Email}</TableCell>
                                        <TableCell className={`${isError?styles.users_table_cell_error:''}`}>{PhoneNo}</TableCell>
                                        <TableCell className={`${isError?styles.users_table_cell_error:''}`}>{Department?.department_name}</TableCell>
                                        <TableCell className={`${isError?styles.users_table_cell_error:''}`}>{Location}</TableCell>
                                        <TableCell className={`${isError?styles.users_table_cell_error:''}`}>{uploadStatus===undefined?<div className={styles.file_upload_pending}>Pending</div>:uploadStatus?<div className={styles.file_upload_success}>Successfully Uploaded</div>:<div className={styles.file_upload_failed}>Email already exists</div>}</TableCell>
                                        <TableCell className={`${isError?styles.users_table_cell_error:''}`}><Close className={styles.close_icon} onClick={() => { removeUser(index) }} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
                <div className="d-flex align-items-center justify-content-center mt-4">
                    {/* <div className={`${styles.modal_left_back_btn} mr-2`} onClick={() => { setShow(false); dialogHandle(3); }}>Back</div>  */}
                    <div className={`${styles.modal_left_back_btn}`}><SecondaryButton text='BACK' method={() => { 
                     setShow(false); dialogHandle(3); }} /></div>
                    <div className="ml-2">
                        {hasErrorAfterUpload?<PrimaryButton className={styles.modaluploadBtn} text='CLOSE' method={() => {
                            setShow(false)}} />:<PrimaryButton disabled={hasError} className={styles.modaluploadBtn} text='UPLOAD' method={() => {
                            if (parentMethod) {
                                submitData();
                                parentMethod();
                            }
                        }} />}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default forwardRef(UserTable)