# _Interviewium_

<div id="top"></div>

<!-- GETTING STARTED -->

## Getting Started

Here is how you setup **Interviewium** a one stop solution for HR, Interviewer and Interviewee

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```
- node

  [https://nodejs.org/en/download/](Node.js)

- git

  [https://git-scm.com/downloads](Git)

### Installation

_Follow Below Steps to setup locally_

1. Clone the repo
   ```sh
   git clone git@github.com:pesto-students/interviewium-n11-epsilon.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the Project
   ```sh
   npm start
   ```
4. Browse to [http://localhost:8080/login](Link)
5. Note : If using Mac replace the following

```sh
 "start": "SET PORT=8080 && react-scripts start",
```

with

```sh
   "start": "export PORT=8080 && react-scripts start",
```

<p align="right">(<a href="#top">back to top</a>)</p>

🎯 **Objective**

⭐ `*Vision*`: **Interviewium** should be used by companies to **manage** their **Interview process** and **Interviewee** should get a **good experience**. All the Personas evolved should seamless experience.

⭐ `*Goals*`: Our goal is to create a **platform** where **HR, Interviewer, Interviewee** can follow a **process driven** approach of hiring rather than HR driven. We want to remove the hurdle of managing all interviewee through excel, going back and forth for deciding timings.

⭐ `*Personas*`: **HR, Interviewer, Interviewee**.

**✒ Figma Link : [Interviewium](https://www.figma.com/file/kwksgGU97Ac6FBwY8o4DNe/Interviewium?node-id=0%3A1)**

🎨 **Functionality & Features**

📌 V1 - MVP

| Functionality       | _User Signup_                                                                              |
| :------------------ | :----------------------------------------------------------------------------------------- |
| Features            | <p>1. _Signup_</p><p>2. _Login_</p><p>3. _Reset Password_ </p><p>4. _Logout_</p>           |
| User value          | _Helps user to Sign in quickly, without much of an information to be filled for the same._ |
| Assumptions         | _If users take more time to sign up, users tend to leave the platform without signing in._ |
| Not doing           | 1. _Sign in with OTP_                                                                      |
| Acceptance criteria | <p>1. _Sign up with Google_</p><p>2. _Signup with Email/password_</p>                      |

| Functionality       | _Persona Signup Action Items_                                                                                                                                                                      |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Features            | <p>1. _Interviewee Signup Action Items_ </p><p>2. _Interviewer Signup Action Items_ </p><p>3. _HR Signup Action Items_</p>                                                                         |
| User value          | _The user is quickly able to get started on our platform, without feeling nebulous or vague on what next. Swifter on boarding times._                                                              |
| Assumptions         | _User confusion, once signing in on a platform, is never a good thing. It turns off the user & they might start contemplating on easier to use alternatives_                                       |
| Not doing           | _Reward based gamification, for completing action items_                                                                                                                                           |
| Acceptance criteria | _The user is able to see a clear, visually appealing action items page upon signing up. The page shall also let the user know at which step they are in, and which steps are yet to be completed._ |

| Functionality       | _Interviewee Experience_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Features            | <p>_1. Search & apply for Jobs_</p><p>_2. Interviewee Profile_</p><p>_a. Fill in basic / required details_</p><p>_b. Upload Resume_</p><p>_3. Book an interview slot, upon HR shortlisting_</p><p>_4. Ability to view lists of jobs applied, along with its status (resume_</p><p>_viewed, shortlisted, rejected)_</p><p>_5. View interview process dashboard, for the job applications the_</p><p>_candidate have been shortlisted for_</p><p>_6. Interview dashboard for interviewees_</p><p>_a. Time of past / upcoming interviews_</p><p>_b. Joining links (Zoom / Google Meet / Teams)_</p><p>_c. Status of interview round_</p><p>_d. Interviewer feedback for the interview round_ </p> |
| Purpose             | <p>_To empower the interviewee with all necessary tools and views to enjoy an efficient & elegant interviewing experience._</p><p></p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| User problem        | <p>_1. Jobs seekers have to go back and forth for interview timing scheduling with HRs_</p><p>_2. Candidates cannot understand the interview process as a whole, and often have opaque visibility on the company interview process_ </p><p>_3. Interviewees are not notified most of the time, if they are rejected, leading to anticipatory pain for interviewees (might as well lead to temporary emotional / mental challenge_)</p>                                                                                                                                                                                                                                                         |
| User value          | <p>1. _Interviewees are easily able to search, shortlist and apply for company job openings._</p><p>2. _Interviewee retains the power to choose an interview time, that suits his / her convenience._</p><p>3. _Candidates can have complete visibility (helicopter view) of the job’s interview process._</p><p>4. _Candidates are notified on interview round status, along with feedback_</p>                                                                                                                                                                                                                                                                                               |
| Assumptions         | _Interviewees are grappling with the problems of company job openings visibility, rigid interview times, vagueness or confusing interview processes & zero / delayed interview feedback cycles._                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Not doing           | _Automated resume scanning, eliminating the need for the interviewee to manually key in basic / required details._                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Acceptance Criteria | <p>1. _The interviewee is easily able to search and apply jobs on our platform_ </p><p>2. _Candidate has an interview application dashboard with information on current application status_ </p><p>3. _Candidate has an interview process information view dashboard_ </p><p>4. _Candidates can view and block interviewer’s slots for the interview, on their own & at their discretion (without HR’s involvement)_ </p><p>5. _Interviewee is able to get a 360-degree view on the job’s interview process_ </p><p>6. _Interviewee has an interview dashboard of past / upcoming interviews, with interview status and feedback_</p>                                                          |

| Functionality       | _Interviewer Experience_                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Features            | <p>1. _Quick link based sign up for interviewers_ </p><p>2. _Ability to feed in available slots to take interviews_ </p><p>3. _Easy past / upcoming interview tracking_ </p><p>4. _Easily provide interview feedbacks to both stakeholders (HRs & interviewees)_</p><p></p>                                                                                                                |
| Purpose             | _Thunder fast interviewer on boarding, along with ability and flexibility to choose their available times (leading to drastic reduction of HR scheduling conflicts) Easy interview rounds tracking using envisioned interview rounds dashboard._                                                                                                                                           |
| User value          | <p>1. _Fast sign up time_ </p><p>2. _No more remembering the interviews to take, for what interview feedback remains & hassle loaded scheduling conflicts_</p>                                                                                                                                                                                                                             |
| Assumptions         | <p>1. _Interviewers are time crunched employees, for whom interviewing is just a apart of the job._ </p><p>2. _They don’t appreciate lengthy on boarding processes nor they appreciate bureaucratic interview scheduling (traditional email or phone based back and forth with HRs, at times)_ </p><p>3. _They wish to get the job done, with minimal time investment from their end._</p> |
| Not doing           | _In platform note taking system for interviewers, for live on-the-go interview round pointers / feedback record_                                                                                                                                                                                                                                                                           |
| Acceptance Criteria | <p>1. _Interviewer is able to one click sign up onto the platform_ </p><p>2. _They are able to select availability using Calendly widget_ </p><p>3. _Interviewers can track all their interview rounds taken at one place_</p><p>4. _1-click HR & interviewee feedback providence feature for the interviewers, after each interview round_</p>                                            |

| Functionality       | _HR Experience_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Features            | <p>_1. Post company job openings_</p><p>_2. 1-click add company's interviewer to the portal with just the_</p><p>_interview's email_</p><p>_a. Interviewer will get sign-up invitation email_</p><p>_3. Dashboard to view list of past Interviews_</p><p>_a. Date/Time of those interview rounds_</p><p>_b. Candidate's Resume_</p><p>_c. Selected / Rejected verdict for the round_</p><p>_d. Interview round feedback received from interviewer for HR_</p><p>_e. Interviewer's Name_</p><p>_f. Interviewer's Email_</p><p>_4. List of Scheduled interviews_</p><p>_a. Date/Time of scheduled interview rounds_</p><p>_b. Candidate's Resume_</p><p>_c. Selected / Rejected verdict_</p><p>_d. Interview round feedback received from interview for HR_</p><p>_e. Interviewer Name_</p><p>_f. Interviewer Email_</p><p>_5. Offer / Reject Dashboard_</p><p>_a. Extend offer to interviewee, along with an email_</p><p>_b. View candidate's offer acceptance status_</p><p>_c. Reject candidate, along with an email_</p><p>_6. Assign Interviewee to Interviewer_</p><p>_7. Hiring Stats_</p><p>_a. Grand total of interviews scheduled by HR_</p><p>_b. Number of interviews that actually took place_</p><p>_c. Number of offers made_</p><p>_d. Number of offers accepted_</p> |
| Purpose             | _Significantly reduce HR’s hassles. Allow HR to function as an independent fast unit, rather than being a mediatory between the interviewee and the interviewers._                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| User value          | <p>1. _Reduced bureaucratic and time consuming back and forth_ </p><p>2. _No traditional scheduling problems_ </p><p>3. _Easy interview tracking’s, with easily digestible stats_ </p><p>4. _Quick make-offer or reject candidature functionality_</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Assumptions         | _Hiring HRs would prefer to actually focus on their job of creating and posting job applications & track interview rounds in real time. Their significance, we believe, is more post offer decision stage - rather than the traditional minute involvement of HRs in the interview transpiring stage itself_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Not doing           | <p>_Ability to view Interviewer’s stats_ </p><p>1. _Unique offering from our end to view which interviewer is performing the best / better_ </p><p>2. _We envision to do this by tracking the stats of “interviewer effectiveness”. This is done by tracking out of how many candidates approved by the interviewer in their taken round - the number of candidates that are able to actually bag an offer. This naturally excludes bar raiser / leadership interviewers, who are generally tasked to take the final round._ </p><p>3. _Via this, we aim to cultivate interviewer collaboration and not competition, implying an adept interviewer could share pointers on what makes them more effective_</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Acceptance Criteria | <p>1. _HR is able to easily on-board onto Interviewium, with a quick and clear sign up process_ </p><p>2. _HRs are able to extend 1-click sign up invitation to interviewers_ </p><p>3. _HRs can track all past / upcoming interview rounds_ </p><p>4. _Single page solution to extend offer and reject candidates_ </p><p>5. _Easily digestible YTD (Year To Date) interview stats view_</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
<p align="right">(<a href="#top">back to top</a>)</p>
`🔭 **V2 – Roadmap**`

⭐ **\*Automated resume scan** and details filling experience for the interviewee.\*

⭐**\*Skill based interviewer** **- interviewee matching** functionality, reducing HR’s decision making time.\*

⭐**\*Interviewer stats** to help budding interviewers.\*

⭐**\*Payments** to unlock premium features on the platform.\*

⭐**\*Subdomain** allotment to organisations.\*

**⭐ _Alerts_**_, **reminders** and **notifications** to personas._
<p align="right">(<a href="#top">back to top</a>)</p>
