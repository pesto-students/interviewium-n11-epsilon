import NormalTextField from 'widgets/NormalTextField';
import PrimaryButton from 'widgets/PrimaryButton';
import SecondaryButton from 'widgets/SecondaryButton';
import SelectField from 'widgets/SelectField';
import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Handles } from 'types';
import SwitchToggle from 'widgets/SwitchToggle';
import { Avatar } from '@material-ui/core';
import ReactLogo from '../../../src/utilities/images/icons/photo.svg';
const Shipment = ({ status }) => {

	const [photoUrl, setPhotoUrl] = useState<any>(null);
	const [photoFile, setPhotoFile] = useState<any>(null);


	const fileRef = useRef<HTMLInputElement>(null);

	const selectImage = () => {
		fileRef?.current?.click();
		console.log(selectImage,photoFile);

	};

	const history = useHistory();

	const fileInputRef = useRef<Handles>(null);

	const fileSelectedHandler = e => {
		setPhotoFile(e.target.files[0]);
		if (e.target.files[0]) {
			setPhotoUrl(URL.createObjectURL(e.target.files[0])!);
		} else {
			setPhotoUrl(null);
		}
	};
	const [switchStatus, setSwitchStatus] = useState<boolean>(status!);
	useEffect(() => {
		setSwitchStatus(status!);

	}, [status]);
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			businessEmail: '',
			company: '',
			companyAddress: '',
			departmentD: '',
			country: '',
			phone: '',
			headquarters: '',
			totalSips: '',
			fileupload: '',
			acceptTerms: false
		},
		onSubmit: () => {
			if (fileInputRef.current && fileInputRef.current.checkFile()) {
				history.replace('/login');
				// history.push(user.role==='importer'?importerRoutes[0].path:exporterRoutes[0].path)
			}

		}


	});
	const [selectedHeadQuarter, setSelectedHeadQuarter] = useState({ 'item': 'US', });

	return (
		<div className={styles.customUsertble}>
			<div className={styles.allMainbodyTitle}>
				<h4 className={styles.innerBodytitle}>Add Shipping Line</h4>
			</div>
			<div className={styles.containtMainbody}>
				<h6 className={styles.commeditTitle}>Photo</h6>
				<FormikProvider value={formik}>
					<form>
						<div className={`${styles.addPhotomain}`}>
							<div className={`${styles.profilePhotomain}`}>
								<input type="file" hidden ref={fileRef} onChange={fileSelectedHandler} />
								{photoUrl ? <img className={styles.anyProfile} alt="profilePhoto" onClick={selectImage} src={photoUrl} /> : <Avatar src={ReactLogo} onClick={selectImage} />}
							</div>
							<PrimaryButton className={styles.updateProfilePhoto} text='UPLOAD LOGO HERE' />
						</div>
						<div className={styles.addShipfields}>
							<h6 className={styles.commeditTitle}>Details</h6>

							<div className="row">
								<div className={`col-4`}>
									<NormalTextField label_text='Company Name' placeholder='Enter company name' name='companyYup' ></NormalTextField>
								</div>
								<div className={`col-4`}>
									<SelectField className={styles.filter_select_field} label='Headquarters' attributeName='item' name='Headquarters' options={[{ 'item': 'US', }, { 'item': 'BR' }, { 'item': 'IN' }]} value={selectedHeadQuarter} methodHandleChange={(value) => setSelectedHeadQuarter(value)} />
								</div>
								<div className={`col-4`}>
									<NormalTextField label_text='Total No. of Ships' placeholder='Enter Total No. of Ships' name='totalSips' ></NormalTextField>
								</div>
							</div>
						</div>
						{status !== undefined && <div className={`${styles.status}`}>
							<h6>Status:</h6>
							<div className='d-flex align-items-center'>
								{status !== undefined &&
									<SwitchToggle className={styles.switch_toggle} name='status' value={switchStatus} handleChange={(e) => setSwitchStatus(e.target.checked)} />}
								<h6 className='mb-0 mt-1'>{switchStatus ? 'Enable' : 'Disable'}</h6>
							</div>
						</div>}

						<div className={`${styles.modal_left_back_btn} d-flex align-items-center justify-content-center`}>
							<SecondaryButton className={styles.commonBackbtn} text='Cancel' />
							<PrimaryButton text='ADD' />
						</div>

					</form>
				</FormikProvider>
			</div>
		</div>
	);
};

export default Shipment;