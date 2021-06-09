/*
*BZ00026            090621     Install react-toastify for project

*/
import React from 'react';
  
// Importing toastify module
import {toast} from 'react-toastify'; 
  
// Import toastify css file  
 // toast-configuration method, 
 // it is compulsory method.
toast.configure()
  
// This is main function
const  ShowToast = (message,notification) =>{
    // function which is called when 
    // button is clicked

    //Default info,success,warning,err

    if(notification==='info'){
        return (
            <div className="GeeksforGeeks">
             {toast.info(message, {autoClose:10000})}
            </div>
        );
    }else if(notification==='warning'){
        return (
            <div className="GeeksforGeeks">
             {toast.warning(message, {autoClose:10000})}
            </div>
        );
    }else if(notification==='success'){
        return (
            <div className="GeeksforGeeks">
             {toast.success(message, {autoClose:10000})}
            </div>
        );
    }
    else if(notification==='err'){
        return (
            <div className="GeeksforGeeks">
             {toast.error(message,{autoClose:false})}
            </div>
        );
    }
    
}
   
export default ShowToast;