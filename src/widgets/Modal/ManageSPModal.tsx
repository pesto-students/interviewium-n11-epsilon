import styles from "./index.module.scss";
import { useFormik, FormikProvider } from "formik";
import { accountName, subDomain } from "utilities/yupObjects";
import NormalTextField from "widgets/NormalTextField";
import PrimaryButton from "widgets/PrimaryButton";
import * as Yup from "yup";
import { AddUser, LockIcon, Sheilduser } from "../../utilities/images/icons/index";
import { useEffect } from "react";
import Icon from 'widgets/IconComponent'

const CreateAccountComponent = (props) => {
  useEffect(() => {
    if (props.resetForm) {
      formik.resetForm();
    }
  }, [props.resetForm]);

  const loginSchema = Yup.object().shape({
    accountName: accountName,
    subDomain: subDomain,
  });

  const formik = useFormik({
    initialValues: {
      accountName: "",
      subDomain: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      props.accountChange(values);
    },
  });

  return (
    <>
      <Sheilduser className={styles.modalTopIcon} />
      <h5 className={styles.commonTitle}>
        <strong>Create</strong>&nbsp;<span>Account</span>
      </h5>
      <FormikProvider value={formik}>
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              formik.handleSubmit();
            }
          }}
        >
          <NormalTextField
            error={formik.errors.accountName}
            touched={formik.touched.accountName}
            placeholder="Account Name"
            name="accountName"
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.accountName}
            startAdor={<Icon icon={<AddUser/>}/>}
          />

          <div className={styles.customDiv}></div>
          <NormalTextField
            error={formik.errors.subDomain}
            touched={formik.touched.subDomain}
            placeholder="Sub Domain"
            name="subDomain"
            type="text"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.subDomain}
            endAdor="@ssohub.com"
            startAdor={<Icon icon={<LockIcon/>}/>}
          />
          <div className={styles.button}>
            <PrimaryButton
              text="Save"
              method={formik.handleSubmit}
              className={styles.modalBtn}
            />
          </div>
        </form>
      </FormikProvider>
    </>
  );
};

export default CreateAccountComponent;
