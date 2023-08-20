import React from 'react';
import { useState,useEffect } from 'react';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components';
import api from '../../contexts/axios'
import classes from "./ListShipper.module.css"
import { useNavigate,useParams } from 'react-router-dom';

const ListShipper = () => {
  const token = localStorage.getItem("token")
  const [orders, setOrders] = useState([])
  const [phone,setPhone] = useState()
  const {id_order} = useParams();
  //console.log(employeesData);
  const navigate = useNavigate()
  const getData = async() => {
    const res = await api.get("/shipper/getallShipper",{
        headers:{
            access_token: token
        }
    })
    return res;
  }
  useEffect(() => {
  
    getData().then((res) => {
      setOrders(res.data.orderList)
    })
    getData().catch((err) => {
      console.log(err)
    })
  },[])

  console.log(phone)
  const handleReceive = (id_shipper) => {
    try{
        api.get(`/order/receive/${id_order}/${id_shipper}`,{
            headers: {
                Access_token: token,
            },
        })
        //console.log(item.id_item)
        .then((res) =>{
            toast.success('Phân công đơn hàng thành công', {
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
                navigate('/listOrders')
            }, 1000);
        })
    }
    catch (err){
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
    }
  }
  const handleDelivery = (id_shipper) => {
    try{
        api.get(`/order/delivery/${id_order}/${id_shipper}`,{
            headers: {
                Access_token: token,
            },
        })
        //console.log(item.id_item)
        .then((res) =>{
            toast.success('Phân công đơn hàng thành công', {
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
                navigate('/listOrders')
            }, 1000);
        })
    }
    catch (err){
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
    }
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="" title="Danh sách nhân viên giao hàng" />
      {orders.map((order) =>{
            return(
            <div className={classes["container__orders"]}>
            <div className={classes["cart-item"]} key={order.id_shipper}>
                <div className={classes["name-item"]}>
                    <p> 
                        Tên shipper: {order.name}
                    </p>
                </div>
                <div className={classes["price"]}>
                    <p>Số điện thoại: {order.phone}</p>
                </div>
                <div className={classes["total-price"]}>
                    <p>Khu vực vận chuyển: {order.area}</p>
                </div>
                <div className={classes["total-price"]}>
                    <p>Tuyến đường: {order.route}</p>
                </div>
                <div className={classes["total-price"]}>
                    <button onClick={() => handleReceive(order.id_shipper)}>Phân Công Nhận Hàng</button>
                    <button onClick={() => handleDelivery(order.id_shipper)}>Phân Công Giao Hàng</button>
                </div>
            </div>
            <hr></hr>
            </div>
      )})}
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
  );
};
export default ListShipper;