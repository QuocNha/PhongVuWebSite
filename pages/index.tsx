/*
*BZ0004            032521     create a structure for the homepage
*/
import Head from 'next/head'
import React from 'react'
import HomeSignUp from'./components/homePages/homeSignUp';
import styles from './pages.module.scss';
import HeaderPage  from '../pages/components/homePages/headerPage';
import ReactLoading from 'react-loading';
export default function Home() {
  return (
    <React.Fragment>
      <Head key="Head">
        <title>PhongVu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
        <link rel="icon" href="/P.png" />
      </Head>
      <div className="root">
        {/* <HomePage key="HomePage"></HomePage> */}
        {/* <HeaderPage></HeaderPage> */}
          <HomeSignUp key="HomeSignUp"></HomeSignUp>
      </div>
    </React.Fragment>
  )
}
