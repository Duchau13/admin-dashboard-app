import classes from './Login.module.css'
import { useEffect, useState } from 'react';
import Input from "../../components/Input/Input"
//  import loginUser from "../../contexts/apiRequest"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginStart, loginSuccess, logoutStart } from "../../contexts/authSlice";
import api from "../../contexts/axios";

const Home = () => {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const loginUser = async(user,navigate) => {
        try{
            const res = await api.post("/api/auth/login",user);
            navigate("/")
            console.log(res);
            localStorage.setItem('token',res.data.access_token);
            localStorage.setItem('timeOut',res.data.expireTime)
            
        }
        catch(err){
            setError(err.response.data.message);
        } 
    }

    const handleLogin = (e) => {
      e.preventDefault();
      const newUser = {
        email: username,
        password: password,
      };
      console.log(newUser);
      loginUser(newUser,navigate)
    } 
      
    
    
    return(
        <div>
            {/* <div className={classes['navbar-main']}>
                <div className={classes['navbar-logo']}>
                    <img src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/10/logo_svg.svg" alt="logo" />
                </div>
            </div> */}
            <div className={classes['form-login']}>
                    <h1>Đăng Nhập </h1>
                    {
                        <p className={classes['text-err']}>{error}</p>
                    }
                    <form onSubmit={handleLogin} >
                        <Input
                            name="username"
                            label="Username"
                            placeholder="Nhập username"
                            required
                            onChange= {(e) => setUsername(e.target.value)}
                            //onChange= {(e) => {this.formikLogin.handleChange(e); setUsername(this.target.value(e))}}
                           
                        />
                        <Input
                            name="password"
                            label="Mật khẩu"
                            placeholder="Nhập 8 kí tự có ít nhất 1 số"
                            required
                            type="password"
                            onChange= {(e) => setPassword(e.target.value)}
                        />
                        
                        <button type="submit">Đăng Nhập</button>
                    </form>
            </div>
        </div>
    )
}
export default Home;
