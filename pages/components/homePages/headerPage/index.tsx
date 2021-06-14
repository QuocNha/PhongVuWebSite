/*
*BZ0004            032521     create a structure for the homepage
*BZ0005            032521     create a Header for the homepage
*BZ0006            040121     create a Slider for website
*BZ0008            050921     Edit Text for Adrress  header
*BZ00034           140621     Responsive for hearder.
************************************************************************
*/
import React,{useEffect} from "react";
import styles from './headerPages.module.scss';
import Link from 'next/link';
import FacebookIcon from '@material-ui/icons/Facebook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons//ShoppingCart';
import { useSelector, useDispatch } from "react-redux";

import { getUser } from '../../../../redux/actions/userActions';
import { Empty,Tag } from "antd";
import {UnorderedListOutlined}  from '@ant-design/icons';
import Router from 'next/router';
import Head from 'next/head'

const HeaderPage = (props:any) =>{
  const hadelerLoseUser = (eventkey) =>{
    Router.push('/'); 

  }
  return<React.Fragment>
       <Head key="Head">
        <title>PhongVu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
        <link rel="icon" href="/P.png" />
      </Head>
   <div id={styles.header}>
     <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerLogo}>
           <div className={styles.logo}>
             <h1><Link href='/'>Phong Van</Link></h1>
           </div>
          </div>
          <div className={styles.buttonListMenu}>
          <UnorderedListOutlined />
          </div>
          <div className={styles.headerContact}>
            <div className={styles.headerContactAdress}>
            {/* BEGIN BZ0008 */}
             <a className={styles.headerContactAdressForTel}>Tel: 0866085734</a>
             <a className={styles.headerContactAdressForAddress}>Address: Nong lam</a>
            {/* END BZ0008 */}
            </div>
            <div className={styles.reservationButton}><Link href='/components/homePages/homeSignUp'>Login for User</Link> 
            </div>      
          </div>
          <div className={styles.headerSaleIcon}>
            <div className={styles.headerSaleIcoList}>
               <Link href="/" ><a> <AccountCircleIcon className={styles.facebook} /></a></Link>
            </div>
            <div>{props && props !=Empty? <Tag key="tab" closable   onClose={hadelerLoseUser}>
                {props.data
                      }
                </Tag>:""}
            </div>
          </div>
        </div>
     </div>
     {/* Begin BZ0006 */}
     {/* <div id={styles.slider}>
     <iframe className={styles.iframe} src="https://my.matterport.com/show/?m=Re2dgaSVCRj&amp;hl=0&amp;title=1&amp;tourcta=1&amp;vrcoll=0&amp;dh=1&amp;mt=1&amp;lang=null" frameBorder="0" allow="vr" ></iframe> 

     </div> */}
      {/* END BZ0006 */}
  </div>
  </React.Fragment>
}
export default HeaderPage;