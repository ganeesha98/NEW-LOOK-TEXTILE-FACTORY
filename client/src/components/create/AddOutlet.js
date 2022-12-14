import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddOutlet() {

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

    const onSubmit = async e => {
        e.preventDefault();
        const valid = formValidation();
        if(valid){
            await axios.post('http://localhost:5000/outlet/add/', outlet).then(() => {
                alert("Outlet Added Successfully");
            }).catch((err) => {
                alert(err);
            })
            history.push("/section/outletlist");
        }                      
    }

    const formValidation = () =>{
  
        let isValid = true;

        if(ownerName.trim().length === 0){
            toast.error("Please insert name");
            isValid = false;
        }
        else if(NIC.trim().length === 0){
            toast.error("Please insert nic");
            isValid = false;
        }
    
        else if(outletName.trim().length === 0){
            toast.error("Please insert outletname");
            isValid = false;
        }

        else if(ownerAddress.trim().length === 0){
            toast.error("Please insert address");
            isValid = false;
        }

        else if(ownerPhone.trim().length === 0){
            toast.error("Please insert telephone no");
            isValid = false;
        }

        else if(date.trim().length === 0){
            toast.error("Please insert date");
            isValid = false;
        }

        else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            toast.error("Please insert email");
            isValid = false;
        }

        else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
            toast.error("Please insert password");
            isValid = false;
        }

        else if(outletID.trim().length === 0){
            toast.error("Please insert outletID");
            isValid = false;
        } 
        else if(outletPhone.trim().length === 0){
            toast.error("Please insert outlet phone");
            isValid = false;
        }
  
        return isValid;
      }

    return(
        <div class="outlet-include">
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

                <br/><center><h3>Add Outlet</h3></center><br/>

                <table class="payment-table">
                    <tr>
                        <td>
                            Outlet Owner Name
                            <input type="text" name="ownerName" value={ownerName} placeholder="Enter owner Name" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Owner NIC
                            <input type="text" name="NIC" value={NIC} placeholder="Enter owner NIC" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Name
                            <input type="text" name="outletName" value={outletName} placeholder="Enter Outlet  Name" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Owner Address
                            <input type="text" name="ownerAddress" value={ownerAddress} placeholder="Enter owner Address" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Owner Telephone No
                            <input type="text" name="ownerPhone" value={ownerPhone} placeholder="Enter Telephone no" onChange={ e => onInputChange(e)}/><br/>
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
                            <input type="text" name="email" value={email} placeholder="Enter E-mail" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password
                            <input type="password" id="psw-input-field" name="password" value={password} placeholder="Enter Your password" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet ID
                            <input type="text" name="outletID" value={outletID} placeholder="Enter outlet ID" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Outlet Phone No
                            <input type="text" name="outletPhone" value={outletPhone} placeholder="Enter phone number" onChange={ e => onInputChange(e)}/><br/>
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