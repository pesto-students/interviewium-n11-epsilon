import { JobAppication } from 'utilities/images/icons';
import styles from './index.module.scss';
import BarChart from 'react-bar-chart';
import {
    getDashBoardCardInterviewer,
  getOngoingInterview,
  interviewsTodayList,
  calendlyLinkHandler,
  resentJobPosting,
} from '_store/apis/userManagementAPI';
import { ERROR_MESSAGE } from '_store/constants';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { link } from '../../utilities/yupObjects';
import NormalTextField from 'widgets/NormalTextField';
import PrimaryButton from 'widgets/PrimaryButton';

const CustomerHome = () => {
  const dispatch = useDispatch();
    const [today, setToday] = useState<any>(0);
    const [sheduled, setSheduled] = useState<any>(0);
    const [reviewAwaiting, setReviewAwaiting] = useState<any>(0);
  const [ongoingInterview, setOngoingInterview] = useState<any>();
  const [rows, setRows] = useState<any>();
  const [onGoing, setOnGoing] = useState<any>();
  const [calendly, setCalendly] = useState();
  const data = [
    { text: 'Man', value: 5 },
    { text: 'Woman', value: 1 },
  ];

  useEffect(() => {
    getUsers();
    recentJobHandler();
    calendlyLink()
    recentJobPosting();
    ongoingInterviewHandler();
  }, []);

  const getUsers = async () => {
    try {
      let data;
      data = await getDashBoardCardInterviewer();

      let { body, status }: any = data;
      
      if (status === 200) {
        setToday(body.interviewsToday);
        setSheduled(body.scheduledInterviews);
        setReviewAwaiting(body.waitingForReview);
        // setPaginationData(body)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const recentJobHandler = async () => {
    try {
      let data;
      data = await interviewsTodayList();
      let { body, status }: any = data;
      
      if (status === 200) {
        setRows(body);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
  const calendlyLink = async () => {
    try {
      let data;
      data = await calendlyLinkHandler();
      let { body, status }: any = data;
      
      if (status === 200) {
        setCalendly(body);
        formik.values.name = body
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
  const recentJobPosting = async () => {
    try {
      let data;
      data = await resentJobPosting();
      let { body, status }: any = data;
      
      if (status === 200) {
        // setOngoingInterview(body);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const ongoingInterviewHandler = async () => {
    try {
      let data;
      data = await getOngoingInterview();
      let { body, status }: any = data;
      
      if (status === 200) {
        setOnGoing(body);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data1 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,4],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [1,2,4],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

const postJobSchema = Yup.object().shape({
    name: link,
  })
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: postJobSchema,
    onSubmit: async (values) => {
    console.log(values)
  }});

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer1}>
          <div className={styles.greetings}>
            <div>Hello, Rushikesh 👋</div>
            <div>You have {today    } interviews Today</div>
          </div>
          <div className={styles.statsCardHolder}>
            <div className={styles.statsCard}>
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{today}</div>
                <div>Interviews For Today</div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{sheduled}</div>
                <div>Scheduled Interviews</div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{reviewAwaiting}</div>
                <div >Awaiting Review</div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <div className={styles.onGoingPosition}>
                <div className={styles.interviewToday}>3 Interviews Today</div>
              <TableContainer>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>Job Title</TableCell>
                      <TableCell align='center'>Posted On</TableCell>
                      <TableCell align='center'>
                        Number of Job Application
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows &&
                      rows.map((row, index ) => (
                        <TableRow key={index}>
                          <TableCell component='th' scope='row' align='center'>
                            <JobAppication /> {row.job?.title}
                          </TableCell>
                          <TableCell align='center'>{row.interviewDateTime}</TableCell>
                          <TableCell align='center'>
                            {row.joiningLink}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className={styles.panel}>
            <div className='d-flex align-items-center justify-content-center' style={{width : '100%'}}>
            <NormalTextField
                      error={formik.errors.name}
                      touched={formik.touched.name}
                      placeholder='Link'
                      name='name'
                      type='text'
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    <PrimaryButton text='Edit' />
            </div>
            <div></div>
          </div>
        </div>
        <div className={styles.subContainer2}>
        
          <div className={styles.rightBarDown}>
          {/* <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [1552, 1319, 613, 1400],
                // Color of each bar
                backgroundColor: ["aqua", "green", "red", "yellow"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
        /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerHome;
