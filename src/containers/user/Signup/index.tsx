// import {useState} from 'react'
import { useDispatch } from "react-redux";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import { Link, useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import PrimaryButton from "../../../widgets/PrimaryButton";
import NormalTextField from "../../../widgets/NormalTextField";
import PasswordTextField from "../../../widgets/PasswordTextField";
import styles from "./index.module.scss";
import { emailYup, passwordYup } from "../../../utilities/yupObjects";
import { path } from "../../../pageRoutes/routers";

import { save } from "../../../_store/actions/user";
import { ERROR_MESSAGE } from "../../../_store/constants/index";
import Cookie from "js-cookie";
import Icon from "widgets/IconComponent";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import { signUp } from "./Signup_API";
import { popUp } from "./Signup_API";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSignUp = async (value: Object) => {
    try {
      let data: any = await signUp( value["email"] , value["password"]);
      if (!data.error) {
        Cookie.set("token", data.user.accessToken);
        const userDetails = {
          role: 'Interviewee',
          name: data.user.displayName,
          email: data.user.email 
        };
        localStorage.setItem("user", JSON.stringify(userDetails));
        dispatch(save(userDetails));
        history.push(path.IntervieweeDashboard);
      }  else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Internal server error" 
        });
      }
    } catch (err) {
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };
  const pupUpHandle = async () => {
    try {
      let data: any = await popUp()
      if (!data.error) {
        Cookie.set("token", data.user.accessToken);
        const userDetails = {
          role: 'HR',
          name: data.user.displayName,
          email: data.user.email 
        };
        localStorage.setItem("user", JSON.stringify(userDetails));
        dispatch(save(userDetails));
        history.push(path.HRDashboard);
      }  else {
        dispatch({
          type: ERROR_MESSAGE,
          payload: "Internal server error" 
        });
      }
    } catch (err) {
      dispatch({ type: ERROR_MESSAGE, payload: "Failed to connect" });
    }
  };

  const loginSchema = Yup.object().shape({
    email: emailYup,
    password: passwordYup,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (<section className={styles.container}>
    <div className={styles.container1}>
    <img
            className={styles.logo_img}
            src='main_logo.png'
            alt='logo'
          />
    </div>
    <div className="container2">

        <Card className={` ${styles.customloginMain}`}>
        <div className={styles.ssoLogo}>
          <h4>
            <strong>Interviewium</strong>
          </h4>
        </div>
     
        <Card.Body className={styles.innercustomloginMain}>
          <h4 className={styles.commonTitle}>
            <strong>Sign</strong>&nbsp;<span>up</span>
          </h4>

          <div id={styles.google_login} onClick={pupUpHandle}>
          <div className={styles.google_login}>
            <img
              className={styles.content}
              src='google_logo.png'
              alt='logo'
            />
            <p className={styles.noBorder}>Signup with Google</p>
          </div>
          </div>

          <FormikProvider value={formik}>
            <form
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  formik.handleSubmit();
                }
              }}
            >
              <NormalTextField
                error={formik.errors.email}
                touched={formik.touched.email}
                placeholder="Email address"
                name="email"
                type="text"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.email}
                startAdor={
                  <Icon
                    icon={
                      <MailOutlineIcon className={styles.inputFieldicons} />
                    }
                  />
                }
              />

              <div className={styles.customDiv}></div>
              <PasswordTextField
                placeholder="Password"
                name="password"
                error={formik.errors.password}
                touched={formik.touched.password}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.password}
                startAdor={
                  <Icon
                    icon={<LockIcon className={styles.inputFieldicons} />}
                  />
                }
              />

              <div className="d-flex justify-content-between mt-3">
                <label className={styles.checkContainer}>
                  Remember me
                  <input type="checkbox" />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
              <div className="d-flex justify-content-between">
              <div className={styles.button}>
                <PrimaryButton text="Sign Up" method={formik.handleSubmit} />
              </div>
              <div className={styles.button}>
                <PrimaryButton text="Login" method={() => {history.push(path.Login)}} />
              </div>
              </div>
             
            </form>
          </FormikProvider>
        </Card.Body>
      </Card>
    </div>
    
    </section>
  );
};

export default Login;
