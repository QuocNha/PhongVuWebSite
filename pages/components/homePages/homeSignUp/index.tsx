/*
*BZ00011            160521     create a structure for the homepage
*BZ00012            160521     Create validaton with Yup
*BZ00016            030621     Create Login user to mongoDB 
************************************************************************
*/
import React,{useEffect,useState,useMemo} from "react";
import styles from './homeSignUp.module.scss';
import HeaderPage  from '../headerPage';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//BEGIN BZ00012
import { isEmptyChildren, useFormik } from 'formik';
import * as Yup from "yup";
// END BZ00012
import { InputLabel,Input,Grid,TextField, Divider, Typography, Button, Paper, MenuItem, Collapse, IconButton, Badge, ListItem, ListItemIcon, List, ListItemText } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";// BZ00016

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
                   return result
        }
             
    }
    const memoLogin = useMemo(() => computeExpenUserValue(userID, userPasword), [userID, userPasword]);
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
            }),
        onSubmit: values => {
            //BEGIN BZ00016
            if(values.email!="" && values.password!=""){
                setUserID(values.email);
                setuserPasword(values.password);
            }
            //END BZ00016
        },
      });
    //BEGIN BZ00016
      useEffect(() => {
          const handellerLogin = (memoLogin)=>{
              if(memoLogin.email !=null &&  memoLogin.userPasword !=null)
            console.log(memoLogin);
          } 
          handellerLogin(memoLogin);  
    }, [memoLogin]);
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
                              <div >{formik.errors.email}</div>
                            ) : null}
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