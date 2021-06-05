/*
*BZ00017            050621     Create validaton for Yup to login user 
*BZ00018            050621     Create Page For admin User 
************************************************************************
*/
import React,{useEffect, useState} from'react';
import HeaderPage  from '../headerPage';
import { useSelector, useDispatch } from "react-redux";// BZ00016
import Router from 'next/router';
import {getUser} from '../../../../redux/actions/userActions';
import styles from './adminPases.module.scss';
import { Menu, Table } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
const { SubMenu } = Menu;
const HomePage = () =>{
    const user = useSelector((state :any) => state.users);
    const dispatch = useDispatch();
    console.log("user",user)
    const columns=[
        {
            title: "Number",
            dataIndex: "Number",
            key: "Number",
            // ...this.getColumnSearchProps("status"),
        },
        {
            title: "UserName",
            dataIndex: "UserName",
            key: "UserName",
            // ...this.getColumnSearchProps("content"),
        },
        {
            title: "UserRole",
            dataIndex: "UserRole",
            key: "UserRole",
            // ...this.getColumnSearchProps("content"),
        }
    ]
    useEffect(() => {
        if (!(user.users)) {
            Router.push('/'); 
        }
        
      }, [user])
 return <React.Fragment>
     <div id={styles.containerHeader}>
     <HeaderPage key="HeaderPage"></HeaderPage>
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
              <Menu.Item key="1" icon={<MailOutlined />}>Add User</Menu.Item>
              <Menu.Item key="2" icon={<MailOutlined />}>Delete User</Menu.Item>
              <Menu.Item key="3"icon={<MailOutlined />}>Update User</Menu.Item>
            </Menu.ItemGroup> 
           </SubMenu>
           <Divider key="Divider" style={{height:'5px',background:"white"}}></Divider>
           <SubMenu key="sub2" icon={<MailOutlined />} title="User">
            <Menu.ItemGroup key="g1">
              <Menu.Item key="1" icon={<MailOutlined />}>Add User</Menu.Item>
              <Menu.Item key="2" icon={<MailOutlined />}>Delete User</Menu.Item>
              <Menu.Item key="3"icon={<MailOutlined />}>Update User</Menu.Item>
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
                // loading={this.props.isLoadingViewOrderHistories}
                bordered
                columns={columns}
                // dataSource={orderHistories}
                // pagination={defaultPageSize}                
                />

            </div>
        </div>
       
     </div>
     
     
        
 </React.Fragment>
}
export default HomePage;