/*
*BZ00017            050621     Create validaton for Yup to login user 
*BZ00018            050621     Create Page For admin User 
*BZ00019            060621     Using Token login for next reset
*BZ00020            060621     Get All User
*BZ00021            060621     Paganation for List User
*BZ00022            070621     Create addUserPages
************************************************************************
*/
import React,{useEffect, useState,useMemo} from'react';
import HeaderPage  from '../headerPage';
import { useSelector, useDispatch } from "react-redux";// BZ00016
import Router from 'next/router';
import {getUser,checkTokenUser,getAllUser} from '../../../../redux/actions/userActions';
import styles from './adminPases.module.scss';
import { Menu, Table ,Divider } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import AddUserPages from "./addUserPages"
const { SubMenu } = Menu;
const HomePage = () =>{
    const user = useSelector((state :any) => state.users);
    const usersGetALL = useSelector((state :any) => state.usersGetALL);
    const [checkAddPages,setCheckAddPages] = useState(true);
    
    const [isLoadingViewOrderHistories,setIsLoadingViewOrderHistories] = useState(false);
    const [listUser,setListUser] = useState([]);
    //BEGIN BZ00021
    const [page,setPage] = useState<number>(1);
    const [limit,setLimit] = useState<number>(10);

    //addUserPages, listUserPages
    const [pageUser,setPageUser] = useState<String>("listUserPages");
    
    //END BZ00021
    const dispatch = useDispatch();
    const handlersClickPageChange= async (e) =>{
        dispatch(getAllUser(e,limit));
        
    }
    const handlersClickPageAddUserChange= async (e) =>{
        setPageUser("addUserPages");

    }
    const handlersClickPageListUserPages= async (e) =>{
        setPageUser("listUserPages");

    }
    
    //BZ00021
    const computeExpensivePage = page => {
        return page;
      };
   //BZ00021 
        const memoPage = useMemo(() => computeExpensivePage(page), [page]);
        const memoPageChange = useMemo(() => computeExpensivePage(pageUser), [pageUser]);

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
        },
        {
            title: "IMG",
            dataIndex: "img",
            key: "img",
            render: (text) => {
                //console.log("Text"+text);
                  return (
                         <div><img src={text} alt="avatar" style={{ width: '100%' }} /></div>
                     )
                 }
        }
    ]
    useEffect(() => {
        //BEGIN  BZ00020 
        // setIsLoadingViewOrderHistories(true);
            dispatch(getAllUser(page,limit));
            // setIsLoadingViewOrderHistories(false);
        //END  BZ00020
        if (!(user.users)) {
            //BEGIN BZ00019
            dispatch(checkTokenUser());
           
            // Router.push('/');
            //END BZ00019 
        }
      }, [page]);

    //   console.log("listUser",listUser);
    //   console.log("listUser",usersGetALL);
    //   console.log("user",user);
      
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
            <Menu.Item key="1" icon={<MailOutlined />} onClick={handlersClickPageListUserPages}>List User</Menu.Item>
              <Menu.Item key="2" icon={<MailOutlined />} onClick={handlersClickPageAddUserChange}>Add User</Menu.Item>
              {/* <Menu.Item key="3" icon={<MailOutlined />}>Delete User</Menu.Item>
              <Menu.Item key="4"icon={<MailOutlined />}>Update User</Menu.Item> */}
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
        {pageUser && pageUser==="listUserPages"?
        <React.Fragment>
            <div className={styles.containerBodyRight}>
            <div className={styles.containerBodyRightTile}>
               <h1>User List</h1>
            </div>
            <div className={styles.containerBodyRightDataUser}>
            {/* BEGIN BZ00020 */}
            <Table
                //  loading={isLoadingViewOrderHistories}
                bordered
                columns={columns}
                 dataSource={
                      usersGetALL && usersGetALL.listUser ?usersGetALL.listUser.data:
                     []}
                 pagination={{
                    defaultCurrent:1,
                    total: usersGetALL && usersGetALL.listUser ?usersGetALL.listUser.userAllDataLength:0,
                    onChange:handlersClickPageChange
                }}                
                />
            {/* BEGIN BZ00020 */}
            </div>
        </div>

        </React.Fragment>
        :
        // BEGIN BZ00022
        pageUser && pageUser==="addUserPages"?
        <React.Fragment>
            <AddUserPages key="AddUserPages" checkAddPages={true}/>
        </React.Fragment>:""}
        {/* END BZ00022 */}
       
     </div>
     
     
        
 </React.Fragment>
}
export default HomePage;