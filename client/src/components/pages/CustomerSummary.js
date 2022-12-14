import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CustomerSummary(){

    //generate pdf-----------------------------

  let docToPrint = React.createRef();

  const printDocument = () => {
    const input = docToPrint.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [600, 900]
      });
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("customer list_2021-2-3.pdf");
    });
  };

  //end generate pdf-----------------------------

    const[customer, setCustomer] = useState([]);


    useEffect(() => {
        loadCustomer();       
    }, [])

    const loadCustomer = async() => {
        try{
            await axios.get('http://localhost:5000/user/get').then((result) => {
                setCustomer(result.data.reverse());
            });  
        }catch(e){
            console.log(e);
        }        
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today =  yyyy + "-" + mm + "-" + dd;
    

    //calculation 1
    var noOfCustomer = 0;
    var noOfNewCustomer = 0;

    function calc (callback){ 
    
        customer.map((customer) => {

            noOfCustomer += 1; 

            let val = customer.createdAt;
            const val2 = val.split("T")[0];
            console.log(val2);
            console.log(today);

            if(val2 === today){
                noOfNewCustomer += 1;
            }          

        }) 

        callback(noOfCustomer, noOfNewCustomer);  
    }

    calc((v1, v2) => {
        noOfCustomer = v1;
        noOfNewCustomer = v2;
    });

    return(
        <div class="product-summary">            

            <br/><center><h3>Customer Summary</h3></center><br/><br/>
            <div className="container">
            <div ref={docToPrint}>
                <table class="summary-table ">
                    <div className="row d-flex align-content-center">
                        <div className="col-15">
                            <tr>
                                <td>
                                    <h6><b>Number of Register Customers:</b></h6>
                                </td> 
                                <td>
                                    <h6><b>{noOfCustomer}</b></h6>
                                </td> 
                            </tr>
                            <tr>
                                <td>
                                    <h6><b>Number of New Register Customers:</b></h6>
                                </td>
                                <td>
                                    <h6><b>{noOfNewCustomer}</b></h6>
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
                    </table>
                    </div>
                    <br/>
                </div>

            <center>
                <table>
                    <tr>
                        <td>
                        <Link to = "/section/customerlist"><button type = "reset" class="button">BACK</button></Link>                           
                        </td>
                        <td>
                            <button onClick = {printDocument} class="button">Print PDF</button> 
                        </td>
                    </tr>
                </table>
            </center>  
        </div>
    )
}