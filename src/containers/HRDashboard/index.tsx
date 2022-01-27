import { JobAppication } from 'utilities/images/icons';
import styles from './index.module.scss';
import BarChart from 'react-bar-chart';
import {
  getDashBoardCard,
  getOngoingInterview,
  resentJobApplication,
  resentJobPosting,
  statsAPI,
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

const CustomerHome = () => {
  const dispatch = useDispatch();
  const [job, setJob] = useState<any>(0);
  const [onging, setOnging] = useState<any>(0);
  const [hired, setHired] = useState<any>(0);
  const [ongoingInterview, setOngoingInterview] = useState<any>();
  const [rows, setRows] = useState<any>();
  const [onGoing, setOnGoing] = useState<any>();
  const [statsData, setStatsData] = useState<any>();

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
          {text: 'Offers', value: body?.numberOfCandidatesOffered ? body?.numberOfCandidatesOffered : 1  }, 
          {text: 'Hires', value: body?.numberOfCandidatesHired ? body?.numberOfCandidatesHired : 0 } 
        ]
        setStatsData(stats);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
 
  const margin = {top: 20, right: 20, bottom: 30, left: 40};

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer1}>
          <div className={styles.greetings}>
            <div>Hello, Rushikesh 👋</div>
            <div>{onging} Ongoing Interviews</div>
          </div>
          <div className={styles.statsCardHolder}>
            <div className={styles.statsCard}>
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{job}</div>
                <div>Job Applications</div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{onging}</div>
                <div>Ongoing Interviews</div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <JobAppication />
              <div>
                <div className={styles.statsNumbers}>{hired}</div>
                <div>Candidates Hired</div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <div className={styles.onGoingPosition}>
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
                      rows.map(row => (
                        <TableRow key={row.name}>
                          <TableCell component='th' scope='row' align='center'>
                            <JobAppication /> {row.title}
                          </TableCell>
                          <TableCell align='center'>{row.postedAt}</TableCell>
                          <TableCell align='center'>
                            {row.numberOfJobApplicationsReceived}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.onGoingInterviews}>
              <TableContainer>
                <Table aria-label='simple table'>
                  <TableBody>
                    {onGoing &&
                      onGoing.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component='th' scope='row' align='center'>
                            <JobAppication /> {row.interviewer?.name} and {row.interviewee?.name}
                          </TableCell>
                          <TableCell align='center'>{row.interviewerVerdict}</TableCell>
                          <TableCell align='center'>
                            {row.interviewRoundNumber}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.disputes}></div>
          </div>
        </div>
        <div className={styles.subContainer2}>
          <div className={styles.rightBarUp}>
            {ongoingInterview &&
              ongoingInterview.map((e: any) => (
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
              ))}
          </div>
          <div className={styles.rightBarDown}>
         {statsData && <BarChart 
                  width={300}
                  height={200}
                  margin={margin}
                  data={statsData}
                 />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerHome;
