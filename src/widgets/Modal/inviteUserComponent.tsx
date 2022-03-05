import styles from "./index.module.scss";
import { useFormik, FormikProvider } from "formik";
import { emailYup, fullNameYup } from "utilities/yupObjects";
import NormalTextField from "widgets/NormalTextField";
import PrimaryButton from "widgets/PrimaryButton";
import * as Yup from "yup";
import { Sheilduser } from "../../utilities/images/icons/index";
import { useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Icon from "widgets/IconComponent";
// import { StylesProvider } from "@material-ui/styles";

const InviteUserComponent = (props) => {
  useEffect(() => {
    if (props.resetForm) {
      formik.resetForm();
    }
  }, [props.resetForm]);

  const loginSchema = Yup.object().shape({
    email: emailYup,
    name: fullNameYup,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      props.accountChange(values);
    },
  });

  return (
    <>
      <section className={styles.invitemodal}>
        <Sheilduser className={styles.modalTopIcon} />
        <h5 className={styles.commonTitle}>
          <strong>Invite</strong>&nbsp;<span>User</span>
        </h5>
        <p className={styles.subname}>
          <strong>Account Name: </strong>&nbsp;<span>{props.companyName}</span>
        </p>
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
              placeholder="Email"
              name="email"
              type="email"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.email}
              startAdor={<Icon icon={<MailOutlineIcon />} />}
            />

            <div className={styles.customDiv}></div>
            <NormalTextField
              error={formik.errors.name}
              touched={formik.touched.name}
              placeholder="Full Name"
              name="name"
              type="name"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.name}
              startAdor={<Icon icon={<PermIdentityIcon />} />}
            />
            <div className={styles.button}>
              <PrimaryButton
                text="Invite"
                method={formik.handleSubmit}
                className={styles.modalBtn}
              />
            </div>
          </form>
        </FormikProvider>
      </section>
    </>
  );
};

export default InviteUserComponent;
