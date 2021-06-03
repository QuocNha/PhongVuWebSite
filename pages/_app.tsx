/*
*BZ0015            060321     Setup redux-saga for project
************************************************************************
*/
import '../styles/globals.css'
import wrapper from '../redux/stores'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

