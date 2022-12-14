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

export default function DeliverList() {

    const [delivers, setDelivers] = useState([]);
    useEffect(() => {
        loadDeliver();
    }, []);

    const loadDeliver = async() => {
        const result = await axios.get('http://localhost:5000/deliver/');
        setDelivers(result.data.reverse());
    }

    

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadDeliver();
        }
        else{      
            const filteredData = delivers.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setDelivers(filteredData);
        }
    }

    let history = useHistory();

    const goToDeliverSummary = () => {
        history.push("/section/deliver-summary");
    }

    const  [customerID, setCustomerID] = useState("");

    const [open, setOpen] = useState(false); 

    const handleClickOpen = (id) => {
        setOpen(true);
        setCustomerID(id);
    };
  
    const onCancel = () => {
        setOpen(false);
    };

    const deleteDeliver = async () => {
        await axios.delete("http://localhost:5000/deliver/delete/" + customerID);
        loadDeliver();
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
                <Button onClick={deleteDeliver} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>


            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="searchPanel_addNew d-flex">
                    <Link to="/section/addDeliverTable" style={{textDecoration: 'none'}}><button className="newCustomer_btn mx-2">
                        Add Deliver
                    </button></Link>
                    <Link to="/section/deliverlist" style={{textDecoration: 'none'}}><button className="newCustomer_btn mx-2">
                        Deliver List
                    </button></Link>
                    <button className="newCustomer_btn mx-2 px-2" onClick={goToDeliverSummary}>
                        Summary
                    </button>                                       
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
                <th scope="col"><div className="text-up">Index</div></th>
                <th scope="col"><div className="text-up">Customer Name</div></th>
                <th scope="col"><div className="text-up">Customer Country</div></th>
                <th scope="col"><div className="text-up">Customer City</div></th>
                <th scope="col"><div className="text-up">Customer E-mail</div></th>
                <th scope="col"><div className="text-up">Customer Phone</div></th>                
                <th scope="col"><div className="text-up">Postal Code</div></th>
                <th scope="col"><div className="text-up">Driver Name</div></th>
                <th scope="col"><div className="text-up">Vehicle No</div></th>
                <th scope="col"><div className="text-up">Driver ID</div></th>
                <th scope="col"><div className="text-up">Delivery Time</div></th>
                <th scope="col"><div className="text-up">Driver Phone</div></th>
                <th scope="col"><div className="text-up">Action</div></th>
            </tr>
        </thead>
        <tbody>
    {
        delivers.map((deliver, index) => (
            <tr>
                <center><td ><div className="text-up-col">{index + 1}</div></td></center>
                <td><center><div className="text-up-col">{deliver.cusName}</div></center></td>   
                <td><center><div className="text-up-col">{deliver.cusCountry}</div></center></td>
                <td><center><div className="text-up-col">{deliver.cusCity}</div></center></td>
                <td><center><div className="text-up-col">{deliver.cusEmail}</div></center></td> 
                <td><center><div className="text-up-col">{deliver.cusPhone}</div></center></td> 
                <td><center><div className="text-up-col">{deliver.cusPCode}</div></center></td> 
                <td><center><div className="text-up-col">{deliver.driverName}</div></center></td> 
                <td><center><div className="text-up-col">{deliver.vehicleNo}</div></center></td> 
                <td><center><div className="text-up-col">{deliver.driverID}</div></center></td> 
                <td><center><div className="text-up-col">{deliver.deliveryTime}</div></center></td> 
                <td><center><div className="text-up-col">{deliver.driverPhone}</div></center></td>          
                <td scope="col"><center>
                    <button onClick={() => {handleClickOpen(deliver._id)}} class="table_btns">Delete</button></center>
                </td>
            </tr> 
        ))
    }
  </tbody>
</table>
{/* </div> */}
</div>
    {delivers.length === 0 && <span>no records found to display</span>}
        </div>
    )
}