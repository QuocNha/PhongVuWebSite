import Head from 'next/head'
import React from 'react'
/*
*BZ0004            032521     create a structure for the homepage
*/
import styles from '../styles/Home.module.css';
import HomePage from'./components/homePages';

export default function Home() {
  return (
    <React.Fragment>
      <Head key="Head">
        <title>IBum-BiI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="root">
        <HomePage key="HomePage"></HomePage>
      </div>
    </React.Fragment>
  )
}
