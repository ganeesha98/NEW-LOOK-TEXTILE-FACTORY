import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../css/styles.css';
import '../css/css1.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import img2 from '../../imges/img2.jpg';

export default function MachineCategory() {

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

    const [machines, setMachine] = useState([]);
    
    useEffect(() => {
        loadMachine();
    }, []);

    const loadMachine = async() => {
        const result = await axios.get('http://localhost:5000/machine/');
            setMachine(result.data.reverse());
    }

    const [searchText, setSearchText] = useState('');

    const deleteMachine = async id => {
        await axios.delete("http://localhost:5000/machine/delete/" + id);
        loadMachine();
    }


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
            const filteredData = machines.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setMachine(filteredData);
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
        await axios.get('http://localhost:5000/machine/find/?category=' + category).then((results) => {
            setMachine(results.data.reverse());
        }).catch((err) => {
            alert(err);
        })
    }

    return(
        <div>
            <div className="searchPanel">
                <div className="searchPanel_addNew">
                    <form className="row" onSubmit={e => onSubmit(e)}>
                        <div className="searchPanel_addNew">
                            <select className="newCustomer_btn" name="category" onChange={ e => onInputChange(e)}>
                                <option value="All">All</option>
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
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
                <input type="text" /*onChange={ e => handlesearchArea(e.target.value)}*/ placeholder="Search here..."/>
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
                            {machines.map((machine, i)=>(
                                <div key={i} className="col-lg-6 col-sm-6">
                                    <div class="px-4 py-2">
                                        <div className="border border-primary bg-gradient">
                                            <div className="">                                    
                                                <img className="img-thumbnail" src={img2}/>

                                                <div className=" justify-content-center">
                                                    <div className="row"> 
                                                        <center>
                                                            <div className="col-3">
                                                                <h6>{machine.machineName}</h6>
                                                            </div>
                                                        </center>
                                                    </div>
                                                    <div className="row">
                                                        <center>
                                                            <div className="col-8">
                                                                <h6>{machine.description}</h6>
                                                            </div>
                                                        </center>
                                                    </div>
                                                    <div className="row mb-3 d-flex justify-content-center">
                                                        
                                                        <div className="col-3">
                                                            <Link to={`/section/machine-profile/${machine._id}`}><button type="button" class="btn btn-outline-primary btn-sm" >Details</button></Link>
                                                        </div>
                                                        <div className="col-3">
                                                            <Link to={`/section/update-machine/${machine._id}`}><button type="button" class="btn btn-outline-primary btn-sm" >Update</button></Link>
                                                        </div>
                                                        <div className="col-3">
                                                            <button type="button" class="btn btn-outline-primary btn-sm" onClick={() => {deleteMachine(machine._id)}}>Delete</button>
                                                        </div>
                                                        
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

            {machines.length === 0 && <span>no records found to display</span>}
        </div>
    )
}