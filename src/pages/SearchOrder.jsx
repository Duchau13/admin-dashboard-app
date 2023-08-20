import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { useState,useEffect } from 'react';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import api from '../contexts/axios'
import classes from './Orders.module.css'
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
  const toolbarOptions = ['Search'];
  const token = localStorage.getItem("token")
  const [orders, setOrders] = useState([])
  const [phone,setPhone] = useState()
  const editing = { allowDeleting: true, allowEditing: true };
  //console.log(employeesData);
  const navigate = useNavigate()
  // const getData = async() => {
  //   const res = await api.get("/user/get-profiles")
  //   return res;
  // }
  // useEffect(() => {
  
  //   getData().then((res) => {
  //     setOrders(res.data.orderList)
  //   })
  //   getData().catch((err) => {
  //     console.log(err)
  //   })
  // },[])

  const handleClickphone = () => {
    const getData = async() => {
      const res = await api.get(`/order/customer/${phone}`,{
        headers: {
          access_token: token
        }
      })
      return res;
    }
    getData().then((res) => {
      setOrders(res.data.orderList)
    })
    getData().catch((err) => {
      console.log(err)
    })
  }
  console.log(phone)
  function Status(e) {
    const order = e.value
    //console.log(order)
    if(order==0){
        return(    
            <p className={classes['text-wait']} >Chưa xác nhận</p>   
        )
    }
    if(order==1){
        return(    
            <p className={classes['text-confirm']} >Đã xác nhận</p>   
        )
    }
    if(order==3){
        return(    
            <p className={classes['text-confirm']} >Chờ nhận hàng</p>   
        )
    }
    if(order==2){
        return ( 
            <p className={classes['text-cancel']} >Đã Huỷ </p>
    )}
    else{
        return (
            <p className={classes['text-unconfirm']} >Đã xác nhận </p>
    )}
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="" title="Tìm kiếm đơn hàng vận chuyển" />
      <div class={classes["input_phone"]}>
        <label htmlFor=""
        >
            Nhập số điện thoại nhận hàng
          <input type="text" onChange={e => setPhone(e.target.value)}/>
        </label>
        <input type="submit" placeholder="Xác nhận" onClick={() => {handleClickphone()}} />
      </div>
      {orders.map((order) =>{
            return(
            <div className={classes["container__orders"]}>
            <div className={classes["cart-item"]} key={order.id_order}>
                <div className={classes["name-item"]}>
                    <p onClick={() => navigate(`/order/status/${order.id_order}`)}> 
                        Đơn hàng ngày: {order.time_create}
                    </p>
                </div>
                <div className={classes["price"]}>
                    <p>Phí ship : {order.delivery_fee}</p>
                </div>
                <div className={classes["total-price"]}>
                    <p>Địa điểm nhận hàng: {order.address_receive}</p>
                </div>
                <div className={classes["total-price"]}>
                    <p>Địa điểm giao hàng: {order.address_delivery}</p>
                </div>
                <div className={classes["total-price"]}>
                    <Status value={order.status}/>
                </div>
            </div>
            <hr></hr>
            </div>
      )})} 
    </div>
  );
};
export default SearchOrder;