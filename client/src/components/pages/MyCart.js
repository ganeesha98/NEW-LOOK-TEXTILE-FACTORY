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

export default function MyCart() {

    const [orders, setOrder] = useState([]);
    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async() => {
        const result = await axios.get('http://localhost:5000/order/');
        setOrder(result.data.reverse());
    }

    

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadOrder();
        }
        else{      
            const filteredData = orders.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setOrder(filteredData);
        }
    }

    let history = useHistory();

    const goToAddOrder = () => {
        history.push("/section/myorder");
    }

    const  [employeeID, setEmployeeID] = useState("");

    const [open, setOpen] = useState(false); 

    const handleClickOpen = (id) => {
        setOpen(true);
        setEmployeeID(id);
    };
  
    const onCancel = () => {
        setOpen(false);
    };

    const deleteUser = async () => {
        await axios.delete("http://localhost:5000/order/delete/" + employeeID);
        loadOrder();
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
                    {/* <button className="newCustomer_btn" onClick={goToAddOrder}>
                        Add Order
                    </button> */}
                    {/* <button onClick={goToOutletOrderList} className="newCustomer_btn mx-4">
                        All Outlet Orders
                    </button>                     */}
                </div>
                </div>
                <form className="searchBar">
                <input type="text" /*onChange={ e => handlesearchArea(e.target.value)}*/ placeholder="Search Size here..."/>
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
                <th scope="col"><div className="text-up">Order ID</div></th>
                <th scope="col"><div className="text-up">Product Name</div></th>
                <th scope="col"><div className="text-up">Color</div></th>
                <th scope="col"><div className="text-up">Size</div></th>
                <th scope="col"><div className="text-up">Quantity</div></th>
                <th scope="col"><div className="text-up">Total Price</div></th>                
                <th scope="col"><div className="text-up">action</div></th>
            </tr>
        </thead>
        <tbody>
    {
        orders.map((order, index) => (
            <tr>
                <center><td ><div className="text-up-col">{index + 1}</div></td></center>
                <td><center><div className="text-up-col">{order.pdName}</div></center></td>  
                <td><center><div className="text-up-col">{order.oColor}</div></center></td> 
                <td><center><div className="text-up-col">{order.oSize}</div></center></td>
                <td><center><div className="text-up-col">{order.oQuantity}</div></center></td>
                <td><center><div className="text-up-col">{order.total}</div></center></td>          
                <td scope="col"><center>
                    <Link to={`/section/updateorder/${order._id}`}><button class="table_btns"><div className="text-up-col">Update</div></button></Link>&nbsp;
                    <Link to={`/section/payment/${order._id}`}><button class="table_btns"><div className="text-up-col">Payment</div></button></Link>&nbsp;
                    <button onClick={() => {handleClickOpen(order._id)}} class="table_btns"><div className="text-up-col">Delete</div></button></center>
                </td>
            </tr> 
        ))
    }
  </tbody>
</table>
{/* </div> */}
</div>
    {orders.length === 0 && <span>no records found to display</span>}
        </div>
    )
}