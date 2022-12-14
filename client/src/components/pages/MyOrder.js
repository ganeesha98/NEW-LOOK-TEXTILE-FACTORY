import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyOrder() {

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
    
    
    useEffect(() => {
        loadProduct();
      }, []);
  
      const loadProduct = async () => {
          const result = await axios.get("http://localhost:5000/product/get/" + id);
          setProduct(result.data);
      }

    const [order, setOrder] = useState({
        pdName: "",
        oColor: "",
        oSize: "",
        oQuantity: "",
        total: ""
    });

    const { pdName, oColor, oSize, oQuantity, total } = order;

    const onInputChange = e => {
        setOrder({...order, [e.target.name]: e.target.value});
    }

    var sum = 0;
    var pPrice = parseFloat(price) * oQuantity;

    const onSubmit = async e => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid){
            await axios.post('http://localhost:5000/order/add/?pdName='+pName+'&oColor='+oColor+'&oSize='+oSize+'&oQuantity='+oQuantity+'&total='+pPrice).then(() => {
                alert("order added successfully");
            }).catch((err) => {
                alert(err);
            })        
            history.push("/section/mycart");     
        }     
    }

    const [productErr, setProducrErr] = useState({});
    const [colorErr, setColorErr] = useState({});
    const [sizeErr, setSizeErr] = useState({});
    const [quantityErr, setQuantityErr] = useState({});

    const formValidation = () =>{

        const productErr = {};
        const colorErr = {};
        const sizeErr = {};
        const quantityErr = {};
  
        let isValid = true;

        if(oColor.trim().length === 0){
            toast.error("Please insert color");
            isValid = false;
        }
        else if(oSize.trim().length === 0){
            toast.error("Please insert size");
            isValid = false;
        }
    
        else if(oQuantity.trim().length === 0){
            toast.error("Please insert quantity");
            isValid = false;
        }
  
        setProducrErr(productErr);
        setColorErr(colorErr);
        setSizeErr(sizeErr);
        setQuantityErr(quantityErr); 
  
        return isValid;
      }

    return(
        <div class="myOrder">
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

                <br/><center><h3>My Order Page</h3></center><br/>

                <table class="payment-table">
                    
                    <tr>
                        <td>
                            Product Name
                            <input type="text" name="pName" value={pName} placeholder="Enter Product Name"  onChange={ e => onInputChange(e)}/>
                            {Object.keys(productErr).map((key)=>{
                                return <div style={{color: "#ff2b2b"}}>{productErr[key]}</div>
                                })}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Color
                            <select name="oColor" value={oColor} onChange={ e => onInputChange(e)} required>
                                <option>Select Color</option>
                                <option value="White">White</option>
                                <option value="Black">Black</option>
                                <option value="Red">Red</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Blue">Blue</option>
                            </select>
                            {Object.keys(colorErr).map((key)=>{
                                return <div style={{color: "#ff2b2b"}}>{colorErr[key]}</div>
                                })}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Size
                            <select name="oSize" value={oSize} onChange={ e => onInputChange(e)} >
                                <option>Select Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXXL">XXXL</option>
                            </select>
                            {Object.keys(sizeErr).map((key)=>{
                                return <div style={{color: "#ff2b2b"}}>{sizeErr[key]}</div>
                                })}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Quantity
                            <select name="oQuantity" value={oQuantity} onChange={ e => onInputChange(e)} >
                                <option value="1">Select Quantity</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                            {Object.keys(quantityErr).map((key)=>{
                                return <div style={{color: "#ff2b2b"}}>{quantityErr[key]}</div>
                                })}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Total
                            <input type="text" name="total" value={parseFloat(price) * oQuantity} placeholder="Enter Total" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <center>
                            <td>
                                <button type = "submit" onclick="" class="button">Add To Cart</button>
                            </td>
                        </center>
                    </tr>
                </table>    
                
            </form>
        </div>
    );
}