/*
*BZ0004            032521     create a structure for the homepage
*/
import React,{useEffect, useState} from'react';
import BodyPage from'./bodyPage';
import FooterPage from'./footerPage';
import HeaderPage  from './headerPage';

const HomePage = () =>{
    const a = useState(5);
    const number1111111111 = ()=>{
     

    }  
    useEffect(() => {
        // gọi woa redux
        number1111111111();
      },[] )
 return <React.Fragment>
     <HeaderPage key="HeaderPage"></HeaderPage>
     
     <BodyPage key="BodyPage"></BodyPage>
     <FooterPage key="FooterPage"></FooterPage> 
 </React.Fragment>
}
export default HomePage;