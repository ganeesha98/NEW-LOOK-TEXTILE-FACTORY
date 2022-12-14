import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export default function MachineProfile() {

    let history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        loadMachine();
    }, []);

    const loadMachine = async () => {
        const result = await axios.get("http://localhost:5000/machine/get/" + id);
        setMachine(result.data);
    }

    const [machine, setMachine] = useState({
        machineID: "", 
        machineName: "", 
        date: "", 
        description: "", 
        content: "", 
        category: ""
    });

    const { machineID, machineName, date, description, content, category } = machine;

    return(
        <div class="machine-include">
            <form>

                <br/><center><h3>Machine Profile</h3></center><br/><br/>

                <table class="payment-table">
                    <tr>
                        <td>
                            Machine ID
                            <input type="text" name="machineID" value={machineID} placeholder="Enter Code"/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Machine Name
                            <input type="text" name="machineName" value={machineName} placeholder="Enter Product Name"/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date
                            <input type="text" name="date" value={date} placeholder="Enter Product Name"/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Description
                            <input type="text" name="description" value={description} placeholder="Enter Price"/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Content
                            <input type="text" name="content" value={content} placeholder="Enter Price"/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Category
                            <select name="category" value={category} >
                                <option>Select Category</option>
                                <option value="textile machine">Category 1</option>
                                <option value="textile printing machine">Category 2</option>
                                
                            </select><br/>
                        </td>
                    </tr>
                        
                    
                </table><br/>

                <center>
                    <table>
                        <tr>
                        
                        </tr>
                    </table>
                </center> 
            </form>
        </div>
    );
}