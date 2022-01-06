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
import { activateDeactivateUser, getAllLeaderBoardData, getAllUsers, getSearchUsers } from "_store/apis/userManagementAPI";
import { LockIcon, Checkmark } from "../../utilities/images/icons/index";
import { setTimeout } from "timers";
import ModalComponent from "widgets/Modal";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const tableBodyRef = createRef<any>();
  const [modalShow, setModalShow] = useState(false);
  let [data, setData] = useState<any>();
  const [searchData, setSearchData] = useState("");
  const [modalInfo, setModalInfo] = React.useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [columnsNames] = useState(["Name" , "Is Certified Sharp" , "Winning Percentage" , ' Wins/Loss', 'Ranking' , "Top Sport"]);
  let [rowsPerPage, setRowsPerPage] = useState(10);
  let [totalCount, setTotalCount] = useState(0);
  let [page, setPage] = useState(0);
  let [formRespMessage, setFormRespMessage] = useState({ message: "", statusCode: "" });
  let [checkedAll, setCheckedAll] = useState<boolean>(false)
  const [paginationData, setPaginationData] = useState<any>()

  const [leaderBoard, setLeaderBoard] = useState([]);
  const [asc, setAsc] = useState(true)

  const searchUser = async (data) => {
    try {
      // const payload = `offset=${0
      // }&limit=${100}&prefix=${searchData}`;
      const apiData = await searchUserDetails(data);
      const { body, status }: any = apiData;
      if (status === 200) {
        setLeaderBoard(body.items)
        setPaginationData(body)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  const onChangeSearchValue = (data) => {
    setSearchData(data)
    if (data === "") {
      getLeaderBoard("");
    } else {
      searchUser(data);
    }
    console.log(searchData);
  };

  useEffect(() => {
    getLeaderBoardHandler('')
  }, [])

  const getLeaderBoardHandler = async (e) => {
    try {
      let data = e
      data = await getAllLeaderBoardData('ASC');
    
      const { body , status }: any = data;
      if (status === 200) {
        setLeaderBoard(body.response)
        // setPaginationData(response)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  const getLeaderBoard = async (e) => {
    try {
      let data = e
      let param = !asc ? "ASC" : "DESC"
      data = await getAllLeaderBoardData(param);
    
      const { body , status }: any = data;
      if (status === 200) {
        setLeaderBoard(body.response)
        // setPaginationData(response)
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
        getLeaderBoard('')
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
    getLeaderBoard(payload)
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
        <h5 className={styles.mainTitle}>Leader Board</h5>
        <div className="d-flex justify-content-between">
          <div className={styles.accountSearch}>
          </div>

        </div>
        <PrimaryButton
              text={ asc ? "ASC" : "DESC"}
              method={() => {
                setAsc(!asc)
                getLeaderBoard('')
              }}
              disabled={false}
            />
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
              {leaderBoard && leaderBoard.map(({ username ,isCertifiedSharp , winningPercent, wins , losses, ranking , sport }, index) => (
                <TableRow className={`${styles.users_table_row}`} key={index}>
                  {/* <TableCell><CheckboxField name={sportId}value={checked} handleChange={handleCheckbox} /></TableCell> */}
                  {/* <TableCell>{sportId}</TableCell> */}
                  <TableCell>{username}</TableCell>
                  <TableCell>{isCertifiedSharp ? 'Yes' : 'No'} </TableCell>
                  <TableCell>{winningPercent}</TableCell>
                  <TableCell>{wins + '/' + losses}</TableCell>
                  <TableCell>{ranking}</TableCell>
                  <TableCell>{sport ? sport : 'NA'}</TableCell>
                </TableRow>
              )) }
              {leaderBoard.length === 0 && <p style={{margin : "200px 600px" , position: 'absolute'}}>No data</p>}
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

export default LeaderBoard;
