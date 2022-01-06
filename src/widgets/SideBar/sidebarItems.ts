import { SideHome, Assign , Jobs , InterviewerIcon , Interview ,  JobPost , Previous , Ongoing , Feedback, Profile ,FeedbackIcon} from '../../utilities/images/icons/index'
import { path } from '../../pageRoutes/routers'
import { role } from '../../types/index';
const Interviewer = [
    {
        Icon: SideHome,
        title: 'DashBoard',
        path: path.InterviewerDashboard
    },
    {
        Icon: Feedback,
        title: 'Feedback',
        path: path.Verdit
    },
    {
        Icon: Interview,
        title: 'Interviews',
        path: path.ManageInterviews
    },
    {
        Icon: Profile,
        title: 'Profile',
        path: path.InterviewerProfile
    },
  
]
const Interviewee = [
    {
        Icon: SideHome,
        title: 'DashBoard',
        path: path.IntervieweeDashboard
    },
    {
        Icon: Jobs,
        title: 'Jobs Board',
        path: path.JobsBoard
    },
    {
        Icon: JobPost,
        title: 'Application Dashboard',
        path: path.ApplicationDashboard
    },
    {
        Icon: Feedback,
        title: 'Feedbacks',
        path: path.InterviewFeedback
    },
    {
        Icon: Profile,
        title: 'Profile',
        path: path.IntervieweeProfile
    },
]
const HR = [
    {
        Icon: SideHome,
        title: 'Dashboard',
        path: path.HRDashboard
    },
    {
        Icon: JobPost,
        title: 'Jobs',  
        path: path.Jobs
    },
    {
        Icon: Assign,
        title: 'Assign',
        path: path.Assign
    },
    {
        Icon: InterviewerIcon,
        title: 'Interviewers',
        path: path.InterviewerManagement
    },
    {
        Icon: Ongoing,
        title: 'Ongoing Interviews',
        path: path.OngoingInterviews
    },
    {
        Icon: Previous,
        title: 'Previous Interviews',
        path: path.PreviousInterviews
    },
]

const sidebarItemsMap = new Map<any, any>()
sidebarItemsMap.set(role.Interviewer, Interviewer);
sidebarItemsMap.set(role.Interviewee, Interviewee);
sidebarItemsMap.set(role.HR, HR);

export {
    sidebarItemsMap,
}
