import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function DeliverSummary(){

    const[deliver, setDeliver] = useState([]);
    const[driver, setDdriver] = useState([]);


    useEffect(() => {
        loadDeliver();  
        loadDriver();       
    }, [])

    const loadDeliver = async() => {
        try{
            await axios.get('http://localhost:5000/deliver/').then((result) => {
                setDeliver(result.data.reverse());
            });  
        }catch(e){
            console.log(e);
        }        
    }

    const loadDriver = async() => {
        try{
            await axios.get('http://localhost:5000/driver/').then((result) => {
                setDdriver(result.data.reverse());
            });  
        }catch(e){
            console.log(e);
        }        
    }
    

    //calculation 1
    var noOfDeliver = 0;

    function calc (callback){ 
    
        deliver.map((deliver) => {

            noOfDeliver += 1; 

        }) 

        callback(noOfDeliver);  
    }

    calc((v1) => {
        noOfDeliver = v1;
    });

    //calculation 2

    var noOfDriver = 0;

    function calcDriver (callback){ 
    
        driver.map((driver) => {

            noOfDriver += 1; 

        }) 

        callback(noOfDriver);  
    }

    calcDriver((v1) => {
        noOfDriver = v1;
    });

    return(
        <div class="product-summary">            

            <br/><center><h3>Deliver Summary</h3></center><br/><br/>
            <div className="container">
                <table class="summary-table ">
                    <div className="row d-flex align-content-center">
                        <div className="col-15">
                            <tr>
                                <td>
                                    <h6><b>Number of Delivers to Deliver:</b></h6>
                                </td> 
                                <td>
                                    <h6><b>{noOfDeliver}</b></h6>
                                </td> 
                            </tr>
                            <tr>
                                <td>
                                    <h6><b>Number of Drivers currently we have:</b></h6>
                                </td>
                                <td>
                                    <h6><b>{noOfDriver}</b></h6>
                                </td>
                            </tr>
                            {/* <tr>
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
                            </tr>     */}
                        </div>    
                        </div>          
                    </table><br/>
                </div>

            <center>
                <table>
                    <tr>
                        <td>
                            <button type = "reset" class="button">Close</button>                            
                        </td>
                        <td>
                            <button onclick="" class="button">Print PDF</button>
                        </td>
                    </tr>
                </table>
            </center>  
        </div>
    )
}