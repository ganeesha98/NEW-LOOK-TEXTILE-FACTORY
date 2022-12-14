import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function EmployeeSummary(){

    const[employee, setEmployee] = useState([]);
    const[attendance, setAttendance] = useState([]);


    useEffect(() => {
        loadEmployee();  
        loadAttendance();       
    }, [])

    const loadEmployee = async() => {
        try{
            await axios.get('http://localhost:5000/newstaff/').then((result) => {
                setEmployee(result.data.reverse());
            });  
        }catch(e){
            console.log(e);
        }        
    }

    const loadAttendance = async() => {
        try{
            await axios.get('http://localhost:5000/attendance1/').then((result) => {
                setAttendance(result.data.reverse());
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
    var noOfEmployee = 0;

    function calc (callback){ 
    
        employee.map((deliver) => {

            noOfEmployee += 1; 

        }) 

        callback(noOfEmployee);  
    }

    calc((v1) => {
        noOfEmployee = v1;
    });

    //calculation 2

    var noOfAttendance = 0;

    function calcDriver (callback){ 
    
        attendance.map((attendance) => {            

            if(attendance.date === today){
                noOfAttendance += 1; 
            }

        }) 

        callback(noOfAttendance);  
    }

    calcDriver((v1) => {
        noOfAttendance = v1;
    });

    return(
        <div class="product-summary">            

            <br/><center><h3>Employee Summary</h3></center><br/><br/>
            <div className="container">
                <table class="summary-table ">
                    <div className="row d-flex align-content-center">
                        <div className="col-15">
                            <tr>
                                <td>
                                    <h6><b>Number of Employees assigned:</b></h6>
                                </td> 
                                <td>
                                    <h6><b>{noOfEmployee}</b></h6>
                                </td> 
                            </tr>
                            <tr>
                                <td>
                                    <h6><b>Today Employee Attendance:</b></h6>
                                </td>
                                <td>
                                    <h6><b>{noOfAttendance}</b></h6>
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
                        
                        <Link to="/section/employeelist"><button type = "reset" class="button">Back</button></Link>
                        
                              {/* <button type = "reset" class="button">Close</button>                              */}
                        </td>
                        <td>
                            {/* <button onclick="" class="button">Print PDF</button> */}
                        </td>
                    </tr>
                </table>
            </center>  
        </div>
    )
}