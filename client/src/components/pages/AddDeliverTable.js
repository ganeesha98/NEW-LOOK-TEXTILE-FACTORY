import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../css/styles.css';
import '../css/css1.css';

export default function AddDeliverTable() {

    const [orders, setOrder] = useState([]);
    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async() => {
        const result = await axios.get('http://localhost:5000/payment/');
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

    const goToDeliverSummary = () => {
        history.push("/section/deliver-summary");
    }

    return(
        <div>

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
                <th scope="col"><div className="text-up">Order ID</div></th>
                <th scope="col"><div className="text-up">Full Name</div></th>
                <th scope="col"><div className="text-up">Phone</div></th>
                <th scope="col"><div className="text-up">E-mail</div></th>
                <th scope="col"><div className="text-up">Country</div></th>
                <th scope="col"><div className="text-up">City</div></th>   
                <th scope="col"><div className="text-up">Address</div></th> 
                <th scope="col"><div className="text-up">Postal Code</div></th> 
                <th scope="col"><div className="text-up">Method</div></th>              
                <th scope="col"><div className="text-up">action</div></th>
            </tr>
        </thead>
        <tbody>
    {
        orders.map((order, index) => (
            <tr>
                <center><td ><div className="text-up-col">{index + 1}</div></td></center>
                <td><center><div className="text-up-col">{order.fullName}</div></center></td>   
                <td><center><div className="text-up-col">{order.phone}</div></center></td>
                <td><center><div className="text-up-col">{order.email}</div></center></td>
                <td><center><div className="text-up-col">{order.country}</div></center></td>
                <td><center><div className="text-up-col">{order.city}</div></center></td> 
                <td><center><div className="text-up-col">{order.sAddress}</div></center></td> 
                <td><center><div className="text-up-col">{order.pCode}</div></center></td> 
                <td><center><div className="text-up-col">{order.method}</div></center></td>          
                <td scope="col"><center>
                    <Link to={`/section/deliver/${order._id}`}><button class="table_btns">Deliver</button></Link></center>
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