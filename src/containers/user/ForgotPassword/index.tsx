// import {useState} from 'react'
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Card } from "react-bootstrap";
import PrimaryButton from "../../../widgets/PrimaryButton";
import NormalTextField from "../../../widgets/NormalTextField";
import styles from "./index.module.scss";
import { emailYup } from "../../../utilities/yupObjects";
import Icon from "widgets/IconComponent";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { passwordReset } from "./ForgotPassword_API";

const Login = () => {

  const loginSchema = Yup.object().shape({
    email: emailYup,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      passwordReset(values['email'], {});
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
            <strong>Forgot</strong>&nbsp;<span>Password</span>
          </h4>


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
<div className={styles.button}>
                <PrimaryButton text="Send Reset Link" method={formik.handleSubmit} />
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
