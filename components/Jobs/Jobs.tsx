import type { NextPage } from 'next';
import styles from './Jobs.module.scss';
import TextField_s from '../../shared/TextField/TextField_s';
import { useFormik } from 'formik';
import { emailYup, passwordYup } from '../../utilities/yupObjects';
import * as Yup from 'yup';
import PrimaryButton from '../../shared/PrimaryButton/PrimaryButton';
import { popUp, signUp } from './Jobs_API';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Candidate_Card from '../../shared/Candidate_Card/Candidate_Card';


const Jobs: NextPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList tabItemContainerStyle={{position: "fixed", bottom:"0"}} onChange={handleChange} aria-label="lab API tabs example">
            <Tab className={styles.tabs} label="Post Jobs" value="1" />
            <Tab className={styles.tabs} label="Search Candidates" value="2" />
            <Tab className={styles.tabs} label="Short-list" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" className={styles.card_parent}>
          <Candidate_Card />
          <Candidate_Card />
          <Candidate_Card />
          <Candidate_Card />
          <Candidate_Card />
          <Candidate_Card />
          <Candidate_Card />
          <Candidate_Card />
          <Candidate_Card />
        </TabPanel>
        <TabPanel value="2" className={styles.card_parent}>
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
        </TabPanel>
        <TabPanel value="3" className={styles.card_parent}>
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
          <Candidate_Card exp />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Jobs;
