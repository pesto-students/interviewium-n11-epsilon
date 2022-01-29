// @flow
import { hot } from 'react-hot-loader/root'
import PageRoutes from './pageRoutes'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './_store/reducer/rootReducer'
import { save } from './_store/actions/user'
import Cookies from 'js-cookie'
import { setPathPage } from './_store/actions/pathPage'
import { sidebarItemsMap } from './widgets/SideBar/sidebarItems'
import { Snackbar } from '@material-ui/core'
import { SUCCESS_MESSAGE } from '_store/constants'
import styles from './App.module.scss'
const App = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [messageId, setMessageId] = useState<string>('')
  const [user, setUsers] = useState<any>(null)

  const [message] = useSelector((state: RootState) => {
    if (state.message.id && messageId !== state.message.id) {
      setMessageId(state.message.id);
    }
    return [state.message];
  })

  useSelector((state: RootState) => {
    if (state.user.user && user !== state.user.user) {
      setUsers(state.user.user);
    }
    return [state.user];
  })

  const handlePathChange = async () => {
    let newPathPage
    if(user) {
      sidebarItemsMap?.get(user?.role)?.forEach((item) => {
        if (item.path === location.pathname) {
          newPathPage = { itemPathPage: item.path }
          return
        }
        item?.subItems?.forEach((subItem) => {
          if (subItem.path === location.pathname) {
            newPathPage = { itemPathPage: item.title, subItemPathPage: subItem.path }
            return
          }
        })
      })
      dispatch(setPathPage(newPathPage))
    }
    
  }
  useEffect(() => {
    handlePathChange()
  }, [location?.pathname])

  // const fetchSportsData = async () => {
  //   try {
  //     const data = await getAllSports();
  //     const { status }: any = data;
  //     let { body }: any = data;
  //     if (status === 200) {
  //       body = body.map(item => ({...item, checked: false}));
  //       dispatch(saveSport(body));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (localStorage.getItem('user') && Cookies.get('token')) {
      dispatch(save(JSON.parse(localStorage.getItem('user')!)))
    }
    else if (!localStorage.getItem('user') && !Cookies.get('token')) {
      dispatch(save(JSON.parse(localStorage.getItem('user')!)))
    }
  }, [localStorage.getItem('user'), Cookies.get('token')])

  useEffect(() => {
    handlePathChange();    
  }, [])

  return (
    <>
     <Snackbar
        onClose={() => setOpen(!open!)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
        open={open}
        message={message ? message.message : 'message'}
        key='snackbar'
        className={`${message.type === SUCCESS_MESSAGE ? styles.snackbar_success : styles.snackbar_error}`}
      />
      <PageRoutes />
    </>
  )
}

export default hot(App)
