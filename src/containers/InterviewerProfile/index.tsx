import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LinkIcon from '@material-ui/icons/Link';
import BusinessIcon from '@material-ui/icons/Business';
import ExploreIcon from '@material-ui/icons/Explore';


import styles from './index.module.scss'
import { ERROR_MESSAGE } from '_store/constants';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { interviewersProfile } from '_store/apis/userManagementAPI';

const CustomerHome = () => {

    const [data, setData] = useState<any>();
    const dispatch = useDispatch();

    useEffect(() => {
        interviewerProfileHandler();
    }, []);
    
    
    const interviewerProfileHandler = async () => {
        try {
          let data;
          data = await interviewersProfile();
          let { body, status }: any = data;
          if (status === 200) {
            setData(body);
          } else {
            dispatch({ type: ERROR_MESSAGE, payload: 'Something went wrong' });
          }
        } catch (err) {
          console.log(err);
          dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' });
        }
      };

    return (
        <div className={styles.container}>
          <div className={styles.component}>
              <img src='https://i.ibb.co/yNGW4gg/avatar.png' alt='user' />
              <div className={styles.userName}>{data?.name}</div>
          </div>
          <div className={styles.component1}>
          <List >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Name" secondary={data?.name} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Email" secondary={data?.email} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LinkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Calendly Link" secondary={data?.calendlyLink} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BusinessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Company Name" secondary={data?.company?.companyName} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ExploreIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Company Email Domain Name" secondary={data?.company?.companyEmailDomainName} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
          </div>
        </div>
    )
}

export default CustomerHome
