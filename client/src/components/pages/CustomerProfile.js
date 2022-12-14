import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomerProfile() {

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

    const { firstName, lastName, userName, birthDate, phone, address, email, gender, password, rePassword } = customer;

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

    

    return(
        <div class="customer-profile">
            <form>

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

                <br/><br/><center><h3>Customer Profile</h3></center><br/>

                <table class="payment-table">
                    <tr>
                        <td>
                            First Name
                            <input type="text" name="firstName" value={firstName}/>
                        </td>                        
                    </tr>
                    <tr>
                        <td>
                            Last Name
                            <input type="text" name="lastName" value={lastName}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Username
                            <input type="text" name="userName" value={userName}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Birthday
                            <input type="text" name="birthDate" value={birthDate}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Contact Number
                            <input type="text" name="phone" value={phone}/>
                        </td>                        
                    </tr>
                    <tr>                        
                        <td>
                            Address
                            <input type="text" name="address" value={address}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email
                            <input type="text" name="email" value={email}/>
                        </td>                        
                    </tr>
                    <tr>
                        <td>
                            Gender
                            <select name="gender" value={gender} >
                                <option>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </td>
                    </tr>
                    
                </table><br/>

                <center>
                    <table>
                        <tr>
                            <td>
                                <Link to = "/section/customerlist"><button type = "reset" class="button">BACK</button></Link>                           

                                <Link to={`/section/update-customer/${id}`}><button type = "submit" class="button">Go To Update</button></Link>
                                
                            </td>
                        </tr>
                    </table>
                </center> 
            </form>
        </div>
    );
}