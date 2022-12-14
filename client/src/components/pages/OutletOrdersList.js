import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../css/styles.css';
import '../css/css1.css';

export default function OutletOrderList() {

    const [outletOrders, setOutletOrder] = useState([]);
    useEffect(() => {
        loadOutletOrder();
    }, []);

    const loadOutletOrder = async() => {
        const result = await axios.get('http://localhost:5000/outletOrder/');
        setOutletOrder(result.data.reverse());
    }

    const deleteOutletOrder = async id => {
        await axios.delete("http://localhost:5000/outletOrder/delete/" + id);
        loadOutletOrder();
    }

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadOutletOrder();
        }
        else{      
            const filteredData = outletOrders.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setOutletOrder(filteredData);
        }
    }

    let history = useHistory();

    const goToCategory = () => {
        history.push("/section/outlet");
    }

    return(
        <div>


            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="searchPanel_addNew">
                    {/* <button className="newCustomer_btn" onClick={printDocument}>
                        Generate PDF
                    </button> */}
                    <button className="newCustomer_btn" onClick={goToCategory}>
                        Add Outlet
                    </button>
                </div>
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

            {/* <div> */}

            <table id="table">
        <thead>
            <tr>
            <th scope="col"><div className="text-up">Index</div></th>
                <th scope="col"><div className="text-up">Owner Name</div></th>
                <th scope="col"><div className="text-up">Phone</div></th>
                <th scope="col"><div className="text-up">Outlet ID</div></th>
                <th scope="col"><div className="text-up">Design Code</div></th>
                <th scope="col"><div className="text-up">Product Name</div></th>
                <th scope="col"><div className="text-up">Date</div></th>
                <th scope="col"><div className="text-up">Category</div></th>
                <th scope="col"><div className="text-up">Size</div></th>
                <th scope="col"><div className="text-up">Quantity</div></th>
                <th scope="col"><div className="text-up">action</div></th>
            </tr>
        </thead>
        <tbody>
    {
        outletOrders.map((outletOrder, index) => (
            <tr>
                <td scope="row"><center><div className="text-up-col">{index + 1}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.ownerName}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.ownerPhone}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.outletID}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.designCode}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.productName}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.OrderDate}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.category}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.size}</div></center></td>
                <td><center><div className="text-up-col">{outletOrder.quantity}</div></center></td>
                <td scope="col"><center>
                    {/* <Link to={`/User/${outlet._id}`}><button class="table_btns">View</button></Link>&nbsp; */}
                    {/* <Link to={`/outlet-order/${outlet._id}`}><button class="table_btns">Order</button></Link>&nbsp;
                    <Link to={`/update-outlet/${outlet._id}`}><button class="table_btns">Update</button></Link>&nbsp; */}
                    <button class="table_btns" onClick={() => {deleteOutletOrder(outletOrder._id)}}>Delete</button>
                    </center></td>
            </tr> 
        ))
    }
  </tbody>
</table>
{/* </div> */}
</div>
    {outletOrders.length === 0 && <span>no records found to display</span>}
        </div>
    )
}