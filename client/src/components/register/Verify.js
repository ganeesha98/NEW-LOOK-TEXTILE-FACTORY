import axios from "axios";
import {React, useEffect} from "react";
import {  useParams } from 'react-router-dom';

const Verify = () => {

    const { token } = useParams();

    useEffect(async () => {            
        try{
            await axios.post('http://localhost:5000/auth/verify/' + token).then(() => {
                window.location.href = "/landedpage";
            }) 
        }
        catch(err){
            console.log(err)
        }            
    })

    return(
        <div>
            
        </div>
    )
}

export default Verify;