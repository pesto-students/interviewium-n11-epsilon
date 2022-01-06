import styles from "./index.module.scss";
import PrimaryButton from "../../../widgets/PrimaryButton";
import SearchField from "widgets/SearchTextField";
import React, { createRef, useEffect } from "react";
import ModalComponent from "widgets/Modal";
import {
  allAccountDetails,
  inviteUser,
  searchAccountDetails,
} from "_store/apis/accountDetailsAPI";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { Table } from "react-bootstrap";
import {
  InviteUser,
} from "../../../utilities/images/icons";
import { createAccount } from "_store/apis/accountDetailsAPI";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "_store/constants/index";
import { useDispatch } from "react-redux";
import TablePaginationFooter from "../../../widgets/TablePaginationFooter";
import { Change } from "types";

const AccountInfo = () => {
  const tableBodyRef = createRef<any>();
  const [modalShow, setModalShow] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [searchData, setSearchData] = React.useState("");
  let [companyName, setCompanyName] = React.useState("");
  const [modalInfo, setModalInfo] = React.useState({});
  const [successModal, setSuccessModal] = React.useState(false);
  const [resetForm, setResetForm] = React.useState(false);
  // const [offSet] = React.useState(0);
  const [columnsNames] = React.useState(["#", "Name", "Sub Domain", "Action"]);
  let [rowsPerPage, setRowsPerPage] = React.useState(10);
  let [totalCount, setTotalCount] = React.useState(0);
  let [page, setPage] = React.useState(0);
  let [inviteUserId, setInviteUserId] = React.useState('');
  let [successMessage, setSuccessMessage] = React.useState({});
  let colors: any = [
    "#E15858",
    "#9367B4",
    "#5CB65F",
    "#51C2D8",
    "#9367B4",
    "#EF6637",
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const payload = `offset=${page * rowsPerPage}&limit=${rowsPerPage}`;
      const data = await allAccountDetails(payload);
      const { status, body }: any = data;
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
      const payload = `offset=${0
      }&limit=${100}&prefix=${searchData}`;
      const data = await searchAccountDetails(payload);
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
      fetchUser();
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
        : "";
      val = firstLetter + secondLetter;
    }
    return val.toUpperCase();
  };

  // const openUserList = (companyName: string, id: string) => {
  //   setCompanyName(companyName);
  //   history.push(
  //     `${path.UserList.substring(0, path.UserList.lastIndexOf("/"))}/${id}`,
  //     companyName
  //   );
  // };

  // const openInvitationList = (companyName: string, id: string) => {
  //   setCompanyName(companyName);
  //     history.push(
  //     `${path.InvitationList.substring(0, path.InvitationList.lastIndexOf("/"))}/${id}`, companyName
  //   );  
  // };

  const createAccountHandler = async (value) => {
    try {
      const payload = {
        name: value["accountName"],
        subdomain: value["subDomain"],
      };
      const data = await createAccount(payload);
      const { status, body }: any = data;
      if (status === 200) {
        if (body?.status === 200) {
          setSuccessModal(true);
          setResetForm(true);
          console.log(body);
          fetchUser();
          setSuccessMessage({
            title: "Done",
            message: "Account has been created successfully.",
          });
          dispatch({
            type: SUCCESS_MESSAGE,
            payload:
              body?.detail === undefined
                ? "Successfully registered"
                : body?.detail,
          });
        } else if (body?.Status === 500) {
          dispatch({
            type: ERROR_MESSAGE,
            payload: "Domain Already Registered",
          });
        }
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: "Something went wrong" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  const inviteUserHandler = async (value) => {
    console.log('inviteUserId = '+ inviteUserId)
    try {
      const payload = {
        accountId: inviteUserId,
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

  const hideModal = () => {
    setModalShow(false);
    setTimeout(() => setSuccessModal(false), 300);
  };

  const inviteUserClicked = (companyName, id) => {
    setModalInfo({
      modalIdentity: "inviteUser",
      apiCall: inviteUserHandler,
    });
    inviteUserId = id;
    setInviteUserId(id);
    setCompanyName(companyName);
    setModalShow(true);
  };
  const createAccountClicked = () => {
    setModalInfo({
      modalIdentity: "createAccount",
      apiCall: createAccountHandler,
    });
    setModalShow(true);
  };

  const handleChangePage = (change: Change) => {
    if (change === Change.increase && (page + 1) * rowsPerPage <= totalCount) {
      setPage(++page);
      fetchUser();
    } else if (change === Change.decrease) {
      setPage(--page);
      fetchUser();
    }
  };

  const handleChangeRowsPerPage = (value) => {
    rowsPerPage = parseInt(value.item);
    setRowsPerPage(rowsPerPage);
    page = 0;
    setPage(0);
    fetchUser();
  };

  let a: any = 0;
  const randomColorHandler = () => {
    if (a === 5) {
      a = 0;
    }
    return a++;
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* TODO :: ADD success */}
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

        <h5 className={styles.mainTitle}>Account</h5>

        {/* <PrimaryButton
          // className={styles.header_add_button}
          className="w-50"
          text={"+ Invite User(temp)"}
          method={() => {
            inviteUserClicked();
          }}
        /> */}
        <div className="d-flex justify-content-between">
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
            <PrimaryButton
              text={"+ Create Account"}
              method={() => {
                createAccountClicked();
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.users_table_background}>
        <TableContainer className={styles.users_table_container}>
          <Table className={`${styles.users_table}`} aria-label="users table">
            <TableHead className={styles.users_table_head}>
              <TableRow>
                {columnsNames.map((item, index) => (
                  <TableCell key={index}>
                    <TableSortLabel>{item}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody ref={tableBodyRef} className={styles.users_table_body}>
              {userData && userData.map(({ companyName, subDomain, id }, index) => (
                <TableRow className={`${styles.users_table_row}`} key={index}>
                  <TableCell>
                    {index + page * rowsPerPage < 9
                      ? "0" + (index + page * rowsPerPage + 1)
                      : index + page * rowsPerPage + 1}
                  </TableCell>
                  <TableCell>
                    <div className={styles.userNameCircle}>
                      <span
                        className={styles.user_name_logo}
                        style={{
                          backgroundColor: colors[randomColorHandler()],
                        }}
                      >
                        {getDisplayInitials(companyName)}
                      </span>
                      <span className={styles.user_name}>{companyName}</span>
                    </div>
                  </TableCell>

                  <TableCell>{subDomain}</TableCell>
                  <TableCell>
                    <div className="d-flex">
                      <div
                        className={`${styles.trash_icon_logo} ${styles.userlisttip}`}
                      >
                        {/* <AddProfile
                          className={`${styles.trash_icon}`}
                          onClick={() => openUserList(companyName, id)}
                        ></AddProfile> */}
                        <span
                          className={
                            styles.tooltiptext + " " + styles.tooltiptop
                          }
                        >
                          User List
                        </span>
                      </div>
                      <div
                        className={`${styles.trash_icon_logo} ${styles.invitetip}`}
                      >
                        <InviteUser
                          className={`${styles.trash_icon}`}
                          onClick={() => inviteUserClicked(companyName, id)}
                        ></InviteUser>
                        <span
                          className={
                            styles.tooltiptext + " " + styles.tooltiptop
                          }
                        >
                          Invite User
                        </span>
                      </div>
                      <div
                        className={`${styles.trash_icon_logo} ${styles.invitelisttip}`}
                      >
                        {/* <InvitationList
                          className={`${styles.trash_icon}`}
                          onClick={() => openInvitationList(companyName, id)}
                        ></InvitationList> */}
                        <span
                          className={
                            styles.tooltiptext + " " + styles.tooltiptop
                          }
                        >
                          Invitation List
                        </span>
                      </div>
                      
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePaginationFooter
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[{ item: "10" }, { item: "20" }, { item: "30" }]}
          count={userData.length}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          totalCountRows={totalCount}
        />
      </div>
    </>
  );
};

export default AccountInfo;
