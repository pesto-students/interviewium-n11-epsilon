import styles from './index.module.scss';
import { useFormik, FormikProvider } from 'formik';
import { decriptionYup, emailYup, fullNameYup } from 'utilities/yupObjects';
import NormalTextField from 'widgets/NormalTextField';
import PrimaryButton from 'widgets/PrimaryButton';
import * as Yup from 'yup';
import { AddUser, Createuser } from '../../utilities/images/icons/index';
import { useEffect } from 'react';
import Icon from 'widgets/IconComponent';

const CreateOrEditIDPComponent = props => {
  useEffect(() => {
    if (props.resetForm) {
      formik.resetForm();
    }
  }, [props.resetForm]);

  const loginSchema = Yup.object().shape({
    email: emailYup,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      props.accountChange(values);
    },
  });

  return (
    <>
      <Createuser className={styles.modalTopIcon} />
      <h5 className={styles.commonTitle}>
        <strong>Add</strong>&nbsp;<span>Interviewer</span>
      </h5>
      <FormikProvider value={formik}>
        <form
          onKeyDown={e => {
            if (e.key === 'Enter') {
              formik.handleSubmit();
            }
          }}
        >
          <NormalTextField
            error={formik.errors.email}
            touched={formik.touched.email}
            placeholder='Interviewer Email'
            name='email'
            type='text'
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.email}
            startAdor={<Icon icon={<AddUser />} />}
          />
          <div className={styles.button}>
            <PrimaryButton
              text='Send Mail'
              method={formik.handleSubmit}
              className={styles.modalBtn}
            />
          </div>
        </form>
      </FormikProvider>
    </>
  );
};

export default CreateOrEditIDPComponent;
