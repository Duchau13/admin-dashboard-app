import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,DetailRow } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import Table from 'react-bootstrap/Table';
import classes from "./category.module.css";
import api from "../contexts/axios";
import { useState,useEffect } from 'react';

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

  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate("/login")
    }
  },[])

  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className={classes["container"]}>
      <Header category="Page" title="Orders" />
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
          </tr>
        ) 
        })}
      </tbody>
    </Table>
    </div>
  );
};
export default Orders;