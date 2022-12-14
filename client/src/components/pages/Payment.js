import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Payment() {

    

    let history = useHistory();
    const { id } = useParams();

    const [payment, setPayment] = useState({
        fullName: "",
        phone: "",
        email: "",
        country: "",
        city: "",
        sAddress: "",
        pCode: "",
        method: "",
    });

    const { fullName, phone, email, country, city, sAddress, pCode, method } = payment;

    const onInputChange = e => {
        setPayment({...payment, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        const valid = formValidation();
        if(valid){
            await axios.post('http://localhost:5000/payment/add/', payment).then(() => {
                alert("paymnet added successfully");
            }).catch((err) => {
                alert(err);
            })   
            history.push(`/section/summary?fullName=`+fullName+`&phone=`+phone+`&email=`+email+`&country=`+country+`&city=`+city+`&sAddress=`+sAddress+`&pCode=`+pCode+`&method=`+method+`&orderID=`+id);
        }               
    }

    const formValidation = () =>{
  
        let isValid = true;

        if(fullName.trim().length === 0){
            toast.error("Please insert Fullname");
            isValid = false;
        }
        else if(phone.trim().length === 0){
            toast.error("Please insert correct phone number");
            isValid = false;
        }
    
        else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            toast.error("Please insert valid email");
            isValid = false;
        }

        else if(country.trim().length === 0){
            toast.error("Please select country");
            isValid = false;
        }

        else if(city.trim().length === 0){
            toast.error("Please insert city");
            isValid = false;
        }

        else if(sAddress.trim().length === 0){
            toast.error("Please insert Address");
            isValid = false;
        }

        else if(pCode.trim().length === 0){
            toast.error("Please insert postal code");
            isValid = false;
        }

        else if(method.trim().length === 0){
            toast.error("Please select payment method");
            isValid = false;
        } 
  
        return isValid;
      }

    return(
        <div class="include">
            <form onSubmit={e => onSubmit(e)}>

                <ToastContainer style={{ width: '450px', textAlign: 'center', fontSize: '17px', fontFamily: 'fantasy' }}
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

                <br/><center><h3>Payment Page</h3></center>

                <table class="payment-table">
                    <tr>
                        <td>
                            Full Name
                            <input type="text" name="fullName" value={fullName} placeholder="Enter Full Name" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Phone Number
                            <input type="text" name="phone" value={phone} placeholder="Enter Phone Number" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            E-mail
                            <input type="text" name="email" value={email} placeholder="Enter Your E-mail" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Country
                            <select name="country" value={country} onChange={ e => onInputChange(e)} >
                                <option>Select Country</option>
                                <option value="SriLanka">Sri Lanka</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="China">China</option>
                                <option value="UK">UK</option>
                                <option value="Canada">Canada</option>
                            </select><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            City
                            <input type="text" name="city" value={city} placeholder="Enter Your city" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Street Address
                            <input type="text" name="sAddress" value={sAddress} placeholder="Enter Street Address" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Postal Code
                            <input type="text" name="pCode" value={pCode} placeholder="Enter Your Posatal Code" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Payment Method
                            <select name="method" value={method} onChange={ e => onInputChange(e)} >
                                <option>Select Method</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Cash On Delivery">Cash On Delivery</option>
                            </select><br/> 
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