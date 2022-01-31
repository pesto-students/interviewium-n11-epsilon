import { JobAppication } from 'utilities/images/icons';
import styles from './index.module.scss';
import BarChart from 'react-bar-chart';
import {
  getDashBoardCardInterviewer,
  getOngoingInterview,
  interviewsTodayList,
  calendlyLinkHandler,
  resentJobPosting,
  statsAPIInterviewer,
  postLink,
} from '_store/apis/userManagementAPI';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '_store/constants/message';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { link } from '../../utilities/yupObjects';
import NormalTextField from 'widgets/NormalTextField';
import PrimaryButton from 'widgets/PrimaryButton';
import { Skeleton } from '@material-ui/lab';
import ImageLinkCreator from 'utilities/util';

const CustomerHome = () => {
  const dispatch = useDispatch();
  const [today, setToday] = useState<any>('-');
  const [sheduled, setSheduled] = useState<any>('-');
  const [reviewAwaiting, setReviewAwaiting] = useState<any>('-');
  const [ongoingInterview, setOngoingInterview] = useState<any>();
  const [rows, setRows] = useState<any>([]);
  const [onGoing, setOnGoing] = useState<any>();
  const [calendly, setCalendly] = useState();
  const [statsData, setStatsData] = useState<any>();
  const [editLink, setEditLink] = useState(true);

  useEffect(() => {
    getUsers();
    recentJobHandler();
    calendlyLink();
    recentJobPosting();
    ongoingInterviewHandler();
    statsHandler();
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
        formik.values.name = body;
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

  const statsHandler = async () => {
    try {
      let data;
      data = await statsAPIInterviewer();
      let { body, status }: any = data;

      if (status === 200) {
        let stats = [
          {
            text: 'Interviews',
            value: body?.interviewsTaken ? body?.interviewsTaken : 1,
          },
          {
            text: 'Hires',
            value: body?.passedCandidatesCount
              ? body?.passedCandidatesCount
              : 0,
          },
        ];
        setStatsData(stats);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const postJobSchema = Yup.object().shape({
    name: link,
  });
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: postJobSchema,
    onSubmit: async values => {
      console.log(values);
    },
  });

  const editLinkHandler = async () => {
    try {
      let payload = {
        calendlyLink: formik.values.name,
      };
      let data = await postLink(payload);
      let { status }: any = data;
      if (status === 200) {
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Link Updated' });
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const editHandler: any = () => {
    if (editLink) {
      setEditLink(false);
    } else {
      editLinkHandler();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer1}>
          <div className={styles.greetings}>
            <div>Hello, Rushikesh 👋</div>
            <div>You have {today} interviews Today</div>
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
                <div>Awaiting Review</div>
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
                    {rows.length > 0
                      ? rows.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell
                              component='th'
                              scope='row'
                              align='center'
                            >
                              <JobAppication /> {row.job?.title}
                            </TableCell>
                            <TableCell align='center'>
                              {row.interviewDateTime}
                            </TableCell>
                            <TableCell align='center'>
                              <ImageLinkCreator link={row.joiningLink} />
                            </TableCell>
                          </TableRow>
                        ))
                      : [1, 2, 3].map(() => (
                          <TableRow>
                            <TableCell
                              component='th'
                              scope='row'
                              align='center'
                            >
                              <Skeleton variant='text' />
                            </TableCell>
                            <TableCell align='center'>
                              <Skeleton variant='text' />
                            </TableCell>
                            <TableCell align='center'>
                              <Skeleton variant='text' />
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className={styles.panel}>
            <div
              className='d-flex align-items-center justify-content-center'
              style={{ width: '100%' }}
            >
              <NormalTextField
                error={formik.errors.name}
                touched={formik.touched.name}
                placeholder='Link'
                name='name'
                type='text'
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.name}
                disabled={editLink}
              />
              <PrimaryButton
                text={editLink ? 'Edit' : 'Update'}
                method={editHandler}
              />
            </div>
            <div></div>
          </div>
        </div>
        <div className={styles.subContainer2}>
          <div className={styles.rightBarUp}></div>
          <div className={styles.rightBarDown}>
            {statsData && (
              <BarChart
                width={300}
                height={200}
                margin={margin}
                data={statsData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerHome;
