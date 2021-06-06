/*
*BZ00017            050621     Create validaton for Yup to login user 
*BZ00018            050621     Create Page For admin User 
*BZ00019            060621     Using Token login for next reset
*BZ00020            060621     Get All User
************************************************************************
*/
import React,{useEffect, useState} from'react';
import HeaderPage  from '../headerPage';
import { useSelector, useDispatch } from "react-redux";// BZ00016
import Router from 'next/router';
import {getUser,checkTokenUser,getAllUser} from '../../../../redux/actions/userActions';
import styles from './adminPases.module.scss';
import { Menu, Table ,Divider } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const HomePage = () =>{
    const user = useSelector((state :any) => state.users);
    const usersGetALL = useSelector((state :any) => state.usersGetALL);
    const [isLoadingViewOrderHistories,setIsLoadingViewOrderHistories] = useState(false);
    const [listUser,setListUser] = useState([]);
    const dispatch = useDispatch();
    // console.log("user",user)
    const columns=[
        {
            title: "Number",
            dataIndex: "number",
            key: "number",
            // ...this.getColumnSearchProps("status"),
        },
        {
            title: "UserName",
            dataIndex: "userName",
            key: "userName",
            // ...this.getColumnSearchProps("content"),
        },
        {
            title: "UserRole",
            dataIndex: "userRole",
            key: "userRole",
            // ...this.getColumnSearchProps("content"),
        }
    ]
    useEffect(() => {
        //BEGIN  BZ00020 
        // setIsLoadingViewOrderHistories(true);
            dispatch(getAllUser());
            // setIsLoadingViewOrderHistories(false);
        //END  BZ00020
        if (!(user.users)) {
            //BEGIN BZ00019
            dispatch(checkTokenUser());
           
            // Router.push('/');
            //END BZ00019 
        }
      }, []);

      console.log("listUser",listUser);
      console.log("listUser",usersGetALL);
      console.log("user",user);
      
 return <React.Fragment>
     <div id={styles.containerHeader}>
     <HeaderPage key="HeaderPage" {...user.users}></HeaderPage>
     </div>
     <div id={styles.containerBody}>
         <div className={styles.containerBodyLeft}>
         <Menu
         key="Menu"
        // onClick={this.handleClick}
        style={{ width: '100%' ,background:'#223a47'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
           <SubMenu key="sub1" icon={<MailOutlined />} title="User">
            <Menu.ItemGroup key="g1">
            <Menu.Item key="1" icon={<MailOutlined />}>List User</Menu.Item>
              <Menu.Item key="2" icon={<MailOutlined />}>Add User</Menu.Item>
              <Menu.Item key="3" icon={<MailOutlined />}>Delete User</Menu.Item>
              <Menu.Item key="4"icon={<MailOutlined />}>Update User</Menu.Item>
            </Menu.ItemGroup> 
           </SubMenu>
           <Divider key="Divider" style={{height:'5px',background:"white"}}></Divider>
           <SubMenu key="sub2" icon={<MailOutlined />} title="User">
            <Menu.ItemGroup key="g2">
              <Menu.Item key="5" icon={<MailOutlined />}>Add User</Menu.Item>
              <Menu.Item key="6" icon={<MailOutlined />}>Delete User</Menu.Item>
              <Menu.Item key="7"icon={<MailOutlined />}>Update User</Menu.Item>
            </Menu.ItemGroup> 
           </SubMenu>
        </Menu>
             
        </div>
        <div className={styles.containerBodyRight}>
            <div className={styles.containerBodyRightTile}>
               <h1>User List</h1>
            </div>
            <div className={styles.containerBodyRightDataUser}>
            <Table
                //  loading={isLoadingViewOrderHistories}
                bordered
                columns={columns}
                 dataSource={usersGetALL?usersGetALL.listUser:[]}
                // pagination={defaultPageSize}                
                />

            </div>
        </div>
       
     </div>
     
     
        
 </React.Fragment>
}
export default HomePage;