import { useEffect, useState, ForwardRefRenderFunction, forwardRef, useImperativeHandle, } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { useFormik, FormikProvider } from 'formik'
import * as Yup from 'yup'
import DownloadIcon from '../../../../../../../utilities/images/icons/direct-download.png'
import { firstNameYup, lastNameYup, emailYup, roleYup, phoneYup, locationYup } from '../../../../../../../utilities/yupObjects'
import { ForwardMethod, AddUserDialogProps, DepartmentProps } from '../../../../../../../types/index'
import styles from './index.module.scss'

import PrimaryButton from '../../../../../../../widgets/PrimaryButton'
import NormalTextField from '../../../../../../../widgets/NormalTextField'
import SelectField from '../../../../../../../widgets/SelectField'
import { useraddsingleAPI } from '../../../../../../../_store/apis/userManagementAPI'
import { ERROR_MESSAGE } from '../../../../../../../_store/constants/index'

const AddSingleUser: ForwardRefRenderFunction<ForwardMethod, AddUserDialogProps> = ({ dialogHandle, departmentsParent }, ref) => {
    useImperativeHandle(ref, () => ({
        method: () => {
            setShow(true)
        },
        method1: ()=>   {
            formik.resetForm()
        }
    }))


    const dispatch = useDispatch()
    const [show, setShow] = useState<boolean>(false)
    let [departmentError, setDepartmentError] = useState<boolean>(false)
    const [departments, setDepartments]=useState<Array<DepartmentProps>>([])
    let [selectedDepartment, setSelectedDepartment] = useState<any>('')
    const changeDepartment=(departmentChanged)=> {
        selectedDepartment=departmentChanged
        setSelectedDepartment(departmentChanged)
        if(departmentChanged)   {
            setDepartmentError(false)
        }
    }
    const addSingleUserSchema = Yup.object().shape({
        firstname: firstNameYup,
        lastname: lastNameYup,
        email: emailYup,
        role: roleYup,
        phoneno: phoneYup,
        location: locationYup
    })
    const resetData=()=>    {
        setSelectedDepartment('')
        formik.resetForm()
    }
    const submitData = async () => {
        try {
            const values = formik.values
            values['department_id']=selectedDepartment.department_id
            const { status, body } = await useraddsingleAPI(values)
            if (status === 200 || status === 201) {
                resetData()
                setShow(false)
                dialogHandle(5)
            } else if (status > 399 && status < 500) {
                dispatch({ type: ERROR_MESSAGE, payload: body?.detail?body?.detail : 'Failed to add user ' })
            } else {
                dispatch({ type: ERROR_MESSAGE, payload: body?.detail === undefined ? 'Failed to connect' : body?.detail })
            }
        }
        catch(err)  {
            dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect'  })
        
        }
    }

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            role: '',
            phoneno: '',
            location: '',
        },
        validationSchema: addSingleUserSchema,
        onSubmit: () => {
            if(!departmentError)    {
                submitData()                                             
            }
        }
    })
    const handleClose = () => {
        resetData()
        setShow(false)
        dialogHandle(null, true)
    }
    useEffect(()=>{
        if(departmentsParent)   {
            setDepartments([...departmentsParent])
        }
    },[departmentsParent])
    return (
        <Modal size='xl' centered show={show} onHide={handleClose} className={styles.modalCustomcard}>
            <Modal.Header className={styles.modal_header} closeButton>
                <h4 className={styles.commonTitle}>Add user information</h4>
            </Modal.Header>
            <Modal.Body>
                <FormikProvider value={formik}>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className={`row ${styles.commonForms_m_b}`}>
                                    <div className={`col-6`}>
                                        <NormalTextField label_text='First name' placeholder='First name' name='firstname' type='text' error={formik.errors.firstname} touched={formik.touched.firstname} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.firstname}></NormalTextField>
                                    </div>
                                    <div className={`col-6`}>
                                        <NormalTextField label_text='Last name' placeholder='Last name' name='lastname' type='text' error={formik.errors.lastname} touched={formik.touched.lastname} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.lastname}></NormalTextField>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-6`}>
                                <NormalTextField label_text='Role' placeholder='Role' name='role' type='text' error={formik.errors.role} touched={formik.touched.role} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.role}></NormalTextField>
                            </div>
                        </div>
                        <div className={`row ${styles.commonForms_m_b}`}>
                            <div className={`col`}>
                                <NormalTextField label_text='Email' placeholder='Enter your email' name='email' type='email' error={formik.errors.email} touched={formik.touched.email} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.email}></NormalTextField>
                            </div>

                            <div className={`col`}>
                                <NormalTextField type='number' label_text='Phone No' placeholder='Enter your Phone No' name='phoneno' error={formik.errors.phoneno} touched={formik.touched.phoneno} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.phoneno}></NormalTextField>
                            </div>
                        </div>
                        <div className={`row ${styles.commonForms_m_b}`}>
                            <div className={`col`}>
                            <SelectField methodHandleChange={changeDepartment} placeholder='Select a department' label='Department' name='department' attributeName='department_name' options={departments} value={selectedDepartment} error={departmentError}  />
                            
                            </div>

                            <div className={`col`}>
                                <NormalTextField label_text='Location' placeholder='Enter your location' name='location' error={formik.errors.location} touched={formik.touched.location} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.location}></NormalTextField>
                            </div>
                        </div>
                        <Link className={styles.download_link} to='/users.csv' target="_blank" download>Download template <img src={DownloadIcon} className={styles.get_app} alt="Download Icon" /></Link>
                       
                        <div className="d-flex align-items-center justify-content-center mt-5">

                            <div className={`${styles.modal_left_btn} mr-4`} onClick={()=>{
                                 resetData()
                                 setShow(false);
                                 dialogHandle(2)
                            }}>IMPORT FILE</div>

                            <div className={`ml-2 ${styles.modalPrimarymodal}`}>
                                <PrimaryButton text='Next' method={() => {
                                    
                                    if(!selectedDepartment) {
                                        departmentError=true
                                        setDepartmentError(true)
                                    }
                                    
                                    formik.handleSubmit()
                                }} />
                            </div>
                        </div>
                    </form>
                </FormikProvider>

            </Modal.Body>
        </Modal>
    )
}

export default forwardRef(AddSingleUser)