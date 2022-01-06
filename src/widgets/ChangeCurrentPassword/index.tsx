// import {useEffect} from 'react'
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';

import {
	useDispatch
} from 'react-redux';

import PrimaryButton from '../../widgets/PrimaryButton';
import PasswordTextField from '../../widgets/PasswordTextField';
import styles from './index.module.scss';

import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../_store/constants/message';
import { passwordYup } from '../../utilities/yupObjects';
import { changeCurrentPasswordAPI } from '_store/apis/changeCurrentPassword';
import { ForwardRefRenderFunction, useState, forwardRef, useImperativeHandle } from 'react';
import { ForwardMethod, ChangeCurrentPasswordProps } from '../../types/index';
import { Modal } from 'react-bootstrap';
const ChangeCurrentPassword: ForwardRefRenderFunction<ForwardMethod, ChangeCurrentPasswordProps> = ({ dialogHandle }, ref) => {
	useImperativeHandle(ref, () => ({
		method: () => {
			dialogHandle()
			setShow(true);
		},
	}));
	const dispatch = useDispatch()
	const [show, setShow] = useState<boolean>(false)

	const handleResetPassword = async (values: Object) => {
		try	{
		const value = { CurrentPassword: values['CurrentPassword'], NewPassword: values['NewPassword'] };

		const { status, body } = await changeCurrentPasswordAPI(value);
		if (status === 200) {
			handleClose()
			dispatch({ type: SUCCESS_MESSAGE, payload: 'New password has been set successfully', });
		} else if (status > 399 && status < 500) {
			dispatch({ type: ERROR_MESSAGE, payload: body?.detail === undefined ? 'Unauthorized profile' : body?.detail });
		}
		else {
			dispatch({ type: ERROR_MESSAGE, payload: body?.detail === undefined ? 'Failed to connect' : body?.detail });
		}
	}
	catch(err)  {
            dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect'  })
        
        }
	};
	// const user=useSelector((state: any)=>state.user)

	const loginSchema = Yup.object().shape({
		CurrentPassword: passwordYup,
		NewPassword: passwordYup,
		reTypePassword: passwordYup,
	});

	const formik = useFormik({
		initialValues: {
			CurrentPassword: '',
			NewPassword: '',
			reTypePassword: '',
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {
			if (values.CurrentPassword !== values.NewPassword) {
				handleResetPassword(values);
			}
			else {
				alert('Please enter different password');
			}

		},
	});
	const handleClose = () => {
		setShow(false);
	}

	return (

		<Modal size='xl' centered show={show} onHide={handleClose} className={styles.modalCustomcard}>
			<Modal.Header className={styles.modal_header} closeButton>
				<h4 className={styles.commonTitle}>Change Current Password</h4>
			</Modal.Header>
			<Modal.Body>
				<FormikProvider value={formik}>
					<form>
						<PasswordTextField label_text='Current Password' placeholder='Enter current password' name='CurrentPassword' error={formik.errors.CurrentPassword} touched={formik.touched.CurrentPassword} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.CurrentPassword} /><br />
						<PasswordTextField label_text='New Password' placeholder='Enter new password' name='NewPassword' error={formik.errors.NewPassword} touched={formik.touched.NewPassword} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.NewPassword} /><br />
						<PasswordTextField label_text='Retype new password' placeholder='Retype new password' name='reTypePassword' error={formik.errors.reTypePassword} touched={formik.touched.reTypePassword} handleChange={formik.handleChange} handleBlur={formik.handleBlur} value={formik.values.reTypePassword} />
						<div className={`${styles.changepassCTA} d-flex align-items-center justify-content-center`}>
							<PrimaryButton className={styles.resetPassword} text='CHANGE PASSWORD' method={() => formik.handleSubmit()} />
						</div>
					</form>
				</FormikProvider>
			</Modal.Body>
		</Modal>

	);
};
export default forwardRef(ChangeCurrentPassword);