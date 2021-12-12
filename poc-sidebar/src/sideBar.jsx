import React from "react";
import "./sideBar.css";
import SVG from "./asset/dashBoard";

const sideBar = () => {

    const HR = ['Dashboard', 'Jobs', 'Assign', 'Add Interviwers', 'Onging Interviews', 'Previous Interviews']

    const Interviewee =['Home' , 'Jobs Board', 'Application Dashboard', 'Interview Feedbacks', 'Profile']

    const Interviewer = ['Home', 'Verdict & Feedback', 'Interviews', 'Profile']

    return (
        <>
            <main>
                <div className="side-bar">
                    <div className="logo-top">
                        <a href="#">
                            <span className="company-name">
                                {" "}
                                <span className="first-letter">I</span>nterviewium
                            </span>
                        </a>
                    </div>
                    <ul className="nav-links"> 
                    {
                        HR.map(e=> (
                             <li className="nav-tab active sidebar" data-view-name="create">
                            <div className="sidebar-logo">
                                <SVG/>
                            </div>
                            <div className="sidebar-text">
                                {" "}
                                <span><span className="first-letter">{e[0]}</span>{e.substr(1, e.length)}</span>
                            </div>
                            <div className="active-tab"></div>
                        </li>
                        ))
                    }
                       
                      
                    </ul>
                </div>
                <div className="main-content w-100 p-5">
                    <div className="create" data-view-active="true">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="load" data-view-active="false">
                        <h1>LOAD</h1>
                    </div>
                    <div className="settings" data-view-active="false">
                        <h1>SETTINGS</h1>
                    </div>
                </div>
            </main>
        </>
    );
};

export default sideBar;
