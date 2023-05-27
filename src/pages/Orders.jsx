import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,DetailRow } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import Table from 'react-bootstrap/Table';
import classes from "./category.module.css";
import api from "../contexts/axios";
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";

const Orders = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  const navigate = useNavigate();
  const [categorys,setCategorys] = useState([])
  const getData = async() => {
    const res = await api.get("/post/get-categories",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return res
  }
  useEffect(() => {
  
  getData().then((res) => {
    setCategorys(res.data)
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
    // try{
    //     //setItems(items.filter((item) => item.id_item !== item.id_item));
    //     await api.delete(`/items/delete/${id}`,{
    //         headers: {
    //             Access_token: token,
    //         },
    //     })
    //     //console.log(item.id_item)
    //     .then(() =>{
    //         alert("xoa thanh cong");
    //         navigate('/Category') 
    //     })
    // }
    // catch (err){
    //     console.log(err)
    // }
    navigate('/Category')
  }

  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className={classes["container"]}>
      <div className={classes["header"]}>
        <Header category="Page" title="Orders" />
      </div>
      <div className={classes["add-button"]}>
        <button onClick={() => navigate("newItem")}>Thêm Mới</button>
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
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Create Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {categorys.map((category) =>{
        return(
          <tr key={category.category_id} className={classes["tr-table"]}>
            <td>{category.category_id}</td>
            <td>{category.category_name}</td>
            <td>{category.description}</td>
            <td>{category.createdAt}</td>
            <td className={classes["button-delete"]}>
              <button 
                  onClick={e => handDelete(category.category_id)}
              >Remove</button>
            </td>
          </tr>
        ) 
        })}
      </tbody>
    </Table>
    </div>
  );
};
export default Orders;