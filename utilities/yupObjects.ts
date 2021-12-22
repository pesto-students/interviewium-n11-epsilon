import * as Yup from 'yup';
// import {websiteR,registrationIdR} from './regEx'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const zipCodeRegExp = /^\d{4,8}?(?!-)$/;
const name = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
// const websiteYup=Yup.string().matches(websiteR, 'Website is invalid').required('Website is required')
const emailYup = Yup.string()
    .required('Email is required')
    .email('Must be a valid email');

const passwordYup = Yup.string()
    .min(8, 'Atleast 8 characters')
    .max(32, 'Only 32 characters are allowed')
    .matches(/[a-z]/, 'Atleast one lowercase char')
    .matches(/[A-Z]/, 'Atleast one uppercase char')
    .matches(/[0-9]/, 'Atleast 1 number')
    .matches(/[^a-zA-Z0-9\s]+/, 'Atleast 1 special char (@, !, #, etc).').required('Password is required')

// const registrationNoYup = Yup.string().matches(registrationIdR, 'Registration id is invalid').required('Registration id is required')

const zipCodeYup = Yup.string()
    .required('Zip Code is required')
    .matches(zipCodeRegExp, 'Zip Code is invalid');
const companyYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .max(32, 'Only 32 characters are allowed')
    .required('Company Name is required');
const addressYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .required('Address is required');
const fullNameYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .max(32, 'Only 32 characters are allowed')
    .required('Name is required')
    .matches(name, 'Enter Valid Name');
const firstNameYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .max(32, 'Only 32 characters are allowed')
    .required('First Name is required')
    .matches(name, 'Enter Valid Name');
const lastNameYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .max(32, 'Only 32 characters are allowed')
    .required('Last Name is required')
    .matches(name, 'Enter Valid Name');
const roleYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .max(32, 'Only 32 characters are allowed')
    .required('Role is required')
    .matches(name, 'Enter Valid Role');
const locationYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .max(32, 'Only 32 characters are allowed')
    .required('Location is required')
    .matches(name, 'Enter Valid Location');
const phoneYup = Yup.string()
    .required('Mobile number is required')
    .matches(phoneRegExp, 'Mobile number is invalid')
    .min(10, 'Mobile number should be of 10 digits')
    .max(10, 'Mobile number should be of 10 digits');
const countryYup = Yup.string().required('Country is required');
const stateYup = Yup.string().required('State is required');
const cityYup = Yup.string().required('City is required');
const departmentYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .max(32, 'Only 32 characters are allowed')
    .required('Department Or Divison is required');
const designationYup = Yup.string()
    .min(3, 'Atleast 3 characters')
    .max(32, 'Only 32 characters are allowed')
    .required('Designation is required');
const panNoYup = Yup.string()
    .required('PAN number is required')
    .matches(phoneRegExp, 'PAN number is invalid')
    .min(10, 'PAN number should be of 10 digits')
    .max(10, 'PAN number should be of 10 digits');
const fileYup = (FILE_SIZE: number, SUPPORTED_FORMATS: Array<string>) =>
    Yup.mixed()
        .test(
            'fileSize',
            'File Size is too large',
            (value) => value.size <= FILE_SIZE
        )
        .test(
            'fileType',
            `${SUPPORTED_FORMATS.join(', ')} are only supported`,
            (value) => SUPPORTED_FORMATS.includes(value.type)
        );

const accountName =  Yup.string()
.required('Account Name is Required')
.min(3, 'Atleast 3 characters')
.max(32, 'Only 32 characters are allowed'); 

const subDomain =  Yup.string()
.required('Sub Domain is Required')
.min(2, 'Atleast 2 characters')
.max(15, 'Only 15 characters are allowed'); 


const decriptionYup =  Yup.string()
.required('Description is Required')
.min(10, 'Atleast 10 characters')
.max(250, 'Only 250 characters are allowed'); 

const textYup = Yup.string()
    .required('Please Enter the value')
const versionYup = Yup.string()
    .required('Version is mandatory')
    .min(2, 'Atleast 2 characters')
    .max(6, 'Only 6 characters are allowed'); 
const selectIdpSpYup = Yup.string()
    .required('Version is mandatory')

export {
// registrationNoYup,
companyYup,
panNoYup,
designationYup,
addressYup,
zipCodeYup,
fullNameYup,
roleYup,
locationYup,
emailYup,
passwordYup,
firstNameYup,
lastNameYup,
phoneYup,
countryYup,
stateYup,
cityYup,
departmentYup,
fileYup,
// websiteYup,
accountName,
subDomain,
decriptionYup,
textYup,
versionYup,
selectIdpSpYup
}
