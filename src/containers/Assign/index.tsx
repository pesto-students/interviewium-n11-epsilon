import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  resentJobPosting,
  waitingForAssignment,
} from '_store/apis/userManagementAPI';
import { ERROR_MESSAGE } from '_store/constants';
import styles from './index.module.scss';

const CustomerHome = () => {
  const dispatch = useDispatch();
  const [interviewee, setInterviewee] = useState<any>([]);

  useEffect(() => {
    recentJobPosting();
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

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.interviewee}>
          {interviewee.length > 0 ? (
            interviewee.map(() => (
              <div className={styles.card}>
                <div className={styles.cardUP}>
                  <div>
                    <img
                      src='https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png'
                      alt='card'
                      height={50}
                    />
                  </div>
                  <div className={styles.cardName}>
                    <p className={styles.cardPName}>Rushikesh Ladke</p>
                    <p className={styles.cardPYear}>6 Years</p>
                  </div>
                </div>
                <div className={styles.Tech}>
                  <p className={styles.cardPYear}>
                    P : React, React Native, JavaScript
                  </p>
                  <p className={styles.cardPYear}>S : Node.</p>
                </div>
                <div className={styles.details}>
                  <p className={styles.pNoMargin}>
                    <strong>Exp:</strong> 0-2 years
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className='align-items-center justify-content-center'>
              All Interviewees Assigned
            </div>
          )}
        </div>
        <div className={styles.interviewer}>
          <div className={styles.interviewee}>
            <div className={styles.cardInterviewer}>
              <div className={styles.cardUP}>
                <div>
                  <img
                    src='https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png'
                    alt='card'
                    height={50}
                  />
                </div>
                <div className={styles.cardName}>
                  <p className={styles.cardPName}>Rushikesh Ladke</p>
                </div>
              </div>
              <div className={styles.Tech}>
                <p className={styles.cardPYear}>
                  P : React, React Native, JavaScript
                </p>
                <p className={styles.cardPYear}>S : Node.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerHome;
