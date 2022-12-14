import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateOutlet() {

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

    const onInputChange = e => {
        setOutlet({...outlet, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        loadOutlet();
      }, []);
  
      const loadOutlet = async () => {
          const result = await axios.get("http://localhost:5000/outlet/get/" + id);
          setOutlet(result.data);
      }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put('http://localhost:5000/outlet/update/' + id, outlet).then(() => {
            alert("Outlet Updated Successfully");
        }).catch((err) => {
            alert(err);
        })
    
        history.push("/section/outletlist");          
    }

    return(
        <div class="outlet-include">
            <form onSubmit={e => onSubmit(e)}>

                <br/><center><h3>Add Outlet</h3></center><br/>

                <table class="payment-table">
                    <tr>
                        <td>
                            Outlet Owner Name
                            <input type="text" name="ownerName" value={ownerName} placeholder="Enter owner name" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Owner NIC
                            <input type="text" name="NIC" value={NIC} placeholder="Enter NIC" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Name
                            <input type="text" name="outletName" value={outletName} placeholder="Enter Outlet Name" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Owner Address
                            <input type="text" name="ownerAddress" value={ownerAddress} placeholder="Enter Address" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Owner Telephone No
                            <input type="text" name="ownerPhone" value={ownerPhone} placeholder="Enter Telephone number" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Register Date
                            <input type="text" name="date" value={date} placeholder="Enter date" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet/Owner E-mail
                            <input type="text" name="email" value={email} placeholder="Enter Email" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password
                            <input type="password" name="password" value={password} placeholder="Enter Passwrd" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet ID
                            <input type="text" name="outletID" value={outletID} placeholder="Enter OutletID" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Phone No
                            <input type="text" name="outletPhone" value={outletPhone} placeholder="Enter outlet phone" onChange={ e => onInputChange(e)}/><br/>
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