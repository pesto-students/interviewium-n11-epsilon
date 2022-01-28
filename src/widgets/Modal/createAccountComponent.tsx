import styles from "./index.module.scss";
import { useFormik, FormikProvider } from "formik";
import { accountName, decriptionYup } from "utilities/yupObjects";
import NormalTextField from "widgets/NormalTextField";
import PrimaryButton from "widgets/PrimaryButton";
import * as Yup from "yup";
import { AddUser, LockIcon, Sheilduser } from "../../utilities/images/icons/index";
import { useEffect, useState } from "react";
import Icon from 'widgets/IconComponent'
import TextArea from "widgets/TextArea";
import { Switch } from "@material-ui/core";
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const CreateAccountComponent = (props) => {


  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (props.resetForm) {
      formik.resetForm();
    }
  }, [props.resetForm]);

  const loginSchema = Yup.object().shape({
    accountName: accountName,
    subDomain: decriptionYup,
  });

  const formik = useFormik({
    initialValues: {
      accountName: false,
      subDomain: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      props.postVerditHandler(values);
      props.hide()
    },
  });

  const onSwitchChange = (e) => {
    setCheck(e.target.checked)
    formik.values.accountName = check
  }

  const IOSSwitch : any = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props } : any) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <>
      <Sheilduser className={styles.modalTopIcon} />
      <h5 className={styles.commonTitle}>
        <strong>Candidate</strong>&nbsp;<span>Verdit</span>
      </h5>
      <FormikProvider value={formik}>
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              formik.handleSubmit();
            }
          }}
        >
           <FormControlLabel
        control={<IOSSwitch checked={check} onChange={(e) => onSwitchChange(e)}name="checkedB" />}
        label="Check if candiate PASSED"
      />
          {/* <Switch value={accountName} onChange={(e) => onSwitchChange(e)}/> */}
          <div className={styles.customDiv}></div>
          <TextArea
            error={formik.errors.subDomain}
            touched={formik.touched.subDomain}
            placeholder="Sub Domain"
            name="subDomain"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.subDomain}
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
