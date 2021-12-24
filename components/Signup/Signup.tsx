import type { NextPage } from 'next';
import styles from './Signup.module.scss';
import TextField_s from '../../shared/TextField/TextField_s';
import { useFormik } from 'formik';
import { emailYup, passwordYup } from '../../utilities/yupObjects';
import * as Yup from 'yup';
import PrimaryButton from '../../shared/PrimaryButton/PrimaryButton';
import { popUp, signUp } from './Signup_API';

const SignUp: NextPage = () => {

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
      handleSignup(values)
    },
  });

  const handleSignup = async (value: any) => {
    try {
      let data: any = await signUp(value["email"], value["password"]);
      console.log(data);
      if (!data.error) {
       localStorage.setItem("accessToken", data.user.accessToken );
       localStorage.setItem("name", data.user.displayName );
       localStorage.setItem("email", data.user.email );
       localStorage.setItem("role", 'Rushi' );
       
      }  else {
        console.log('something went wrong')
      }
    } catch (err) {
      console.log(err)
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
          <span>Get Started</span>
        </div>
        <div id={styles.switch_screen}>
          <p>Already have an account? </p>
          <p>Login</p>
        </div>
        <div id={styles.google_login} onClick={popUp}>
          <div className={styles.google_login}>
            <img
              className={styles.content}
              src='/images/google_logo.png'
              alt='logo'
            />
            <p>Signup with Google</p>
          </div>
        </div>
        <div id={styles.or}>
          <div className={styles.striped_border}></div>
          <div>OR</div>
          <div className={styles.striped_border}></div>
        </div>
        <div className={styles.login_content}>
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
          <PrimaryButton text="Sign Up" method={formik.handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
