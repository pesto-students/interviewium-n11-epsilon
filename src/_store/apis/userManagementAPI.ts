import {
  useraddsingle,
  useraddmultiple,
  userlist,
  userlistactionsstatussingle,
  hotJobEndpoint,
  waitingForAssignmentEndpoint,
  getDashboardCardsInterviewer,
  getAllInterviewers,
  userlistactionsstatusmultiple,
  userdeletesingle,
  userdeletemultiple,
  userlistfilter,
  userlistsearch,
  userinvitemultiple,
  users,
  reports,
  deleteCommentAPI,
  leaderBoard,
  getDashboardCards,
  recentApplication,
  recentJob,
  getOngoingInterviews,
  interviewToday,
  interviewerProfile,
  interviewsTodayEndpoint,
  calendlyLinkEndpoint,
  statsEndpoint,
  jobApplicants,
  statsInterviewerEndpoint,
  getInterviewsWithVerditEndpoint,
  getDashboardCardsIntervieweeEndpoint,
  statsIntervieweeEndpoint,
  allJobsEndpoint,
  applicationDashboardEndpoint,
  feedbackEndpoint,
} from './urls';
import api from './api';

export const useraddsingleAPI = async (user: Object) => {
  try {
    return await api
      .post(useraddsingle, user)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const useraddmultipleAPI = async (users: Object) => {
  try {
    return await api
      .post(useraddmultiple, users)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const userlistAPI = async (value: Object) => {
  try {
    return await api
      .post(userlist, value)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const userlistactionsstatussingleAPI = async (value: Object) => {
  try {
    return await api
      .post(userlistactionsstatussingle, value)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const userlistactionsstatusmultipleAPI = async (value: Object) => {
  try {
    return await api
      .post(userlistactionsstatusmultiple, value)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const userdeletesingleAPI = async (value: Object) => {
  try {
    return await api
      .post(userdeletesingle, value)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const userdeletemultipleAPI = async (value: Object) => {
  try {
    return await api
      .post(userdeletemultiple, value)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const userlistfilterAPI = async (value: Object) => {
  try {
    return await api
      .post(userlistfilter, value)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const userlistsearchAPI = async (value: Object) => {
  try {
    return await api
      .post(userlistsearch, value)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const userinvitemultipleAPI = async (value: Object) => {
  try {
    return await api
      .post(userinvitemultiple, value)
      .then(response => {
        console.log('~~~ 1 last');
        return { status: response?.status, body: response?.data };
      })
      .catch(err => {
        return { status: err.response?.status, body: err?.response?.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const activateDeactivateUser = async (payload: any) => {
  try {
    return await api
      .put(`${users}/${payload.userId}/${payload.isActive}`)
      .then(response => {
        console.log('~~~ 1 last');
        return { status: response?.status, body: response?.data };
      })
      .catch(err => {
        return { status: err.response?.status, body: err?.response?.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const deleteComment = async (payload: any) => {
  try {
    return await api
      .delete(`${deleteCommentAPI}/${payload}`)
      .then(response => {
        return { status: response?.status, body: response?.data };
      })
      .catch(err => {
        return { status: err.response?.status, body: err?.response?.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};

export const getAllUsers = async () => {
  try {
    return await api
      .get(`${getAllInterviewers}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getDashBoardCard = async () => {
  try {
    return await api
      .get(`${getDashboardCards}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getDashBoardCardInterviewer = async () => {
  try {
    return await api
      .get(`${getDashboardCardsInterviewer}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getDashBoardCardInterviewee = async () => {
  try {
    return await api
      .get(`${getDashboardCardsIntervieweeEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getOngoingInterview = async () => {
  try {
    return await api
      .get(`${getOngoingInterviews}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getInterviewsWithVerditAPI = async () => {
  try {
    return await api
      .get(`${getInterviewsWithVerditEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getApplicationDashboardData = async () => {
  try {
    return await api
      .get(`${applicationDashboardEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getFeedbacksData = async () => {
  try {
    return await api
      .get(`${feedbackEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const statsAPI = async () => {
  try {
    return await api
      .get(`${statsEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const statsAPIInterviewer = async () => {
  try {
    return await api
      .get(`${statsInterviewerEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const statsAPIInterviewee = async () => {
  try {
    return await api
      .get(`${statsIntervieweeEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const interviewersProfile = async () => {
  try {
    return await api
      .get(`${interviewerProfile}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const previousInterview = async () => {
  try {
    return await api
      .get(`${getOngoingInterviews}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const interviewsToday = async () => {
  try {
    return await api
      .get(`${interviewToday}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const resentJobApplication = async () => {
  try {
    return await api
      .get(`${recentApplication}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const interviewsTodayList = async () => {
  try {
    return await api
      .get(`${interviewsTodayEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const calendlyLinkHandler = async () => {
  try {
    return await api
      .get(`${calendlyLinkEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const hotJobAPI = async () => {
  try {
    return await api
      .get(`${hotJobEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const resentJobPosting = async () => {
  try {
    return await api
      .get(`${recentJob}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const waitingForAssignment = async () => {
  try {
    return await api
      .get(`${waitingForAssignmentEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getJobApplicants = async () => {
  try {
    return await api
      .get(`${jobApplicants}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const allJobs = async () => {
  try {
    return await api
      .get(`${allJobsEndpoint}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const postJobForHR = async (payload: any) => {
  try {
    return await api
      .put(`/api/humanResource/job`, payload)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const postVerdit = async (payload: any) => {
  try {
    return await api
      .put(`/api/interviewer/updateVerdictAndReview`, payload)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const postLink = async (payload: any) => {
  try {
    return await api
      .put(`api/interviewer/calendlyLink/sundar@google.com`, payload)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const inviteInterviewer = async (payload: any) => {
  try {
    return await api
      .post(`api/humanResource/inviteInterviewer`, payload)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const inviteInterviewee = async (payload: any) => {
  try {
    return await api
      .post(`/api/humanResource/inviteInterviewee`, payload)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};

export const getSearchUsers = async payload => {
  try {
    return await api
      .get(`${users}` + `?${payload}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};

export const getReports = async () => {
  try {
    return await api
      .get(`${reports}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
export const getSearchReports = async params => {
  try {
    return await api
      .get(`${reports}` + `?${params}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};

export const getAllLeaderBoardData = async param => {
  try {
    return await api
      .get(`${leaderBoard}` + `${param}`)
      .then(response => {
        return { status: response.status, body: response.data };
      })
      .catch(err => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: 'Failed to connect' };
  }
};
