import styles from './index.module.scss';
import PrimaryButton from '../../widgets/PrimaryButton';
import SearchField from 'widgets/SearchTextField';
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
import { Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { searchUserDetails } from '_store/apis/accountDetailsAPI';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '_store/constants/index';
import { useDispatch, useSelector } from 'react-redux';
import DynamicTablePagination from '../../widgets/DynamicTablePagination';
import { Change } from 'types';
import { FormikProvider, useFormik } from 'formik';
import NormalTextField from 'widgets/NormalTextField';
import CheckboxField from 'widgets/CheckboxField';
import { RootState } from '_store/reducer/rootReducer';
import SelectField from 'widgets/SelectField';
import {
  activateDeactivateUser,
  getInterviewsWithVerditAPI,
  getOngoingInterview,
  getSearchUsers,
  postVerdit,
} from '_store/apis/userManagementAPI';
import { LockIcon, Checkmark } from '../../utilities/images/icons/index';
import { setTimeout } from 'timers';
import ModalComponent from 'widgets/Modal';
import CsvDownload from 'react-json-to-csv';
import _ from 'lodash';
import { Skeleton } from '@material-ui/lab';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

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
    'Interviewee',
    'Interviewer',
    'Round',
    'Reviews',
    'Actions',
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
  const [verditAPi, setVerditAPi] = useState({
    intervieweeId: 'ckyja42ia0454ioi5ipry1p7i',
    jobId: 'ckyjjbe8100068bi5ezoe2d0i',
    interviewRoundNumber: 4,
  });

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
      getUsers();
    } else {
      searchUser(data);
    }
    console.log(searchData);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      let data;
      data = await getInterviewsWithVerditAPI();
      let { body, status }: any = data;
      status = 200;
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
  const postVerditHandler = async (params: any) => {
    try {
      let payload = {
        intervieweeId: verditAPi.intervieweeId,
        jobId: verditAPi.jobId,
        interviewerVerdict: params?.accountName ? 'PASSED' : 'FAILED',
        interviewerReview: params?.subDomain,
        interviewRoundNumber: verditAPi.interviewRoundNumber,
      };
      let data = await postVerdit(payload);
      let { body, status }: any = data;
      if (status === 200) {
        getUsers();
        dispatch({ type: SUCCESS_MESSAGE, payload: 'Verdict Posted' });
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
  const activateDeactivateUserHandler = async (userId, isActive) => {
    try {
      let payload = {
        userId: userId,
        isActive: !isActive,
      };
      const data = await activateDeactivateUser(payload);
      const { body }: any = data;
      if (body.statusCode === 200) {
        getUsers();
        setModalShow(false);
      } else {
        dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
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
    getUsers();
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

  const addInterviewer = (interviewee: any, job, interviewRoundNumber: any) => {
    setVerditAPi({
      intervieweeId: interviewee,
      jobId: job,
      interviewRoundNumber: interviewRoundNumber,
    });
    setModalShow(!modalShow);
    setModalInfo({
      modalIdentity: 'verdit',
      apiCall: postVerditHandler,
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
        <h5 className={styles.mainTitle}>Verdit and Feedback</h5>
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
                      interviewRoundNumber,
                      interviewerVerdict,
                      interviewee,
                      job,
                      id,
                    }: any) => (
                      <TableRow
                        className={`${styles.users_table_row}`}
                        key={id}
                      >
                        <TableCell>{interviewee?.name}</TableCell>
                        <TableCell>{job?.title} </TableCell>
                        <TableCell>{interviewRoundNumber}</TableCell>
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
                        <TableCell className={styles.lastColumn}>
                          <div className='d-flex'>
                                <div
                                  className={`${styles.trash_icon_logo} ${styles.deletetip}`}
                                >
                                  <AssistantPhotoIcon
                                    className={`${styles.trash_icon} `}
                                    onClick={() =>
                                      addInterviewer(
                                        interviewee?.id,
                                        job?.id,
                                        interviewRoundNumber
                                      )
                                    }
                                  />
                                  {
                                    <span
                                      className={
                                        styles.tooltiptext +
                                        ' ' +
                                        styles.tooltiptop
                                      }
                                    >
                                      view
                                    </span>
                                  }
                                </div>
                                <div
                                  className={`${styles.trash_icon_logo} ${styles.deletetip}`}
                                ></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )
                : [1, 2, 3].map(() => (
                    <TableRow>
                      <TableCell component='th' scope='row' align='center'>
                        <Skeleton variant='text' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='text' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='text' />
                      </TableCell>
                      <TableCell align='center'>
                        <Skeleton variant='text' />
                      </TableCell>
                      <TableCell align='center'>
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
