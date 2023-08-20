import React from 'react';
import Table from 'react-bootstrap/Table';
import { Navbar } from '../components';
import classes from "./Orders.module.css";
import api from "../contexts/axios";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

const ListOrders = () => {
  const token = localStorage.getItem('token');
  const id_role = localStorage.getItem('id_role');
  const navigate = useNavigate();
  const [categorys,setCategorys] = useState([])
  const getData = async() => {
    const res = await api.get("/order",{
      headers: {
        access_token: token
      }
    })
    return res
  }
  useEffect(() => {
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
        navigate('/CreateOrder')
    }, 1000);
  }
  getData().then((res) => {
    setCategorys(res.data.orderList)
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

  const handDelete = async (id) => {
    try{
        await api.delete(`/items/delete/${id}`,{
            headers: {
                Access_token: token,
            },
        })
        //console.log(item.id_item)
        .then(() =>{
            alert("xoa thanh cong");
            navigate('/Category') 
        })
    }
    catch (err){
        console.log(err)
    }
    navigate('/Category')
  }

  function Status(e) {
    const order = e.value
    //console.log(order)
    if(order==0){
        return(
            <div className={classes["container-status"]}>
              <p className={classes['text-unconfirm']}>Chưa Xác Nhận</p>
            </div>
            // <p className={classes['text-unconfirm']}>Chưa Xác Nhận</p>   
        )
    }
    if(order==1){
        return(
            <div className={classes["container-status"]}>
                <p className={classes['text-confirm']} >Đã Xác Nhận</p>   
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
      <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
        <Navbar/>
      </div>
      <div className={classes["header"]}>
        <p>Danh sách đơn giao hàng</p>
      </div>
      {/* <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {/* {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent> */} 
      <Table   hover>
      <thead >
        <tr className={classes["header-table"]}>
          <th>Thời gian tạo đơn</th>
          <th>Địa điểm nhận</th>
          <th>Địa điểm giao hàng</th>
          <th>phí vận chuyển</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {categorys.map((category) =>{
        return(
          <tr key={category.id_order} className={classes["tr-table"]}>
            <td onClick={() => navigate(`/listOrders/${category.id_order}`)} className={classes["time-order"]}>{category.time_create}</td>
            <td>{category.address_receive}</td>
            <td>{category.address_delivery}</td>
            <td>{category.delivery_fee}</td>
            <td className={classes["button"]}>
              <Status value={category.status}/>
            </td>
          </tr>
        ) 
        })}
      </tbody>
    </Table>
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
export default ListOrders;