import type { NextPage } from 'next';
import styles from './ResetPassword.module.scss';
import TextField_s from '../../shared/TextField/TextField_s';
import { useFormik } from 'formik';
import { emailYup, passwordYup } from '../../utilities/yupObjects';
import * as Yup from 'yup';
import PrimaryButton from '../../shared/PrimaryButton/PrimaryButton';
import { popUp, signUp } from './ResetPassword_API';

const ResetPassword: NextPage = () => {

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
          <span>Reset password</span>
        </div>
       
        <div className={styles.login_content}>
          <div id={styles.email}>
            <TextField_s
              error={formik.errors.email}
              touched={formik.touched.email}
              placeholder='Enter Password'
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
              placeholder='Confirm Password'
              name='password'
              type='text'
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          
          <div id={styles.login}>
          <PrimaryButton text="Sign Up" method={formik.handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
