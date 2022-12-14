import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainHeader from "../pages/MainHeader";

export default function AddProduct() {

    let history = useHistory();
    const { id } = useParams();

    const [product, setProduct] = useState({
        pID: "",
        pName: "",
        category: "",
        price: "",
        size: "",
        status: "",
        quantity: "",
        color: "",
        date: ""
    });

    const { pID, pName, category, price, size, status, quantity, color, date } = product;

    const onInputChange = e => {
        setProduct({...product, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();        
        const valid = formValidation();
        if(valid){
            await axios.post('http://localhost:5000/product/add/', product).then(() => {
                alert("Product Added Successfully");
            }).catch((err) => {
                alert(err);
            })
            history.push("/section/productlist");  
        }              
    }

    const formValidation = () =>{
  
        let isValid = true;

        if(pID.trim().length === 0){
            toast.error("Please insert code");
            isValid = false;
        }
        else if(pName.trim().length === 0){
            toast.error("Please insert name");
            isValid = false;
        }
    
        else if(category.trim().length === 0){
            toast.error("Please insert category");
            isValid = false;
        }

        else if(price.trim().length === 0){
            toast.error("Please insert price");
            isValid = false;
        }

        else if(size.trim().length === 0){
            toast.error("Please insert size");
            isValid = false;
        }

        else if(status.trim().length === 0){
            toast.error("Please insert status");
            isValid = false;
        }

        else if(quantity.trim().length === 0){
            toast.error("Please insert quantity");
            isValid = false;
        }

        else if(color.trim().length === 0){
            toast.error("Please insert color");
            isValid = false;
        }

        else if(date.trim().length === 0){
            toast.error("Please insert date");
            isValid = false;
        } 
  
        return isValid;
      }

    return(
        
        <>
            
            <div class="product-include">
            
                <form onSubmit={e => onSubmit(e)}>

                    <ToastContainer style={{ width: "450px", textAlign: 'center', fontSize: '17px', fontFamily: 'fantasy' }}
                        position="top-center"
                        theme='light'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        limit={1}
                    />

                    <br/><center><h3>Add Product</h3></center>

                    <table class="payment-table">
                        <tr>
                            <td>
                                Product ID
                                <input type="text" name="pID" value={pID} placeholder="Enter Code" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Product Name
                                <input type="text" name="pName" value={pName} placeholder="Enter Product Name" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Category
                                <select name="category" value={category} onChange={ e => onInputChange(e)} >
                                    <option>Select Category</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                </select><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Price
                                <input type="text" name="price" value={price} placeholder="Enter Price" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Size
                                <select name="size" value={size} onChange={ e => onInputChange(e)} >
                                    <option>Select Size</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Status
                                <select name="status" value={status} onChange={ e => onInputChange(e)} >
                                    <option>Select Status</option>
                                    <option value="H_L">Highest to Lowest</option>
                                    <option value="H_M">Highest to Mid range</option>
                                </select><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Quantity
                                <input type="number" name="quantity" value={quantity} onChange={ e => onInputChange(e)}/>
                                {/* <select name="quantity" value={quantity} onChange={ e => onInputChange(e)} >
                                    <option>Select Quantity</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select><br/> */}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Color
                                <input type="text" name="color" value={color} placeholder="Enter Your Color" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Date
                                <input type="text" name="date" value={date} placeholder="Enter Date" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        
                    </table><br/>

                    <center>
                        <table>
                            <tr>
                                <td>
                                    <button type = "reset" class="button">Reset</button>                            
                                </td>
                                <td>
                                    <button type = "submit" onclick="" class="button">Confirm</button>
                                </td>
                            </tr>
                        </table>
                    </center> 
                </form>
            </div>
        </>
    );
}