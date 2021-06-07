/*
*BZ0017            060321     Setup json web token when login user.
*BZ00019           060621     Using Token login for next reset
*BZ00021           060621     Paganation for List User

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

export type CustomerHandlers = {
    loginUser,CheckTokenForloginUser,getAllUser
}
const loginAPI = async ( req,
    res,
    handlers)=>{
		try {
			if (req.method === 'POST') {
                const body = { ...req.body }
                // console.log("req.body1",req);
				//BEGIN BZ00019
				if(req.body.check_token===true){
					return await handlers['CheckTokenForloginUser']({ req, res, /* config, */ body })	
				}else {
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
                console.log("req.body getAllUser",req.query);
				return await handlers['getAllUser']({ req, res, /* config, */ body });
			}
			//END BZ00021
		} catch (error) {
			console.error(error)
			res.status(500).json({ data: null, errors: [{ message: error.message }], })
		}
	}

export const handlers = { loginUser,CheckTokenForloginUser,getAllUser/* , addEmployee */ }

export default createApiHandler(loginAPI, handlers, {})
