import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../css/styles.css';
import '../css/css1.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Footer from "./Footer";

export default function CustomerList() {

       //generate pdf-----------------------------

  let docToPrint = React.createRef();

  const printDocument = () => {
    const input = docToPrint.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [600, 900]
      });
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("customer list_2021-2-3.pdf");
    });
  };

  //end generate pdf-----------------------------

    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        loadCustomer();
    }, []);
//get
    const loadCustomer = async() => {
        const result = await axios.get('http://localhost:5000/user/get');
        setCustomers(result.data.reverse());
        console.log(result.data);
    }

    

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadCustomer();
        }
        else{      
            const filteredData = customers.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setCustomers(filteredData);
        }
    }

    let history = useHistory();

    const goToAddCustomer = () => {
        history.push("/section/customer");
    }

    const goToAddCustomerSummary = () => {
        history.push("/section/customer-summary");
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
//delete
    const deleteCustomer = async () => {
        await axios.delete("http://localhost:5000/user/delete/" + customerID);
        loadCustomer();
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
                <Button onClick={deleteCustomer} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>


            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="searchPanel_addNew d-flex">
                    {/* <button className="newCustomer_btn" onClick={goToAddCustomer}>
                        Add Cuatomer
                    </button> */}
                    <button className="newCustomer_btn" /*onClick={printDocument}*/>
                        Generate PDF
                    </button>&nbsp;&nbsp;
                    <button onClick={goToAddCustomerSummary} className="newCustomer_btn mx-4">
                        Summary
                    </button>                    
                </div>
                </div>
                <form className="searchBar">
                <input type="text" /*onChange={ e => handlesearchArea(e.target.value)}*/ placeholder="Search here......"/>
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
            <div ref={docToPrint}>


            <table id="table">
        <thead>
            <tr>
                <th scope="col"><div className="text-up">Index</div></th>
                <th scope="col"><div className="text-up">User Name</div></th>
                <th scope="col"><div className="text-up">Birthday</div></th>
                <th scope="col"><div className="text-up">Phone</div></th>                
                <th scope="col"><div className="text-up">Address</div></th>
                <th scope="col"><div className="text-up">E-mail</div></th>
                <th scope="col"><div className="text-up">action</div></th>
            </tr>
        </thead>
        <tbody>
    {customers.map((customer, index) => (
            <tr>
                <td><center><div className="text-up-col">{index + 1}</div></center></td>
                <td><center><div className="text-up-col">{customer.userName}</div></center></td>
                <td><center><div className="text-up-col">{customer.birthDate}</div></center></td> 
                <td><center><div className="text-up-col">{customer.phone}</div></center></td> 
                <td><center><div className="text-up-col">{customer.address}</div></center></td> 
                <td><center><div className="text-up-col">{customer.email}</div></center></td>          
                <td scope="col"><center>
                    <Link to={`/section/customer-profile/${customer._id}`}><button class="table_btns"><div className="text-up-col">View</div></button></Link>&nbsp;
                    {/* <Link to={`/section/update-customer/${customer._id}`}><button class="table_btns"><div className="text-up-col">Update</div></button></Link>&nbsp; */}
                    <button onClick={() => {handleClickOpen(customer._id)}} class="table_btns"><div className="text-up-col">Delete</div></button></center>
                </td>
                {/* <td>             
                    <button onClick = {printDocument} class="button">Print PDF</button> 
                </td> */}
            </tr> 
            
        ))
    }
  </tbody>
</table></div>
{/* </div> */}
</div>
    {customers.length === 0 && <span>no records found to display</span>}
        </div>
        
    )
}