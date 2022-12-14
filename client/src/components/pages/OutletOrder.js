import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';

export default function OutletOrder() {

    let history = useHistory();
    const { id } = useParams();

    const [outlet, setOutlet] = useState({
        ownerName: "",
        NIC: "",
        outletName: "",
        ownerAddress: "",
        ownerPhone: "",
        date: "",
        email: "",
        password: "",
        outletID: "",
        outletPhone: ""
    });

    const { ownerName, NIC, outletName, ownerAddress, ownerPhone, date, email, password, outletID, outletPhone } = outlet;

    useEffect(() => {
        loadOutlet();
      }, []);
  
      const loadOutlet = async () => {
          const result = await axios.get("http://localhost:5000/outlet/get/" + id);
          setOutlet(result.data);
      }

      const [outletOrder, setOutletOrder] = useState({
        ownerNameOrder: "",
        ownerPhoneOrder: "",
        outletIDOrder: "",
        OrderDate: "",
        designCode: "",
        productName: "",        
        category: "",
        size: "",
        quantity: ""
    });    

    const { ownerNameOrder, ownerPhoneOrder, outletIDOrder, designCode, productName, OrderDate, category, size, quantity } = outletOrder;

    const onInputChange = e => {
        setOutletOrder({...outletOrder, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {;       
        e.preventDefault();
        await axios.post('http://localhost:5000/outletOrder/add/' 
            + ownerName + '/' 
            + ownerPhone + '/' 
            + outletID + '/' 
            + designCode + '/' 
            + productName + '/' 
            + OrderDate + '/' 
            + category + '/' 
            + size + '/' 
            + quantity        
        ).then(() => {
            alert("outlet order added successfully");
        }).catch((err) => {
            alert(err);
        })

            // '&ownerPhone=' + ownerPhone 
            // '&outletID=' + outletID+ 
            // '&designCode=' + designCode + 
            // '&productName=' + productName + 
            // '&OrderDate=' + OrderDate + 
            // '&category=' + category + 
            // '&size=' + size + 
            // '&quantity=' + quantity

        console.log(outletOrder);
    
        history.push("/section/OutletOrdersList");          
    }

    return(
        <div class="driver-include">
            <form onSubmit={e => onSubmit(e)}>

                <br/><center><h3>Add Outlet Order</h3></center><br/>

                <table class="driver-table">
                    <tr>
                        <td>
                            Owner Name
                            <input type="text" name="ownerNameOrder" value={ownerName} placeholder="Enter Full Name"/>
                        </td>
                        <td className="tb-right">
                            Owner T.P
                            <input type="text" name="ownerPhoneOrder" value={ownerPhone} placeholder="Enter Phone Number"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet ID
                            <input type="text" name="outletIDOrder" value={outletID} placeholder="Enter outlet ID"/>
                        </td>
                    </tr><br/><br/>
                    <tr>
                        <td>
                            Design Code
                            <input type="text" name="designCode" value={designCode} placeholder="Enter design code" onChange={ e => onInputChange(e)}/>
                        </td>
                        <td className="tb-right">
                            Product Name
                            <input type="text" name="productName" value={productName} placeholder="Enter product name" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date
                            <input type="text" name="OrderDate" value={OrderDate} placeholder="Enter date" onChange={ e => onInputChange(e)}/>
                        </td>
                        <td className="tb-right">                            
                            Category
                            <input type="text" name="category" value={category} placeholder="Enter category" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            size
                            <input type="text" name="size" value={size} placeholder="Enter size" onChange={ e => onInputChange(e)}/>
                        </td>
                        <td className="tb-right">                            
                            Quantity
                            <input type="text" name="quantity" value={quantity} placeholder="Enter quantity" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    
                </table><br/><br/>

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