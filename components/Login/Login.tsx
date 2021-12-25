import type { NextPage } from 'next';
import styles from './Login.module.scss';
import TextField_s from '../../shared/TextField/TextField_s';
import { useFormik } from 'formik';
import { emailYup, passwordYup } from '../../utilities/yupObjects';
import * as Yup from 'yup';
import PrimaryButton from '../../shared/PrimaryButton/PrimaryButton';
import Link from 'next/link'
import {  signIn } from './Login_API';
import { toast } from 'react-toastify';
import { GREAT, SAD, toastMessage } from '../../utilities/variables';
import { popUp } from '../Signup/Signup_API';

const Login: NextPage = () => {
  const loginSchema = Yup.object().shape({
    email: emailYup,
    password: passwordYup,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      console.log(values);
      handleLogin(values)
    },
  });

  const handleLogin = async (value: any) => {
    try {
      let data: any = await signIn(value["email"], value["password"]);
      console.log(data);
      if (!data.error) {
       localStorage.setItem("accessToken", data.user.accessToken );
       localStorage.setItem("name", data.user.displayName );
       localStorage.setItem("email", data.user.email );
       localStorage.setItem("role", 'Rushi' );
       toast.success(`${GREAT} Login Successful`, { ...toastMessage });
      }  else {
      toast.error(`${SAD} Something went wrong`, { ...toastMessage });
      }
    } catch (error : any) {
      toast.error(`${SAD} ${error.message}`, { ...toastMessage });
    }
  };

  return (
    <div className={styles.container}>
      <div id={styles.logo}>
        <div>
          <img
            className={styles.logo_img}
            src='/images/main_logo.png'
            alt='logo'
          />
        </div>
      </div>
      <div id={styles.content}>
        <div id={styles.title}>
          <span>Login...</span>
        </div>
        <div id={styles.switch_screen}>
          <p>Don’t have an account? </p>
          <p>Sign up</p>
        </div>
        <div id={styles.google_login} onClick={popUp}>
          <div className={styles.google_login}>
            <img
              className={styles.content}
              src='/images/google_logo.png'
              alt='logo'
            />
            <p>Login with Google</p>
          </div>
        </div>
        <div className={styles.login_content}>
        <div id={styles.or}>
          <div className={styles.striped_border}></div>
          <div>OR</div>
          <div className={styles.striped_border}></div>
        </div>
          <div id={styles.email}>
            <TextField_s
              error={formik.errors.email}
              touched={formik.touched.email}
              placeholder='Email address'
              name='email'
              type='text'
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          <div id={styles.password}>
            <TextField_s
              error={formik.errors.password}
              touched={formik.touched.password}
              placeholder='Password'
              name='password'
              type='text'
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
            <div className={styles.check_box}>
              <label className={styles.checkContainer}>
                I agree to the Terms and Conditions 
                <span className={styles.checkmark}></span>
              </label>
            </div>
          <div id={styles.login}>
          <PrimaryButton text="Sign In" method={formik.handleSubmit} />
          </div>
          <div id={styles.forgot_password}>
            <Link href='/forgot-password'>Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
