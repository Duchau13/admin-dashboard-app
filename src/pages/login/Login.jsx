import classes from './Login.module.css'
import { useEffect, useState } from 'react';
import Input from "../../components/Input/Input"
//  import loginUser from "../../contexts/apiRequest"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from "../../contexts/axios";
import { Link } from 'react-router-dom';

const Home = () => {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const loginUser = async(user,navigate) => {
        try{
            const res = await api.post("/account/login",user);
            navigate("/Order")
            console.log(res);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('timeOut',res.data.expireTimeToken)
            localStorage.setItem('id_role',res.data.id_role)
            localStorage.setItem('user_name',res.data.userInfo.name)
            localStorage.setItem('id_customer',res.data.userInfo.id_customer)
        }
        catch(err){
            console.log(err);
            setError(err.response.data.message);
        } 
    }

    const handleLogin = (e) => {
      e.preventDefault();
      const newUser = {
        username: username,
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
                        <div className={classes["register"]}>
                            <Link to="/register">Đăng ký tài khoản mới</Link>
                        </div>
                    </form>
            </div>
        </div>
    )
}
export default Home;
