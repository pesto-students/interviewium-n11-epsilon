import styles from './index.module.scss'
import { Avatar } from '@material-ui/core'
import UserAvatar from '../../../utilities/images/useravatar.svg'
import { useState, useRef, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import ChangeCurrentPassword from '../../../widgets/ChangeCurrentPassword'
import PrimaryButton from '../../../widgets/PrimaryButton'
import {UserProfileProps} from '../../../types/index'
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../../_store/constants/index'
import {fileCompress, getBase64} from '../../../utilities/methods'
import {save} from '../../../_store/actions/user'

const AddProfile = ({
	address1,
	address2,
	cityId,
	cityName,
	companyName,
	countryId,
	countryName,
	designation,
	email,
	firstName,
	id,
	image_data,
	lastName,
	phoneNo,
	stateId,
	stateName,
	zipcode,registrationNo,location,departmentId,department,website,path='',uploadPhotoAPI, role}:UserProfileProps) => {
		const dispatch=useDispatch()
	let [photoFile, setPhotoFile] = useState<any>(null)
	const [photoUrl, setPhotoUrl] = useState<any>(null)

	const fileRef = useRef<HTMLInputElement>(null)

	const changeRef = useRef<any>(null)

	const changePhoto=async ()=>  {
		console.log('~~~ changePhoto: ',id)
		if(id)	{
		const compressedPhoto=await fileCompress(photoFile)
		
        const formData=new FormData()
		formData.append('Id', id)
		formData.append('File', compressedPhoto)
        try {
			if(uploadPhotoAPI)	{
				const {status, body}=await uploadPhotoAPI(formData)
				if(status===200)  {
					dispatch({ type: SUCCESS_MESSAGE, payload: body?.detail === undefined ? 'Successfully updated' : body?.detail })
					const base64Photo=await getBase64(compressedPhoto)
					let user=JSON.parse(localStorage.getItem('user')!)
					user={...user, image_data: base64Photo}
					dispatch(save(user))
					setPhotoFile(null)
				}   else if(status>399 && status<500)    {
					dispatch({ type: ERROR_MESSAGE, payload: body?.detail===undefined?'Failed to upload':body?.detail })
				}   else    {
					dispatch({ type: ERROR_MESSAGE, payload: body?.detail===undefined?'Failed to connect':body?.detail })
				}
			}
        } catch(err)  {
            dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' })
        }
		}
    }

	const clickPopup = () => {
		changeRef.current?.method()
	}
	
	const selectImage = () => {
		fileRef?.current?.click()
	}
	const fileSelectedHandler = e => {
		photoFile=e.target.files[0]
		setPhotoFile(e.target.files[0])
		if (e.target.files[0]) {
			setPhotoUrl(URL.createObjectURL(e.target.files[0])!)		
		} else {
			setPhotoUrl(null)
		}
	}
	useEffect(()=>	{
		if(false){
			console.log('~~~ AddProfile: ',stateId, cityId, countryId,id,address2,departmentId)
		}
	},[])
	return (
		<div className={styles.profileBackground}>
			<ChangeCurrentPassword dialogHandle={() => { }} ref={changeRef}/>
			<div className={`${styles.customUsertble}`}>
				<div className={styles.innerBodytitle}>{`${role?.substring(0,1).toUpperCase()}${role?.substring(1)}`} Profile</div>
				<div className={`row ${styles.commonSmallMargin}`}>
					<div className={`col-6`}>
						<div className={styles.commonSmallCard}>
							<div className={`${styles.commonSmallCardHeader}`}>
								<h6 className="m-0"> Account {role} information</h6>
								<div className="">
									<span className={`${styles.passTitle} ${styles.a1_link}`} onClick={clickPopup}>Change current password</span>&nbsp;
									<Link className={` ${styles.a1_link}`} to={{pathname: path, state: {address1,
	address2,
	cityId,
	cityName,
	companyName,
	countryId,
	countryName,
	designation,
	email,
	firstName,
	id,
	image_data,
	lastName,
	phoneNo,
	stateId,
	stateName,
	zipcode,registrationNo,location,departmentId,department,website}}}>Edit</Link>
								</div>
							</div>
							<div className={`${styles.commonSmallCardBody}`}>

								<div className="row">
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>First Name</b></p>
										<p className={styles.list_item_text}>{firstName}</p>
									</div>
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Last Name</b></p>
										<p className={styles.list_item_text}>{lastName}</p>
									</div>
								</div>
								{role==='user'?(<><div className="row">
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Designation</b></p>
										<p className={styles.list_item_text}>{designation}</p>
									</div>
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Department/Division</b></p>
										<p className={styles.list_item_text}>{department}</p>
									</div>
								</div>
								<div className="row">
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Phone</b></p>
										<p className={styles.list_item_text}>{phoneNo}</p>
									</div>
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Business Email</b></p>
										<p className={styles.list_item_text}>{email}</p>
									</div>
								</div>
								<div className="row">
								
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Location</b></p>
										<p>{location}</p>
									</div>
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Mobile</b></p>
										<p>{phoneNo}</p>
									</div>
								</div></>):(<><div className="row">
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Designation</b></p>
										<p className={styles.list_item_text}>{designation}</p>
									</div>
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Business Email</b></p>
										<p className={styles.list_item_text}>{email}</p>
									</div>
								</div>
								<div className="row">
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Phone</b></p>
										<p className={styles.list_item_text}>{phoneNo}</p>
									</div>
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Mobile</b></p>
										<p>{phoneNo}</p>
									</div>
								</div>
								<div className="row">
								
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Location</b></p>
										<p>{location}</p>
									</div>
									
								</div></>)}
							</div>
						</div>
					</div>
					<div className={`col-6`}>
						<div className={styles.commonSmallCard}>
							<div className={`${styles.commonSmallCardHeader}`}>
								<h6 className="m-0">Profile photo</h6>
								<Link className={` ${styles.a1_link}`} to={{pathname: path, state: {address1,
	address2,
	cityId,
	cityName,
	companyName,
	countryId,
	countryName,
	designation,
	email,
	firstName,
	id,
	image_data,
	lastName,
	phoneNo,
	stateId,
	stateName,
	zipcode,registrationNo,location,departmentId,department,website}}}>Edit</Link>
							</div>
							<div className={`${styles.commonSmallCardBody}`}>

								<div className="row">
									<div className="col-6">
										<div>
											<p className={styles.list_item_heading}><b>Recommanded size</b></p>
											<p className={styles.list_item_text}>100KB</p>
										</div>
										<div>
											<p className={styles.list_item_heading}><b>Maximum file size</b></p>
											<p className={styles.list_item_text}>512*512pixels</p>
										</div>
										<div>
											<p className={styles.list_item_heading}>Only .jpg and .png files are<br></br> supported.</p>
										</div>
										<div className={styles.profileUploadbtn}>
											<PrimaryButton className={styles.upldBtn} text='Upload' method={()=>{	if(photoFile)	{
													changePhoto()
											 }	else	{
												dispatch({ type: ERROR_MESSAGE, payload: 'Failed to upload' })
											 }

											}} />
										</div>
									</div>

									<div className={`col-6`}>
										<div className={styles.userphotoSelect}>
											<div className={`${styles.profilePhotomain}`}>
												<input accept='image/*' type="file" hidden ref={fileRef} onChange={fileSelectedHandler} />
												{image_data || photoUrl ? <img className={styles.anyProfile} alt="profilePhoto" onClick={selectImage} src={photoUrl?photoUrl:image_data} /> : <Avatar src={UserAvatar} onClick={selectImage} />}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`row ${styles.cardHt}`}>
					<div className={`col`}>
						<div className={styles.commonSmallCard}>
							<div className={`${styles.commonSmallCardHeader}`}>
								<h6 className="m-0">Company information</h6>
								<Link className={` ${styles.a1_link}`} to={{pathname: path, state: {address1,
	address2,
	cityId,
	cityName,
	companyName,
	countryId,
	countryName,
	designation,
	email,
	firstName,
	id,
	image_data,
	lastName,
	phoneNo,
	stateId,
	stateName,
	zipcode,registrationNo,location,departmentId,department,website}}}>Edit</Link>
							</div>
							<div className={`${styles.commonSmallCardBody}`}>

								<div className="row">
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Company Name</b></p>
										<p className={styles.list_item_text}>{companyName}</p>
									</div>
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Registration Number</b></p>
										<p className={styles.list_item_text}> {registrationNo} </p>
									</div>
								</div>
								<div className="row">
									<div className={`col-6`}>
										<p className={styles.list_item_heading}><b>Website</b></p>
										<p> {website} </p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={`col`}>
						<div className={styles.commonSmallCard}>
							<div className={`${styles.commonSmallCardHeader}`}>
								<h6 className="m-0">Company address</h6>
								<Link className={` ${styles.a1_link}`} to={{pathname: path, state: {address1,
	address2,
	cityId,
	cityName,
	companyName,
	countryId,
	countryName,
	designation,
	email,
	firstName,
	id,
	image_data,
	lastName,
	phoneNo,
	stateId,
	stateName,
	zipcode,registrationNo,location,departmentId,department,website}}}>Edit</Link>
							</div>
							<div className={`${styles.commonSmallCardBody}`}>

								<div className="row">
									<div className={`col-12`}>

										<p className={styles.list_item_heading}><b>Address</b></p>
										<p className="mb-2">
											{address1}<br/>
											{cityName} - {zipcode},<br/>
											{stateName},<br/>
											{countryName}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}
export default AddProfile