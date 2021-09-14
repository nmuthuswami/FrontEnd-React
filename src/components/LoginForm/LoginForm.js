import React,{useState} from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {API_BASE_URL,ACCESS_TOKEN_NAME} from '../../constants/apiConstants';

function LoginForm(props){
    const[state, setState] = useState({
        username:"",
        password:"",
        successMessage: null
    })

    const handleChange = (e) =>{
        const{id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) =>{
        e.preventDefault();
        const payload={
            "username": state.username,
            "password": state.password
        }
        
        axios.post('http://localhost:3001/users/authenticate',payload)
             .then(function(response){
                 if(response.status === 200){
                     setState(prevState =>({
                         ...prevState,
                         'successMessage': 'Login successful'
                     }))
                     localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                     redirectToHomeForm();
                     props.showError(null);
                 }
                 else if(response.code === 204){
                     props.showError("Username and password do not match");
                 }
                 else{
                     props.showError("Username does not exist");
                 }
             })
             .catch(function(error){
                 console.log(error);
             });
    }

    const redirectToHomeForm = () =>{
        // props.updateTitle('Home');
        props.history.push('/home');
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputusername">User Name</label>
                    <input type="text"
                           className="form-control"
                           id="username"
                           aria-describedby="usernamehelp"
                           placeholder="Enter Username"
                           value={state.username}
                           onChange={handleChange}
                    />                    
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"                           
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />                    
                </div>
                <div className="form-check">                    
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
        </div>
    )
}

export default withRouter(LoginForm);