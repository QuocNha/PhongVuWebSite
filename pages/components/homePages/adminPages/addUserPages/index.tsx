/*
*BZ00022            070621     Create addUserPages
*BZ00023            070621     Convert files to Base64 in React
*BZ00024            080621     Create validation for userPages using Formik and Yub
*BZ00025            080621     Create AddUser API
************************************************************************
*/
import React, { useState,useMemo } from 'react';
import styles from './addUserPages.module.scss';
import {Input,Upload, message,Button } from 'antd';

import { UserOutlined,LoadingOutlined ,UploadOutlined,PlusOutlined} from '@ant-design/icons';
//BEGIN BZ00024
import { isEmptyChildren, useFormik } from 'formik';
import * as Yup from "yup";//BZ00025
import { useSelector, useDispatch } from "react-redux";// BZ00025
import addUserAPI from '../../../../../constant.config.api/addUserAPI';
import {getUser,checkTokenUser,getAllUser,addUser,IUserForAdd} from '../../../../../redux/actions/userActions';//BZ00025

//END BZ00024 checkAddPages

const AddUserPages = (props) =>{
    const dispatch = useDispatch();//BZ00025
    // BEGIN BZ00023
    const [imageUrl,setImageUrl] = useState();
    const [loading,setLoading] = useState(false);
    const [userName,setUserName] =useState("");
    const [addUserSuccess,setAddUserSuccess] = useState(false);
    const HandelersNextAddUser = () =>{
        setAddUserSuccess(false);
    }
    const getBase64 = (file, cb) =>{
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
   const handlersChangeIMG = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
        }
        console.log("info.file.status",info.file.status);
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            // console.log("info.file.originFileObj"+info.file.originFileObj);
            getBase64(info.file.originFileObj, (result) => {
                setImageUrl(result);
           });
           
        }
   }    
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );
      //BEGIN BZ00024
      const formik = useFormik({
        initialValues: {
        email: '',
        firstName:'',
        lastName:'',
        address1:''
        },
        validationSchema: Yup.object({
            email: Yup.string().email()
              .max(20, 'Must be 20 characters or less')
              .required('Required*'),
              firstName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required*'),
              lastName: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required*'),
              address1:Yup.string().required('Required*'),
            }),
        onSubmit: async(values) => {
            //BEGIN BZ00025
            // console.log("addmin User Add "+values);
            let result={
                email:values.email,
                firstName:values.firstName,
                lastName:values.lastName,
                address1:values.address1,
                img:imageUrl
            }
            if(!result){
                return ;
            }else{
               const data = await  addUserAPI(result);
               //console.log("data11111111111111111111111111111"+data);
               if(data.status===200){
                setAddUserSuccess(true);
                setUserName(data.data.data.email);
               }
            }
            //END BZ00025
        },
      });
      //END BZ00024  
    // END BZ00023  
   return <React.Fragment>
       <div className={styles.container}>
           <div className={styles.containerAddUserTile}>
               <h1>User List</h1>
            </div>
            {props.checkAddPages===true && addUserSuccess==false ?
            <React.Fragment>
                {/* BEGIN BZ00024 */}
            <div className={styles.containerFormUserADD}>
                 <form 
                    id={styles.userForm} 
                    onSubmit={formik.handleSubmit}
                 >
                    <div >
                    {formik.touched.email && formik.errors.email ? (
                            <div className={styles.errorText}>{formik.errors.email}</div>
                            ) 
                            // : 
                            // (state.error && state.error!=null)? <div className={styles.errorText}>{state.error.errors}</div>
                            :
                            null}    
                    <Input
                        size="small" placeholder="Email" prefix={<UserOutlined />} 
                        id="email"
                        name="email"
                        type="email"
                        required={true}
                        className={styles.input}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        />
                    </div> 
                    <div className={styles.firstAndLast}>
                    {formik.touched.firstName && formik.errors.firstName ? (
                            <div className={styles.errorText}>{formik.errors.firstName}</div>
                            ) 
                            // : 
                            // (state.error && state.error!=null)? <div className={styles.errorText}>{state.error.errors}</div>
                            :
                            null}
                    <Input
                        size="small" placeholder="First Name" prefix={<UserOutlined />} 
                        id="firstName"
                        name="firstName"
                        type="firstName"
                        required={true}
                        className={styles.inputLastName}
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    {/* <Input
                        
                        required={true}
                        className={styles.inputHide}
                        // onChange={formik.handleChange}
                        // value={formik.values.email}
                        /> */}
                    {formik.touched.lastName && formik.errors.lastName ? (
                            <div className={styles.errorText}>{formik.errors.lastName}</div>
                            ) 
                            // : 
                            // (state.error && state.error!=null)? <div className={styles.errorText}>{state.error.errors}</div>
                            :
                            null}    
                    <Input
                        size="small" placeholder="Last Name" prefix={<UserOutlined />} 
                        id="lastName"
                        name="lastName"
                        type="lastName"
                        required={true}
                        className={styles.inputLastName}
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        />    
                    </div>   
                    <div>
                    {formik.touched.address1 && formik.errors.address1 ? (
                            <div className={styles.errorText}>{formik.errors.address1}</div>
                            ) 
                            // : 
                            // (state.error && state.error!=null)? <div className={styles.errorText}>{state.error.errors}</div>
                            :
                            null}    
                    <Input
                        size="small" placeholder="Adress" prefix={<UserOutlined />} 
                        id="address1"
                        name="address1"
                        type="address1"
                        required={true}
                        className={styles.input}
                        onChange={formik.handleChange}
                        value={formik.values.address1}
                    />
                    </div>    
                    <div>
                        {/* BEGIN BZ00023 */}
                        <Upload
                           name="avatar"
                           listType="picture-card"
                           className="avatar-uploader"
                           showUploadList={false}
                        //    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        //    beforeUpload={beforeUpload}
                            onChange={handlersChangeIMG}
                        >
    
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                        <Button type="primary" htmlType="submit">
                         Submit
                        </Button>
                        {/* END BZ00023 */}
                        
                    </div>           
                 </form>    
            {/* END BZ00024 */}   
            </div>

            </React.Fragment>
             :(props.checkAddPages===true && addUserSuccess===true)?
             <React.Fragment>
                 <div>
                     Tạo user thành công +{userName}

                 </div>
                 <div>
                 <Button 
                 onClick={HandelersNextAddUser}
                 type="primary" htmlType="submit">
                         next Add
                </Button>
                 </div>
             </React.Fragment>
            :
            ""
            }
            
            
       </div>


   </React.Fragment>
}
export default AddUserPages;