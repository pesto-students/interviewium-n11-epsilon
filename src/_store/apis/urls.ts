
// let baseURL = 'http://localhost:5000/' 
let baseURL = 'https://us-central1-interviewium-334906.cloudfunctions.net/users'
if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://api-dev.sharpz.app/'
}
const HRPersona = '/SetHR'
const HRInterviewer = '/SetInterviewer'
const HRInterviewee = '/SetInterviewee'



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
    //sharpz
    users,
    reports,
    searchUsers,
    deleteCommentAPI,
    leaderBoard,

    HRPersona,
    HRInterviewer,
    HRInterviewee,
}