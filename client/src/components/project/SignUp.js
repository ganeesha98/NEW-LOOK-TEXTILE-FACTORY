import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import '../css/styles.css';

import Webcam from "react-webcam";
import { useRef } from 'react';

const SignUp = () => {
//////////////////////
  const webRef = useRef(null);

    const [imageUrl, setImageUrl] = useState('');

    const showImage = () => {
        setImageUrl(webRef.current.getScreenshot());
    }
////////////////////
    let history = useHistory();

    const [user, setUser] = useState({
        fname: "",
        lname: "",
        dob: "",
        nic: "",
        caddress: "",
        paddress: "",
        desig: "",
        dept: "",
        tp: "",
        email: "",
        salary: "",
        psw: ""
    });

    const [userid, setUserID] = useState({
      userID: ""
    })

    const { userID } = userid;

    const { fname, lname, dob, nic, caddress, paddress, desig, dept, tp, email, salary, psw } = user;

    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
        setUserID({...userID, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {

        e.preventDefault();
        await axios.post('http://localhost:8070/newstaff/abc/', user).then(() => {
            alert("staff member added successfully");
        }).catch((err) => {
            alert(err);
        })
        history.push("/test");
    }

    return(
        <div className="formBackground">
        <div className="formContainer">

            <div class="formBody">
            <div class="include5">
      <form onSubmit={e => onSubmit(e)}>
          <center><h1>Employee Registration</h1></center>

        <table class="signup-table">
          <tr>
            <td>
              First Name<br/>
              <input type="text"  class="insert"  placeholder="First name" name="fname" value={fname} onChange={ e => onInputChange(e)} required/>
            </td>
            <td>
              Last Name<br/>
              <input type="text" id="uName" name="lname" class="insert" value={lname} placeholder="Last name" onChange={ e => onInputChange(e)}  required/>
            </td>
            <td>
              Date Of Birth<br/>
              <input type="Date" id="uName" name="dob" class="insert" value={dob} placeholder="DOB" onChange={ e => onInputChange(e)} required />
            </td>
          </tr>
          <tr>
            <td>
              NIC No<br/>
              <input type="text" name="nic" value={nic} class="insert" placeholder="NIC no" pattern="[0-9]{9,9}[A-Za-z]{1,1}" onChange={ e => onInputChange(e)} required/>
            </td>
            <td>
              Current Address<br/>
              <input type="text" name="caddress" value={caddress} class="insert" placeholder="Current Address" onChange={ e => onInputChange(e)}  required/>
            </td>
            <td>
              Permanent Address<br/>
              <input type="text" name="paddress" value={paddress} class="insert" placeholder="Permanent Address" onChange={ e => onInputChange(e)} required />
            </td>
          </tr>
        
          <tr>
            <td>
              Choose designation<br></br>
              <select name="desig" value={desig} onChange={ e => onInputChange(e)} required>
              <option disabled="disabled" selected="select">--Select destination--</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Staff">Staff</option>
              </select>
            </td>
            <td>
            Choose Department<br/>
            <select name="dept" value={dept} onChange={ e => onInputChange(e)} required>
            <option disabled="disabled" selected="select">--Select Department--</option>
            <option value="HR">HR</option>
            <option value="Account">Account</option>
            <option value="Sales">Sales</option>
            </select>
          </td>
          <td>
              Salary<br/>
              <input type="text" name="salary" value={salary} class="insert" placeholder="Salary" pattern="[0-9]{5,6}" onChange={ e => onInputChange(e)} required/>
            </td>
          </tr>
          <tr>
            <td>
              Telephone No<br/>
              <input type="text" name="tp" value={tp} class="insert" placeholder="TP No" pattern="[0-9]{10,10}" onChange={ e => onInputChange(e)} required/>
            </td>
            <td>
              Email Address<br/>
              <input type="text" name="email" value={email} class="insert" placeholder="Email Address" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={ e => onInputChange(e)} required/>
            </td>
            <td>
              Salary<br/>
              <input type="text" name="salary" value={salary} class="insert" placeholder="Salary" onChange={ e => onInputChange(e)} required/>
            </td>
          </tr>
          <tr>
            <td>
              Password<br/>
              <input type="Password" name="psw" class="insert" value={psw} placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={ e => onInputChange(e)} required/>
            </td>
            <td>
              Your ID<br/>
              <input type="text" class="insert" name="userID" value={userID} placeholder="User id" pattern="[A-Z]{2,2}[0-9]{8,8}" onChange={ e => onInputChange(e)} required/>
            </td>
          </tr>
          </table><br/>
          <center> <table class="signup-table">
          <tr>
            <td>
            <button onClick={ () => { showImage() }}>Save</button>
            </td>
            <td>
              <input type="file" name="image" id="image"/>
            </td>
          </tr>       
        </table></center>

        <center>
        <button type = "submit" onclick="" class="button">Submit</button>
        <button type = "reset" onclick="" class="button">reset</button>
        </center>
      
      </form>
      </div>
      </div>
      </div>
      <div>
    
            


                {imageUrl ? (
                    <a href={imageUrl} download>
                        <img src={imageUrl} alt="img"/>
                    </a>) : null}
            
      </div>
      </div>
    )
    //password => Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters.
    //<Webcam ref={webRef} screenshotFormat="image/jpeg" /><br/><br/>
}

export default SignUp;