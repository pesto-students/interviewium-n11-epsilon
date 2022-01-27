import styles from "./index.module.scss";
import React, { createRef, useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { Table } from "react-bootstrap";
import { ERROR_MESSAGE } from "_store/constants/index";
import { useDispatch } from "react-redux";
import {  getApplicationDashboardData } from "_store/apis/userManagementAPI";

const AllUserManagement = () => {
  const dispatch = useDispatch();
  const tableBodyRef = createRef<any>();
  const [columnsNames] = useState(["Job Title and Company" , "Shortlisting Status" , "Time Till Shortlisting" , "Calendly" ]);
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      let data
        data = await getApplicationDashboardData();
      let { body , status }: any = data;
      status = 200
      if (status === 200) {
        setSportsData(body)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className={styles.mainTitle}>Application Dashboard</h5>
      </div>
      <div className={styles.users_table_background}>
        <TableContainer >
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                {columnsNames.map((item, index) => (
                  <TableCell key={index}>
                    <TableSortLabel>{item}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRef} >
              {sportsData && sportsData.map(({ currentInterviewRound ,  createdAt ,shortlistedAt , job, id , currentInterviewer } : any) => (
                <TableRow className={`${styles.users_table_row}`} key={id}>
                  <TableCell>{job?.title} ({job?.company?.companyName})</TableCell>
                  <TableCell>{shortlistedAt} </TableCell>
                  <TableCell>{createdAt}</TableCell>
                  <TableCell>{currentInterviewer?.calendlyLink ? currentInterviewer?.calendlyLink : "Yet to be Assinged"} (ongoing Round {currentInterviewRound})</TableCell>
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
