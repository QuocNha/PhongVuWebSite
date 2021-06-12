/*
*BZ00030            100621     Search for list User
*BZ00031            120621     Search Time for User
*/
import React,{useState} from "react";
import styles from './searchText.module.scss';
import SearchOutlined from'@ant-design/icons';
import getAllUser from '../../../../../constant.config.api/getAllUserAPI';
import {Space,DatePicker} from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

const searchText = (...prosp) =>{
  const [typeStatus,setTypeStatus] = useState("userName");
  const [typeUser,setTypeUser] = useState("Staff");
  const [dateStart,setDateStart] = useState(moment());
  const [dateEnd,setDateEnd] = useState(moment());   
  const  handelerStatus = async(e) =>{
    e.preventDefault(); 
    if(e.target.value && e.target.value!=null){
      setTypeStatus(e.target.value);
    }
    
  }
  const hadlerResetListUser  = async(e) =>{
    e.preventDefault();
    prosp[0].CallBackIsUserDataSearch([],false,0);
    setTypeStatus('userName')
  }
  const  handelerTypeUser = async(e) =>{
    e.preventDefault(); 
    if(e.target.value && e.target.value!=null){
      setTypeUser(e.target.value);
    }
    
  }
  const handelerCreateAt = async(dates, dateStrings) => {
    setDateStart(dates[0]);
    setDateEnd(dates[1]);
//(moment(dates[0].toISOString()).format('DD-MM-YYYY'))
    console.log('From: ',        ', to: ',  moment(dates[0]).format('DD-MM-YYYY')
    );
    
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  // const  handelervalueSearch = (e) =>{
  //   e.preventDefault(); 
  //   if(e.target.value && e.target.value!=null)
  //   setTypeStatus(e.target.value);
  // } 
    const Delete_Text_VN = (str)=> {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
      }
   const hadlerSearch = async(e) =>{
    e.preventDefault();
     prosp[0].CallBackIsloading(false);
     const  data = await getAllUser(1,(prosp[0].lengthListUser)-1);
     console.log("data",data);
    //default : createAt, userName, useRole
    if(typeStatus==="userName"){
      let valueSearch = (document.getElementById("valueSearch") as HTMLInputElement).value;
      const temp = data.data.data.filter((item) => {
        var index = item.userName.indexOf("@");
        var name = item.userName.substring(0, index);
        let nameFix = Delete_Text_VN(name).toLowerCase();
        let inputfix = Delete_Text_VN(valueSearch).toLowerCase();
        return nameFix.includes(inputfix);
    });
    prosp[0].CallBackIsloading(true);
    prosp[0].CallBackIsUserDataSearch(temp,true,temp.length>0?temp.length:0);       
    }else if(typeStatus==="userType"){
      const temp = data.data.data.filter((item) => {
        let nameFix = Delete_Text_VN(item.userType).toLowerCase();
        let inputfix = Delete_Text_VN(typeUser).toLowerCase();
        return nameFix.includes(inputfix);
    });
    prosp[0].CallBackIsloading(true);
    prosp[0].CallBackIsUserDataSearch(temp,true,temp.length>0?temp.length:0);
    //BEGIN BZ00031
    }else if(typeStatus==="createAt"){
      let startDate= (moment(dateStart.toISOString())).format('DD-MM-YYYY');
      let endDate= (moment(dateEnd.toISOString())).format('DD-MM-YYYY');
      const temp = data.data.data.filter((item) => {
       return (
         Date.parse((startDate)) <= Date.parse(item.createAt) 
          //Date.parse((item.CreateAt)) <= Date.parse((endDate)) 
       );
       });
       temp .filter((item) => {
       return (
         //Date.parse((startDate)) <= Date.parse(item.createAt) 
        Date.parse((item.CreateAt)) <= Date.parse((endDate)) 
        
       );
       });
       prosp[0].CallBackIsloading(true);
       prosp[0].CallBackIsUserDataSearch(temp,true,temp.length>0?temp.length:0);  
         
    }
    //END BZ00031
    
   }
return <React.Fragment>

    <div className={styles.containerSearchtext}>
        <div>
           {typeStatus==="userName"?
            <div className={styles.containerSearchtextInput}>
              <input id="valueSearch" />
            </div>:
          // BEGIN BZ00031
          typeStatus==="createAt"?
            // <div className={styles.containerSearchtextInput}>
              <RangePicker
              format={'DD-MM-YYYY'}
              ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              style={{height:'3em'}}
            onChange={handelerCreateAt}
          />
          //END BZ00031
            // </div>
            :
            typeStatus==="userType"?
            <div className={styles.containerTypeUsertextSelect}>
            <select
            className={styles.containerSearchtextSelect}
            id="status"
            name="status"
            style={{
              borderColor: "#928b8b",
            }}
            value={typeUser}
            onChange={handelerTypeUser}
            
          >
            {/*Staff */}
            <option value="Staff">Staff </option>
            <option value="Manager">Manager</option>
          </select>
          </div>:
          ""}
         
        </div>        
        <div className={styles.containerSearchtextSelect}>
        <select
                  className={styles.containerSearchtextSelect}
                  id="status"
                  name="status"
                  style={{
                    borderColor: "#928b8b",
                  }}
                  value={typeStatus}
                  onChange={handelerStatus}
                  
                >
                  {/* <option selected>Status</option> */}
                  <option  value="createAt">CreateAt</option>
                  <option value="userName">UserName </option>
                  <option value="userType">User Type</option>
                </select>
        </div>
        <div className={styles.containerSearchtextButton}>
            <button
                type="button"
                id="search"
                // className="btn btn-warning w-100 btnTimKiem"
                 onClick={hadlerSearch}
            >
                Search<i><SearchOutlined key='SearchOutlined'/></i >
              </button>
        </div>
        <div className={styles.containerSearchtextButton}>
            <button
                type="button"
                id="search"
                // className="btn btn-warning w-100 btnTimKiem"
                 onClick={hadlerResetListUser}
            >
                Reset<i><SearchOutlined /></i >
              </button>
        </div>

    </div>
</React.Fragment>
}
export default searchText;