import styles from './index.module.scss'
import {Navbar} from 'react-bootstrap' 

const AppBar=()=>{
    return (<Navbar className={styles.nav_bar} variant='dark'><Navbar.Brand className={styles.company_title}>Invimatic</Navbar.Brand></Navbar>)
}    
 

export default AppBar