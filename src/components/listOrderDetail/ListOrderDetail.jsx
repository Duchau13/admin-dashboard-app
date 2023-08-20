
import { useNavigate,useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import classes from "./ListOrderDetail.module.css";
import axios from '../../contexts/axios';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ListOrdersDetail = () => {
  const token = localStorage.getItem('token');
  const id_role = localStorage.getItem('id_role');
  const {id_order} = useParams();
  const navigate = useNavigate();
  const [categorys,setCategorys] = useState({})
  const [reasons,setReasons] = useState()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  if(id_role==1){
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
        navigate('/createOrder')
    }, 1000);
}
  },[])

//   var delivery_fee = categorys.delivery_fee;
//   delivery_fee = delivery_fee.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
//   var item_fee = categorys.item_fee;
//   item_fee = item_fee.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
//   var total = categorys.total;
//   total = total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  const handleChangeReason = (e) => {
    setReasons(e.target.value)
  }
  console.log(categorys)
  const cancelOrder = async (id) => {
    try{
        await axios.put(`/order/cancel/${categorys.id_order}`,{
            reason:reasons
        },{
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
  const confirmOrder = async (id) => {
    try{
        await axios.get(`/order/confirm/${categorys.id_order}`,{
            headers: {
                Access_token: token,
            },
        })
        //console.log(item.id_item)
        .then((res) =>{
            toast.success('Xác nhận đơn hàng thành công', {
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
            <div className={classes["container-status"]}>
                <button className={classes['cancle-button']} onClick={handleOpen}>Huỷ Đơn Hàng</button>
                <button className={classes['confirm-button']} onClick={confirmOrder}>Xác Nhận Đơn Hàng</button>
            </div>
            // <p className={classes['text-unconfirm']}>Chưa Xác Nhận</p>   
        )
    }
    if(order==1){
        return(
            <div className={classes["container-status"]}>
                <p className={classes['text-confirm']} >Đã Xác Nhận</p>   
                <button className={classes['confirm-button']} onClick={() => navigate(`/shipper/${categorys.id_order}`)}>Phân công nhận hàng</button>
            </div>
        )
    }
    if(order==3){
        return(    
            <p className={classes['text-confirm']} >Đang Nhận Hàng</p>   
        )
    }
    if(order==5){
        return(    
            <div className={classes["container-status"]}>
                <p className={classes['text-confirm']} >Hàng Ở Kho</p>   
                <button className={classes['confirm-button']}  onClick={() => navigate(`/shipper/${categorys.id_order}`)}>Phân công giao hàng</button>
            </div> 
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
                        <p> {categorys.delivery_fee} VNĐ </p>
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
                        <h1>Trạng thái đơn hàng :</h1>
                        <p> <Status value={categorys.status}/> </p>
                    </div>
                    <hr></hr>
                    <button className={classes["button-status"]} onClick={() => navigate(`/order/status/${categorys.id_order}`)}>Xem Trạng Thái Đơn Hàng</button>
                </div>
            </div>
        </div>
        </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Lý do huỷ đơn hàng
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <textarea className={classes["text-area"]} 
                onChange={handleChangeReason}
                id="w3review" name="w3review" rows="4" cols="40"
                placeholder='Nhập lý do huỷ đơn hàng'
            >
            </textarea>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button className={classes["cancle-button"]} onClick={cancelOrder}>Xác Nhận</button>
            <button className={classes["button-back"]} onClick={handleClose}>Quay lại</button>
          </Typography>
        </Box>
      </Modal>
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
export default ListOrdersDetail;