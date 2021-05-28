/*
*BZ0004            032521     create a structure for the homepage
*/
import React from'react';
import BodyPage from'./bodyPage';
import FooterPage from'./footerPage';
import HeaderPage  from './headerPage';

const HomePage = () =>{
 return <React.Fragment>
     <HeaderPage key="HeaderPage"></HeaderPage>
     <BodyPage key="BodyPage"></BodyPage>
     <FooterPage key="FooterPage"></FooterPage> 
 </React.Fragment>
}
export default HomePage;