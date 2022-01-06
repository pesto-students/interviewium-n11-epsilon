import styles from "./index.module.scss";
import { Link, useLocation } from "react-router-dom";
import SearchField from "widgets/SearchTextField";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { Table } from "react-bootstrap";
import React, { createRef, useEffect } from "react";
import { ResendInvitation } from "../../../../utilities/images/icons";
import {
  getInvitationList,
  inviteUser,
  resendInvitation,
} from "_store/apis/accountDetailsAPI";
import TablePaginationFooter from "widgets/TablePaginationFooter";
import { Change } from "types";
import moment from "moment";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "_store/constants";
import { useDispatch } from "react-redux";
import PrimaryButton from "widgets/PrimaryButton";
import ModalComponent from "widgets/Modal";

const InvitationList = () => {
  const [columnsNames] = React.useState([
    "#",
    "Name",
    "Email Id",
    "Expiry date",
    "Action",
  ]);
  const tableBodyRef = createRef<any>();
  const [invitationData, setInvitationData] = React.useState([]);
  const [id, setId] = React.useState("");
  const [searchData, setSearchData] = React.useState("");
  let [rowsPerPage, setRowsPerPage] = React.useState(10);
  let [page, setPage] = React.useState(0);
  let [totalCount, setTotalCount] = React.useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState({});
  const [successModal, setSuccessModal] = React.useState(false);
  const [resetForm, setResetForm] = React.useState(false);
  let [successMessage, setSuccessMessage] = React.useState({});
  let [companyName, setCompanyName] = React.useState<any>("");
  let colors: any = [
    "#E15858",
    "#9367B4",
    "#5CB65F",
    "#51C2D8",
    "#9367B4",
    "#EF6637",
  ];
  
  let location = useLocation();
  let dispatch = useDispatch();
  useEffect(() => {
    const id = location.pathname.substring(
      location.pathname.lastIndexOf("list/") + 5
    );
    setId(id);
    const compName: any = location.state;
    setCompanyName(compName);
    fetchInviteList(id);
  }, []);
  const fetchInviteList = async (id) => {
    try {
      const payload = `accountId=${id}&offset=${
        page * rowsPerPage
      }&limit=${rowsPerPage}&prefix=${""}`;
      const data = await getInvitationList(payload);
      let { status, body }: any = data;
      console.log(status);
      console.log(body);
      if (status === 200) {
        setInvitationData(body?.results?.items);
        setTotalCount(body?.results?.count);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getDisplayInitials = (empName: string) => {
    let firstLetter = "";
    let secondLetter = "";
    let val = "##";
    if (empName !== null) {
      firstLetter = empName.charAt(0);
      secondLetter = empName.includes(" ")
        ? empName.substring(
            empName.lastIndexOf(" ") + 1,
            empName.lastIndexOf(" ") + 2
          )
        : "";
      val = firstLetter + secondLetter;
    }
    return val.toUpperCase();
  };
  const searchUser = async () => {
    try {
      const payload = `accountId=${id}&offset=${0
      }&limit=${100}&prefix=${searchData}`;
      const data = await getInvitationList(payload);
      const { status, body }: any = data;
      if (status === 200) {
        setInvitationData(body?.results?.items);
        setTotalCount(body?.results?.count);
        setPage(0);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangeSearchValue = (e) => {
    let a = e?.target?.value;
    if (a === "") {
      fetchInviteList(id);
    } else {
      setSearchData(a);
    }
    console.log(searchData);
  };

  const handleChangePage = (change: Change) => {
    if (change === Change.increase && (page + 1) * rowsPerPage <= totalCount) {
      setPage(++page);
      fetchInviteList(id);
    } else if (change === Change.decrease) {
      setPage(--page);
      fetchInviteList(id);
    }
  };
  const handleChangeRowsPerPage = (value) => {
    rowsPerPage = parseInt(value.item);
    setRowsPerPage(rowsPerPage);
    setPage(0);
    fetchInviteList(id);
  };
  const sendInviteToUser = async (invitationId) => {
    try {
      const data = await resendInvitation(invitationId);
      const { status, body }: any = data;
      if (status === 200) {
        if (body?.status === "Success") {
          dispatch({
            type: SUCCESS_MESSAGE,
            payload: "Invitation sent successfully.",
          });
        }
      } else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Unable to send invitation.",
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: ERROR_MESSAGE,
        payload: "Something went wrong.",
      });
    }
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
        fetchInviteList(id);
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
              ? "Invitation Send Successfully"
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
  const inviteUserFromParent = () => {
    setModalShow(true);
    setModalInfo({
      modalIdentity: "inviteUser",
      apiCall: inviteUserHandler,
    });
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
        <h1 className={styles.title}><Link to='/account' className={styles.acc_link}>Account /</Link> Invitation List</h1>
        <div className="d-flex justify-content-between">
          {invitationData && invitationData.length !== 0 || searchData.length !== 0 ? (<>
            <div className={styles.accountSearch}>
              <SearchField
                placeholder="Search"
                type="search"
                name="name"
                onKeyPress={() => searchUser()}
                onPress={() => searchUser()}
                onHandelChange={onChangeSearchValue}
                className={styles.search_field}
              />
            </div>
            <div className={styles.createAccbtn}>
              <PrimaryButton
                text={"Invite User"}
                method={() => inviteUserFromParent()}
              />
            </div>
          </>) : (
            ''
          )}
        </div>
      </div>
      {invitationData.length !== 0 || searchData.length !== 0 ? (
        <>
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
                  {invitationData.map(({ invitationId, email, name, expiryDate }, index) => (
                    <TableRow className={`${styles.users_table_row}`} key={index}>
                      <TableCell>
                        {(index + (page * rowsPerPage)) < 9 ? "0" + (index + (page * rowsPerPage) + 1) : index + (page * rowsPerPage) + 1}
                      </TableCell>
                      <TableCell>
                        <div className={styles.userNameCircle}>
                          <span className={styles.user_name_logo}
                            style={{
                              backgroundColor: colors[randomColorHandler()],
                            }}
                          >
                            {getDisplayInitials(name)}
                          </span>
                          <span className={styles.user_name}>{name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{moment(expiryDate).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>
                        <div className="d-flex">
                          <div
                            className={`${styles.trash_icon_logo} ${styles.invitetip}`}
                          >
                            <ResendInvitation
                              className={`${styles.trash_icon}`}
                              onClick={() => sendInviteToUser(invitationId)}
                            ></ResendInvitation>
                            <span
                              className={
                                styles.tooltiptext + " " + styles.tooltiptop
                              }
                            >
                              Resend
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
              count={invitationData.length}
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
            {" "}
            No user found, click the below button to invite user
            <PrimaryButton
              className="mt-3"
              text={"Invite User"}
              method={() => inviteUserFromParent()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InvitationList;
