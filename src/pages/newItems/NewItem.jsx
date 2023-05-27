import React from "react";
import classes from './NewItem.module.css'
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useState } from "react";
//import api from "../../redux/axois"
import api from '../../contexts/axios';


const NewItem = () => {

    const token = localStorage.getItem('token')
    const [items,setItems] = useState({
        category_name: "",
        description:"",
    })
    const navigate = useNavigate();
    //const {id} = useParams();
    const [error, setError] = useState("")


    
    //console.log(items[0]);
    


    const handleSubmit = (e) =>{
        e.preventDefault();

        // try{
        // {
        //     api.post('/items/create', items,
        //         {
        //             headers: {
        //                 Access_token: token,
        //             }
        //         }
        //     )
        //     .then(res =>{
        //         alert("thêm thành công")
        //         navigate('/')
        //     })
        //     .catch(err =>{
        //         setError(err.response.data.message)
        //     })
        // }
        
        // }catch(error){
        //     console.log(error.response.data);
        // }
        console.log(items);
    }
    console.log(error)
    const handleChange = (e) => {
        
        const itemsClone = {...items};
        itemsClone[e.target.name] = e.target.value;
        setItems(itemsClone);
    
    }


    return (
        <div>
            <Link to="/Category" className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h> Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>Thêm mới category</h1>
                    <p className={classes["text-err"]}>{error}</p>
                    <form action="" className={classes["add-form"]}>
                        
                        <Input
                            name="category_name"
                            label="Tên category"
                            placeholder="Nhập tên category"
                            required={true}
                            value={items.name}
                            onChange={handleChange}
                        />
                        
                        <Input
                            name="description"
                            label="Description"
                            placeholder="Description"
                            required={true}
                            value={items.image}
                            onChange={handleChange}
                        />
                        
                        
                        <button className={classes['button-submit']}
                                onClick={handleSubmit}
                        >
                            Thêm mới
                        </button>
                    </form>
                       
                </div>
            </div>
        </div>
    )
};
export default NewItem;