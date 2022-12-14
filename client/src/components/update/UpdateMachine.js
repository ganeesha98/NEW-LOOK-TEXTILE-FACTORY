import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateMachine() {

    let history = useHistory();
    const { id } = useParams();

    const [machine, setMachine] = useState({
        machineID: "", 
        machineName: "", 
        date: "", 
        description: "", 
        content: "", 
        category: ""
    });

    const { machineID, machineName, date, description, content, category } = machine;

    const onInputChange = e => {
        setMachine({...machine, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        loadMachine();
      }, []);
  
      const loadMachine = async () => {
          const result = await axios.get("http://localhost:5000/machine/get/" + id);
          setMachine(result.data);
      }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put('http://localhost:5000/machine/update/' + id, machine).then(() => {
            alert("Machine Updated Successfully");
        }).catch((err) => {
            alert(err);
        })
    
        history.push("/section/machinelist");          
    }

    return(
        <div class="machine-include">
            <form onSubmit={e => onSubmit(e)}>

                <br/><center><h3>Update Machine</h3></center><br/><br/>

                <table class="payment-table">
                    <tr>
                        <td>
                            Machine ID
                            <input type="text" name="machineID" value={machineID} placeholder="Enter machine id" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Machine Name
                            <input type="text" name="machineName" value={machineName} placeholder="Enter machine name" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date
                            <input type="text" name="date" value={date} placeholder="Enter date" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Description
                            <input type="text" name="description" value={description} placeholder="Enter description" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Content
                            <input type="text" name="content" value={content} placeholder="Enter content" onChange={ e => onInputChange(e)}/><br/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Category
                            <select name="category" value={category} onChange={ e => onInputChange(e)} >
                                <option>Select Category</option>
                                <option value="textile printing machine">Category 1</option>
                                <option value="textile machine">Category 2</option>
                            </select><br/>
                        </td>
                    </tr>
                        
                    
                </table><br/>

                <center>
                    <table>
                        <tr>
                            <td>
                                <button type = "reset" class="button">Reset</button>                            
                            </td>
                            <td>
                                <button type = "submit" onclick="" class="button">Confirm</button>
                            </td>
                        </tr>
                    </table>
                </center> 
            </form>
        </div>
    );
}