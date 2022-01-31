import styles from './index.module.scss';
import React, { createRef, useEffect, useState } from 'react';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { ERROR_MESSAGE } from '_store/constants/index';
import { useDispatch } from 'react-redux';
import { getFeedbacksData } from '_store/apis/userManagementAPI';
import { Skeleton } from '@material-ui/lab';
import { Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { dateConverter } from 'utilities/util';

const AllUserManagement = () => {
  const dispatch = useDispatch();
  const tableBodyRef = createRef<any>();
  const [columnsNames] = useState([
    'Company Name',
    'Interviewer',
    'Date and Time',
    'Interviewer Verdict',
    'Interviewer Review',
  ]);
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      let data;
      data = await getFeedbacksData();
      let { body, status }: any = data;
      status = 200;
      if (status === 200) {
        setSportsData(body);
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
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h5 className={styles.mainTitle}>Feedbacks</h5>
      </div>
      <div className={styles.users_table_background}>
        <TableContainer>
          <Table aria-label='users table'>
            <TableHead>
              <TableRow>
                {columnsNames.map((item, index) => (
                  <TableCell key={index}>
                    <TableSortLabel>{item}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRef}>
              {sportsData.length > 0
                ? sportsData.map(
                    ({
                      interviewerVerdict,
                      interviewerReview,
                      interviewDateTime,
                      id,
                    }: any) => (
                      <TableRow
                        className={`${styles.users_table_row}`}
                        key={id}
                      >
                        <TableCell>Google</TableCell>
                        <TableCell>Rushikesh Ladke</TableCell>
                        <TableCell>{dateConverter(interviewDateTime)}</TableCell>
                        <TableCell>
                          {interviewerVerdict == 'PASSED' ? (
                            <OverlayTrigger
                              overlay={
                                <Tooltip id='tooltip-disabled'>
                                  {interviewerVerdict}!
                                </Tooltip>
                              }
                            >
                              <span className={styles.greenDot}></span>
                            </OverlayTrigger>
                          ) : interviewerVerdict == 'UNDECIDED' ? (
                            <OverlayTrigger
                              overlay={
                                <Tooltip id='tooltip-disabled'>
                                  {interviewerVerdict}!
                                </Tooltip>
                              }
                            >
                              <span className={styles.greyDot}></span>
                            </OverlayTrigger>
                          ) : (
                             <OverlayTrigger
                              overlay={
                                <Tooltip id='tooltip-disabled'>
                                  {interviewerVerdict}!
                                </Tooltip>
                              }
                            >
                            <span className={styles.redDot}></span>
                                                        </OverlayTrigger>
                          )}
                        </TableCell>
                        <TableCell>{interviewerReview}</TableCell>
                      </TableRow>
                    )
                  )
                : [1, 2, 3, 4].map(() => (
                    <TableRow className={`${styles.users_table_row}`}>
                      <TableCell>
                        <Skeleton variant='text' />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant='text' />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant='text' />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant='text' />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant='text' />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AllUserManagement;
