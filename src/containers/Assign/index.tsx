import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  assignIntervieweeToInterviewer,
  getAllInterviewersForAssign,
  resentJobPosting,
  waitingForAssignment,
} from '_store/apis/userManagementAPI';
import { ERROR_MESSAGE } from '_store/constants/message';
import styles from './index.module.scss';
import IntervieweeCard from './intervieweeCard';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import InterviewerCard from './interviewerCard';

const CustomerHome = () => {
  const dispatch = useDispatch();
  const [interviewee, setInterviewee] = useState<any>([]);
  const [interviewer, setInterviewer] = useState<any>([]);
  const [dropppedInto, setDropppedInto] = useState();

  useEffect(() => {
    recentJobPosting();
    getAllInterviewers()
  }, []);

  const recentJobPosting = async () => {
    try {
      let data;
      data = await waitingForAssignment();
      let { body, status }: any = data;

      if (status === 200) {
        setInterviewee(body);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
  const getAllInterviewers = async () => {
    try {
      let data;
      data = await getAllInterviewersForAssign();
      let { body, status }: any = data;

      if (status === 200) {
        setInterviewer(body);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const getAllInassignterviewers = async (humanResourceId,
    intervieweeId,
    jobId,
    id,) => {
    try {
       let payload ={
        intervieweeId: intervieweeId,
        interviewerId: id,
        jobId: jobId,
        humanResourceId: humanResourceId
    }
      let data = await assignIntervieweeToInterviewer(payload);
      let { body, status }: any = data;

      if (status === 200) {
        setInterviewer(body);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  return (
    <React.Fragment>
      <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
          <h4>Interviewee List</h4>
        <div className={styles.interviewee}>
          {interviewee.length > 0 ? (
            interviewee.map((a) => (
              <IntervieweeCard id={a}/>
            ))
          ) : (
            <div className='align-items-center justify-content-center'>
              All Interviewees Assigned
            </div>
          )}
        </div>
        <h4>Interviewer List</h4>
        <div className={styles.interviewer}>
          {interviewer.length > 0 ? (
            interviewer.map(( a) => (
              <InterviewerCard id={a} dragAndDrop={getAllInassignterviewers}/>
            ))
          ) : (
            <div className='align-items-center justify-content-center'>
              All Interviewees Assigned
            </div>
          )}
        </div>
      </div>
      </DndProvider>
    </React.Fragment>
  );
};

export default CustomerHome;
