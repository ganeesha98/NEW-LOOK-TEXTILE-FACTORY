import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/styles.css';
import '../css/css1.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function HomeATest(){

    //generate pdf

  let docToPrint = React.createRef();

  const printDocument = () => {
    const input = docToPrint.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [600, 745]
      });
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("Attendance_2021-2-3.pdf");
    });
  };

  //end generate pdf

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

    const deleteUser = async id => {
        await axios.delete("http://localhost:5000/newstaff/delete/" + id);
        loadUser();
    }

    return(
        <div>
            <div className="searchPanel">
                <div>
                    <button className="newCustomer_btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        
                        <Link to={`/user-add`}><span>Add Admin</span></Link>
                    </button>
                </div>&nbsp;&nbsp;


                <div className="searchPanel_addNew">
                    <button className="newCustomer_btn" onClick={printDocument}>
                        Generate PDF
                    </button>
                </div>

                <form className="searchBar">
                <input type="text" onChange={ e => handlesearchArea(e.target.value)} placeholder="Search here..."/>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </form>
            </div>
            <i></i>
            <div className="tableContent">

            <div ref={docToPrint}>

            <table id="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">USER ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address Line 1</th>
                <th scope="col">Address Line 2</th>
                <th scope="col">E-mail</th>
                <th scope="col">Password</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
    {
        users.map((user, index) => (
            <tr>
                <td scope="row">{index + 1}</td>
                <td className='table-font-size'>{user.userID}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.AddressLine1}</td>
                <td>{user.AddressLine2}</td>
                <td>{user.Emai}</td>
                <td>**********</td>
                <td>{user.Role}</td>
                <td>
                    <Link to={`/User/${user._id}`}><button class="table_btns">View</button></Link>&nbsp;
                    <Link to={`/test-edit/${user._id}`}><button class="table_btns">Update</button></Link>&nbsp;
                    <button class="table_btns" onClick={() => {deleteUser(user._id)}}>Delete</button>
                </td>
            </tr> 
        ))
    }
  </tbody>
</table>
</div>
</div>
    {users.length === 0 && <span>no records found to display</span>}
        </div>
    )
}

export default HomeATest;