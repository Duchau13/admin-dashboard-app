import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { useState,useEffect } from 'react';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import api from '../contexts/axios'

const Employees = () => {
  const toolbarOptions = ['Search'];
  const [freelancer, setFreelancer] = useState([])
  const editing = { allowDeleting: true, allowEditing: true };
  //console.log(employeesData);

  const getData = async() => {
    const res = await api.get("/user/get-profiles")
    return res;
  }
  useEffect(() => {
  
    getData().then((res) => {
      setFreelancer(res.data)
    })
    getData().catch((err) => {
      console.log(err)
    })
  },[])
  console.log(freelancer)
  // const arr = [...employeesData,...freelancer]
  // console.log(arr)
  return (

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={freelancer}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        rowHeight={60}
      >
        <ColumnsDirective>
            <ColumnDirective field='first_name' width='100' textAlign="Center" height='100'/>
            <ColumnDirective field='last_name' width='100' height='100'/>
            <ColumnDirective field='email' width='100' textAlign="Center" height='100'/>
            <ColumnDirective field='gender' width='100' format="C2" textAlign="Center" height='100'/>
            <ColumnDirective headerText='Skill' field='profileDetail.mySkill' width='100' textAlign="Center" height='100'/>
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

       </GridComponent>
    </div>
  );
};
export default Employees;