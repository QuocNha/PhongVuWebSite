/*
*BZ00011            160521     create a structure for the homepage
*BZ00012            160521     Create validaton with Yup
*BZ00016            030621     Create Login user to mongoDB
*BZ00017            050621     Create validaton for Yup to login user 
*BZ00027            090621     Install react-loading for project

************************************************************************
*/

import React,{useEffect,useState,useMemo} from "react";
import styles from './homeSignUp.module.scss';
import Head from 'next/head'
//BEGIN BZ00012
import { isEmptyChildren, useFormik } from 'formik';
import * as Yup from "yup";
// END BZ00012
import { InputLabel,Input,Grid,TextField, Divider, Typography, Button, Paper, MenuItem, Collapse, IconButton, Badge, ListItem, ListItemIcon, List, ListItemText } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";// BZ00016
import {getUser} from '../../../../redux/actions/userActions';
import Loading from '../../../../utils/loading';//BZ00027



const homeSignUp = () =>{
    //BEGIN BZ00016
    const dispatch = useDispatch();
    const state = useSelector((state :any) => state.users);
    const [errorUser,setErrorUser] =useState(state.error?state.error.error:""); 
    const [isLoading,setIsLoading] = useState<Boolean>(true);//BZ00027
    const [userID , setUserID] = useState<String>('');
    const [userPasword , setuserPasword] =useState<String>('');
    const [user,setUser] =useState ({
        userID:'',
        userPasword:''
    });
    //END BZ00027
    //BEGIN BZ00027
      const computeExpensiveUser = page => {
          if(page!==null && page.userID!=="" && page.userPasword!==''){
            setIsLoading(false);
            dispatch(getUser(page));
            return page;
          }
      };
      const computeExpensiveErrorUser = errorUser => {
        if( errorUser!==""){
          setIsLoading(true);
          return errorUser;
        }   
    };
    const memoUserlogin = useMemo(() => computeExpensiveUser(user), [user]);
    const memoErrorUser = useMemo(() => computeExpensiveErrorUser(state), [state]);
    //END BZ00027
    
    // const memoIsLoanding = useMemo(() => computeExpensiveIsLoanding ( ), [user]);


    //BEGIN BZ00016
    const formik = useFormik({
        initialValues: {
        email: 'quocnha@gmail.com',
        password:'15242635'
        },
        validationSchema: Yup.object({
            email: Yup.string().email()
              .max(20, 'Must be 20 characters or less')
              .required('Required*'),
              password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required*'),
            }),
        onSubmit: values => {
            //BEGIN BZ00016
            let result={
                userID:'',
                userPasword:''
            }
            if(values.email!="" && values.password!=""){
                setUserID(values.email);
                setuserPasword(values.password);
                result.userID=values.email;
                result.userPasword=values.password;
                setUser(result);
               
            }
            //END BZ00016
        },
      });
    //BEGIN BZ00016
      useEffect(() => {
            
    }, []);
    // console.log("state111111111111111",state);
    //END BZ00016
    return <React.Fragment>
    <Head key="Head">
        <title>PhongVu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
        <link rel="icon" href="/P.png" />
    </Head>
        <div id={styles.homeSignUp}>
            <div className={styles.homeSignUpForBorder}>
                <div className={styles.titleHolder}>
                    <div></div>
                    <div>
                    <span>Sign Up</span>
                    <h2>
                        Subscribe to your email  newsletter
                    </h2>
                    </div>  
                </div>   
                <div className={styles.container}>
                    <Loading isLoading={isLoading}></Loading>  {/* BZ00027 */}  
                    {/* BEGIN BZ00012 */}
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.containerForm}>
                            <div className={styles.containerFormEmail}>
                                <InputLabel htmlFor="email">Email Address :</InputLabel>
                                {formik.touched.email && formik.errors.email ? (
                              <div className={styles.errorText}>{formik.errors.email}</div>
                            ) : (state.error && state.error!=null)? <div className={styles.errorText}>{state.error.errors}</div>:null}
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required={true}
                                    className={styles.input}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </div>
                            <div className={styles.containerFormEmail}>
                                <InputLabel htmlFor="email">PassWorld :</InputLabel>
                                {/* BEGIN BZ00017  */}
                                {formik.touched.password && formik.errors.password ? (
                              <div className={styles.errorText}>{formik.errors.password }</div>
                              ) : null}
                                {/* END BZ00017 */}
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className={styles.input}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />

                            </div>
                        </div>
                        <div className={styles.containerFormButton}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={styles.button}
                        >
                            Submit
                        </Button>
                        </div>
                        
                    </form>
                    {/* END BZ00012 */}
                </div>
            </div>
            <div className={styles.footer}>
            </div>
        </div>
        
</React.Fragment>
}
export default homeSignUp;