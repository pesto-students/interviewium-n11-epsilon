
import _ from 'lodash'
import {
    Login,
    SignUp,
    ForgotPassword,
    PersonaSelection,

    HRDashboard,
    Jobs,
    Assign,
    InterviewerManagement,
    OngoingInterviews,
    PreviousInterviews,

    InterviewerDashboard,
    Verdit,
    ManageInterviews,
    InterviewerProfile,

    IntervieweeDashboard,
    JobsBoard,
    ApplicationDashboard,
    InterviewFeedback,
    IntervieweeProfile,

    CustomerHome,
    AllUserManagement,
UserReports,
FlaggedContent,
LeaderBoard,

} from '../containers'
import { role } from '../types/index'
enum path {
    Login = '/login',
    SignUp = '/sign-up',
    ForgotPassword = '/forgot-password',
    PersonaSelection = '/persona',

    HRDashboard = '/hr-dashboard',
    Jobs = '/manage-jobs',
    Assign = '/assign',
    InterviewerManagement = '/interviewer',
    OngoingInterviews = '/ongoing-interviews',
    PreviousInterviews = '/previos-interviews',

    InterviewerDashboard = '/home',
    Verdit = '/verdit',
    ManageInterviews = '/interviews',
    InterviewerProfile = '/interviewer-profile',

    IntervieweeDashboard = '/dashboard',
    JobsBoard = '/jobs',
    ApplicationDashboard = '/application',
    InterviewFeedback = '/interview',
    IntervieweeProfile = '/profile',
    
    Index = '/',
    CustomerHome = '/home',
    AllUsers = '/users',
    UserReports = '/reports',
    flaggedContent = '/flagged-content',
    leaderBoard = '/leader-board'
}

interface RouteTemplate {
    path: string
    component: any
    type?: string
    role?: string
}

const unsecureRoutes: RouteTemplate[] = [
    {
        path: `${path.Login}`,
        component: Login,
    },
    {
        path: `${path.SignUp}`,
        component: SignUp,
    },
    {
        path: `${path.ForgotPassword}`,
        component: ForgotPassword,
    },
    {
        path: `${path.PersonaSelection}`,
        component: PersonaSelection,
    },
    {
        path: `${path.CustomerHome}`,
        component: CustomerHome
    },
    {
        path: `${path.AllUsers}`,
        component: AllUserManagement
    },
    {
        path: `${path.UserReports}`,
        component: UserReports
    },
    {
        path: `${path.flaggedContent}`,
        component: FlaggedContent
    },
    {
        path: `${path.leaderBoard}`,
        component: LeaderBoard
    }
]
const HRRoutes: RouteTemplate[] = [
    {
        path: `${path.HRDashboard}`,
        component: HRDashboard,
    },
    {
        path: `${path.Jobs}`,
        component: Jobs
    },
    {
        path: `${path.Assign}`,
        component: Assign,
    },
    {
        path: `${path.InterviewerManagement}`,
        component: InterviewerManagement,
    },
    {
        path: `${path.OngoingInterviews}`,
        component: OngoingInterviews,
    },
    {
        path: `${path.PreviousInterviews}`,
        component: PreviousInterviews,
    }
]
const InterviewerRoutes: RouteTemplate[] = [
    {
        path: `${path.InterviewerDashboard}`,
        component: InterviewerDashboard,
    },
    {
        path: `${path.Verdit}`,
        component: Verdit
    },
    {
        path: `${path.ManageInterviews}`,
        component: ManageInterviews,
    },
    {
        path: `${path.InterviewerProfile}`,
        component: InterviewerProfile,
    }
]
const IntervieweeRoutes: RouteTemplate[] = [
    {
        path: `${path.IntervieweeDashboard  }`,
        component: IntervieweeDashboard,
    },
    {
        path: `${path.JobsBoard  }`,
        component: JobsBoard
    },
    {
        path: `${path.ApplicationDashboard  }`,
        component: ApplicationDashboard,
    },
    {
        path: `${path.InterviewFeedback  }`,
        component: InterviewFeedback,
    },
    {
        path: `${path.IntervieweeProfile  }`,
        component: IntervieweeProfile,
    }
]

const securedRoutesMap = new Map<any, any>()
securedRoutesMap.set(role.HR, HRRoutes)
securedRoutesMap.set(role.Interviewer, InterviewerRoutes)
securedRoutesMap.set(role.Interviewee, IntervieweeRoutes)

export {
    path,
    role,
    unsecureRoutes,
    securedRoutesMap
}
