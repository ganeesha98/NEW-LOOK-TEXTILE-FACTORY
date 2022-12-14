import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ProductSummary(){

    const[products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();       
    }, [])

    const loadProducts = async() => {
        try{
            await axios.get('http://localhost:5000/product/').then((result) => {
                setProducts(result.data.reverse());
            });  
        }catch(e){
            console.log(e);
        }        
    }
    
    var stock = 0;
    var outOfStock = 0;
    var noOfProduct = 0;
    var noOfH_L = 0; 

    function calc (callback){ 
    
        products.map((product) => {

            //calculation 1
            stock += product.quantity;

            //calculation 2
            if(product.quantity === 0){
                outOfStock += 1;
            }

            //calculation 3
            noOfProduct += 1;

            //calculation 4
            if(product.status === "H_L"){
                noOfH_L += 1;
            }            
        }) 
        callback(stock, outOfStock, noOfProduct, noOfH_L);  
    }

    calc((v1, v2, v3, v4) => {
        stock = v1;
        outOfStock = v2;
        noOfProduct = v3;
        noOfH_L = v4;
    });

    return(
        <div class="product-summary">            

            <br/><center><h3>Product Summary</h3></center>
            <div className="container">
                <table class="summary-table ">
                    <div className="row d-flex align-content-center">
                        <div className="col-15">
                            <tr>
                                <td>
                                    <h6><b>Number of products in stock:</b></h6>
                                </td> 
                                <td>
                                    <h6><b>{stock}</b></h6>
                                </td> 
                            </tr>
                            <tr>
                                <td>
                                    <h6><b>Number of products out of stock:</b></h6>
                                </td>
                                <td>
                                    <h6><b>{outOfStock}</b></h6>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h6><b>Number of factory products:</b></h6>
                                </td>
                                <td>
                                    <h6><b>{noOfProduct}</b></h6>
                                </td>
                            </tr> 
                            <tr>
                                <td>
                                    <h6><b>Lowest to Highest products:</b></h6>
                                </td>
                                <td>
                                    <h6><b>{noOfH_L}</b></h6>
                                </td>
                            </tr>    
                        </div>    
                        </div>          
                    </table><br/>
                </div>

            <center>
                <table>
                    <tr>
                        <td>
                            <Link to ="/section/productlist" type = "reset" class="button">Back</Link>                          
                        </td>y
                    </tr>
                </table>
            </center>  
        </div>
    )
}