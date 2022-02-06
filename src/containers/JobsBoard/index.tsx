import styles from './index.module.scss';
import ModalComponent from 'widgets/Modal/indexL';
import { useEffect, useState } from 'react';
import { allJobs, applyForJob } from '_store/apis/userManagementAPI';
import { useDispatch } from 'react-redux';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '_store/constants';
import { Skeleton } from '@material-ui/lab';
import PrimaryButton from 'widgets/PrimaryButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { InputBase } from '@material-ui/core';


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
  const dispatch = useDispatch();

  useEffect(() => {
    jobApplicationHandler();
  }, []);

  const hideModal = () => {
    setModalShow(!modalShow);
  };

  const jobApplicationHandler = async () => {
    try {
      let data;
      data = await allJobs(``);
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
  const jobApplicationHandler1 = async (value : any) => {
    try {
      obj.p = value.var === 'p' ? value.value : obj.p
      obj.s = value.var === 's' ? value.value :  obj.s

      let payload = `intervieweeEmail=${localStorage.getItem('email')}` + `&primarySkills=${obj.p}`  +   `&secondarySkills=${obj['s']}`
      // let payload = `experience=2&employmentType=INTERNSHIP&primarySkills=react,node&secondarySkills=ruby&intervieweeEmail=pulkit@gmail.com`
      let data;
      data = await allJobs(payload);
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

  const applyForJobHandler = async (hrId, jobId) => {
    try {
      let payload ={
        intervieweeEmail:localStorage.getItem('email'),
        humanResourceId: hrId,
        jobId: jobId
    }
      let data;
      data = await applyForJob(payload);
      let { body, status }: any = data;

      if (status === 200) {
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Job Applied Successfully' });
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const primarySkillsHandler = data => {
    let primary = data.split('^');
    if (primary[0]) {
      return primary[0];
    } else return '';
  };
  const secondarySkillsHandler = data => {
    let secondary = data.split('^');
    if (secondary[1]) {
      return secondary[1];
    } else return '';
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
      <div className={styles.card_parent}>
      <div className={styles.filters}>
        <FormControl >
        <InputLabel htmlFor="demo-customized-select-native">Primary Skills</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={(e) => {jobApplicationHandler1({var : 'p' , value : e.target.value})}}
          input={<BootstrapInput />}
        >
          <option aria-label="Primary Skills" value="Primary Skills" />
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
          onChange={(e) => {jobApplicationHandler1({var : 's' , value : e.target.value})}}
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
          onChange={(e) => {jobApplicationHandler1({var : 'emp' , value : e.target.value})}}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="Emp Type" />
          <option value={'FULL_TIME'}>FULL_TIME</option>
          <option value={'PART_TIME'}>PART_TIME</option>
        </NativeSelect>
      </FormControl>
      <FormControl >
        <InputLabel htmlFor="demo-customized-select-native">Exp</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={(e) => {jobApplicationHandler1({var : 'exp' , value : e.target.value})}}
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
       
          {jobApp.length > 0
            ? jobApp.map((e: any) => {
                return (
                  <div className={styles.card} key={e.id}>
                    <div className='p-1'>
                      <div className={styles.cardUP}>
                        <div>
                          <img
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'
                            alt='card'
                            height={50}
                          />
                        </div>
                        <div className={styles.cardName}>
                          <p className={styles.cardPName}>{e?.title}</p>
                          <p className={styles.cardPYear}>
                            {e?.company?.companyName}
                          </p>
                        </div>
                      </div>
                      <div className={styles.Tech}>
                        <p className={styles.cardPYear}>
                          P :{' '}
                          {primarySkillsHandler(e?.primaryAndSecondarySkills)}
                        </p>
                        <p className={styles.cardPYear}>
                          S :{' '}
                          {secondarySkillsHandler(e?.primaryAndSecondarySkills)}
                        </p>
                      </div>
                      <div className={styles.details}>
                        <p className={styles.pNoMargin}>
                          <strong>Exp:</strong>{' '}
                          {e?.minExperienceInYears
                            ? e?.minExperienceInYears
                            : 0}
                          -
                          {e?.maxExperienceInYears
                            ? e?.maxExperienceInYears
                            : 1}{' '}
                          years
                        </p>
                        <p>{e?.jobDescription}</p>
                      </div>
                    <PrimaryButton text='Apply' method={() => applyForJobHandler(e.humanResourceId ,e.id )}/>
                    </div>
                  </div>
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
    </>
  );
};

export default Jobs;