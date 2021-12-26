import type { NextPage } from 'next';
import styles from './ForgotPassword.module.scss';
import TextField_s from '../../shared/TextField/TextField_s';
import { useFormik } from 'formik';
import { emailYup } from '../../utilities/yupObjects';
import * as Yup from 'yup';
import PrimaryButton from '../../shared/PrimaryButton/PrimaryButton';
import { passwordReset } from './ForgotPassword_API';
import { toast } from 'react-toastify';
import { GREAT, SAD, toastMessage } from '../../utilities/variables';

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
      handleResetPassword(values)
    },
  });

  const handleResetPassword = async (value: any) => {
    try {
      let data: any = await passwordReset(value["email"] , {});
      console.log(data);
      if (!data.error) {
       console.log(data)
      toast.success(`${GREAT} Signup Successful`, { ...toastMessage });
      }  else {
      toast.error(`${SAD} Something went wrong`, { ...toastMessage });
      }
    } catch (err) {
      toast.error(`${SAD} ${err}`, { ...toastMessage });
    }
  };

  return (
    <>
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
          <PrimaryButton text="Send Email" method={formik.handleSubmit} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
