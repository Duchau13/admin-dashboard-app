import React from 'react';
import { Navbar } from '../components';
import { useState,useEffect } from 'react';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import Input from "../components/Input/Input"

import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import classes from "./CreateOrder.module.css"
import ReactMapGL, {Marker,Popup} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import axios from '../contexts/axios';
mapboxgl.accessToken = 'pk.eyJ1IjoiZHVjaGF1MDUyMSIsImEiOiJjbGlqN3l3bzgwNHZkM2txbzhiemdnZDlhIn0.L20rg56BLB6iTrMutkntMw';



const CreateOrder = () => {
  const navigate = useNavigate()
  const { currentColor, currentMode } = useStateContext();
  const [addressreceive,setAddressreceive] = useState()
  const [addressdelivery,setAddressdelivery] = useState()
  const [latitudereceive,setLatitudereceive] = useState(10.839581)
  const [longitudereceive,setLongitudereceive] = useState(106.793656)
  const [latitudedelivery,setLatitudedelivery] = useState(11.839581)
  const [longitudedelivery,setLongitudedelivery] = useState(108.793656)
  const [nameuser,setNameuser] = useState()
  const [phoneuser,setPhoneuser] = useState()
  const [feeitem,setFeeitem] = useState()
  const [weight,setWeight] = useState()
  const [description,setDescription] = useState("")
  const [typepay,setTypepay] = useState(1)
  const id_customer = localStorage.getItem('id_customer')
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('id_role')
  // const latitudereceive = localStorage.getItem('latitudereceive')
  // const longitudereceive = localStorage.getItem('longitudereceive')
  // const latitudedelivery = localStorage.getItem('latitudedelivery')
  var item_fee = Number(feeitem)
  var id_pay = Number(typepay)
  const [viewport,setViewport] = useState({
        with: "70vw",
        height:"70vh",
        zoom:12,
        latitude : latitudereceive,
        longitude : longitudereceive
    });
    const [showPopup,setShowPopup] = useState(false)
    const [address,setAddress] = useState("")

    useEffect(()=>{
      if(role==3 || role==4){
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
    })

    const handleChangeAddressReceive = (e) => {
      setAddressreceive(e.target.value)
    }
    const handleChangeAddressDelivery = (e) => {
      setAddressdelivery(e.target.value)
    }
    const handleChangeNameuser = (e) => {
      setNameuser(e.target.value)
    }
    const handleChangePhoneuser = (e) => {
      setPhoneuser(e.target.value)
    }
    const handleChangeItemfee = (e) => {
      setFeeitem(e.target.value)
    }
    const handleChangeDescription = (e) => {
      setDescription(e.target.value)
    }
    const handleChangeWeight = (e) => {
      setWeight(e.target.value)
    }
    const handleChangeTypepay = (e) => {
      setTypepay(e.target.value)
    }
    console.log(typepay)
    // console.log(addressreceive,addressdelivery,nameuser,phoneuser,feeitem,weight,description,typepay,id_customer)
    console.log(typeof(typepay)) 
    const handleClickGetIpReceive = async() => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressreceive}.json?access_token=pk.eyJ1IjoiZHVjaGF1MDUyMSIsImEiOiJjbGlqN3l3bzgwNHZkM2txbzhiemdnZDlhIn0.L20rg56BLB6iTrMutkntMw`)
        .then(function(response) {
            setLatitudereceive(response.data.features[0].center[1])
            setLongitudereceive(response.data.features[0].center[0])
        })
        .catch(function(err) {
            console.log(err);
        })
        .then(function() {

        })
        localStorage.setItem("latitudereceive",latitudereceive);
        localStorage.setItem("longitudereceive",longitudereceive);
    }
    const handleClickGetIpDelivery = () => {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressdelivery}.json?access_token=pk.eyJ1IjoiZHVjaGF1MDUyMSIsImEiOiJjbGlqN3l3bzgwNHZkM2txbzhiemdnZDlhIn0.L20rg56BLB6iTrMutkntMw`)
      .then(function(response) {
          setLatitudedelivery(response.data.features[0].center[1])
          setLongitudedelivery(response.data.features[0].center[0])
      })
      .catch(function(err) {
          console.log(err);
      })
      .then(function() {

      })
      localStorage.setItem("latitudedelivery",latitudedelivery);
      localStorage.setItem("longitudedelivery",longitudedelivery);
  }
  const handleCreateOrder = () => {
      try{
        {
          axios.post('/order/create', {
            id_customer: id_customer,
            id_type:id_pay,
            item_fee:item_fee,
            phone_receive:phoneuser,
            address_receive:addressreceive,
            address_delivery:addressdelivery,
            weight:weight,
            description:description,
            from_latitude:109.232525,
            from_longitude:10.151515,
            to_latitude:108.115141,
            to_longitude:10.225255
          },
              {
                  headers: {
                      Access_token: token,
                  }
              }
          )
          .then(res =>{
            console.log(res);
              toast.success('Tạo hoá đơn vận chuyển thành công', {
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
          .catch(err =>{
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
          })
        }
      
      }catch(err){
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
    <div className="">
      <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
        <Navbar/>
      </div>
      <div className={classes["container"]}>
        <div className={classes["create_order"]} >
          <div className={classes["title"]}>
            <p>Đơn Hàng Mới</p>
          </div>
          <div className={classes["receive_order"]}>
            <div>
              <Input
                name="receiveOrder"
                label="Địa điểm nhận hàng"
                placeholder="Nhập địa chỉ nhận hàng"
                onChange={handleChangeAddressReceive}
                required
                value={addressreceive}
              />
              <button onClick={handleClickGetIpReceive}>Xác nhận</button>
            </div>
          </div>
          <div className={classes["delivery_order"]}>
            <div>
              <Input
                name="receiveOrder"
                label="Địa điểm giao hàng"
                placeholder="Nhập địa chỉ giao hàng"
                required
                onChange={handleChangeAddressDelivery}
                value={addressdelivery}
              />
              <button onClick={handleClickGetIpDelivery}>Xác nhận</button>
            </div>
          </div>
          <h3>Thông tin người nhận</h3>
          <div className={classes["data-user"]}>
              <Input
                name="name-user"
                label="Tên Người Nhận"
                placeholder="Nhập tên người nhận hàng"
                required
                onChange={handleChangeNameuser}
              />
              <Input
                name="phone-user"
                label="Số điện thoại người nhậm"
                placeholder="Nhập số điện thoại người nhận"
                required
                onChange={handleChangePhoneuser}
              />
              <Input
                type="number"
                name="item-fee"
                label="Tiền thu hộ đơn hàng"
                placeholder="Nhập tiền cần thu hộ"
                required
                onChange={handleChangeItemfee}
              />
              <Input
                type="number"
                name="type-order"
                label="Nhập cân nặng hàng hoá "
                placeholder="Nhập cân nặng hàng hoá"
                required
                onChange={handleChangeWeight}
              />
              <Input
                name="description"
                label="Nhập ghi chú"
                placeholder="Nhập ghi chú cho đơn hàng"
                required
                onChange={handleChangeDescription}
              />
              {/* <Input
                name="description"
                label="Nhập ghi chú"
                placeholder="Nhập ghi chú cho đơn hàng"
                required
                onChange={handleChangeDescription}
              /> */}
              <select name="lang" id="lang-select" onChange={handleChangeTypepay}  className={classes["set__payment"]}>
                    <option selected="selected" value={1} >
                      Giao Hàng Bình Thường
                    </option>
                    <option value= {2} >
                      Giao Hàng Nhanh
                    </option> 
              </select>
              
          </div>
          <button className={classes["button-submit"]} onClick={handleCreateOrder}>Tạo Đơn Giao Hàng</button>
        </div>
        <div className={classes["map-box"]}>
          <div style={{width:"45vw", height:"60vh",}}>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                // onViewportChange={(viewport) => setViewport(viewport)}
                onMove={evt => setViewport(evt.viewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
            >
                <Marker
                    latitude={latitudereceive}
                    longitude={longitudereceive}
                    offsetLeft={-20}
                    offsetTop={-30}
                >
                    <img
                        onClick={() => setShowPopup(true)}
                        // style={{height:50,width:50}}
                        // src=""
                    />
                </Marker>

            </ReactMapGL>
            {/* <div className={classes['input_address']}>
            <input type="text" onChange={handleChangeAddress} placeholder='Nhập địa chỉ nhận hàng'></input>
            <button onClick={handleClickGetIp}>Xác Nhận</button>
            </div> */}
          </div>
        </div>
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

export default CreateOrder;