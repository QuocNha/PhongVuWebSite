/*
*BZ00011            160521     create a structure for the homepage
*BZ00012            160521     Create validaton with Yup
*BZ00016            030621     Create Login user to mongoDB
*BZ00017            050621     Create validaton for Yup to login user 
************************************************************************
*/
import React,{useEffect,useState,useMemo} from "react";
import styles from './homeSignUp.module.scss';
//BEGIN BZ00012
import { isEmptyChildren, useFormik } from 'formik';
import * as Yup from "yup";
// END BZ00012
import { InputLabel,Input,Grid,TextField, Divider, Typography, Button, Paper, MenuItem, Collapse, IconButton, Badge, ListItem, ListItemIcon, List, ListItemText } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";// BZ00016
import {getUser} from '../../../../redux/actions/userActions';
const homeSignUp = () =>{
    //BEGIN BZ00016
    const dispatch = useDispatch();
    const state = useSelector((state :any) => state.users);
    const [userID , setUserID] = useState<String>('');
    const [userPasword , setuserPasword] =useState<String>('');
    const computeExpenUserValue = (userIDBefor , userPaswordBefor)=>{
        let result={
            userID:'',
            userPasword:''
        }
        if(userIDBefor!='' && userPaswordBefor!=''){     
                   result.userID=userIDBefor;
                   result.userPasword=userPaswordBefor;
                   dispatch(getUser(result));
                   return result;
        }
             
    }
    //BEGIN BZ00016
    const formik = useFormik({
        initialValues: {
        email: '',
        password:''
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
                dispatch(getUser(result));
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
        <div id={styles.homeSignUp}>
            <div className={styles.homeSignUpForBorder}>
                <div className={styles.titleHolder}>
                    <Grid container>
                        <h2>
                            <span>Sign Up</span>
                        Subscribe to your email  newsletter
                    </h2>
                    </Grid>
                </div>
                <div className={styles.container}>
                    {/* BEGIN BZ00012 */}
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item lg={12}>
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
                            </Grid>
                            <Grid item lg={12}>
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

                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={styles.button}
                        >
                            Submit
                        </Button>
                    </form>
                    {/* END BZ00012 */}
                </div>
            </div>
        </div>
</React.Fragment>
}
export default homeSignUp;