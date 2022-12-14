import React, {useState, useEffect} from 'react';
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


function EmployeeList(){

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
      pdf.save("Attendance_2021-2-3.pdf");
    });
  };

  //end generate pdf-----------------------------

    const [users, setUser] = useState([]);
    useEffect(() => {
        loadUser();
    }, []);

    const [searchText, setSearchText] = useState('');

    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadUser();
        }
        else{      
            const filteredData = users.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setUser(filteredData);
        }
    }

    const loadUser = async() => {
        const result = await axios.get('http://localhost:5000/newstaff/');
        console.log(result.data);
        setUser(result.data.reverse());
    }

   

    let history = useHistory();

    const goToAddEmployee = () => {
        history.push("/section/user-add");
    }

    const goToEmployeeSummary = () => {
        history.push("/section/employee-summary");
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
        await axios.delete("http://localhost:5000/newstaff/delete/" + employeeID);
        loadUser();
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


            <div className="searchPanel d-flex">
                <div >
                    <button className="newCustomer_btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        
                        <span onClick={goToAddEmployee}>
                            New Employee
                        </span>
                    </button>
                </div>&nbsp;&nbsp;

                <div className="searchPanel_addNew">
                <div className="searchPanel_addNew d-flex">
                    <button className="newCustomer_btn" /*onClick={printDocument}*/>
                        Generate PDF
                    </button>&nbsp;&nbsp;
                    <button className="newCustomer_btn" onClick={goToEmployeeSummary}>
                        Summary 
                    </button>
                </div>
                </div>

                <div className="searchPanel_addNew">
                    
                </div>

                <form className="searchBar">
                {<input type="text" /*onChange={ e => handlesearchArea(e.target.value)}*/ placeholder="Search here..."/>}
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </form>
            </div>
            <i></i>
            <div className="tableContent">

            {/* start of pdf div */}
            <div ref={docToPrint}>

            <table id="table">
        <thead>
            <tr>
                <th scope="col"><div className="text-up">ID</div></th>
                <th scope="col"><div className="text-up">USER ID</div></th>
                <th scope="col"><div className="text-up">fname</div></th>
                <th scope="col"><div className="text-up">dob</div></th>
                <th scope="col"><div className="text-up">nic</div></th>
                <th scope="col"><div className="text-up">caddress</div></th>
                <th scope="col"><div className="text-up">tp</div></th>
                <th scope="col"><div className="text-up">email</div></th>
                <th scope="col"><div className="text-up">salary</div></th>
                <th scope="col"><div className="text-up">action</div></th>
            </tr>
        </thead>
        <tbody>
    {
        users.map((user, index) => (
            <tr>
                <td scope="row"><div className="text-up-col">{index + 1}</div></td>
                <td><div className="text-up-col">{user.userID}</div></td>
                <td><div className="text-up-col">{user.fname}</div></td>
                <td><div className="text-up-col">{user.dob}</div></td>
                <td><div className="text-up-col">{user.nic}</div></td>
                <td><div className="text-up-col">{user.desig}</div></td>
                <td><div className="text-up-col">{user.tp}</div></td>
                <td><div className="text-up-col">{user.email}</div></td>
                <td><div className="text-up-col">{user.salary}</div></td>
                <td>
                    <Link to={`/section/User/${user._id}`}><button class="table_btns">View</button></Link>&nbsp;
                    <Link to={`/section/test-edit/${user._id}`}><button class="table_btns">Update</button></Link>&nbsp;
                    <Link to={`/section/attendance/${user.userID}`}><button class="table_btns">Attend</button></Link>&nbsp;
                    <button class="table_btns" onClick={() => {handleClickOpen(user._id)}}>Delete</button>
                </td>
            </tr> 
        ))
    }
  </tbody>
</table>
</div>
{/* end of pdf div */}
</div>
    {users.length === 0 && <span>no records found to display here</span>}
        </div>
    )
}

export default EmployeeList;