/*
*BZ00017            050621     Create validaton for Yup to login user 
*BZ00018            050621     Create Page For admin User 
*BZ00019            060621     Using Token login for next reset
*BZ00020            060621     Get All User
*BZ00021            060621     Paganation for List User
*BZ00022            070621     Create addUserPages
*BZ00028            070621     Loading For AdminPages
*BZ00030            100621     Search for list User
*BZ00031            130621     Delete,Edit for user
*BZ00033          130621     Export excel  for user


************************************************************************
*/
import React,{useEffect, useState,useMemo,useCallback} from'react';
import HeaderPage  from '../headerPage';
import { useSelector, useDispatch } from "react-redux";// BZ00016
import Router from 'next/router';
import {getUser,checkTokenUser,getAllUser} from '../../../../redux/actions/userActions';
import styles from './adminPases.module.scss';
import { Menu, Table ,Divider,Tooltip,Button,Tag } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import AddUserPages from "./addUserPages";
import Loading from '../../../../utils/loading';//BZ00028
// import SearchAdmin from '../bodyPage/searchTime';
import SearchAdmin from '../bodyPage/searchText';
import deleteUserAPI from '../../../../constant.config.api/deleteUserAPI';
import exportUserForExcelAPI from '../../../../constant.config.api/exportUserForExcelAPI';
import Main from '../bodyPage/main';


