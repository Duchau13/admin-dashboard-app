import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { Header } from '../components';
import Table from 'react-bootstrap/Table';
import classes from "./Orders.module.css";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import api from "../contexts/axios";
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";

const Orders = () => {
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
  
  getData().then((res) => {
    setCategorys(res.data.orderList)
  })
  getData().catch((err) => {
    console.log(err)
  })
  if(id_role==3 || id_role==4){
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
            // <button className={classes['button-delete']}>Huỷ Đơn Hàng</button>
            <p className={classes['text-unconfirm']}>Chưa Xác Nhận</p>   
        )
    }
    if(order==2){
        return ( 
            <p className={classes['text-cancel']} >Đã Huỷ </p>
    )}
    else{
        return (
            <p className={classes['text-confirm']} >Đã xác nhận </p>
    )}
  }
  function cancelOrder(order){
    return(
      <button className={classes['button-delete']}>Huỷ Đơn Hàng</button>  
    )
  }
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className={classes["container"]}>
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
      <Table striped bordered hover>
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
            <td onClick={() => navigate(`/order/${category.id_order}`)} className={classes["time-order"]}>{category.time_create}</td>
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
export default Orders;