
// let baseURL = 'http://localhost:5000/' 
let baseURL = 'https://interviewium-backend.herokuapp.com/'
if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://api-dev.sharpz.app/'
}
const HRPersona = '/SetHR'
const HRInterviewer = '/SetInterviewer'
const HRInterviewee = '/SetInterviewee'

const getAllInterviewers = 'api/humanResource/interviewers/cynthia@google.com'
const getOngoingInterviews = 'api/humanResource/ongoingInterviews/cynthia@google.com'
const getPreviousInterviews = 'api/humanResource/previousInterviews/cynthia@google.com'
const getDashboardCards = 'api/humanResource/dashboardHeader/cynthia@google.com'
const recentApplication = 'api/humanResource/recentJobApplicants/cynthia@google.com'
const recentJob = 'api/humanResource/recentJobPostings/cynthia@google.com'
const interviewToday = 'api/interviewer/today/sundar@google.com'
const interviewerProfile = 'api/interviewer/profile/sundar@google.com'
const interviewsTodayEndpoint = 'api/interviewer/today/sundar@google.com'
const calendlyLinkEndpoint = 'api/interviewer/calendlyLink/sundar@google.com'
const statsEndpoint = 'api/humanResource/graph/cynthia@google.com'
const statsInterviewerEndpoint = 'api/interviewer/graph/sundar@google.com'
const statsIntervieweeEndpoint = 'api/interviewer/graph/sundar@google.com'
const jobApplicants = 'api/humanResource/applicants/cynthia@google.com'
const allJobsEndpoint = 'api/job'
const getInterviewsWithVerditEndpoint = 'api/interviewer/interviews/sundar@google.com'
const applicationDashboardEndpoint = 'api/interviewee/jobsApplied/pulkit@gmail.com'
const feedbackEndpoint = 'api/interviewee/interviews/pulkit@gmail.com'
const hotJobEndpoint = 'api/interviewee/hotJobOfTheDay'



const getDashboardCardsInterviewer = 'api/interviewer/dashboardMetrics/sundar@google.com'
const getDashboardCardsIntervieweeEndpoint = 'api/interviewee/dashboardHeader/pulkit@gmail.com'

const authenticate = '/account/adminSignIn'
const users = '/users'
const reports = '/reports'
const searchUsers = '/users'
const deleteCommentAPI = '/feeds/comment/'
const leaderBoard = '/account/allTimeTopUsers/'

const accountresetpasswordinit = 'api/User/ForgotPassword'
const accountresetpasswordfinish = '/api/User/ResetPassword'
const allaccountdetails = '/api/account'
const alluserlist = '/api/User'
const deleteSingleUser = '/api/User/'
const IDP = '/api/IDP'
const idpVerison = '/api/IDPVersion/All'
const providerVersion = '/api/IDPVersion'
const setManageIdpVersion = '/api/ProviderConfiguration/Admin/IdpVersion'
const setDataIdp = '/api/ProviderConfiguration'
const idpVerisonAdmin = '/api/ProviderConfiguration/Admin/IdpVersion'
const userProfile = '/api/UserProfile'
const userPassword = '/api/UserProfile/UserPassword'
const updateProfileInfo = '/api/UserProfile/UpdateProfileInfo'
const updateProfilePicture = '/api/UserProfile/ProfileImage'
const inviteUserDetails = '/api/invitation'
const manageIDPDataAdmin = '/api/ProviderConfiguration/Admin'
const manageIDPData = '/api/ProviderConfiguration'
const isIdpConfiguredAdminCheck = '/api/ProviderConfiguration/Admin/IsIdpConfigured/Account'
const isIdpConfiguredCheck = '/api/ProviderConfiguration/IsIdpConfigured'
const deleteIdp = '/api/ProviderConfiguration/'

