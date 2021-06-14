/*
*BZ0017            060321     Setup json web token when login user.
*BZ00019           060621     Using Token login for next reset
*BZ00021           060621     Paganation for List User
*BZ00025           080621     Create AddUser API
*BZ00031           130621     Delete,Edit for user
*BZ00033           130621     Export excel  for user




************************************************************************
*/
const mongoose =require('mongoose');
const config= require('config');
const db = config.get('mongoURI');
import  createApiHandler, {
    
} from '../../../utils/create-api-handler';
import loginUser from './handlers/loginUser';
import CheckTokenForloginUser from './handlers/CheckTokenForloginUser';
import getAllUser from './handlers/getAllUser';
import addUser from './handlers/addUser';
import deleteUser from './handlers/deleteUser';
import exportUserForExcel from './handlers/exportUserForExcel';


export type CustomerHandlers = {
    loginUser,CheckTokenForloginUser,getAllUser,addUser,deleteUser,exportUserForExcel
}
const loginAPI = async ( req,
    res,
    handlers)=>{
		try {
			if (req.method === 'POST') {
                const body = { ...req.body }
                // console.log("req.body1",req);
				//BEGIN BZ00019
				//console.log("req.body1",req.body)
				if(req.body.check_token && req.body.check_token===true){
					return await handlers['CheckTokenForloginUser']({ req, res, /* config, */ body });
				//BEGIN BZ00025		
				}else if(req.body.check_Add_User && req.body.check_Add_User=== true){
					
					return await handlers['addUser']({ req, res, /* config, */ body })	
                //BEGIN BZ00033
				}else if(req.body.checkExportUserForExcel && req.body.checkExportUserForExcel===true){
					return await handlers['exportUserForExcel']({ req, res, /* config, */ body })	

				}
				//END BZ00033
				//END BZ00025
				else {
					return await handlers['loginUser']({ req, res, /* config, */ body })
				}
			    //END BZ00019
			}
			if (req.method === 'PUT') {
                const body = { ...req.body }
                // console.log("req.body updateUser",req.body);
				return await handlers['updateUser']({ req, res, /* config, */ body });
			}
			//BEGIN BZ00021
			if (req.method === 'GET') {
                const body = { ...req.body }
                //console.log("req.body getAllUser",req.query);
				return await handlers['getAllUser']({ req, res, /* config, */ body });
			}
			//END BZ00021
			//BEGIN
			if (req.method === 'DELETE') {
				const body = { ...req.body }
                //console.log("req.body deleteUser",req.body);
				return await handlers['deleteUser']({ req, res, /* config, */ body });
			}
			//END
		} catch (error) {
			//console.error(error)
			res.status(500).json({ data: null, errors: [{ message: error.message }], })
		}
	}

export const handlers = { loginUser,CheckTokenForloginUser,getAllUser,addUser,deleteUser,exportUserForExcel/* , addEmployee */ }

export default createApiHandler(loginAPI, handlers, {})
