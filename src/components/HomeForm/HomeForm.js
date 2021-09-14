import React,{useEffect,useState} from "react";
import axios from "axios";
import {ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function HomeForm(props){
    /*const[state, setState] = useState({
        "id": "",
        "firstName": null,
        "lastName": null,
        "userName":null,
        "responseMessage":null
    });  

    
    useEffect(()=>{
        axios.get('http://localhost:3001/users',
        {headers:{'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then(function(response){
            if(response.status === 200){
                this.setState(response.data);      
                console.log(response.data);             
            }
            else{
                this.setState(prevState=>({
                    ...prevState,
                   "responseMessage": "fail"
                }))  
            }
        })
    });
   
    {this.state.map((lstValue,index)=>{
        return(
            <tr key={index}>
                <td>{lstValue.firstName}</td>
                <td>{lstValue.lastName}</td>
                <td>{lstValue.userName}</td>
            </tr>
            
        )
    })}*/

    return(        
    <div className="font-weight-bold max-width:100%">Hello World</div>
    )
    

}

export default withRouter(HomeForm);