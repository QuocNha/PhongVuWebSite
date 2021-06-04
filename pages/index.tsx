import Head from 'next/head'
import React from 'react'
/*
*BZ0004            032521     create a structure for the homepage
*/
import HomeSignUp from'./components/homePages/homeSignUp';
import styles from './pages.module.scss';
import HeaderPage  from '../pages/components/homePages/headerPage';
export default function Home() {
  return (
    <React.Fragment>
      <Head key="Head">
        <title>IBum-BiI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="root">
        {/* <HomePage key="HomePage"></HomePage> */}
        {/* <HeaderPage></HeaderPage> */}
        <div className={styles.container}>
          <div className={styles.containerImg}>
          </div>
          <div className={styles.containerFormLogin}>
          <HomeSignUp key="HomeSignUp"></HomeSignUp>
          </div> 
        </div>

         
      </div>
    </React.Fragment>
  )
}