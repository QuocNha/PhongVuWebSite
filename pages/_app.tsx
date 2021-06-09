/*
*BZ0015            060321     Setup redux-saga for project
************************************************************************
*/
import '../styles/globals.css'
import wrapper from '../redux/stores'
import { AppProps } from 'next/app';
import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

