import Home from '../../public/icons/home'
import { Personas } from '../../utilities/types/personas';
import Login from '../Login/Login'
const Interviewer = [
    {
        Icon: Home,
        Title: 'DashBoard',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Feedback',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Interviews',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Profile',
        Component: Login
    },
  
]
const Interviewee = [
    {
        Icon: Home,
        Title: 'DashBoard',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Jobs Board',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Job Application',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Feedbacks',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Profile',
        Component: Login
    },
]
const HR = [
    {
        Icon: Home,
        Title: 'Dashboard',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Jobs',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Assign',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Interviewers',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'Interviews',
        Component: Login
    },
    {
        Icon: Home,
        Title: 'History',
        Component: Login
    },
]

const sidebarItemsMap = new Map<any, any>()
sidebarItemsMap.set(Personas.Interviewer, Interviewer);
sidebarItemsMap.set(Personas.Interviewee, Interviewee);
sidebarItemsMap.set(Personas.HR, HR);

export {
    sidebarItemsMap,
}