const HomePage = () =>{
    const user = useSelector((state :any) => state.users);
    const usersGetALL = useSelector((state :any) => state.usersGetALL);
    const [checkAddPages,setCheckAddPages] = useState(true);
    const [lengthListUser, setLengthListuser]=useState();
    const [listUser,setListUser] = useState([]);
    //BEGIN BZ00031 
    const [yesNoAction,setYesNoAction] = useState(false);
    const [dataTableIndex,setDataTableIndex] = useState(0);
    const [typeAction,setTypeACtion] = useState('');
    const [email,setEmail] = useState('');
    const [userEdit,setUserEdit] = useState({});
    //END BZ00031
    
    
    
    //BEGIN BZ00021
    const [page,setPage] = useState<number>(1);
    const [limit,setLimit] = useState<number>(10);

    //addUserPages, listUserPages
    const [pageUser,setPageUser] = useState<String>("listUserPages");
    
    //END BZ00021
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState<Boolean>(true);//BZ00028

    const [userDataSearch,setUserDataSearch] = useState([]);
    const [checkResetSearch,setCheckResetSearch] = useState(false);
    const [lengthUserDataSearch,setLengthUserDataSearch] = useState(0);

    
    const handlersClickPageChange= async (e) =>{
        setIsLoading(false);//BZ00028
        dispatch(getAllUser(e,limit));
    }

    //BEGIN BZ00031
    const handerClickAction= async (index,type,data) =>{
        if(index!=null){
            setEmail(data.userName);
            setUserEdit(data);
            setYesNoAction(true);
            setDataTableIndex(index);
            setTypeACtion(type);    
        }
        // e.preventDefault();
        // console.log("handerClickAction",e)
        
    }
    const handerClickActionYesNo= async (checkAction,type) =>{
        // e.preventDefault();
        // console.log("handerClickAction",e.target.value)
        setIsLoading(false);
        if(checkAction===true && type=="DELETE"){
            //console.log("email",email);
            setYesNoAction(false);
            let data=await deleteUserAPI(email);
            setCheckResetSearch(false);
            dispatch(getAllUser(page,limit));
        }else if(checkAction===true && type=="EDIT"){
        setYesNoAction(false);
        }else{
            setYesNoAction(false);
        }
        setIsLoading(true);

    }
    //END BZ00031
    //* BEGIN BZ00033 
    const handelerExportExcel = async(e) =>{
        e.preventDefault();
        setIsLoading(false);
        await exportUserForExcelAPI(true);
        //console.log("***************************")
        setIsLoading(true);
    }
    //* BEGIN BZ00033
    
    //BEGIN BZ00021
    const computeExpensivePage = page => {
        return page;
      };
    //END BZ00021
    //BEGIN BZ00028
    const computeExpensiveUsersGetALL = usersGetALL => {
        if(usersGetALL!=""){
            setIsLoading(true);
            setLengthListuser(usersGetALL && usersGetALL.listUser ?usersGetALL.listUser.userAllDataLength:0);
            return usersGetALL;
        }
      };
    //END BZ00028
        const memoPage = useMemo(() => computeExpensivePage(page), [page]);
        const memoPageChange = useMemo(() => computeExpensivePage(pageUser), [pageUser]);
        const memoUsersGetALL = useMemo(() => computeExpensiveUsersGetALL(usersGetALL), [usersGetALL]);//BZ00028

        usersGetALL
    // console.log("user",user)
    const columns=[
        {
            title: "Number",
            dataIndex: "number",
            key: "number",
            // ...this.getColumnSearchProps("status"),
        },
        {
            title: "createAt",
            dataIndex: "createAt",
            key: "createAt",
            // ...this.getColumnSearchProps("content"),
        },
        {
            title: "userType",
            dataIndex: "userType",
            key: "userType",
            // ...this.getColumnSearchProps("content"),
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
            title: "Image",
            dataIndex: "img",
            key: "img",
            width: 150,
            render: (text) => {
                //console.log("Text"+text);
                  return (
                         <div><img src={text} alt="avatar" style={{ width: '100%' }} /></div>
                     )
                 }
        },
        //BEGIN BZ00031
        {
            title: "Action",
            key: "action",
            dataIndex:"action",
            render: (value, row, index) => {
                //console.log("Text"+value);
                //console.log("Data"+row);
                //console.log("Data"+index);
                  return (
                    <React.Fragment>
                    {yesNoAction===false || (yesNoAction===true && dataTableIndex!==index) ?
                    (
                    <div className={styles.dropAction}>
                    <div>
                    <Tooltip placement="top" title="Delete">
                        <Button type="primary" danger onClick={() => handerClickAction(index,'DELETE',row)}>
                            Delete
                        </Button> 
                    </Tooltip>
                    </div>
                    <div>
                    <Tooltip placement="top" title="Edit">
                        <Button type="primary" onClick={() => handerClickAction(index,'EDIT',row)}>
                            Edit
                        </Button> 
                      </Tooltip>
                    </div>      
                    </div>
                    )
                    :(yesNoAction===true && dataTableIndex===index)?
                    <React.Fragment>
                    <Tag color="blue" onClick={() => handerClickActionYesNo(true,typeAction)}>Yes</Tag>
                    <Tag color="red" onClick={() => handerClickActionYesNo(false,typeAction)}>No</Tag>
                    </React.Fragment>
                    : ""}    
                    </React.Fragment>  
                     )
                 }
        }
        //END BZ00031
    ];
    //BEGIN BZ00030
    const CallBackPageUser = useCallback((pageUser) => {
        setPageUser(pageUser);
      }, [pageUser]);
    const CallBackIsloading = useCallback((isloading) => {
        setIsLoading(isloading)
      }, [isLoading]);
    
    
    const CallBackIsUserDataSearch = useCallback((data,checkReset,lengthUserDataSearch) => {
        setUserDataSearch(data);
        setCheckResetSearch(checkReset);
        setLengthUserDataSearch(lengthUserDataSearch);
    }, [userDataSearch,checkResetSearch,lengthUserDataSearch]);
    //END BZ00030
    useEffect(() => {
        //BEGIN  BZ00020 
        // setIsLoadingViewOrderHistories(true);
        setIsLoading(false);
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
     <Loading isLoading={isLoading}></Loading>  {/* BZ00028 */}  
     <HeaderPage key="HeaderPage" {...user.users}></HeaderPage>
     </div>
     <div id={styles.containerBody}>
        <React.Fragment>
        <Main CallBackPageUser={CallBackPageUser}></Main>
        </React.Fragment>
        {pageUser && pageUser==="listUserPages"?
        <React.Fragment>
            <div className={styles.containerBodyRight}>
               <div className={styles.containerBodyRightTile}>
                 <h1>User List</h1>
               {/* BEGIN BZ00033 */}
               <div>
                <Button type="primary" onClick={handelerExportExcel}>Export ecxel</Button>
               </div>
               {/* END BZ00033 */}
               <SearchAdmin 
               lengthListUser={lengthListUser}
               CallBackIsloading={CallBackIsloading}
               CallBackIsUserDataSearch={CallBackIsUserDataSearch}
               ></SearchAdmin>{/* BZ00030 */}
            </div>
            <div className={styles.containerBodyRightDataUser}>
            {/* BEGIN BZ00020 */}
            {checkResetSearch===true?
            <Table
            //  loading={isLoadingViewOrderHistories}
            bordered
            columns={columns}
             dataSource={
                checkResetSearch===true?userDataSearch:
                usersGetALL && usersGetALL.listUser ?usersGetALL.listUser.data:
                 []}
             pagination={{
                defaultCurrent:1,
                total:  checkResetSearch===true?lengthUserDataSearch:lengthListUser,
               
            }}                
            />
            :
            <Table
                //  loading={isLoadingViewOrderHistories}
                bordered
                columns={columns}
                dataSource={usersGetALL && usersGetALL.listUser ?usersGetALL.listUser.data:[]}
                 pagination={{
                    defaultCurrent:1,
                    total:  lengthListUser,
                    onChange:handlersClickPageChange
                }}
                />
            }                        
                
            {/* BEGIN BZ00020 */}
            </div>
        </div>

        </React.Fragment>
        :
        // BEGIN BZ00022
        pageUser && pageUser==="addUserPages"?
        <React.Fragment>
            <AddUserPages key="AddUserPages"
             CallBackIsloading={CallBackIsloading}
             checkAddPages={true}
             />
        </React.Fragment>:""}
        {/* END BZ00022 */}
       
     </div>
     
     
        
 </React.Fragment>
}
export default HomePage;