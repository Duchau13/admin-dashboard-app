import classes from './Register.module.css'
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import Input from "../../components/Input/Input"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from "../../contexts/axios";


const validateLogin = (values) => {
    const errors = {};
  
    if (!values.email || values.email.trim().length === 0) {
      errors.email = "Xin hãy nhập email !";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email không hợp lệ !";
    }
  
    if (!values.password || values.password.trim().length === 0) {
      errors.password = "Xin hãy nhập mật khẩu !";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
      errors.password = "Mật khẩu không hợp lệ !";
    }
    if (!values.name || values.name.trim().length === 0) {
      errors.name = "Xin hãy nhập tên của bạn !";
    } else if (!/^([a-zA-Z '.-])+$/.test(values.name)) {
      errors.name = "Tên không hợp lệ !";
    }
    if (!values.username || values.username.trim().length === 0) {
        errors.username = "Xin hãy nhập username của bạn !";
      } else if (!/^[A-Za-z]+$/.test(values.username)) {
        errors.username = "Tên không hợp lệ !";
    }
    // if (!values.phone || values.phone.trim().length === 0) {
    //     errors.phone = "Xin hãy nhập số điện thoại của bạn !";
    //   } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(values.phone)) {
    //     errors.phone = "số điện thoại không hợp lệ !";
    // }
    if (!values.address || values.address.trim().length === 0) {
        errors.address = "Xin hãy nhập địa chỉ của bạn !";
      } else if (!/[,#-\/\s\!\@\$.....]/.test(values.address)) {
        errors.address = "địa chỉ không hợp lệ !";
    }
    // if (values.checkpassword != values.password) {
    //   errors.checkpassword = "Mật khẩu không trùng khớp !";
    // }
  
    return errors;
};

const Register = () => {
    
    // const [username,setUsername] = useState("");
    // const [password,setPassword] = useState("");
    // const [name,setName] = useState("");
    // const [email,setEmail] = useState("")
    // const [phone,setPhone] = useState();
    // const [address,setAddress] = useState("")
    const [register,setRegister] = useState();
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleCreateOrder = (values) => {
        console.log(values);
        try{
          {
            axios.post("/account/create", values)
            .then(res =>{
              console.log(res);
              toast.success('Đăng ký tài khoản thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate('/Order')
            }, 2000);
            })
            .catch(err =>{
                console.log(err)
                toast.error(`${err.response.data.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });;
            })
          }
        
        }catch(err){
            alert(err.response.data.message)
        }
    }
        
    // const handleChange= (e) => {
    //     setRegister(items => ({
    //       ...items,
    //       [e.target.name]: e.target.value
    //     }));
    // }
      
    const formikRegister = useFormik({
        initialValues: {
          username: "",
          password: "",
          name:"",
          email: "",
          phone:"",
          address:"",
      
        },
        validate: validateLogin,
        onSubmit: values => {
            handleCreateOrder(values)
            console.log(values);
        }
    });
    console.log(formikRegister.values)
    // console.log(register)
    return(
        <div>
            <div className={classes['form-login']}>
                    <h1>Đăng ký tài khoản</h1>
                    {
                        <p className={classes['text-err']}>{error}</p>
                    }
                    <form onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateOrder(formikRegister.values)
                            }}>
                        <Input
                            name="username"
                            label="Username"
                            placeholder="Nhập username"
                            required={true}
                            value={formikRegister.values.username}
                            onChange={formikRegister.handleChange}
                            onBlur={formikRegister.handleBlur}
                            error={
                                formikRegister.touched.username && formikRegister.errors.username
                                ? formikRegister.errors.username
                                : null
                            } 
                        />
                        <Input
                            name="password"
                            label="Mật khẩu"
                            placeholder="Nhập 8 kí tự có ít nhất 1 số"
                            required={true}
                            type="password"
                            value={formikRegister.values.password}
                            onChange={formikRegister.handleChange}
                            onBlur={formikRegister.handleBlur}
                            error={
                                formikRegister.touched.password && formikRegister.errors.password
                                ? formikRegister.errors.password
                                : null
                            }
                        />
                        <Input
                            name="name"
                            label="Tên người dùng"
                            placeholder="Nhập tên người dùng"
                            required
                            type="text"
                            value={formikRegister.values.name}
                            onChange={formikRegister.handleChange}
                            onBlur={formikRegister.handleBlur}
                            error={
                                formikRegister.touched.name && formikRegister.errors.name
                                ? formikRegister.errors.name
                                : null
                            }
                        />
                        <Input
                            name="email"
                            label="Gmail"
                            placeholder="Nhập email người dùng"
                            required = {true}
                            type="email"
                            value={formikRegister.values.email}
                            onChange={formikRegister.handleChange}
                            onBlur={formikRegister.handleBlur}
                            error={
                                formikRegister.touched.email && formikRegister.errors.email
                                ? formikRegister.errors.email
                                : null
                            }
                        />
                        <Input
                            name="phone"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại người dùng"
                            required = {true}
                            type="number"
                            value={formikRegister.values.phone}
                            onChange={formikRegister.handleChange}
                            onBlur={formikRegister.handleBlur}
                            error={
                                formikRegister.touched.phone && formikRegister.errors.phone
                                ? formikRegister.errors.phone
                                : null
                            }
                        />
                        <Input
                            name="address"
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            required={true}
                            type="text"
                            value={formikRegister.values.address}
                            onChange={formikRegister.handleChange}
                            onBlur={formikRegister.handleBlur}
                            error={
                                formikRegister.touched.address && formikRegister.errors.address
                                ? formikRegister.errors.address
                                : null
                            }
                        />
                        
                        <button type="submit">Đăng Ký</button>
                    </form>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}
export default Register;
