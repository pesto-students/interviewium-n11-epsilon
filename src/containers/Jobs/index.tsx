import styles from './index.module.scss';
import CandidateCard from '../../widgets/CandidateCard';
import AllCandidateCard from '../../widgets/AllCandidateCard';
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
  getAllIntervieweesAPI,
  getJobApplicants,
  inviteInterviewee,
  postJobForHR,
} from '_store/apis/userManagementAPI';
import { useDispatch } from 'react-redux';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '_store/constants';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { InputBase } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

let obj = {
  p: '',
  s: '',
  emp: 'FULL_TIME',
  exp: '1'
}

const Jobs = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    modalIdentity: 'ActiveUser',
    apiCall: () => {},
  });
  const [jobApp, setJobApp] = useState<any>([]);
  const [allInterviewee, setAllInterviewee] = useState<any>([]);
  const [allInterviewee1, setAllInterviewee1] = useState<any>([1,2,3,4,5]);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const [pSkill, setPSkill] = useState('');
  const [sSkill, setSSkill] = useState('');
  const [empType, setEmpType] = useState('');
  const [exp, setexp] = useState('');  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event)
    if(newValue === 1) {
      allIntervieweeHandler(``)
    }
  };
  useEffect(() => {
    jobApplicationHandler();
    allIntervieweeHandler(``)
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
        humanResourceEmail: localStorage.getItem('email')
      };
      let data;
      data = await postJobForHR(payload);
      let { body, status }: any = data;

      if (status === 200) {
        formik.resetForm()
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Job Posted Successfully' });
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
 
  const allIntervieweeHandler = async (value : any) => {
    try {

      obj.p = value.var === 'p' ? value.value : obj.p
      obj.s = value.var === 's' ? value.value :  obj.s

      let payload = `humanResourceEmail=${localStorage.getItem('email')}` + `&primarySkills=${obj.p}`  +   `&secondarySkills=${obj['s']}`
      let data;
      data = await getAllIntervieweesAPI(``);
      let { body, status }: any = data;
      if (status === 200) {
        setAllInterviewee(body);
        setAllInterviewee1([])
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
  const allIntervieweeHandler1 = async (value : any) => {
    try {

      obj.p = value.var === 'p' ? value.value : obj.p
      obj.s = value.var === 's' ? value.value :  obj.s

      let payload = `humanResourceEmail=${localStorage.getItem('email')}` + `&primarySkills=${obj.p}`  +   `&secondarySkills=${obj['s']}`
      let data;
      data = await getAllIntervieweesAPI(payload);
      let { body, status }: any = data;
      if (status === 200) {
        setAllInterviewee(body);
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

  const inviteIntervieweeHandler = async ( id : any) => {
    try {
      let payload = {
        email: localStorage.getItem('email'),
        intervieweeId: id,
        "jobId": "ckyjabnx00640ioi58jq37nom"
      };
      let data;
      data = await inviteInterviewee(payload);
      let { body, status }: any = data;
      if (status === 200) {
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Invited Successfully' });
        let somename = allInterviewee.filter(e => (
          e.id !== id
          ))
        console.log(somename)
        setAllInterviewee(somename)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
  const inviteIntervieweeHandler1 = async ( id : any) => {
    try {
      let payload = {
        email: localStorage.getItem('email'),
        intervieweeId: id,
        "jobId": "ckyjabnx00640ioi58jq37nom"
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
     <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Post Job" icon={<ShoppingBasket />} {...a11yProps(0)} />
          <Tab label="Search Candidates" icon={<PersonPinIcon />} {...a11yProps(1)} />
          <Tab label="Short List" icon={<HelpIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className={styles.card_parent}>
        <div className={styles.filters}>
        <FormControl >
        <InputLabel htmlFor="demo-customized-select-native">Primary Skills</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={(e) => {allIntervieweeHandler1({var : 'p' , value : e.target.value})}}
          input={<BootstrapInput />}
        >
          <option aria-label="Primary Skills" value="" />
          <option value={'React'}>React</option>
          <option value={'JavaScript'}>JavaScript</option>
          <option value={'TypeScript'}>TypeScript</option>
          <option value={'ruby'}>Ruby</option>
          <option value={'mysql'}>Mysql</option>
          <option value={'java'}>Java</option>
        </NativeSelect>
      </FormControl>
      <FormControl >
        <InputLabel htmlFor="demo-customized-select-native">Sec Skills</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={(e) => {allIntervieweeHandler1({var : 's' , value : e.target.value})}}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="Sec Skills" />
          <option value={'React'}>React</option>
          <option value={'JavaScript'}>JavaScript</option>
          <option value={'TypeScript'}>TypeScript</option>
        </NativeSelect>
      </FormControl>
      <FormControl >
        <InputLabel htmlFor="demo-customized-select-native">Emp Type</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={(e) => {allIntervieweeHandler1({var : 'emp' , value : e.target.value})}}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="Emp Type" />
          <option value={'FULL_TIME'}>FULL_TIME</option>
          <option value={'PART_TIME'}>PART_TIME</option>
          <option value={'INTERNSHIP'}>INTERNSHIP</option>
        </NativeSelect>
      </FormControl>
      <FormControl >
        <InputLabel htmlFor="demo-customized-select-native">Exp</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={(e) => {allIntervieweeHandler1({var : 'exp' , value : e.target.value})}}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="Exp" />
          <option value={'1'}>1</option>
          <option value={'2'}>2</option>
          <option value={'3'}>3</option>
        </NativeSelect>
      </FormControl>
        </div>
            <div className={styles.cardParent}>
              {allInterviewee && allInterviewee.length > 0
                ? allInterviewee.map((e: any) => {
                    return (
                      <AllCandidateCard
                        exp
                        search
                        data={e}
                        inviteIntervieweeHandler={inviteIntervieweeHandler}
                      />
                    );
                  })
                : allInterviewee1.length > 0 ? allInterviewee1.map(() => (
                    <div className='d-flex flex-column'>
                      <Skeleton variant='text' />
                      <Skeleton variant='circle' width={70} height={70} />
                      <Skeleton variant='rect' width={300} height={250} />
                    </div>
                  )) :
                <div style={{height : 200, marginTop: '7%'}} className='d-flex flex-column justify-content-center align-content-center'>
                  <img src='https://mrtruant.com/website/images/no-data-found.png' alt="no data" height={400} />
                  </div>
                }
            </div>
          </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div className={styles.card_parent}>
            <div className={styles.cardParent} style={{margin : 0}}>
              {jobApp.length > 0
                ? jobApp.map((e: any) => {
                    return (
                      <CandidateCard
                        exp
                        data={e}
                        inviteIntervieweeHandler={inviteIntervieweeHandler1}
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
      </TabPanel>
    </div>
    </>
  );
};

export default Jobs;
