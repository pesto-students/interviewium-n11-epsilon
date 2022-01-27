import styles from "./index.module.scss";
import PrimaryButton from "../../widgets/PrimaryButton";
import SearchField from "widgets/SearchTextField";
import React, { createRef, useEffect, useState } from "react";
import * as Yup from 'yup';
import {
  sportApi
} from "_store/apis/_allApi";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { Modal, Table } from "react-bootstrap";
import { searchUserDetails } from "_store/apis/accountDetailsAPI";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "_store/constants/index";
import { useDispatch, useSelector } from "react-redux";
import DynamicTablePagination from "../../widgets/DynamicTablePagination";
import { Change } from "types";
import { FormikProvider, useFormik } from "formik";
import NormalTextField from "widgets/NormalTextField";
import CheckboxField from "widgets/CheckboxField";
import { RootState } from "_store/reducer/rootReducer";
import SelectField from "widgets/SelectField";
import { activateDeactivateUser, getOngoingInterview, getSearchUsers } from "_store/apis/userManagementAPI";
import { LockIcon, Checkmark } from "../../utilities/images/icons/index";
import { setTimeout } from "timers";
import ModalComponent from "widgets/Modal";
import CsvDownload from 'react-json-to-csv'
import _ from "lodash";

const AllUserManagement = () => {
  const dispatch = useDispatch();
  const tableBodyRef = createRef<any>();
  const [modalShow, setModalShow] = useState(false);
  let [data, setData] = useState<any>();
  const [csvData, SetcsvData] = useState<any>()
  const [searchData, setSearchData] = useState("");
  const [modalInfo, setModalInfo] = React.useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [columnsNames] = useState(["Interviewee" , "Interviewer" , "Round" , "Reviews" , "Actions"]);
  let [rowsPerPage, setRowsPerPage] = useState(10);
  let [totalCount, setTotalCount] = useState(0);
  let [page, setPage] = useState(0);
  let [formRespMessage, setFormRespMessage] = useState({ message: "", statusCode: "" });
  let [checkedAll, setCheckedAll] = useState<boolean>(false)
  const [paginationData, setPaginationData] = useState<any>()

  const [sportsData, setSportsData] = useState([]);
  const [csvDownload, setCsvDownload] = useState(false)
  const [downloadData, setDownloadData] = useState()

  const searchUser = async (data) => {
     if(data) {
         try {
      // const payload = `offset=${0
      // }&limit=${100}&prefix=${searchData}`;
     
      const apiData = await searchUserDetails(data);
      const { body, status }: any = apiData;

      if (status === 200) {
        setSportsData(body.items)
        setPaginationData(body)
        setCsvDownload(true)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
      }
   
  };

  const onChangeSearchValue = (data) => {
    setSearchData(data)
    if (data === "") {
      getUsers('');
    } else {
      searchUser(data);
    }
    console.log(searchData);
  };

  useEffect(() => {
    getUsers('')
  }, [])


  const getUsers = async (params) => {
    try {
      let data
      if (params === '') {
        data = await getOngoingInterview();
      } else {
        data = await getSearchUsers(params);
      }
      let { body , status }: any = data;
      status = 200
      if (status === 200) {
        setSportsData(body)
        // setPaginationData(body)
        // csvDataDownload(body.meta.totalItems)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  const csvDataDownload = async (limit) => {
    try {
      data = await getSearchUsers(`limit=${limit}`);
      const { body , status }: any = data;
      if (status === 200) {
        setCsvDownload(true)
        SetcsvData(body?.items)
        let result : any= body.items.map(({ userId , sharpSportId , profileUrl, ...rest }) => rest)  
        setDownloadData(result)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };
  const activateDeactivateUserHandler = async (userId , isActive) => {
    try {
      let payload = {
        userId : userId , 
        isActive : !isActive
      }
      const data = await activateDeactivateUser(payload);
      const { body }: any = data;
      if (body.statusCode === 200) {
        getUsers('')
        setModalShow(false);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  const hideModal = () => {
    setModalShow(!modalShow);
    // setFormRespMessage({ message: "", statusCode: "" })
    // formik.resetForm()
  };

  const createSport = () => setModalShow(true);

  const handleChangePage = (change: Change) => {
    let payload = change.split('?')[1]
    getUsers(payload)
  };

  const handleChangeRowsPerPage = (value) => {
    rowsPerPage = parseInt(value.item);
    setRowsPerPage(rowsPerPage);
    page = 0;
    setPage(0);
  };
  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Name is Required')
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const data = await sportApi(values);
        const { body }: any = data;
        if (body.statusCode === 200) {
          setFormRespMessage(body)
        }
        if (body.statusCode === 201 || body.statusCode === 400) {
          setFormRespMessage(body)
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const addInterviewer = () => {
    setModalShow(!modalShow)
    setModalInfo({
      modalIdentity : 'addInterviewer',
      apiCall : activateDeactivateUserHandler
    })
  }

  const conformationActivateDeactivate = (userId , isActive, username) => {
    setModalInfo({
      modalIdentity : 'ActiveUser',
      apiCall : activateDeactivateUserHandler
    })
    setData({userId : userId, isActive : isActive, username : username})
    hideModal()
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <ModalComponent 
        show = {modalShow}
        onHideModal = {hideModal}
        onHide = {hideModal}
        modalInfo = {modalInfo}
        data={data}
        />
        <h5 className={styles.mainTitle}>Verdit and Feedback</h5>
      </div>
      <div className={styles.users_table_background}>
        <TableContainer className={styles.users_table_container}>
          <Table className={`${styles.users_table}`} aria-label="users table">
            <TableHead className={styles.users_table_head}>
              <TableRow>
                {/* Check all disable foe now */}
                {/* <TableCell><CheckboxField value={checkedAll} handleChange={checkboxAllCheck} /></TableCell> */}
                {/* <TableCell>Action</TableCell> */}
                {columnsNames.map((item, index) => (
                  <TableCell key={index}>
                    <TableSortLabel>{item}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRef} className={styles.users_table_body}>
              {sportsData && sportsData.map(({ interviewRoundNumber ,  interviewerVerdict ,interviewee , interviewer, id  } : any) => (
                <TableRow className={`${styles.users_table_row}`} key={id}>
                  {/* <TableCell><CheckboxField name={sportId}value={checked} handleChange={handleCheckbox} /></TableCell> */}
                  {/* <TableCell>{sportId}</TableCell> */}
                  <TableCell>{interviewee?.name}</TableCell>
                  <TableCell>{interviewer?.name} </TableCell>
                  <TableCell>{interviewRoundNumber}</TableCell>
                  <TableCell>{interviewerVerdict}</TableCell>
                  {/* <TableCell>
                      <div className="d-flex">
                      { isActive ? <div
                          className={`${styles.trash_icon_logo} ${styles.deletetip}`}
                          onClick={() => {conformationActivateDeactivate(userId , isActive, username)}}
                        >
                            <Checkmark className={`${styles.trash_icon}`} />
                          <span
                            className={
                              styles.tooltiptext + " " + styles.tooltiptop
                            }
                          >
                            Deactivate
                          </span>
                        </div> :
                        <div
                          className={`${styles.trash_icon_logo} ${styles.deletetip}`}
                        >
                          <LockIcon
                            className={`${styles.trash_icon}`}
                            onClick={() => {conformationActivateDeactivate(userId , isActive, username)}}
                          ></LockIcon>
                          <span
                            className={
                              styles.tooltiptext + " " + styles.tooltiptop
                            }
                          >
                            Activate
                          </span>
                        </div>}
                      </div>
                    </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <DynamicTablePagination
         rowsPerPage={rowsPerPage}
          paginationData={paginationData}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </div>
    </>
  );
};

export default AllUserManagement;
