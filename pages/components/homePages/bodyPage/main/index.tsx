import React from 'react';
import { Menu, Table ,Divider,Tooltip,Button,Tag } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './main.module.scss';

const { SubMenu } = Menu;
const Main = (...props) =>{
    const handlersClickPageAddUserChange= async (e) =>{
        props[0].CallBackPageUser("addUserPages");
    }
    const handlersClickPageListUserPages= async (e) =>{
        props[0].CallBackPageUser("listUserPages");

    }    
return <React.Fragment>
<div className={styles.containerBodyLeft}>
         <Menu
         key="Menu"
        // onClick={this.handleClick}
        style={{ width: '100%' ,background:'#223a47'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
           <SubMenu key="sub1" icon={<MailOutlined key='MailOutlined'/>} title="User">
            <Menu.ItemGroup key="g1">
            <Menu.Item key="1" icon={<MailOutlined key='MailOutlined1'/>} onClick={handlersClickPageListUserPages}>List User</Menu.Item>
              <Menu.Item key="2" icon={<MailOutlined key='MailOutlined2'/>} onClick={handlersClickPageAddUserChange}>Add User</Menu.Item>
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
</React.Fragment>
}
export default Main; 
