import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateProduct() {

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
        await axios.put('http://localhost:5000/product/update/' + id, product).then(() => {
            alert("Product Updated Successfully");
        }).catch((err) => {
            alert(err);
        })
    
        history.push("/section/productlist");          
    }

    useEffect(() => {
        loadProducts();
      }, []);
  
      const loadProducts = async () => {
          try{
            const result = await axios.get("http://localhost:5000/product/get/" + id);
            setProduct(result.data);
          }catch(err){
            console.log(err);
          }
      }

    return(
        <div class="product-include">
            <form onSubmit={e => onSubmit(e)}>

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
                            <select name="quantity" value={quantity} onChange={ e => onInputChange(e)} >
                                <option>Select Quantity</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select><br/>
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
    );
}