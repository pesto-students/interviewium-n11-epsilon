import styles from './index.module.scss';
import PrimaryButton from '../../widgets/PrimaryButton';
import React, { createRef, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { sportApi } from '_store/apis/_allApi';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { Modal, Table } from 'react-bootstrap';
import { searchUserDetails } from '_store/apis/accountDetailsAPI';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '_store/constants/index';
import { useDispatch, useSelector } from 'react-redux';
import { Change } from 'types';
import { FormikProvider, useFormik } from 'formik';
import {
  activateDeactivateUser,
  getAllUsers,
  getSearchUsers,
  inviteInterviewer,
} from '_store/apis/userManagementAPI';
import ModalComponent from 'widgets/Modal';
import { Skeleton } from '@material-ui/lab';

const AllUserManagement = () => {
  const dispatch = useDispatch();
  const tableBodyRef = createRef<any>();
  const [modalShow, setModalShow] = useState(false);
  let [data, setData] = useState<any>();
  const [csvData, SetcsvData] = useState<any>();
  const [searchData, setSearchData] = useState('');
  const [modalInfo, setModalInfo] = React.useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [columnsNames] = useState([
    'Name',
    'Email',
    'Availability',
    'On Boarding',
    'Reviews Pending',
    // 'Actions',
  ]);
  let [rowsPerPage, setRowsPerPage] = useState(10);
  let [totalCount, setTotalCount] = useState(0);
  let [page, setPage] = useState(0);
  let [formRespMessage, setFormRespMessage] = useState({
    message: '',
    statusCode: '',
  });
  let [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<any>();

  const [sportsData, setSportsData] = useState([]);
  const [csvDownload, setCsvDownload] = useState(false);
  const [downloadData, setDownloadData] = useState();

  const searchUser = async data => {
    if (data) {
      try {
        // const payload = `offset=${0
        // }&limit=${100}&prefix=${searchData}`;

        const apiData = await searchUserDetails(data);
        const { body, status }: any = apiData;

        if (status === 200) {
          setSportsData(body.items);
          setPaginationData(body);
          setCsvDownload(true);
        } else {
          dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
      }
    }
  };

  const onChangeSearchValue = data => {
    setSearchData(data);
    if (data === '') {
      getUsers('');
    } else {
      searchUser(data);
    }
    console.log(searchData);
  };

  useEffect(() => {
    getUsers('');
  }, []);

  const getUsers = async params => {
    try {
      let data;
      if (params === '') {
        data = await getAllUsers();
      } else {
        data = await getSearchUsers(params);
      }
      let { body, status }: any = data;
      ;
      if (status === 200) {
        setSportsData(body);
        // setPaginationData(body)
        // csvDataDownload(body.meta.totalItems)
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const csvDataDownload = async limit => {
    try {
      data = await getSearchUsers(`limit=${limit}`);
      const { body, status }: any = data;
      if (status === 200) {
        setCsvDownload(true);
        SetcsvData(body?.items);
        let result: any = body.items.map(
          ({ userId, sharpSportId, profileUrl, ...rest }) => rest
        );
        setDownloadData(result);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };
  const activateDeactivateUserHandler = async (email) => {
    try {
      let payload = {
        "email": localStorage.getItem('email'),
        "interviewerEmail": email
    }
      const data = await inviteInterviewer(payload);
      const { body }: any = data;
      if (body.statusCode === 200) {
        getUsers('');
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Interviewer Added' });
        setModalShow(false)
      } else {
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Interviewer Added' });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
    }
  };

  const hideModal = () => {
    setModalShow(!modalShow);
    // setFormRespMessage({ message: "", statusCode: "" })
    // formik.resetForm()
  };

  const createSport = () => setModalShow(true);

  const handleChangePage = (change: Change) => {
    let payload = change.split('?')[1];
    getUsers(payload);
  };

  const handleChangeRowsPerPage = value => {
    rowsPerPage = parseInt(value.item);
    setRowsPerPage(rowsPerPage);
    page = 0;
    setPage(0);
  };
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        const data = await sportApi(values);
        const { body }: any = data;
        if (body.statusCode === 200) {
          setFormRespMessage(body);
        }
        if (body.statusCode === 201 || body.statusCode === 400) {
          setFormRespMessage(body);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const addInterviewer = () => {
    setModalShow(!modalShow);
    setModalInfo({
      modalIdentity: 'addInterviewer',
      apiCall: activateDeactivateUserHandler,
    });
  };

  const conformationActivateDeactivate = (userId, isActive, username) => {
    setModalInfo({
      modalIdentity: 'ActiveUser',
      apiCall: activateDeactivateUserHandler,
    });
    setData({ userId: userId, isActive: isActive, username: username });
    hideModal();
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <ModalComponent
          show={modalShow}
          onHideModal={hideModal}
          onHide={hideModal}
          modalInfo={modalInfo}
          data={data}
        />
        <h5 className={styles.mainTitle}>Interviewers</h5>
        <div className='d-flex justify-content-around'>
          <div className={styles.accountSearch}>
            <PrimaryButton
              text='Add Interviewer'
              method={() => {
                addInterviewer();
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.users_table_background}>
        <TableContainer>
          <Table aria-label='users table'>
            <TableHead>
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
            <TableBody ref={tableBodyRef}>
              {sportsData.length > 0
                ? sportsData.map((data: any, index) => (
                    <TableRow
                      className={`${styles.users_table_row}`}
                      key={index}
                    >
                      <TableCell>{data.interviewer?.name}</TableCell>
                      <TableCell>{data.interviewer?.email} </TableCell>
                      <TableCell >{data.interviewer?.active ? <span className={styles.greenDot}></span> : <span className={styles.redDot}></span>}</TableCell>
                      <TableCell >{!data.interviewer?.onboarded ? <span className={styles.greenDot}></span> : <span className={styles.redDot}></span>}</TableCell>
                      <TableCell>
                        {data.interviewer?.numberOfInterviewReviewsPending}
                      </TableCell>
                    </TableRow>
                  ))
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
