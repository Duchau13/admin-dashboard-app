import classes from "./CreateShipper.module.css"
import { useEffect, useState } from 'react';
import Input from "../../components/Input/Input"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from "../../contexts/axios";

const CreateShipper = () => {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState();
    const [address,setAddress] = useState("")
    const [register,setRegister] = useState();
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const role = localStorage.getItem("id_role");

    const handleCreateOrder = (e) => {
        try{
          {
            axios.post("/account/shipper/create", register)
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
                navigate('/shipper')
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
        
    useEffect(()=>{
        if(role!=3 || role!=4){
          toast.error("Bạn không có quyền sử dụng chức năng này", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });;
          setTimeout(() => {
              navigate('/listOrders')
          }, 1000);
        }
    })
    const handleChange= (e) => {
        setRegister(items => ({
          ...items,
          [e.target.name]: e.target.value
        }));
    }
      
    
    console.log(register)
    return(
        <div>
            <div className={classes['form-login']}>
                    <h1>Thêm mới nhân viên giao hàng</h1>
                    {
                        <p className={classes['text-err']}>{error}</p>
                    }
                    <div>
                        <Input
                            name="username"
                            label="Username"
                            placeholder="Nhập username"
                            required
                            onChange= {handleChange}
                            //onChange= {(e) => {this.formikLogin.handleChange(e); setUsername(this.target.value(e))}}
                           
                        />
                        <Input
                            name="password"
                            label="Mật khẩu"
                            placeholder="Nhập 8 kí tự có ít nhất 1 số"
                            required
                            type="password"
                            onChange= {handleChange}
                        />
                        <Input
                            name="name"
                            label="Tên nhân viên"
                            placeholder="Nhập tên người dùng"
                            required
                            type="text"
                            onChange= {handleChange}
                        />
                        <Input
                            name="email"
                            label="Gmail"
                            placeholder="Nhập email người dùng"
                            required
                            type="text"
                            onChange= {handleChange}
                        />
                        <Input
                            name="phone"
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại người dùng"
                            required
                            type="text"
                            onChange= {handleChange}
                        />
                        <Input
                            name="address"
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            required
                            type="text"
                            onChange= {handleChange}
                        />
                        <Input
                            name="area"
                            label="Khu vực giao hàng"
                            placeholder="Nhập khu vực giao hàng"
                            required
                            type="text"
                            onChange= {handleChange}
                        />
                        <Input
                            name="route"
                            label="Tuyến đường"
                            placeholder="Nhập tuyến đường"
                            required
                            type="text"
                            onChange= {handleChange}
                        />
                        
                        <button onClick={handleCreateOrder}>Đăng Ký</button>
                    </div>
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
export default CreateShipper;
