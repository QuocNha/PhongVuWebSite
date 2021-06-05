/*
*BZ0015            060321     Setup redux-saga for project
************************************************************************
*/
import '../styles/globals.css'
import wrapper from '../redux/stores'
import { AppProps } from 'next/app';
import React from 'react';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

