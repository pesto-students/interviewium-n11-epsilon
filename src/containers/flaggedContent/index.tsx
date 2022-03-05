/* eslint-disable react-hooks/rules-of-hooks */
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
import { createAccount } from "_store/apis/accountDetailsAPI";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "_store/constants/index";
import { useDispatch, useSelector } from "react-redux";
import TablePaginationFooter from "../../widgets/TablePaginationFooter";
import { Change } from "types";
import { FormikProvider, useFormik } from "formik";
import NormalTextField from "widgets/NormalTextField";
import CheckboxField from "widgets/CheckboxField";
import { RootState } from "_store/reducer/rootReducer";
import SelectField from "widgets/SelectField";
import { activateDeactivateUser, deleteComment, getAllUsers, getReports, getSearchReports } from "_store/apis/userManagementAPI";
import { EditI, Delete, LockIcon, Checkmark } from "../../utilities/images/icons/index";
import DynamicTablePagination from "widgets/DynamicTablePagination";
import ModalComponent from "widgets/Modal";

const userReports = () => {
  const dispatch = useDispatch();
  const tableBodyRef = createRef<any>();
  const [modalShow, setModalShow] = useState(false);
  let [data, setData] = useState<any>([]);
  const [searchData, setSearchData] = useState("");
  const [modalInfo, setModalInfo] = React.useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [columnsNames] = useState(["Reported By" , "Report Whom " , "Content" , "Reason" ,  "Date & Time" ]);
  let [rowsPerPage, setRowsPerPage] = useState(10);
  let [totalCount, setTotalCount] = useState(0);
  let [page, setPage] = useState(0);
  let [formRespMessage, setFormRespMessage] = useState({ message: "", statusCode: "" });
  let [checkedAll, setCheckedAll] = useState<boolean>(false)
  const [paginationData, setPaginationData] = useState<any>()
  const [commentId, setCommentId] = useState('')

  const [reportsData, setReportsData] = useState([]);
  
  useEffect(() => {
    getAllReports("")
  }, [])

  
  const getAllReports = async (params) => {
    try {
      let data
      if (params === '') {
        data = await getReports();
      } else {
        data = await getSearchReports(params);
      }
      let { body ,status }: any = data;
      
      if (status === 200) {
        let payload = body.items.filter(data => data.reportType !== "Author")
        setReportsData(payload)
        setPaginationData(body)
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
    setFormRespMessage({ message: "", statusCode: "" })
    formik.resetForm()
  };

  const createSport = () => setModalShow(true);

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
  const handleCheckbox = (e) => {
    const { checked, name } = e.target;
    const newData = data.map(ele => ({ ...ele, checked: (ele.sportId === name) ? checked : ele.checked }))
    setData(newData);
    setCheckedAll(newData.every(item => item.checked))
    console.log(checked)
  }
  const checkboxAllCheck = (e) => {
    const { checked } = e.target;
    const newData = data.map(ele => ({ ...ele, checked }))
    setData(newData);
    setCheckedAll(newData.every(item => item.checked))
  }

  const activateDeactivateUserHandler = async (userId , isActive) => {
    try {
      let payload = {
        userId : userId , 
        isActive : !isActive
      }
      const data = await activateDeactivateUser(payload);
      const { body }: any = data;
      if (body.statusCode === 200) {
        getAllReports('')
        setModalShow(false);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };
  const deleteCommentHandler = async () => {
    try {
     
      const data = await deleteComment(commentId);
      const { body }: any = data;
      if (body.statusCode === 200) {
        getAllReports('')
        setModalShow(false);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  const splitDateAndTime = (date) => {
    let split = date.split("T")
    let time = split[1].split('.')
    return split[0] + ' , '+ time[0]
  }

  const handleChangePage = (change: Change) => {
    let payload = change.split('?')[1]
    getAllReports(payload)
  };

  const conformationActivateDeactivate = (userId , isActive, username) => {
    setModalInfo({
      modalIdentity : 'ActiveUser',
      apiCall : activateDeactivateUserHandler
    })
    setData({userId : userId, isActive : isActive, username : username})
    hideModal()
  }
  const conformationDeleteComment = (id) => {
    setModalInfo({
      modalIdentity : 'ActiveUser',
      apiCall : deleteCommentHandler
    })
    setCommentId(id)
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
      
        <h5 className={styles.mainTitle}>Flagged Content</h5>
        <div className="d-flex justify-content-between">
          <div className={styles.accountSearch}>
            {/* <SearchField
              placeholder="Search"
              type="search"
              name="name"
              onKeyPress={() => searchUser()}
              onPress={() => searchUser()}
              onHandelChange={onChangeSearchValue}
            /> */}
          </div>

        </div>
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
              {reportsData && reportsData.map(({   reportReason , reportedByUsername ,  createdAt , reportedToUserName , content}, index) => (
                <TableRow className={`${styles.users_table_row}`} key={index}>
                  {/* <TableCell><CheckboxField name={sportId}value={checked} handleChange={handleCheckbox} /></TableCell> */}
                  {/* <TableCell>{sportId}</TableCell> */}
                  <TableCell>{reportedByUsername} </TableCell>
                  <TableCell>{reportedToUserName} </TableCell>
                  <TableCell>{content ? content : 'null'}</TableCell>
                  <TableCell>{reportReason}</TableCell>
                  <TableCell>{splitDateAndTime(createdAt)}</TableCell>
                  {/* <TableCell>
                      <div className="d-flex">
                      { reportedToUserIsActive ? <div
                          className={`${styles.trash_icon_logo} ${styles.deletetip}`}
                          onClick={() => {conformationActivateDeactivate(reportedId , reportedToUserIsActive, 'ReportedUSER')}}
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
                            onClick={() => {conformationActivateDeactivate(reportedId , reportedToUserIsActive, 'ReportedUSER')}}
                          ></LockIcon>
                          <span
                            className={
                              styles.tooltiptext + " " + styles.tooltiptop
                            }
                          >
                            Activate
                          </span>
                        </div>}
                        <div
                          className={`${styles.trash_icon_logo} ${styles.deletetip}`}
                        >
                          <LockIcon
                            className={`${styles.trash_icon}`}
                            onClick={() => {conformationDeleteComment(reportedId)}}
                          ></LockIcon>
                          <span
                            className={
                              styles.tooltiptext + " " + styles.tooltiptop
                            }
                          >
                            Delete Comment 
                          </span>
                        </div>
                      </div>
                    </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DynamicTablePagination
         rowsPerPage={rowsPerPage}
          paginationData={paginationData}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default userReports;
