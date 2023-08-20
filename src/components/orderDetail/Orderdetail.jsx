import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import classes from "./Orderdetail.module.css";
import axios from '../../contexts/axios';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



const OrdersDetail = () => {
  const token = localStorage.getItem('token');
  const {id_order} = useParams();
  console.log(id_order)
  const navigate = useNavigate();
  const [categorys,setCategorys] = useState([])
  const getData = async() => {
    const res = await axios.get(`/order?id_order=${id_order}`,{
      headers: {
        access_token: token
      }
    })
    return res
  }
  useEffect(() => {
  
  getData().then((res) => {
    setCategorys(res.data.orderList[0])
  })
  getData().catch((err) => {
    console.log(err)
  })
  },[])

  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //       navigate("/login")
  //   }
  // },[])
  console.log(categorys)
  const cancelOrder = async (id) => {
    try{
        await axios.get(`/order/user/cancel/${categorys.id_order}`,{
            headers: {
                Access_token: token,
            },
        })
        //console.log(item.id_item)
        .then((res) =>{
            toast.success('Đã huỷ đơn vận chuyển', {
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

  function Status(e) {
    const order = e.value
    //console.log(order)
    if(order==0){
        return(    
            <button className={classes['cancle-button']} onClick={cancelOrder}>Huỷ Đơn Hàng</button>
            // <p className={classes['text-unconfirm']}>Chưa Xác Nhận</p>   
        )
    }
    if(order==1){
        return(    
            <p className={classes['text-confirm']} >Đã Xác Nhận</p>   
        )
    }
    if(order==3){
        return(    
            <p className={classes['text-confirm']} >Đang Nhận Hàng</p>   
        )
    }
    if(order==5){
        return(    
            <p className={classes['text-confirm']} >Hàng trong kho</p>   
        )
    }
    if(order==4){
        return(    
            <p className={classes['text-confirm']} >Đang vận chuyển hàng về kho</p>   
        )
    }
    if(order==6){
        return(    
            <p className={classes['text-confirm']} >Đợi giao hàng</p>   
        )
    }
    
    if(order==7){
        return(    
            <p className={classes['text-confirm']} >Đang giao hàng</p>   
        )
    }
    if(order==8){
        return(    
            <p className={classes['text-confirm']} >Hoàn Thành Đơn Hàng</p>   
        )
    }
    if(order==2){
        return ( 
            <p className={classes['text-cancel']} >Đã Huỷ </p>
    )}
    else{
        return (
            <p className={classes['text-unconfirm']} >Đơn hàng không hoàn thành. đợi hoàn kho</p>
    )}
  }
  const deleteOrder = (order) => {
    
  }
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <p>Thông tin chi tiết đơn hàng</p>
        <div className={classes["data-order"]}>
            <div className={classes["info__order"]}>
                {/* <div className={classes["info__order-title"]}>Thông tin thanh toán</div> */}
                <div className={classes["info__user"]}>
                    {/* <div className={classes["info__user-item"]}>
                        <h1>Tên người vận chuyển :</h1>
                        <p> {categorys.name_shipper} </p>
                        </div> */}
                    <div className={classes["info__user-item"]}>
                        <h1>Số điện thoại :</h1>
                        <p> {categorys.phone_receive} </p>
                    </div>
                    <hr></hr>
                    <div className={classes["info__user-item"]}>
                        <h1>Chi Phí Vận Chuyển:</h1>
                        <p> {categorys.delivery_fee} VNĐ</p>
                    </div>
                    <hr></hr>
                    <div className={classes["info__user-item"]}>
                        <h1>Tiền thu hộ :</h1>
                        <p> {categorys.item_fee} VNĐ</p>
                    </div>
                    <hr></hr>
                    <div className={classes["info__user-item"]}>
                        <h1>Tổng Hoá Đơn:</h1>
                        <p>{categorys.total} VNĐ</p>
                    </div>
                    <hr></hr>
                    <div className={classes["info__user-item"]}>
                        <h1>Địa Điểm Nhận Hàng :</h1>
                        <p> {categorys.address_receive} </p>
                    </div>
                    <hr></hr>
                    <div className={classes["info__user-item"]}>
                        <h1>Địa Điểm Giao Hàng :</h1>
                        <p> {categorys.address_delivery} </p>
                    </div>
                    <hr></hr>
                    <div className={classes["info__user-item"]}>
                        <h1>Thời gian tạo đơn :</h1>
                        <p> {categorys.time_create} </p>
                    </div>
                    <hr></hr>
                    <div className={classes["info__user-item"]}>
                        <h1>Trạng thái hiện tại:</h1>
                        <p> <Status value={categorys.status}/> </p>
                    </div>
                    <hr></hr>
                    <button className={classes["button-status"]} onClick={() => navigate(`/order/status/${categorys.id_order}`)}>Xem Trạng Thái Đơn Hàng</button>
                </div>
            </div>
        </div>
      </div>
    <div className={classes.footer}></div>
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
export default OrdersDetail;