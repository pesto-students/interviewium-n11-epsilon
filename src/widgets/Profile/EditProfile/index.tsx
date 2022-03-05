import styles from './index.module.scss'
import { useFormik, FormikProvider, } from 'formik'
import * as Yup from 'yup'
import { EditProfileProps } from 'types'
import PrimaryButton from 'widgets/PrimaryButton'
import NormalTextField from 'widgets/NormalTextField'
import SelectField from 'widgets/SelectField'
import SecondaryButton from 'widgets/SecondaryButton'
import { addressYup, companyYup, emailYup, fullNameYup, firstNameYup, lastNameYup, panNoYup, phoneYup, registrationNoYup, zipCodeYup, websiteYup, designationYup } from 'utilities/yupObjects'
import { useEffect, useState } from 'react'
import { RootState } from '_store/reducer/rootReducer'
import { useSelector } from 'react-redux'




const EditProfile = ({
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
	zipcode, registrationNo, location, departmentId, department, website,
	title = '',
	subHead = '',
	leftBtn,
	rightBtn, role,
}: EditProfileProps) => {

	const [countries,] = useState<Array<Object>>(JSON.parse(localStorage.getItem('places')!))
	let [states, setStates] = useState<Array<Object>>([])
	let [cities, setCities] = useState<Array<Object>>([])


	let [selectedDepartment, setSelectedDepartment] = useState<any>('')
	let [selectedCountry, setSelectedCountry] = useState<Object>('')
	let [selectedState, setSelectedState] = useState<Object>('')

	let [selectedCity, setSelectedCity] = useState<Object>('')

	const [countryError, setCountryError] = useState<boolean>(false)
	const [stateError, setStateError] = useState<boolean>(false)
	const [cityError, setCityError] = useState<boolean>(false)

	const [departmentReduxId, setDepartmentReduxId] = useState<string>('')
	const [departments] = useSelector((state: RootState) => {
		if (state.departments.id && departmentReduxId !== state.departments.id) {
			setDepartmentReduxId(state.departments.id);
		}
		return [state.departments.departments];
	})

	const changeDepartment = (departmentChanged) => {
		selectedDepartment = departmentChanged
		setSelectedDepartment(departmentChanged)
	}
	const changeCountry = (countryChanged) => {
		setSelectedCountry(countryChanged)
		states = countryChanged['states']
		setStates(countryChanged['states'])
		selectedState = ''
		setSelectedState('')
		cities = []
		setCities([])
		setSelectedCity('')
		if (countryChanged) {
			setCountryError(false)
		} else {
			setCountryError(true)
		}
	}
	const changeState = (stateChanged) => {
		selectedState = stateChanged
		setSelectedState(stateChanged)
		cities = selectedState['cities']
		setCities(selectedState['cities'])
		setSelectedCity('')
		if (stateChanged) {
			setStateError(false)
		} else {
			setStateError(true)
		}
	}
	const changeCity = (cityChanged) => {
		setSelectedCity(cityChanged)
		if (cityChanged) {
			setCityError(false)
		} else {
			setCityError(true)
		}
	}

	const checkPlaceData = () => {
		if (countryId) {
			const foundCountry = countries.find((item) => item['id'] === countryId)

			console.log('~~~ foundCountry: ', foundCountry)
			if (foundCountry) {
				selectedCountry = foundCountry
				setSelectedCountry(foundCountry)
				states = foundCountry['states']
				setStates(foundCountry['states'])
				const foundState = foundCountry['states'].find((item) => item['id'] === stateId)
				if (foundState) {
					const foundCity = foundState['cities'].find((item) => item['id'] === cityId)


					selectedState = foundState
					setSelectedState(foundState)
					cities = selectedState['cities']

					setCities(selectedState['cities'])
					setSelectedCity(foundCity)
				} else {
					selectedState = ''
					setSelectedState('')
				}
			}
		}
	}
	const fetchSelectedDepartment = () => {
		const foundDepartment = departments.find((item) => item['department_id'] === departmentId)
		setSelectedDepartment(foundDepartment)
	}
	useEffect(() => {
		if (departmentReduxId) {
			fetchSelectedDepartment()
		}
	}, [departmentReduxId])
	useEffect(() => {
		checkPlaceData()
		if (false) {
			console.log('~~~ EditProfile: ', checkPlaceData, selectedCity, changeCountry, changeState, changeCity, selectedCountry, address1, address2, panNoYup,
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
				zipcode, registrationNo, location, departmentId, department)
		}
	}, [])

	const editProfileSchema = Yup.object().shape({
		address1Inp: addressYup,
		address2Inp: addressYup,
		companyNameInp: companyYup,
		designationInp: designationYup,
		emailInp: emailYup,
		firstNameInp: firstNameYup,
		lastNameInp: lastNameYup,
		phoneNoInp: phoneYup,
		zipcodeInp: zipCodeYup,
		registrationNoInp: registrationNoYup,
		locationInp: fullNameYup,
		websiteInp: websiteYup,
	})
	const formik = useFormik({
		initialValues: {
			address1Inp: address1, address2Inp: address2,
			companyNameInp: companyName,
			designationInp: designation,
			emailInp: email,
			firstNameInp: firstName,
			lastNameInp: lastName,
			phoneNoInp: phoneNo,
			zipcodeInp: zipcode,
			registrationNoInp: registrationNo,
			locationInp: location, websiteInp: website,
		},
		validationSchema: editProfileSchema,
		onSubmit: () => {
			if (!selectedCountry) {
				setCountryError(true)
			}
			if (!selectedState) {
				setStateError(true)
			}
			if (!selectedCity) {
				setCityError(true)
			}
			if (selectedCountry && selectedState && selectedCity) {
				rightBtn.btnMethod(role === 'user' ? {
					address1: formik.values.address1Inp,
					address2: formik.values.address2Inp,
					cityId: selectedCity['id'],
					companyName: formik.values.companyNameInp,
					countryId: selectedCountry['id'],
					designation: formik.values.designationInp,
					email: formik.values.emailInp,
					firstName: formik.values.firstNameInp,
					lastName: formik.values.lastNameInp,
					phoneNo: formik.values.phoneNoInp,
					stateId: selectedState['id'],
					zipcode: formik.values.zipcodeInp, registrationNo: formik.values.registrationNoInp, location: formik.values.locationInp, departmentId: selectedDepartment['department_id'], website: formik.values.websiteInp,
				} : {
					address1: formik.values.address1Inp,
					address2: formik.values.address2Inp,
					cityId: selectedCity['id'],
					companyName: formik.values.companyNameInp,
					countryId: selectedCountry['id'],
					designation: formik.values.designationInp,
					email: formik.values.emailInp,
					firstName: formik.values.firstNameInp,
					lastName: formik.values.lastNameInp,
					phoneNo: formik.values.phoneNoInp,
					stateId: selectedState['id'],
					zipcode: formik.values.zipcodeInp, registrationNo: formik.values.registrationNoInp, location: formik.values.locationInp, website: formik.values.websiteInp,
				})
			}
		}
	})

	return (
		<div className={styles.customUsertble}>
			<div className={styles.allMainbodyTitle}>
				<div className={styles.innerBodytitle}>
					{title}
				</div>
				{(subHead.length > 0) && <div>
					<PrimaryButton className={styles.back_to_list_button} text='Back to List' method={() => { }} />
				</div>}
			</div>
			<div className={` ${styles.containtMainbody}`}>
				<FormikProvider value={formik}>
					<form>
						<div className={styles.mainEditsub}>
							<h6 className={styles.commeditTitle}>Admin information</h6>
							<div className={`row`}>
								<div className={`col-xl-4 col-lg-4 col-md-4  ${styles.editMargin}`}>
									<NormalTextField name='firstNameInp' label_text='First Name' placeholder='Enter first name' error={formik.errors.firstNameInp} touched={formik.touched.firstNameInp} value={formik.values.firstNameInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
								</div>
								<div className={`col-xl-4 col-lg-4 col-md-4  ${styles.editMargin}`}>
									<NormalTextField name='lastNameInp' label_text='Last Name' placeholder='Enter last name' error={formik.errors.lastNameInp} touched={formik.touched.lastNameInp} value={formik.values.lastNameInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
								</div>
								<div className={`col-xl-4 col-lg-4 col-md-4  ${styles.editMargin}`}>
									<NormalTextField name='designationInp' label_text='Designation' placeholder='Enter Designation' error={formik.errors.designationInp} touched={formik.touched.designationInp} value={formik.values.designationInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
								</div>
							</div>
							{role === 'user' ? (<><div className={`row`}>
								<div className={`col-xl-4 col-lg-4 col-md-4  ${styles.editMargin}`}>
									<SelectField methodHandleChange={changeDepartment} placeholder='Select a department' label='Department' name='department' attributeName='department_name' options={departments} value={selectedDepartment} />
								</div>
								<div className='col-xl-4 col-lg-4 col-md-4'>
									<NormalTextField name='emailInp' label_text='Business Email' placeholder='Enter business email' error={formik.errors.emailInp} touched={formik.touched.emailInp} value={formik.values.emailInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='email' />
								</div>
								<div className={`col-xl-4 col-lg-4 col-md-4  ${styles.editMargin}`}>
									<NormalTextField name='phoneNoInp' label_text='Phone' placeholder='Enter phone number' error={formik.errors.phoneNoInp} touched={formik.touched.phoneNoInp} value={formik.values.phoneNoInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='number' />
								</div>

							</div>
								<div className="row">
									<div className={`col-xl-4 col-lg-4 col-md-4`}>
										<NormalTextField name='phoneNoInp' label_text='Mobile' placeholder='Enter mobile number' error={formik.errors.phoneNoInp} touched={formik.touched.phoneNoInp} value={formik.values.phoneNoInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='number' />
									</div>
									<div className={`col-xl-4 col-lg-4 col-md-4`}>
										<NormalTextField name='locationInp' label_text='Location' placeholder='Enter Designation' error={formik.errors.locationInp} touched={formik.touched.locationInp} value={formik.values.locationInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
									</div>
								</div></>) : (<><div className={`row`}>
									<div className='col-xl-4 col-lg-4 col-md-4 ${styles.editMargin}'>
										<NormalTextField name='emailInp' label_text='Business Email' placeholder='Enter business email' error={formik.errors.emailInp} touched={formik.touched.emailInp} value={formik.values.emailInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='email' />
									</div>
									<div className={`col-xl-4 col-lg-4 col-md-4 ${styles.editMargin}`}>
										<NormalTextField name='phoneNoInp' label_text='Phone' placeholder='Enter phone number' error={formik.errors.phoneNoInp} touched={formik.touched.phoneNoInp} value={formik.values.phoneNoInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='number' />
									</div>
									<div className={`col-xl-4 col-lg-4 col-md-4 ${styles.editMargin}`}>
										<NormalTextField name='phoneNoInp' label_text='Mobile' placeholder='Enter mobile number' error={formik.errors.phoneNoInp} touched={formik.touched.phoneNoInp} value={formik.values.phoneNoInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='number' />
									</div>
								</div>
									<div className="row">
										<div className={`col-xl-4 col-lg-4 col-md-4`}>
											<NormalTextField name='locationInp' label_text='Location' placeholder='Enter Designation' error={formik.errors.locationInp} touched={formik.touched.locationInp} value={formik.values.locationInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
										</div>
									</div></>)}
						</div>
						<div className={styles.mainEditsub}>
							<h6 className={styles.commeditTitle}>Company Information</h6>
							<div className={`row`}>
								<div className='col-xl-4 col-lg-4 col-md-4'>
									<NormalTextField name='companyNameInp' label_text='Company Name' placeholder='Enter company name' error={formik.errors.companyNameInp} touched={formik.touched.companyNameInp} value={formik.values.companyNameInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
								</div>
								<div className='col-xl-4 col-lg-4 col-md-4'>
									<NormalTextField name='registrationNoInp' label_text='Registration Number' placeholder='Enter registration number' error={formik.errors.registrationNoInp} touched={formik.touched.registrationNoInp} value={formik.values.registrationNoInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
								</div>
								<div className='col-xl-4 col-lg-4 col-md-4'>
									<NormalTextField name='websiteInp' label_text='website' placeholder='Enter website' error={formik.errors.websiteInp} touched={formik.touched.websiteInp} value={formik.values.websiteInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
								</div>
							</div>
						</div>
						<div className={styles.mainEditsub}>
							<h6 className={styles.commeditTitle}>Company address</h6>
							<div className={`row`}>
								<div className={`col-xl-4 col-lg-4 col-md-4  ${styles.editMargin}`}>
									<NormalTextField name='address1Inp' label_text='Address 1' placeholder='Enter address_1' error={formik.errors.address1Inp} touched={formik.touched.address1Inp} value={formik.values.address1Inp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
								</div>
								<div className={`col-xl-4 col-lg-4 col-md-4  ${styles.editMargin}`}>
									<NormalTextField name='address2Inp' label_text='Address 2' placeholder='Enter address1Inp' error={formik.errors.address2Inp} touched={formik.touched.address2Inp} value={formik.values.address2Inp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='text' />
								</div>
								<div className={`col-xl-4 col-lg-4 col-md-4  ${styles.editMargin}`}>
									<SelectField className={styles.select_field} label='Country' name='country' attributeName='name' options={countries} value={selectedCountry} placeholder='Select a country' methodHandleChange={changeCountry} error={countryError} />
								</div>
							</div>
							<div className={`row`}>
								<div className='col-xl-4 col-lg-4 col-md-4'>
									<SelectField className={styles.select_field} label='State' name='state' attributeName='name' options={states} value={selectedState} placeholder='Select a state' methodHandleChange={changeState} error={stateError} />
								</div>
								<div className='col-xl-4 col-lg-4 col-md-4'>
									<SelectField className={styles.select_field} label='City' name='city' attributeName='name' options={cities} value={selectedCity} placeholder='Select a city' methodHandleChange={changeCity} error={cityError} />
								</div>
								<div className='col-xl-4 col-lg-4 col-md-4'>
									<NormalTextField name='zipcodeInp' label_text='Zip Code/ PO BOX' placeholder='Enter zip code/ PO BOX' error={formik.errors.zipcodeInp} touched={formik.touched.zipcodeInp} value={formik.values.zipcodeInp} handleChange={formik.handleChange} handleBlur={formik.handleBlur} type='number' />
								</div>
							</div>
						</div>
						<div className={`d-flex align-items-center justify-content-center ${styles.editCta}`}>
							<div>
								<SecondaryButton text={leftBtn.btnText} method={leftBtn.btnMethod} />
							</div>
							<div>
								<PrimaryButton text={rightBtn.btnText} method={formik.handleSubmit} />
							</div>
						</div>
					</form>
				</FormikProvider>
			</div>
		</div>
	)
}

export default EditProfile