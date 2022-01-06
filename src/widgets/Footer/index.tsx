import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const Footer = ({ name }) => {
    return (
        
        <div className={`col-lg-12 ${styles.footerBackground}`}>
            
            <div >
                <label className="m-0">Copyright <span>&#169;</span>2021 All rights reserved | This template is made by {name}</label>
            </div>
            <div >
                <Link className={styles.footerLinks} to='/user/profile' target="_blank" download>ABOUT </Link>
                <Link className={styles.footerLinks} to='/user/profile' target="_blank" download>SERVICES </Link>
                <Link className={styles.footerLinks} to='/user/profile' target="_blank" download>COMPANY </Link>
                <Link className={styles.footerLinks} to='/user/profile' target="_blank" download>PRICING </Link>
            </div>
        </div>);
};

export const MemoizedFooter = React.memo(Footer);