const registerUser = '/api/User'
const register = '/register'
const adminregister = '/adminregister'
const active = '/activate'
const account = '/account'
const accountchangepassword = '/account/change-password'
const allcountriesstatescities = '/allcountriesstatescities'
const registrationcomplete = '/registrationcomplete'
const useraddsingle = '/user/add/single'
const useraddmultiple = '/user/add/multiple'
const userlist = '/user/list'
const userlistactionsstatussingle = '/user/list/actions/status/single'
const userlistactionsstatusmultiple = '/user/list/actions/status/multiple'
const userlistfiltervalues = '/user/list/filter/values'
const userlistfilter = '/user/list/filter'
const userlistsearch = '/user/list/search'
const userdeletesingle = '/user/delete/single'
const userdeletemultiple = '/user/delete/multiple'
const userinvitemultiple = '/user/invite/multiple'
const changeCurrentPassword = '/change/currentPassword'
const customeruseraccount = '/customeruseraccount'
const listdepartments = '/list/departments'
const preferencesalerts = '/preferences/alerts'
const customeruserprofilepictureupload = '/customeruser/profilepicture/upload'
const shippersrequestlist = '/shippers/request/list'
const shippersrequestlistfilter = '/shippers/request/list/filter'
const shippersrequestlistfiltervalues = '/shippers/request/list/filter/values'
const shippersrequestlistsearch = '/shippers/request/list/search'
const systemadminaccount = '/system/admin/account'
const systemadminprofilepictureupload = '/system/admin/profilepicture/upload'
const shippersdeletesingle = '/shippers/delete/single'
const shippersdeletemultiple = '/shippers/delete/multiple'
const shippersdetails = '/shippers/details'
const shippers = '/shippers'
const filedownload = '/file/download'
const chalistfiltervalues = '/cha/list/filter/values'
const chalistfilter = '/cha/list/filter'
const addcha = '/add/cha'
const editcha = '/edit/cha'
const chalist = '/cha/list'
const chadeletemultiple = '/cha/delete/multiple'
const chalistsearch = '/cha/list/search'
const chalistactionsstatussingle = '/cha/list/actions/status/single'
const chalistactionsstatusmultiple = '/cha/list/actions/status/multiple'

export {
    baseURL,
    register,
    registerUser,
    adminregister,
    active,
    authenticate,
    account,
    accountchangepassword,
    accountresetpasswordinit,
    accountresetpasswordfinish,
    allcountriesstatescities,
    registrationcomplete,
    useraddsingle,
    useraddmultiple,
    userlist,
    userlistactionsstatussingle,
    userlistactionsstatusmultiple,
    userlistfiltervalues,
    userlistfilter,
    userlistsearch,
    userdeletesingle,
    userdeletemultiple,
    userinvitemultiple,
    changeCurrentPassword,
    customeruseraccount,
    listdepartments,
    preferencesalerts,
    customeruserprofilepictureupload,
    shippersrequestlist,
    systemadminaccount,
    systemadminprofilepictureupload,
    shippersrequestlistfilter,
    shippersrequestlistfiltervalues,
    shippersrequestlistsearch,
    shippersdeletesingle,
    shippersdeletemultiple,
    shippersdetails,
    shippers,
    filedownload,
    chalistfiltervalues,
    chalistfilter, addcha, editcha,
    chalist, chadeletemultiple,
    chalistsearch,
    chalistactionsstatussingle, 
    chalistactionsstatusmultiple,
    allaccountdetails,
    alluserlist,
    deleteSingleUser,
    inviteUserDetails,
    IDP,
    idpVerison,
    userProfile,
    userPassword,
    updateProfileInfo,
    updateProfilePicture,
    idpVerisonAdmin,
    manageIDPDataAdmin,
    manageIDPData,
    isIdpConfiguredAdminCheck,
    isIdpConfiguredCheck,
    setManageIdpVersion,
    deleteIdp,
    setDataIdp,
    providerVersion,

    users,
    reports,
    searchUsers,
    deleteCommentAPI,
    leaderBoard,

    HRPersona,
    HRInterviewer,
    HRInterviewee,
    getAllInterviewers,
    getOngoingInterviews,
    getDashboardCards,
    recentApplication,
    recentJob,
    getPreviousInterviews,
    interviewToday,
    interviewerProfile,
    getDashboardCardsInterviewer,
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
    hotJobEndpoint
}