import styles from "./index.module.scss";
// import PrimaryButton from '../../../../widgets/PrimaryButton';
import SearchField from "widgets/SearchTextField";
import React, { createRef, useEffect } from "react";
import {
  getUserList,
  deleteUser,
  inviteUser,
} from "_store/apis/accountDetailsAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

import { Delete } from "../../../../utilities/images/icons";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import TablePaginationFooter from "widgets/TablePaginationFooter";
import { Change } from "types";
import PrimaryButton from "widgets/PrimaryButton";
import ModalComponent from "widgets/Modal";
import { useDispatch } from "react-redux";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "_store/constants";

const UserList = () => {
  const tableBodyRef = createRef<any>();
  const [id, setId] = React.useState("");
  let [userData, setUserData] = React.useState([]);
  const [searchData, setSearchData] = React.useState("");
  let [companyName, setCompanyName] = React.useState<any>("");
  // const [offSet] = React.useState(0);
  const [columnsNames] = React.useState([
    "#",
    "Name",
    "Email Id",
    "Role",
    "Action",
  ]);
  let [rowsPerPage, setRowsPerPage] = React.useState(10);
  let [page, setPage] = React.useState(0);
  let [totalCount, setTotalCount] = React.useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  let [successMessage, setSuccessMessage] = React.useState({});
  const [modalInfo, setModalInfo] = React.useState({});
  const [resetForm, setResetForm] = React.useState(false);

  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = location.pathname.substring(
      location.pathname.lastIndexOf("list/") + 5
    );
    const compName: any = location.state;
    setId(id);
    setCompanyName(compName);
    fetchUser(id);
  }, []);

  const fetchUser = async (id) => {
    try {
      const payload = `accountId=${id}&offset=${
        page * rowsPerPage
      }&limit=${rowsPerPage}&prefix=${""}`;
      const data = await getUserList(payload);
      let { status, body }: any = data;
      console.log(status);
      console.log(body);
      if (status === 200) {
        setUserData(body?.result?.items);
        setTotalCount(body?.result?.count);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const searchUser = async () => {
    try {
      const payload = `accountId=${id}&offset=${0
      }&limit=${100}&prefix=${searchData}`;
      const data = await getUserList(payload);
      const { status, body }: any = data;
      if (status === 200) {
        setUserData(body?.result?.items);
        setTotalCount(body?.result?.count);
        setPage(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeSearchValue = (e) => {
    let a = e?.target?.value;
    if (a === "") {
      fetchUser(id);
    } else {
      setSearchData(a);
    }
    console.log(searchData);
  };

  const getDisplayInitials = (companyName: string) => {
    console.log("companyName    ", companyName);
    let firstLetter = "";
    let secondLetter = "";
    let val = "##";
    if (companyName !== null) {
      firstLetter = companyName.charAt(0);
      secondLetter = companyName.includes(" ")
        ? companyName.substring(
            companyName.lastIndexOf(" ") + 1,
            companyName.lastIndexOf(" ") + 2
          )
        : "#";
      val = firstLetter + secondLetter;
    }
    return val.toUpperCase();
  };

  const handleChangePage = (change: Change) => {
    if (change === Change.increase && (page + 1) * rowsPerPage <= totalCount) {
      setPage(++page);
      fetchUser(id);
    } else if (change === Change.decrease) {
      setPage(--page);
      fetchUser(id);
    }
  };

  const handleChangeRowsPerPage = (value) => {
    rowsPerPage = parseInt(value.item);
    setRowsPerPage(rowsPerPage);
    setPage(0);
    fetchUser(id);
  };

  const deleteUserById = async (userId) => {
    try {
      const data = await deleteUser(userId);
      const { status }: any = data;
      if (status === 200) {
        setPage(0);
        fetchUser(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hideModal = () => {
    setModalShow(false);
    setTimeout(() => setSuccessModal(false), 300);
  };

  const inviteUserHandler = async (value) => {
    try {
      const payload = {
        accountId: id,
        email: value["email"],
        name: value["name"],
      };
      const data = await inviteUser(payload);
      const { status, body }: any = data;
      if (status === 200) {
        setSuccessModal(true);
        setResetForm(true);
        setSuccessMessage({
          title: "Success!",
          message: `An invitation has been sent to ${value.name}`,
        });
        console.log(body);
        setPage(0);
        fetchUser(id);
        dispatch({
          type: SUCCESS_MESSAGE,
          payload:
            body?.detail === undefined
              ? "Successfully registered"
              : body?.detail,
        });
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  const inviteUserFromParent = () => {
    setModalShow(true);
    setModalInfo({
      modalIdentity: "inviteUser",
      apiCall: inviteUserHandler,
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <ModalComponent
          show={modalShow}
          modalInfo={modalInfo}
          onHideModal={hideModal}
          onHide={hideModal}
          success={successModal}
          resetForm={resetForm}
          companyName={companyName}
          successMessage={successMessage}
        />
        <h1 className={styles.title}>
          <Link to="/account" className={styles.acc_link}>
            Account
          </Link>{" "}
          / {companyName} User List
        </h1>
        <div className="d-flex justify-content-between">
          {userData.length !== 0 || searchData.length !== 0 ? (
            <>
              <div className={styles.accountSearch}>
                <SearchField
                  placeholder="Search"
                  type="search"
                  name="name"
                  onKeyPress={() => searchUser()}
                  onPress={() => searchUser()}
                  onHandelChange={onChangeSearchValue}
                />
              </div>
              <div className={styles.createAccbtn}>
                <div className={styles.createAccbtn}>
                  <PrimaryButton
                    text={"Invite User"}
                    method={() => inviteUserFromParent()}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
         
        </div>
      </div>
      {userData.length !== 0 || searchData.length !== 0 ? (
        <>
          <div className={styles.users_table_background}>
            <TableContainer className={styles.users_table_container}>
              <Table
                className={`${styles.users_table}`}
                aria-label="users table"
              >
                <TableHead className={styles.users_table_head}>
                  <TableRow>
                    {columnsNames.map((item, index) => (
                      <TableCell key={index}>
                        <TableSortLabel>{item}</TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody
                  ref={tableBodyRef}
                  className={styles.users_table_body}
                >
                  {userData.map(({ email, name, role, userId }, index) => (
                    <TableRow
                      className={`${styles.users_table_row}`}
                      key={index}
                    >
                      <TableCell>
                        {index + page * rowsPerPage < 9
                          ? "0" + (index + page * rowsPerPage + 1)
                          : index + page * rowsPerPage + 1}
                      </TableCell>
                      <TableCell>
                        <div className={styles.userNameCircle}>
                          <span className={styles.user_name_logo}>
                            {getDisplayInitials(name)}
                          </span>
                          <span className={styles.user_name}>{name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{role}</TableCell>
                      <TableCell>
                        <div className="d-flex">
                          <div
                            className={`${styles.trash_icon_logo} ${styles.deletetip}`}
                          >
                            <Delete
                              className={`${styles.trash_icon}`}
                              onClick={() => deleteUserById(userId)}
                            ></Delete>
                            <span
                              className={
                                styles.tooltiptext + " " + styles.tooltiptop
                              }
                            >
                              Delete
                            </span>
                          </div>
                          {/* <Tooltip title="Delete" placement="top-start" arrow>
                            <div
                              className={`${styles.trash_icon_logo}`}
                            
                            >
                              <Delete
                                className={`${styles.trash_icon}`}
                              ></Delete>
                            </div>
                          </Tooltip> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePaginationFooter
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[
                { item: "10" },
                { item: "20" },
                { item: "30" },
              ]}
              count={userData.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              totalCountRows={totalCount}
            />
          </div>
        </>
      ) : (
        <div className={styles.norecordMain}>
          <div className={styles.noRecordsFound}>
            <div style={{textAlign:"center"}}>No Records Found</div>
          <PrimaryButton
              className="mt-3"
              text={"Invite User"}
              method={() => inviteUserFromParent()}
            /></div>
        </div>
      )}
    </>
  );
};

export default UserList;
