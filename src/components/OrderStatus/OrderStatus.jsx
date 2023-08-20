import React from 'react';
import { useState,useEffect } from 'react';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components';
import api from '../../contexts/axios'
import classes from "./OrderStatus.module.css"
import { useNavigate,useParams } from 'react-router-dom';

const OrderStatus = () => {
  const token = localStorage.getItem("token")
  const [orders, setOrders] = useState({})
  const [phone,setPhone] = useState()
  const {id_order} = useParams();
  //console.log(employeesData);
  const navigate = useNavigate()
  const getData = async() => {
    const res = await api.get(`/order/status/${id_order}`,{
        headers:{
            access_token: token
        }
    })
    return res;
  }
  useEffect(() => {
  
    getData().then((res) => {
      setOrders(res.data.orderList[0])
    })
    getData().catch((err) => {
      console.log(err)
    })
  },[])

  console.log(orders)
 
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
      <Header  category="" title="Trạng Thái Đơn Hàng" />
      </div>
        <div className={classes["container__orders"]}>
            <div className={classes["cart-item"]}>
                <div className={classes["name-item__main"]}>
                    <p> 
                        { orders.status==8 ? "Đơn Hàng Hoàn Thành" : "Đơn Hàng Chưa Hoàn Thành" }
                    </p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{orders.time_delivered}</p>
                </div>
            </div>
            <hr></hr>
            <div className={classes["cart-item"]}>
                <div className={classes["name-item__main"]}>
                    <p> 
                        { orders.status>=7 ? "Đang Giao Hàng" : "Đang Chờ Giao Hàng" }
                    </p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{ orders.status>=7 ? "Đang Vận Chuyển" : "Chưa Vận Chuyển" }</p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{orders.time_delivery}</p>
                </div>
            </div>
            <hr></hr>
            <div className={classes["cart-item"]}>
                <div className={classes["name-item__main"]}>
                    <p> 
                        { orders.status>=6 ? "Hàng Được Xuất Khỏi Kho" : "Nhân Viên Chưa Nhận Hàng Từ Kho" }
                    </p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{ orders.status>=6 ? "Nhân Viên Đã Nhận Hàng Từ Kho" : "Nhân Viên Chưa Nhận Hàng Từ Kho" }</p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{orders.time_delivery}</p>
                </div>
            </div>
            <hr></hr>
            <div className={classes["cart-item"]}>
                <div className={classes["name-item__main"]}>
                    <p> 
                        { orders.status>=5 ? "Hàng Được Đem Về Kho" : "Hàng Chưa Được Nhập Kho" }
                    </p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{ orders.status>=5 ? "Hàng Được Vận Chuyển Về Kho" : "Hàng Chưa Được Nhập Kho" }</p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{orders.time_warehouse}</p>
                </div>
            </div>
            <hr></hr>
            <div className={classes["cart-item"]}>
                <div className={classes["name-item__main"]}>
                    <p> 
                        { orders.status>=4 ? "Đã Nhận Hàng Từ Cửa Hàng" : "Chưa Nhận Hàng Từ Cửa Hàng" }
                    </p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{ orders.status>=4 ? "Nhân Viên Đã Nhận Hàng Từ Cửa Hàng" : "Nhân Viên Chưa Nhận Hàng Từ Cửa Hàng" }</p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{orders.time_received} </p>
                </div>
            </div>
            <hr></hr>
            <div className={classes["cart-item"]}>
                <div className={classes["name-item__main"]}>
                    <p> 
                        { orders.status>=3 ? "Đã Phân Công Nhân Viên Nhận Hàng" : "Chưa Phân Công Nhận Hàng" }
                    </p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{ orders.status>=3 ? "Đã Phân Công Nhân Viên Nhận Hàng" : "Chưa Phân Công Nhân Viên Nhận Hàng" }</p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{orders.time_receive}</p>
                </div>
            </div>
            <hr></hr>
            <div className={classes["cart-item"]}>
                <div className={classes["name-item__main"]}>
                    <p> 
                        { orders.status>=1 ? "Đã Xác Nhận Đơn Hàng" : "Chưa Xác Nhận Đơn Hàng" }
                    </p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{ orders.status>=1 ? "Đã Xác Nhận Đơn Hàng" : "Đơn Hàng Chưa Được Xác Nhận" }</p>
                </div>
                <div className={classes["name-item"]}>
                    <p>{orders.time_confirm}</p>
                </div>
            </div>
            <hr></hr>
            
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
  );
};
export default OrderStatus;