import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../css/styles.css';
import '../css/css1.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import img1 from '../../imges/img1.jpg';

export default function ProductCategory() {

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

    const deleteProduct = async id => {
        await axios.delete("http://localhost:5000/product/delete/" + id);
        loadProducts();
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

    const[value, setValue] = useState({
        category: ""
    })

    const { category } = value;

    const onInputChange = e => {
        setValue({...value, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault(); 
        await axios.get('http://localhost:5000/product/find/?category=' + category).then((results) => {
        // alert("order added successfully");
            setProducts(results.data.reverse());
        }).catch((err) => {
            alert(err);
        })
    }

    console.log(products);

    return(
        <div>

            <div className="searchPanel">
                <div className="searchPanel_addNew">
                    <form className="row" /*onSubmit={e => onSubmit(e)}*/>
                        <div className="searchPanel_addNew">
                            <select className="newCustomer_btn" name="category" /*onChange={ e => onInputChange(e)}*/>
                                <option value="All">All</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                            </select>
                        </div>
                        <div className="searchPanel_addNew">
                            {/*<button className="newCustomer_btn" type="submit">
                                Load
    </button>*/}
                        </div>
                    </form>
                </div>
                <form className="searchBar">
                <input type="text" /*onChange={ e => handlesearchArea(e.target.value)}*/ placeholder="Search by name..."/>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </form>
            </div>

            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="col-lg-6">
                        <div className="row">                    
                            {products.map((product, i)=>(
                                <div key={i} className="col-lg-6 col-sm-6">
                                    <div class="px-4 py-2">
                                        <div className="border border-primary bg-gradient">
                                            <div className="">                                    
                                                <Link to={`/section/myorder/${product._id}`}><img className="img-thumbnail" src={img1}/></Link>
                                                <div className="d-flex justify-content-center">
                                                    <div className="col-3">
                                                        <h6>{product.pName}</h6>
                                                        <h6>{product.price}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>                                
                                    )    
                                        )}
                        </div>
                    </div>    
                </div>
            </div>



            {products.length === 0 && <span>no records found to display</span>}
        </div>
    )
}