import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../css/styles.css';
import '../css/css1.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DriverList() {

    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
        loadDriver();
    }, []);

    const loadDriver = async() => {
        const result = await axios.get('http://localhost:5000/driver/');
        setDrivers(result.data.reverse());
    }

   

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadDriver();
        }
        else{      
            const filteredData = drivers.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setDrivers(filteredData);
        }
    }

    let history = useHistory();

    const goToAddDriver = () => {
        history.push("/section/driver");
    }

    // const goToDriverSummary = () => {
    //     history.push("/section/product-summary");
    // }

    const  [customerID, setCustomerID] = useState("");

    const [open, setOpen] = useState(false); 

    const handleClickOpen = (id) => {
        setOpen(true);
        setCustomerID(id);
    };
  
    const onCancel = () => {
        setOpen(false);
    };

    const deleteUser = async () => {
        await axios.delete("http://localhost:5000/driver/delete/" + customerID);
        loadDriver();
        setOpen(false);
    }

    return(
        <div>


            <Dialog
                open={open}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm Here
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={deleteUser} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>


            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="searchPanel_addNew d-flex">
                    <button className="newCustomer_btn" onClick={goToAddDriver}>
                        Add Driver
                    </button>
                    {/* <button onClick={goToDriverSummary} className="newCustomer_btn mx-4">
                        All Outlet Orders
                    </button>                     */}
                </div>
                </div>
                <form className="searchBar">
                <input type="text" /*onChange={ e => handlesearchArea(e.target.value)}*/ placeholder="Search here..."/>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </form>
            </div>


            <i></i>
            <div className="tableContent">

            {/* <div> */}

            <table id="table">
        <thead>
            <tr>
                <th scope="col"><div className="text-up">Driver ID</div></th>
                <th scope="col"><div className="text-up">First Name</div></th>
                <th scope="col"><div className="text-up">Last Name</div></th>
                <th scope="col"><div className="text-up">E-mail</div></th>
                <th scope="col"><div className="text-up">Phone</div></th>                
                <th scope="col"><div className="text-up">Address</div></th>
                <th scope="col"><div className="text-up">Lisen No</div></th>
                <th scope="col"><div className="text-up">Vehicle Reg</div></th>
                <th scope="col"><div className="text-up">Vehicle Type</div></th>
                <th scope="col"><div className="text-up">Vehicle Model</div></th>
                <th scope="col"><div className="text-up">Vehicle Color</div></th>
                <th scope="col"><div className="text-up">Vehicle Year</div></th>
                <th scope="col"><div className="text-up">Vehicle Ins C</div>om</th>
                <th scope="col"><div className="text-up">Vehicle Ins ID</div></th>
                <th scope="col"><div className="text-up">action</div></th>
            </tr>
        </thead>
        <tbody>
    {
        drivers.map((driver, index) => (
            <tr>
                <center><td ><div className="text-up-col">{index + 1}</div></td></center>
                <td><center><div className="text-up-col">{driver.firstName}</div></center></td>   
                <td><center><div className="text-up-col">{driver.lastName}</div></center></td>
                <td><center><div className="text-up-col">{driver.email}</div></center></td>
                <td><center><div className="text-up-col">{driver.phone}</div></center></td> 
                <td><center><div className="text-up-col">{driver.address}</div></center></td> 
                <td><center><div className="text-up-col">{driver.lisenNo}</div></center></td> 
                <td><center><div className="text-up-col">{driver.vehicleReg}</div></center></td> 
                <td><center><div className="text-up-col">{driver.vType}</div></center></td> 
                <td><center><div className="text-up-col">{driver.vModel}</div></center></td> 
                <td><center><div className="text-up-col">{driver.vColor}</div></center></td> 
                <td><center><div className="text-up-col">{driver.vYear}</div></center></td> 
                <td><center><div className="text-up-col">{driver.vInsCom}</div></center></td> 
                <td><center><div className="text-up-col">{driver.vInsID}</div></center></td>          
                <td scope="col"><center>
                    <Link to={`/section/driver-profile/${driver._id}`}><button class="table_btns">View</button></Link>&nbsp;
                    <Link to={`/section/update-driver/${driver._id}`}><button class="table_btns">Update</button></Link>&nbsp;
                    <button onClick={() => {handleClickOpen(driver._id)}} class="table_btns">Delete</button></center>
                </td>
            </tr> 
        ))
    }
  </tbody>
</table>
{/* </div> */}
</div>
    {drivers.length === 0 && <span>no records found to display</span>}
        </div>
    )
}