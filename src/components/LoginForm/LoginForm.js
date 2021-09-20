import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {ACCESS_TOKEN_NAME,ACCESS_USER_NAME} from '../../constants/apiConstants';

class LoginForm extends React.Component{

    constructor(props){
        super(props);

        this.state={
            username:"",
            password:"",
            successMessage: null,
            failureMessage:null
        }
    }

    handleChange = (e) =>{
        const{id, value} = e.target
        this.setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    };

    handleSubmitClick = (e) =>{
        e.preventDefault();
        const payload={
            "username": this.state.username,
            "password": this.state.password
        }
        
        axios.post('http://localhost:3001/users/authenticate',payload)
             .then((response)=>{
                 if(response.status === 200){
                     this.setState({
                         'successMessage': 'Login successful',
                         'failureMessage': null
                     })
                     localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                     localStorage.setItem(ACCESS_USER_NAME,response.data.firstName + " " + response.data.lastName);
                     this.redirectToHomeForm();
                 }
                 else if(response.code === 204){
                    this.setState({
                        'successMessage': null,
                        'failureMessage': 'Username and password do not match'
                    });
                 }
                 else{
                    this.setState({
                        'successMessage': null,
                        'failureMessage': 'Username does not exist'
                    });
                 }
             })
             .catch((error) => {
                 console.log(error);
                 this.setState({
                    'successMessage': null,
                    'failureMessage': 'Incorrect username or password'
                });             
             });
    };

    redirectToHomeForm = () =>{
        this.props.history.push('/home');
    };

    render(){
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
                               value={this.state.username}
                               onChange={this.handleChange}
                        />                    
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"                           
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.handleChange}
                        />                    
                    </div>
                    <div className="form-check">                    
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmitClick}
                    >Submit</button>
                </form>
                <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                    {this.state.successMessage}
                </div>
                <div className="alert alert-danger mt-2" style={{display: this.state.failureMessage ? 'block' : 'none' }} role="alert">
                    {this.state.failureMessage}
                </div>
            </div>
        )
    }

}    

export default withRouter(LoginForm);