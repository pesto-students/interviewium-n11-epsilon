import { JobAppication } from 'utilities/images/icons';
import styles from './index.module.scss';
import BarChart from 'react-bar-chart';
import {
  getDashBoardCardInterviewee,
  getOngoingInterview,
  interviewsTodayList,
  hotJobAPI,
  recentShortList,
  statsAPIInterviewee,
} from '_store/apis/userManagementAPI';
import { ERROR_MESSAGE } from '_store/constants/message';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Paper,
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
import HotJob from '../../utilities/images/hotJob.jpg';
import Hiring from '../../utilities/images/hiring.jpg';
import { Skeleton } from '@material-ui/lab';
import { dateConverter, ImageLinkCreator } from 'utilities/util';
import { useHistory } from 'react-router-dom';
import { path } from 'pageRoutes/routers';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const CustomerHome = () => {
  const dispatch = useDispatch();
  const [today, setToday] = useState<any>('-');
  const [sheduled, setSheduled] = useState<any>('-');
  const [reviewAwaiting, setReviewAwaiting] = useState<any>('-');
  const [ongoingInterview, setOngoingInterview] = useState<any>();
  const [rows, setRows] = useState<any>([]);
  const [onGoing, setOnGoing] = useState<any>();
  const [hotJob, setHotJob] = useState<any>();
  const [statsData, setStatsData] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    getUsers();
    hotJobHandler();
    statsHandler();
    recentJobHandler();
  }, []);

  const getUsers = async () => {
    try {
      let data;
      data = await getDashBoardCardInterviewee();

      let { body, status }: any = data;

      if (status === 200) {
        setToday(body.numberOfJobsApplied);
        setSheduled(body.numberOfShortlistsReceived);
        setReviewAwaiting(body.numberOfOngoingInterviews);
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
      data = await recentShortList();
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

  const hotJobHandler = async () => {
    try {
      let data;
      data = await hotJobAPI();
      let { body, status }: any = data;

      if (status === 200) {
        setHotJob(body);
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
      data = await statsAPIInterviewee();
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer1}>
          <div className={styles.greetings}>
            <div>Hello {localStorage.getItem('email')?.split('@')[0]} 👋</div>
            <div>You have {today} interviews Today</div>
          </div>
          <div className={styles.statsCardHolder}>
            <div
              className={styles.statsCard}
              style={{ color: 'chocolate' }}
              onClick={() => {
                history.push(path.ApplicationDashboard);
              }}
            >
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{today}</div>
                <div>Jobs Applied</div>
              </div>
            </div>
            <div
              className={styles.statsCard}
              style={{ color: 'darkgoldenrod' }}
              onClick={() => {
                history.push(path.InterviewFeedback);
              }}
            >
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{sheduled}</div>
                <div>Job Shortlists</div>
              </div>
            </div>
            <div
              className={styles.statsCard}
              style={{ color: 'yellowgreen' }}
              onClick={() => {
                history.push(path.ApplicationDashboard);
              }}
            >
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{reviewAwaiting}</div>
                <div>Ongoing Interviews</div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <div className={styles.interviewToday}>
              {today} Interviews Today
            </div>
            <div className={styles.onGoingPosition}>
              <Paper style={{ maxHeight: 300 }}>
                <TableContainer style={{ maxHeight: 300 }}>
                  <Table aria-label='sticky table' stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>Job Title</TableCell>
                        <TableCell align='center'>Company</TableCell>
                        <TableCell align='center'>Interview Mapping</TableCell>
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
                                {row?.job?.company?.companyName}
                              </TableCell>
                              <TableCell align='center'>
                                {row.interviewerMappingDone === true ? (
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id='tooltip-disabled'>
                                        Mapping Done
                                      </Tooltip>
                                    }
                                  >
                                    <span className={styles.greenDot}></span>
                                  </OverlayTrigger>
                                ) : (
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id='tooltip-disabled'>
                                        Mapping in Progress
                                      </Tooltip>
                                    }
                                  >
                                    <span className={styles.redDot}></span>
                                  </OverlayTrigger>
                                )}
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
              </Paper>
            </div>
          </div>
          {hotJob && (
            <div className={styles.panel}>
              <div className={styles.hotJob}>
                <img src={HotJob} alt='HotJob' height={150} />
              </div>
              <div className={styles.hotJob1}>
                <div>
                  <img src={Hiring} alt='HotJob' height={80} />
                </div>
                <div>
                  <p>{hotJob[0].title}</p>
                  <p>{hotJob[0].company}</p>
                  <p>
                    Exp. {hotJob[0].minExperience} to {hotJob[0].maxExperience}{' '}
                    years
                  </p>
                </div>
              </div>
            </div>
          )}
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
