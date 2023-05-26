
import { loginFailed, loginStart, loginSuccess, logoutStart } from "./authSlice";
import api from "./axios";



export const loginUser = async(user,dispatch,navigate) => {
    dispatch(loginStart());
    try{
        const res = await api.post("/account/admin/login",user);
        dispatch(loginSuccess(res.data));
        navigate("/")
        console.log(res.data);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('timeOut',res.data.expireTime)
        
    }
    catch(err){
        dispatch(loginFailed());
        return err;
    }  
}

export const logout = async(dispatch, navigate) => {
    dispatch(logoutStart());
}
