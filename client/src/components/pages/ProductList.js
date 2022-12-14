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

export default function ProductList() {

    let docToPrint = React.createRef();

    const printDocument = () => {
        const input = docToPrint.current;
        html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [600, 660]
        });
        pdf.addImage(imgData, "JPEG", 0, 0);
        // pdf.output("dataurlnewwindow");
        pdf.save("Attendance_2021-2-3.pdf");
        });
    };

    const [products, setProducts] = useState([]);
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async() => {
        const result = await axios.get('http://localhost:5000/product/');
        setProducts(result.data.reverse());
    }

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadProducts();
        }
        else{      
            const filteredData = products.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setProducts(filteredData);
        }
    }

    let history = useHistory();

    const goToCategory = () => {
        history.push("/section/productcategory");
    }

    const goToAddProduct = () => {
        history.push("/section/product");
    }

    const goToProductSummary = () => {
        history.push("/section/product-summary");
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

    const deleteProduct = async () => {
        await axios.delete("http://localhost:5000/product/delete/" + employeeID);
        loadProducts();
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
                <Button onClick={deleteProduct} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>

            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="d-flex">
                    <button className="newCustomer_btn" onClick={goToAddProduct}>
                        Add Product
                    </button>
                    {/* <button onClick={goToCategory} className="newCustomer_btn mx-4">
                        Product Category
                    </button>  */}
                    <button onClick={goToProductSummary} className="newCustomer_btn mx-4">
                        Product Summary
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
                <th scope="col"><div className="text-up">Index No</div></th>
                <th scope="col"><div className="text-up">Product ID</div></th>
                <th scope="col"><div className="text-up">Product Name</div></th>
                <th scope="col"><div className="text-up">Category</div></th>
                <th scope="col"><div className="text-up">Price</div></th>
                <th scope="col"><div className="text-up">Size</div></th>    
                <th scope="col"><div className="text-up">Status</div></th> 
                <th scope="col"><div className="text-up">Quantity</div></th> 
                <th scope="col"><div className="text-up">Color</div></th> 
                <th scope="col"><div className="text-up">Date</div></th>             
                <th scope="col"><div className="text-up">action</div></th>
            </tr>
        </thead>
        <tbody>
    {
        products.map((product, index) => (
            <tr>
                <center><td ><div className="text-up-col">{index + 1}</div></td></center>
                <td><center><div className="text-up-col">{product.pID}</div></center></td>   
                <td><center><div className="text-up-col">{product.pName}</div></center></td>
                <td><center><div className="text-up-col">{product.category}</div></center></td>
                <td><center><div className="text-up-col">{product.price}</div></center></td>
                <td><center><div className="text-up-col">{product.size}</div></center></td>   
                <td><center><div className="text-up-col">{product.status}</div></center></td>   
                <td><center><div className="text-up-col">{product.quantity}</div></center></td>   
                <td><center><div className="text-up-col">{product.color}</div></center></td>   
                <td><center><div className="text-up-col">{product.date}</div></center></td>             
                <td scope="col"><center>
                    <Link to={`/section/update-product/${product._id}`}><button class="table_btns">Update</button></Link>&nbsp;
                    {/* <Link to={`/payment/${product._id}`}><button class="table_btns">Payment</button></Link>&nbsp; */}
                    <button onClick={() => {handleClickOpen(product._id)}} class="table_btns">Delete</button></center>
                </td>
            </tr> 
        ))
    }
  </tbody>
</table>
{/* </div> */}
</div>
    {products.length === 0 && <span>no records found to display</span>}
        </div>
    )
}