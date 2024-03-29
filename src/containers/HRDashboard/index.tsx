import { JobAppication ,
  ResentPosting,
  OngoingDash, HiredDash
 } from 'utilities/images/icons';
import styles from './index.module.scss';
import BarChart from 'react-bar-chart';
import {
  getDashBoardCard,
  getOngoingInterview,
  resentJobApplication,
  resentJobPosting,
  statsAPI,
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
import { Skeleton } from '@material-ui/lab';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { dateConverter } from 'utilities/util';
import { path } from 'pageRoutes/routers';
import { useHistory } from 'react-router-dom';

const CustomerHome = () => {
  const dispatch = useDispatch();
  const [job, setJob] = useState<any>('-');
  const [onging, setOnging] = useState<any>('-');
  const [hired, setHired] = useState<any>('-');
  const [ongoingInterview, setOngoingInterview] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);
  const [onGoing, setOnGoing] = useState<any>([]);
  const [statsData, setStatsData] = useState<any>();
  const history = useHistory();
  
  useEffect(() => {
    getUsers();
    recentJobHandler();
    recentJobPosting();
    ongoingInterviewHandler();
    statsHandler();
  }, []);

  const getUsers = async () => {
    try {
      let data;
      data = await getDashBoardCard();

      let { body, status }: any = data;

      if (status === 200) {
        setJob(body.numberOfJobApplications);
        setOnging(body.numberOfOngoingInterviews);
        setHired(body.numberOfCandidatesHired);
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
      data = await resentJobApplication();
      let { body, status }: any = data;

      if (status === 200) {
        setOngoingInterview(body);
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
        setRows(body);
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
      data = await statsAPI();
      let { body, status }: any = data;

      if (status === 200) {
        let stats = [
          {
            text: 'Offers',
            value: body?.numberOfCandidatesOffered
              ? body?.numberOfCandidatesOffered
              : 1,
          },
          {
            text: 'Hires',
            value: body?.numberOfCandidatesHired
              ? body?.numberOfCandidatesHired
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
            <div>Hello {localStorage.getItem('email')?.split('@')[0]}👋</div>
            <div style={{padding : '10px 21px 5px 10px'}}>{onging} Ongoing Interviews</div>
          </div>
          <div className={styles.statsCardHolder}>
            <div className={styles.statsCard} style={{color : 'chocolate'}}  onClick={() => {history.push(path.Jobs)}}>
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{job}</div>
                <div>Job Applications</div>
              </div>
            </div>
            <div className={styles.statsCard} style={{color : 'darkgoldenrod'}} onClick={() => {history.push(path.OngoingInterviews)}}>
              <OngoingDash />
              <div>
                <div className={styles.statsNumbers}>{onging}</div>
                <div>Ongoing Interviews</div>
              </div>
            </div>
            <div className={`${styles.statsCard} ${styles.noCursor}`} style={{color : 'yellowgreen'}} >
              <HiredDash />
              <div>
                <div className={styles.statsNumbers}>{hired}</div>
                <div>Candidates Hired</div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <div className={styles.interviewToday}>Recent Job Postings</div>
            <div className={styles.onGoingPosition}>
            <Paper style={{maxHeight : 250}}>
              <TableContainer style={{maxHeight : 250}}>
                <Table aria-label="sticky table" stickyHeader>
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
                      ? rows.map(row => (
                          <TableRow key={row.name}>
                            <TableCell
                              component='th'
                              scope='row'
                              align='center'
                            >
                              <ResentPosting /> {row.title}
                            </TableCell>
                            <TableCell align='center'>{dateConverter(row.postedAt)}</TableCell>
                            <TableCell align='center'>
                              {row.numberOfJobApplicationsReceived}
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
                             <ResentPosting /> <Skeleton variant='text' />
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
          <div className={styles.panel}>
            <div className={styles.ongoingInterviews}>Ongoing Interviews</div>
            <div className={styles.onGoingInterviews}>
            <Paper style={{maxHeight : 170}}>
              <TableContainer style={{maxHeight : 170}}>
                <Table aria-label="sticky table" stickyHeader>
                  <TableBody>
                    {onGoing.length > 0
                      ? onGoing.map(row => (
                          <TableRow key={row.id}>
                            <TableCell
                              component='th'
                              scope='row'
                              align='center'
                            >
                              <JobAppication /> {row.interviewer?.name} and{' '}
                              {row.interviewee?.name}
                            </TableCell>
                            <TableCell align='center'>
                          {row.interviewerVerdict == 'PASSED' ? (
                            <OverlayTrigger
                              overlay={
                                <Tooltip id='tooltip-disabled'>
                                  {row.interviewerVerdict}!
                                </Tooltip>
                              }
                            >
                              <span className={styles.greenDot}></span>
                            </OverlayTrigger>
                          ) : row.interviewerVerdict == 'UNDECIDED' ? (
                            <OverlayTrigger
                              overlay={
                                <Tooltip id='tooltip-disabled'>
                                  PENDING!
                                </Tooltip>
                              }
                            >
                              <span className={styles.greyDot}></span>
                            </OverlayTrigger>
                          ) : (
                             <OverlayTrigger
                              overlay={
                                <Tooltip id='tooltip-disabled'>
                                  {row.interviewerVerdict}!
                                </Tooltip>
                              }
                            >
                            <span className={styles.redDot}></span>
                                                        </OverlayTrigger>
                          )}
                              {}
                            </TableCell>
                            <TableCell align='center'>
                              {row.interviewRoundNumber}
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
        </div>
        <div className={styles.subContainer2}>
          <div className={styles.candidateRequests}>Candidate Requests</div>
          <div className={styles.rightBarUp}>
            {ongoingInterview.length > 0
              ? ongoingInterview.map((e: any) => (
                  <div className={styles.SLACard}>
                    <div className='d-flex'>
                      <JobAppication />
                      <div className='p-2'>
                        <div className={styles.onName}>{e.name}</div>
                        <div className={styles.onYears}>
                          {e.yearsOfExperience} years of experience
                        </div>
                      </div>
                    </div>
                    <div className={styles.onPSskills}>
                      {e.primaryAndSecondarySkills}
                    </div>
                  </div>
                ))
              : [1, 2, 6, 65].map(() => (
                  <div className={styles.SLACard}>
                    <div className='d-flex'>
                      <JobAppication />
                      <div className='p-2'>
                        <div className={styles.onName}>
                          {' '}
                          <Skeleton variant='text' />
                        </div>
                        <div className={styles.onYears}>
                          <Skeleton variant='text' />
                        </div>
                      </div>
                    </div>
                    <div className={styles.onPSskills}>
                      <Skeleton variant='text' />
                    </div>
                  </div>
                ))}
          </div>
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
