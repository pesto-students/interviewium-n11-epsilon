import type { NextPage } from 'next';
import styles from './ForgotPassword.module.scss';
import TextField_s from '../../shared/TextField/TextField_s';
import { useFormik } from 'formik';
import { emailYup, passwordYup } from '../../utilities/yupObjects';
import * as Yup from 'yup';
import PrimaryButton from '../../shared/PrimaryButton/PrimaryButton';
import Link from 'next/link'

const Login: NextPage = () => {
  const loginSchema = Yup.object().shape({
    email: emailYup,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

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
          <span>Forgot Password</span>
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

          <div id={styles.login}>
          <PrimaryButton text="Send Email"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
