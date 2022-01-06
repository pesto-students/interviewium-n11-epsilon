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
import { claims, signIn } from "./Login_API";
import { popUp } from "../Signup/Signup_API";
import { getIdTokenResult } from "firebase/auth";
import {  Button, ButtonProps   } from '@material-ui/core'
import { styled } from '@material-ui/core/styles';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

  const handleLogin = async (value: Object) => {

    try {
      let data: any = await signIn( value["email"] , value["password"]);
      if (!data.error) {
        Cookie.set("token", data.user.accessToken);
        let persona = parseJwt(data._tokenResponse.idToken)
       
        const userDetails = {
          role: persona.persona ? persona.persona : 'Interviewer',
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
  const pupUpHandle = async () => {
    try {
      let data: any = await popUp()
      if (!data.error) {
        Cookie.set("token", data.user.accessToken);
        let persona = parseJwt(data._tokenResponse.idToken)
        const userDetails = {
          role: persona.persona ? persona.persona : 'Interviewer',
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
      handleLogin(values);
    },
  });

  const ColorButton = styled(Button)<ButtonProps>(() => ({
    fontSize : '0.7rem'
  }));
  
  const setEmailPass = (val : any) => {
    if(val === 'hr') {
      handleLogin({email : `hr@interviewium.com` , password : '@Rushi1998'})
    } else if (val === 'er') {
      handleLogin({email : `interviewer@interviewium.com` , password : '@Rushi1998'})
    } else {
      handleLogin({email : `interviewee@interviewium.com` , password : '@Rushi1998'})
    }
  }

  return (<section className={styles.container}>
    <div className={styles.container1}>
    <img
            className={styles.logo_img}
            src='main_logo.png'
            alt='logo'
            width={'60%'}
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
            <strong>Login</strong>&nbsp;<span>Now</span>
          </h4>

          <div id={styles.google_login} onClick={pupUpHandle}>
          <div className={styles.google_login}>
            <img
              className={styles.content}
              src='google_logo.png'
              alt='logo'
            />
            <p className={styles.noBorder}>Login with Google</p>
          </div>
          </div>
          <div className="m-3">
            <p className={styles.demo}>Demo Login as</p>
          <ColorButton variant="outlined" onClick={() => {setEmailPass('ee')}}>Interviewee</ColorButton>
          <ColorButton variant="contained" onClick={() => {setEmailPass('hr')}}>HR</ColorButton>
          <ColorButton variant="outlined" onClick={() => {setEmailPass('er')}}>Interviewer</ColorButton>
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
                <PrimaryButton text="Sign In" method={formik.handleSubmit} />
              </div>
              <div className={styles.button}>
                <PrimaryButton text="Sign Up" method={() => {history.push(path.SignUp)}} />
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
