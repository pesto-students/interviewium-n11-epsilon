import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import MenuIcon from "@material-ui/icons/Menu";
import { unsecureRoutes, securedRoutesMap, path } from "./routers";
import { Settings, Bell, Night, Day } from "../utilities/images/icons/index";

// import {Login } from '../containers/index'
import NotFound from "../containers/NotFound";
import SideBar from "../widgets/SideBar";
import styles from "./index.module.scss";
import { RootState } from "../_store/reducer/rootReducer";
import Cookies from "js-cookie";
import { Tooltip } from "@material-ui/core";

const PageRoutes = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [notification, setNotification] = useState<boolean>(false);
  const [lightThemePreference, setLightThemePreference] = useState<boolean>(false);
  const [user] = useSelector((state: RootState) => [state.user.user]);
  const toggleParentOpen = () => setOpen((prev) => !prev);

  const handleThemeChange = (flag: boolean = user?.lightThemePreference) => {
    setLightThemePreference(flag);
    if (flag) {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  };

  const getDisplayInitials = (companyName: string) => {
    console.log("companyName ", companyName);
    let firstLetter = "";
    let secondLetter = "";
    let val = "##";
    if (companyName&&companyName !== null) {
      firstLetter = companyName.charAt(0);
      secondLetter = companyName.includes(" ")
        ? companyName.substring(
            companyName.lastIndexOf(" ") + 1,
            companyName.lastIndexOf(" ") + 2
          )
        : "";
      val = firstLetter + secondLetter;
    }
    return val.toUpperCase();
  };

  useEffect(() => {
    if (user) {
      handleThemeChange();
    }
  }, [user]);

  const topheadericons = () => (
    <ul className={styles.headIcons}>
      <li>
          <span className={styles.profileSec}>
            Admin
          </span>
      </li>
      <li>
      <img
            className={styles.logo_img}
            src='favicon.png'
            alt='logo'
            height={35}
            width={35}
          />
      </li>
    </ul>
  );

  return (
    <>
      {user ? (
        <Navbar variant="dark" className={`${styles.appBar}`} expand={false}>
         
            <>
              <Navbar.Brand className={styles.sfnlogo}>
                <Link className="navbar-brand d-flex align-items-center" to="/hr-dashboard">
                  <strong>Interviewium</strong>
                </Link>
              </Navbar.Brand>
            </>

          {user && topheadericons()}
        </Navbar>
      ) : null}

      <div className={`d-flex align-items-stretch ${styles.sfnPageRoutes}`}>
        <div className={`${styles.sfnSideBar}`}>
          {user && (
            <SideBar
              toggleParentOpen={toggleParentOpen}
              parentOpen={open}
              user={user}
            />
          )}
        </div>
        <div
          className={`${styles.sfnMain} ${
            user ? styles.sfnLoggedInMain : styles.sfnLoggedOutMain
          }`}
        >
          <div className={`container-fluid ${styles.layouPadd}`} onClick={() => setNotification(false)}>
            <Switch>
              {!user &&
                unsecureRoutes?.map((route, index) => (
                  <Route
                    exact
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
                ))}

              {securedRoutesMap
                .get(user?.role)
                ?.map((route: any, index: number) => (
                  <Route
                    exact
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
                ))}

              {(!localStorage.getItem("user") || !Cookies.get("token")) && (
                <Redirect to={path.Login} />
              )}
               {/* <Redirect to={path.CustomerHome} /> */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};
export default PageRoutes;
