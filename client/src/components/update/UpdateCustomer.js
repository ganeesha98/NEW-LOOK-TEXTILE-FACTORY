import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateCustomer() {

    let history = useHistory();
    const { id } = useParams();

    const [customer, setCustomer] = useState({
        firstName: "", 
        lastName: "", 
        userName: "", 
        birthDate: "", 
        phone: "", 
        address: "", 
        email: "", 
        gender: "", 
        password: "", 
    });

    const { firstName, lastName, userName, birthDate, phone, address, email, gender, password, rePassword, isChecked } = customer;

    const onInputChange = e => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        loadCustomer();
      }, []);
  //get
    const loadCustomer = async () => {
        const result = await axios.get("http://localhost:5000/user/get/" + id);
        setCustomer(result.data);
    }
//update
    const onSubmit = async e => {
        e.preventDefault();
        const valid = formValidation();
        if(valid){
            await axios.put('http://localhost:5000/user/update/' + id, customer).then(() => {
                alert("customer updated successfully");
            }).catch((err) => {
                alert(err);
            })    
            history.push("/section/customer-profile/" + id);
        }                  
    }
//validation
    const formValidation = () =>{
  
        let isValid = true;

        if(firstName.trim().length === 0){
            toast.error("Please insert color");
            isValid = false;
        }
        else if(lastName.trim().length === 0){
            toast.error("Please insert size");
            isValid = false;
        }

        else if(userName.trim().length === 0){
            toast.error("Please insert user name");
            isValid = false;
        }

        else if(birthDate.trim().length === 0){
            toast.error("Please insert Birth Date");
            isValid = false;
        }

        else if(phone.trim().length === 0){
            toast.error("Please insert quantity");
            isValid = false;
        }

        else if(address.trim().length === 0){
            toast.error("Please insert quantity");
            isValid = false;
        } 
    
        else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            toast.error("Please insert quantity");
            isValid = false;
        }

        else if(gender.trim().length === 0){
            toast.error("Please insert Gender");
            isValid = false;
        } 

        else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
            toast.error("Please insert valid Password");
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

                <br/><br/><center><h3>Update Customer</h3></center><br/>

                <table class="payment-table">
                    <tr>
                        <td>
                            First Name
                            <input type="text" name="firstName" value={firstName} placeholder="Enter Your First Name" onChange={ e => onInputChange(e)}/>
                        </td>                        
                    </tr>
                    <tr>
                        <td>
                            Last Name
                            <input type="text" name="lastName" value={lastName} placeholder="Enter Your Last Name" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Username
                            <input type="text" name="userName" value={userName} placeholder="Enter Your Username" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Birthday
                            <input type="text" name="birthDate" value={birthDate} placeholder="Enter Your birthday" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Contact Number
                            <input type="text" name="phone" value={phone} placeholder="Enter Your Contact Number" onChange={ e => onInputChange(e)}/>
                        </td>                        
                    </tr>
                    <tr>                        
                        <td>
                            Address
                            <input type="text" name="address" value={address} placeholder="Enter Your Address" onChange={ e => onInputChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email
                            <input type="text" name="email" value={email} placeholder="Enter Your Email" onChange={ e => onInputChange(e)}/>
                        </td>                        
                    </tr>
                    <tr>
                        <td>
                            Gender
                            <select name="gender" value={gender} onChange={ e => onInputChange(e)} >
                                <option>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
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