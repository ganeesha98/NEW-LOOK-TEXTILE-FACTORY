import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import '../css/styles.css';

import Webcam from "react-webcam";
import { useRef } from 'react';

const AddUser = () => {

  //form validation

    const [firstNameErr, setFirstNameErr] = useState({});
    const [lasttNameErr, setLastNameErr] = useState({});
    const [dobErr, setDobErr] = useState({});
    const [nicErr, setNicErr] = useState({});
    const [cAddressErr, setCAddressErr] = useState({});
    const [pAddressErr, setPAddressErr] = useState({});
    const [salaryErr, setSalaryErr] = useState({});
    const [tpErr, setTpErr] = useState({});
    const [emailErr, setEmailErr] = useState({});
    const [yIdErr, setYIdErr] = useState({});
    const [pswErr, setPswErr] = useState({});
    const [desigErr, setDesigErr] = useState({});
    const [deptErr, setDeptErr] = useState({});

  //end form validation

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
        psw: "",
        userID: ""
    });

    //const [userid, setUserID] = useState({
    //  userID: ""
    //})

    //const { userID } = userid;

    const { fname, lname, dob, nic, caddress, paddress, desig, dept, tp, email, salary, psw, userID } = user;

    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
        //setUserID({...userID, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid){
          await axios.post('http://localhost:5000/newstaff/add/', user).then(() => {
            alert("staff member added successfully");
          }).catch((err) => {
              alert(err);
          })
        
          history.push("/section/employeelist");
        }   
    }

    const formValidation = () =>{

      const firstNameErr = {};
      const lasttNameErr = {};
      const dobErr = {};
      const nicErr = {};
      const cAddressErr = {};
      const pAddressErr = {};
      const salaryErr = {};
      const tpErr = {};
      const emailErr = {};
      const yIdErr = {};
      const pswErr = {};
      const desigErr = {};
      const deptErr = {};

      let isValid = true;

      //firstname

      if(fname.trim().length === 0){
        firstNameErr.firstNameNull = "Please insert first name";
        isValid = false;
      }
      else if(fname.trim().length < 4){
        firstNameErr.firstNameShort = "first name is too short";
        isValid = false;
      }

      //lastname
      else if(lname.trim().length === 0){
        lasttNameErr.lastNameNull = "Please insert last name";
        isValid = false;
      }
      else if(lname.trim().length < 4){
        lasttNameErr.lastNameshort = "last name is too short";
        isValid = false;
      }

      //date
      else if(dob === ""){
        dobErr.dobNull = "Please insert dob";
        isValid = false;
      }

      //nic
      else if(nic.trim().length < 10){
        nicErr.nicerr = "Please insert correct NIC";
        isValid = false;
      }

      //caddress
      else if(caddress.trim().length === 0){
        cAddressErr.cerr = "Please insert correct address";
        isValid = false;
      }

      //paddress
      else if(paddress.trim().length === 0){
        pAddressErr.perr = "Please insert correct address";
        isValid = false;
      }

      else if(desig.trim().length ===  0 ){
        desigErr.desigerr = "Please select designation";
        isValid = false;
      }

      else if(dept === "" ){
        deptErr.depterr = "Please selsct department";
        isValid = false;
      }

      //salary
      else if(salary.trim().length < 4 ){
        salaryErr.serr = "Please insert correct amount";
        isValid = false;
      }

      //tp
      else if(tp.trim().length < 10 ){
        tpErr.tperr = "Please insert correct number";
        isValid = false;
      }

      //email
      else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        emailErr.emailerr = "Please insert correct email";
        isValid = false;
      }

      //user id
      else if(userID.trim().length < 10 ){
        yIdErr.yerr = "Please insert correct User ID";
        isValid = false;
      }

      //password
      else if(!psw.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
        pswErr.pswerr = "Please insert strong Password";
        isValid = false;
      }

      


      setFirstNameErr(firstNameErr);
      setLastNameErr(lasttNameErr);
      setDobErr(dobErr);
      setNicErr(nicErr);
      setCAddressErr(cAddressErr);
      setPAddressErr(pAddressErr);
      setSalaryErr(salaryErr);
      setTpErr(tpErr);
      setEmailErr(emailErr);
      setYIdErr(yIdErr);
      setPswErr(pswErr);
      setDesigErr(desigErr);
      setDeptErr(deptErr);


      return isValid;
    }

    return(
      <div>
      <div class="include">
    <form onSubmit={e => onSubmit(e)}><br/>
        <center><h3>Employee Registration</h3></center>

      <table class="signup-table">
        <tr>
          <td>
            First Name<br/>
            <input type="text"  class="insert"  placeholder="First name" name="fname" value={fname} onChange={ e => onInputChange(e)} />
            {Object.keys(firstNameErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{firstNameErr[key]}</div>
            })}
          </td>
          <td>
            Last Name<br/>
            <input type="text" id="uName" name="lname" class="insert" value={lname} placeholder="Last name" onChange={ e => onInputChange(e)}  />
            {Object.keys(lasttNameErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{lasttNameErr[key]}</div>
            })}
          </td>
          <td>
            Date Of Birth<br/>
            <input type="Date" id="uName" name="dob" class="insert" value={dob} placeholder="DOB" onChange={ e => onInputChange(e)}  />
            {Object.keys(dobErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{dobErr[key]}</div>
            })}
          </td>
        </tr>
        <tr>
          <td>
            NIC No<br/>
            <input type="text" name="nic" value={nic} class="insert" placeholder="NIC no" onChange={ e => onInputChange(e)} />
            {Object.keys(nicErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{nicErr[key]}</div>
            })}
          </td>
          <td>
            Current Address<br/>
            <input type="text" name="caddress" value={caddress} class="insert" placeholder="Current Address" onChange={ e => onInputChange(e)}  />
            {Object.keys(cAddressErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{cAddressErr[key]}</div>
            })}
          </td>
          <td>
            Permanent Address<br/>
            <input type="text" name="paddress" value={paddress} class="insert" placeholder="Permanent Address" onChange={ e => onInputChange(e)}  />
            {Object.keys(pAddressErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{pAddressErr[key]}</div>
            })}
          </td>
        </tr>
      </table>


      <table class="signup-table">
        <tr>
          <td>
            Choose designation<br></br>
            <select name="desig" class="insert" value={desig} onChange={ e => onInputChange(e)} >
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Staff">Staff</option>
            </select>
            {Object.keys(desigErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{desigErr[key]}</div>
            })}
          </td>
          <td>
          Choose Department<br/>
          <select name="dept" class="insert" value={dept} onChange={ e => onInputChange(e)} >
          <option value="HR">HR</option>
          <option value="Account">Account</option>
          <option value="Sales">Sales</option>
          </select>
          {Object.keys(deptErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{deptErr[key]}</div>
            })}
        </td>
        <td>
            Salary<br/>
            <input type="text" name="salary" value={salary} class="insert" placeholder="Salary" onChange={ e => onInputChange(e)} />
            {Object.keys(salaryErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{salaryErr[key]}</div>
            })}
          </td>
        </tr>
        <tr>
          <td>
            Telephone No<br/>
            <input type="text" name="tp" value={tp} class="insert" placeholder="TP No" onChange={ e => onInputChange(e)} />
            {Object.keys(tpErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{tpErr[key]}</div>
            })}
          </td>
          <td>
            Email Address<br/>
            <input type="text" name="email" value={email} class="insert" placeholder="Email Address" onChange={ e => onInputChange(e)} />
            {Object.keys(emailErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{emailErr[key]}</div>
            })}
          </td>
          <td>
            Your ID<br/>
            <input type="text" class="insert" name="userID" value={userID} placeholder="User id" onChange={ e => onInputChange(e)} />
            {Object.keys(yIdErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{yIdErr[key]}</div>
            })}
          </td>
        </tr>
        <tr>
          <td>
            Password<br/>
            <input type="Password" name="psw" class="insert" value={psw} placeholder="Password" onChange={ e => onInputChange(e)} />
            {Object.keys(pswErr).map((key)=>{
              return <div style={{color: "#ff2b2b"}}>{pswErr[key]}</div>
            })}
          </td>
          
        </tr>
        </table><br/>
        <br/>

      <center>
      <button type = "submit" onclick="" class="button">Submit</button>
      <button type = "reset" onclick="" class="button">reset</button>
      <Link to={`/employeelist/`}><button onclick="" class="button">back</button></Link>
      </center>
    
    </form>
    </div>
    </div>
    )
    //password => Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters.
    //<Webcam ref={webRef} screenshotFormat="image/jpeg" /><br/><br/>
}

export default AddUser;