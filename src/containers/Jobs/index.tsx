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
import ModalComponent from "widgets/Modal/indexL";
import { useState } from "react";

import TextArea from 'widgets/TextArea';

const Jobs = () => {

  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({  modalIdentity : 'ActiveUser',
  apiCall : () => {}});

  const hideModal = () => {
    setModalShow(!modalShow);
  };

  const postJobSchema = Yup.object().shape({
    title: accountName,
    company: accountName,
    location: accountName,
    emplymentType: accountName,
    jobDescription: decriptionYup,
    primarySkills: accountName,
    secondarySkills: accountName,
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
      console.log(values);
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

  return (
    <>
    <ModalComponent 
        show = {modalShow}
        onHideModal = {hideModal}
        onHide = {hideModal}
        modalInfo = {modalInfo}
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
                  <div className="mt-4"></div>
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

                  
                  <div className="mt-4"></div>
                  <PrimaryButton text='Post Job' method={formik.handleSubmit} />
                </form>
              </FormikProvider>
            </div>
          </div>
        </Tab>
        <Tab eventKey='profile' title='Search Candidates'>
          <div className={styles.card_parent}>
            <div className={styles.cardParent}>
              <CandidateCard exp show={hideModal}/>
              <CandidateCard exp show={hideModal}/>
              <CandidateCard exp show={hideModal}/>
              <CandidateCard exp show={hideModal}/>
              <CandidateCard exp show={hideModal}/>
            </div>
          </div>
        </Tab>
        <Tab eventKey='contact' title='Short-list'>
          <div className={styles.card_parent}>
            <div className={styles.cardParent}>
              <CandidateCard exp />
              <CandidateCard exp />
              <CandidateCard exp />
              <CandidateCard exp />
              <CandidateCard exp />
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Jobs;
