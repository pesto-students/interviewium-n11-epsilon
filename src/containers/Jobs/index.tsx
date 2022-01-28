import { Tab, Tabs } from 'react-bootstrap';
import styles from './index.module.scss';
import CandidateCard from '../../widgets/CandidateCard';
import { accountName, decriptionYup } from '../../utilities/yupObjects';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import PrimaryButton from '../../widgets/PrimaryButton';
import NormalTextField from '../../widgets/NormalTextField';

import Icon from 'widgets/IconComponent';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { MultiSelect } from 'react-multi-select-component';
import ModalComponent from 'widgets/Modal/indexL';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';

import TextArea from 'widgets/TextArea';
import {
  getJobApplicants,
  inviteInterviewee,
  postJobForHR,
} from '_store/apis/userManagementAPI';
import { useDispatch } from 'react-redux';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '_store/constants';

const Jobs = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    modalIdentity: 'ActiveUser',
    apiCall: () => {},
  });
  const [jobApp, setJobApp] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    jobApplicationHandler();
  }, []);

  const hideModal = () => {
    setModalShow(!modalShow);
  };

  const postJobSchema = Yup.object().shape({
    title: accountName,
    company: accountName,
    location: accountName,
    emplymentType: accountName,
    jobDescription: decriptionYup,
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      location: '',
      emplymentType: '',
      jobDescription: 'Hello, ',
      primarySkills: '',
      secondarySkills: '',
    },
    validationSchema: postJobSchema,
    onSubmit: values => {
      formik.values.primarySkills = selectedP
        .map((e: any) => e.value)
        .join(',');
      formik.values.secondarySkills = selectedS
        .map((e: any) => e.value)
        .join(',');
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

  const postJobs = async () => {
    try {
      let payload = {
        jobTitle: formik.values.title,
        companyName: formik.values.company,
        cityName: formik.values.location,
        employmentType: formik.values.emplymentType,
        jobDescription: formik.values.jobDescription,
        primarySkills: formik.values.primarySkills,
        secondarySkills: formik.values.secondarySkills,
        humanResourceEmail: 'cynthia@google.com',
      };
      let data;
      data = await postJobForHR(payload);
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
  const jobApplicationHandler = async () => {
    try {
      let data;
      data = await getJobApplicants();
      let { body, status }: any = data;
      if (status === 200) {
        setJobApp(body);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const inviteIntervieweeHandler = async (email: any) => {
    try {
      let payload = {
        email: 'cynthia@google.com',
        interviewerEmail: email,
      };
      let data;
      data = await inviteInterviewee(payload);
      let { body, status }: any = data;
      if (status === 200) {
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Invited Successfully' });
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
      <ModalComponent
        show={modalShow}
        onHideModal={hideModal}
        onHide={hideModal}
        modalInfo={modalInfo}
        data={'data'}
      />
      <Tabs
        defaultActiveKey='profile'
        id='uncontrolled-tab-example'
        className={styles.header}
      >
        <Tab eventKey='home' title='Post Jobs'>
          <div className={styles.card_parent}>
            <div className={styles.cardParent1}>
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
                      placeholder='Jobs Title'
                      name='title'
                      type='text'
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      value={formik.values.title}
                      startAdor={
                        <Icon
                          icon={
                            <MailOutlineIcon
                              className={styles.inputFieldicons}
                            />
                          }
                        />
                      }
                    />
                    <NormalTextField
                      error={formik.errors.company}
                      touched={formik.touched.company}
                      placeholder='Company Name'
                      name='company'
                      type='text'
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      value={formik.values.company}
                      startAdor={
                        <Icon
                          icon={
                            <MailOutlineIcon
                              className={styles.inputFieldicons}
                            />
                          }
                        />
                      }
                    />
                  </div>

                  <div className={styles.customDiv}></div>

                  <div className='d-flex justify-content-around'>
                    <NormalTextField
                      error={formik.errors.location}
                      touched={formik.touched.location}
                      placeholder='Enter location'
                      name='location'
                      type='text'
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      value={formik.values.location}
                      startAdor={
                        <Icon
                          icon={
                            <MailOutlineIcon
                              className={styles.inputFieldicons}
                            />
                          }
                        />
                      }
                    />
                    <NormalTextField
                      error={formik.errors.emplymentType}
                      touched={formik.touched.emplymentType}
                      placeholder='Emplyment Type'
                      name='emplymentType'
                      type='text'
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      value={formik.values.emplymentType}
                      startAdor={
                        <Icon
                          icon={
                            <MailOutlineIcon
                              className={styles.inputFieldicons}
                            />
                          }
                        />
                      }
                    />
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
                    placeholder='Job Description'
                    labelText='Job Description'
                    name='jobDescription'
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    value={formik.values.jobDescription}
                  />

                  <div className='mt-4'></div>
                  <PrimaryButton text='Post Job' method={formik.handleSubmit} />
                </form>
              </FormikProvider>
            </div>
          </div>
        </Tab>
        <Tab eventKey='profile' title='Search Candidates'>
          <div className={styles.card_parent}>
            <div className={styles.cardParent}>
              {jobApp.length > 0
                ? jobApp.map((e: any) => {
                    return (
                      <CandidateCard
                        exp
                        search
                        data={e}
                        inviteIntervieweeHandler={inviteIntervieweeHandler}
                      />
                    );
                  })
                : [1, 3, 4, 5, 6, 7].map(() => (
                    <div className='d-flex flex-column'>
                      <Skeleton variant='text' />
                      <Skeleton variant='circle' width={70} height={70} />
                      <Skeleton variant='rect' width={300} height={250} />
                    </div>
                  ))}
            </div>
          </div>
        </Tab>
        <Tab eventKey='contact' title='Short-list'>
          <div className={styles.card_parent}>
            <div className={styles.cardParent}>
              {jobApp.length > 0
                ? jobApp.map((e: any) => {
                    return (
                      <CandidateCard
                        exp
                        data={e}
                        inviteIntervieweeHandler={inviteIntervieweeHandler}
                      />
                    );
                  })
                : [1, 3, 4, 5, 6, 7].map(() => (
                    <div className='d-flex flex-column'>
                      <Skeleton variant='text' />
                      <Skeleton variant='circle' width={70} height={70} />
                      <Skeleton variant='rect' width={300} height={250} />
                    </div>
                  ))}
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Jobs;
