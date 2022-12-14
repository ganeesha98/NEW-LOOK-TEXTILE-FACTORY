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

export default function MachineList() {

    const [machine, setMachine] = useState([]);
    
    useEffect(() => {
        loadMachine();
    }, []);

    const loadMachine = async() => {
        const result = await axios.get('http://localhost:5000/machine/');
        setMachine(result.data.reverse());
    }

    

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadMachine();
        }
        else{      
            const filteredData = machine.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setMachine(filteredData);
        }
    }

    let history = useHistory();

    const goToMachine = () => {
        history.push("/section/machine");
    }

    const goToCategories = () => {
        history.push("/section/machineCategory");
    }

    // const goToOutletSummary = () => {
    //     history.push("/outlet-summary");
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

    const deleteMachine = async () => {
        await axios.delete("http://localhost:5000/machine/delete/" + customerID);
        loadMachine();
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
                <Button onClick={deleteMachine} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>


            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="d-flex">
                    <button className="newCustomer_btn" onClick={goToMachine}>
                        Add Machine
                    </button>
                    <button onClick={goToCategories} className="newCustomer_btn mx-4">
                        Categories
                    </button> 
                    {/* <button onClick={goToOutletSummary} className="newCustomer_btn mx-4">
                        Outlet Summary
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
                <th scope="col"><div className="text-up">Index</div></th>
                <th scope="col"><div className="text-up">Machine ID</div></th>
                <th scope="col"><div className="text-up">Machine Name</div></th>
                <th scope="col"><div className="text-up">Date</div></th>
                <th scope="col"><div className="text-up">Description</div></th>
                <th scope="col"><div className="text-up">Content</div></th>
                <th scope="col"><div className="text-up">Category</div></th>
                <th scope="col"><div className="text-up">action</div></th>
            </tr>
        </thead>
        <tbody>
    {
        machine.map((machine, index) => (
            <tr>
                <td scope="row"><center><div className="text-up-col">{index + 1}</div></center></td>
                <td><center><div className="text-up-col">{machine.machineID}</div></center></td>
                <td><center><div className="text-up-col">{machine.machineName}</div></center></td>
                <td><center><div className="text-up-col">{machine.date}</div></center></td>
                <td><center><div className="text-up-col">{machine.description}</div></center></td>
                <td><center><div className="text-up-col">{machine.content}</div></center></td>
                <td><center><div className="text-up-col">{machine.category}</div></center></td>
                <td scope="col"><center>
                    <Link to={`/section/update-machine/${machine._id}`}><button class="table_btns">Update</button></Link>&nbsp;
                    <button class="table_btns" onClick={() => {handleClickOpen(machine._id)}}>Delete</button>
                    </center></td>
            </tr> 
        ))
    }
  </tbody>
</table>
{/* </div> */}
</div>
    {machine.length === 0 && <span>no records found to display</span>}
        </div>
    )
}