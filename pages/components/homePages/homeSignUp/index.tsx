/*
*BZ00011            160521     create a structure for the homepage
*BZ00012            160521     Create validaton with Yup
************************************************************************
*/
import React from "react";
import styles from './homeSignUp.module.scss';
import HeaderPage  from '../headerPage';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//BEGIN BZ00012
import { useFormik } from 'formik';
import * as Yup from "yup";
// END BZ00012
import { InputLabel,Input,Grid,TextField, Divider, Typography, Button, Paper, MenuItem, Collapse, IconButton, Badge, ListItem, ListItemIcon, List, ListItemText } from '@material-ui/core';

const homeSignUp = () =>{
    const formik = useFormik({
        initialValues: {
        email: '',
        firstName:''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required*'),
            email: Yup.string().email()
              .max(20, 'Must be 20 characters or less')
              .required('Required*'),
            }),
        onSubmit: values => {
                  console.log(formik.errors.email);

        },
      });
    return <React.Fragment>
    <HeaderPage></HeaderPage>
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