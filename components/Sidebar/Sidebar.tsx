import type { NextPage } from 'next';
import styles from './Sidebar.module.scss';
import Home from '../../public/icons/home'
import { useEffect, useState } from 'react';
import { sidebarItemsMap } from './sidebarItems';
import Jobs from '../Jobs/Jobs';

const Sidebar: NextPage = () => {

  const [userRole, setUserRole] = useState('')
  
  useEffect(() => {
    let userRole : any = localStorage.getItem('role')
    setUserRole(userRole)
  }, [])
  
  return (
    <div className={styles.container}>
    {/* <div id={styles.nav}>Navbar</div> */}
    <div id={styles.sidebar}>
      <div className={styles.sidebar_ele}>
        <div className={styles.icon_name}>
          <div className={styles.company_name}><span style={{fontSize : 30 , margin : 0}}>I</span>nterviewium</div>
          </div>
      </div>
{ sidebarItemsMap.get(userRole) && sidebarItemsMap.get(userRole).length &&
  sidebarItemsMap.get(userRole).map((e : any , index : any) => (
  <div key={index} className={styles.sidebar_ele}>
          <div className={styles.sidebar_ele_active}></div>
          <div className={styles.icon_name}>
            <div className={styles.icon}><Home h={18} w={18}/></div>
            <div className={styles.sidebar_text}>{e.Title}</div>
            </div>
        </div>
  ))
}
     
      <div className={styles.sidebar_ele}>
        <div className={styles.sidebar_ele_active}></div>
        <div className={styles.icon_name}>
          <div className={styles.icon}><Home h={18} w={18}/></div>
          <div className={styles.sidebar_text}>Logout</div>
          </div>
      </div>
    </div>
    <div id={styles.main}>
    {/* { sidebarItemsMap.get(userRole) && sidebarItemsMap.get(userRole).length &&
  sidebarItemsMap.get(userRole).map((e : any , index : any) => (
    <e.Component key={index} /> 
  ))
} */}
    <Jobs />
    </div>
    {/* <main>
        <div id='main-ele'>1</div>
        <div id='main-ele'>1</div>
        <div id='main-ele'>1</div>
    </main>
    <div id="content1">Content1</div>
    <div id="rightbar">Content4
        <div id='r1'>2</div>
        <div id='r2'>2</div>
    </div>
    <footer>
        <div id='f1'>2</div>
        <div id='f2'>2</div>
    </footer> */}
    
  </div>
  
  );
};

export default Sidebar;
