import { Tab, Tabs } from 'react-bootstrap';
import styles from './index.module.scss';
import CandidateCard from '../../widgets/CandidateCard';
import {
  accountName,
  decriptionYup,
  fullNameYup,
} from '../../utilities/yupObjects';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import PrimaryButton from '../../widgets/PrimaryButton';
import NormalTextField from '../../widgets/NormalTextField';

import Icon from 'widgets/IconComponent';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { MultiSelect } from 'react-multi-select-component';
import { useEffect, useState } from 'react';

import TextArea from 'widgets/TextArea';
import DatePickerField from 'widgets/DatePickerField';
import { makeStyles, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker/DatePicker';
import UploadImageToS3WithReactS3 from 'widgets/s3-upload';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '_store/constants/message';
import { useDispatch } from 'react-redux';
import { getIntervieweeProfile, intervieweeDetails } from '_store/apis/userManagementAPI';

const Jobs = () => {
  const [date, setDate] = useState<any>();
  const [resumeLink, setResumeLink] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    getIntervieweeProfileHandler();
  }, []);
  

  const postJobSchema = Yup.object().shape({
    title: fullNameYup,
    company: accountName,
    jobDescription: decriptionYup,
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      location: '',
      jobDescription: 'Hello, ',
      primarySkills: '',
      secondarySkills: '',
      resume: '',
    },
    validationSchema: postJobSchema,
    onSubmit: values => {
      formik.values.primarySkills = selectedP
        .map((e: any) => e.value)
        .join(',');
      formik.values.secondarySkills = selectedS
        .map((e: any) => e.value)
        .join(',');
      formik.values.location = date;
      formik.values.resume = resumeLink;
      console.log(values);
      postJobs();
    },
  });

  const [selectedP, setSelectedP] = useState([]);
  const [selectedS, setSelectedS] = useState([]);

  const options = [
    { label: 'React', value: 'React' },
    { label: 'Javascript', value: 'Javascript' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'CSS', value: 'CSS' },
    { label: 'Scss', value: 'Scss' },
    { label: 'Node', value: 'Node' },
    { label: 'JQuery', value: 'JQuery' },
    { label: 'Python', value: 'Python' },
  ];

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const classes = useStyles();

  const getIntervieweeProfileHandler = async () => {
    try {
      let data;
      data = await getIntervieweeProfile();
      let { body, status }: any = data;
      if (status === 200) {
        formik.values.title = body.name ? body.name : ''
        formik.values.company = body.currentCompanyName ? body.currentCompanyName : ''
        let skills = body.primaryAndSecondarySkills.split('#')
        // if(skills) {
        //   let p : any = []
        //   skills[0].split[','].map((e : any) => p.push(e))
        //   setSelectedP(p)
        //   let s : any = []
        //   skills[0].split[','].map((e : any) => s.push(e))
        //   setSelectedS(s)
        // }
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Profile Details Fetched' });
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const postJobs = async () => {
    try {
      let payload = {
        intervieweeEmail: localStorage.getItem('email'),
        intervieweeName: formik.values.title,
        primarySkills: formik.values.primarySkills,
        secondarySkills: formik.values.secondarySkills,
        resume: formik.values.resume,
        companyName: formik.values.company,
        professionalExperience: {
          currentCompany: formik.values.company,
          joiningDate: formik.values.location,
        },
      };
      let data;
      data = await intervieweeDetails(payload);
      let { body, status }: any = data;

      if (status === 200) {
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Job Posted Successfully' });
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.component}>
          <img src='https://i.ibb.co/yNGW4gg/avatar.png' alt='user' />
          <div className={styles.userName}>{formik.values.title}</div>
        </div>
        <div className={styles.component1}>
          <div style={{ padding: 25 }}>
            <h4>Profile</h4>
            <FormikProvider value={formik}>
              <form
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    formik.handleSubmit();
                  }
                }}
                className='w-100'
              >
                <div className='d-flex justify-content-around'>
                  <NormalTextField
                    error={formik.errors.title}
                    touched={formik.touched.title}
                    placeholder='Name'
                    name='title'
                    type='text'
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.title}
                    startAdor={
                      <Icon
                        icon={
                          <MailOutlineIcon className={styles.inputFieldicons} />
                        }
                      />
                    }
                  />
                  <NormalTextField
                    error={formik.errors.company}
                    touched={formik.touched.company}
                    placeholder='Current Company Name'
                    name='company'
                    type='text'
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.company}
                    startAdor={
                      <Icon
                        icon={
                          <MailOutlineIcon className={styles.inputFieldicons} />
                        }
                      />
                    }
                  />
                </div>

                <div className={styles.customDiv}></div>

                <div className='d-flex justify-content-around'>
                  <form className={classes.container} noValidate>
                    <TextField
                      id='date'
                      label='Joining Date'
                      type='date'
                      defaultValue='2022-01-01'
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={date}
                      onChange={(e: any) => {
                        console.log(e.target.value);
                        setDate(e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div className='d-flex justify-content-around mt-3'>
                  <div style={{ width: 235, maxWidth: 235 }}>
                    <MultiSelect
                      options={options}
                      value={selectedP}
                      onChange={setSelectedP}
                      labelledBy='Select Primary Skills'
                    />
                  </div>
                  <div style={{ width: 235, maxWidth: 235 }}>
                    <MultiSelect
                      options={options}
                      value={selectedS}
                      onChange={setSelectedS}
                      labelledBy='Select Secondary Skills'
                    />
                  </div>
                </div>
                <div className='mt-4'></div>
                <TextArea
                  error={formik.errors.jobDescription}
                  touched={formik.touched.jobDescription}
                  className={styles.descriptionBox}
                  placeholder='About YourSelf'
                  labelText='About YourSelf'
                  name='jobDescription'
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  value={formik.values.jobDescription}
                />

                <div >Upload your Resume</div>
                <UploadImageToS3WithReactS3 setResumeLink={setResumeLink} />
                <div className='mt-4'></div>
                <PrimaryButton
                  text='Post Profile'
                  method={formik.handleSubmit}
                />
              </form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
