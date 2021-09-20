import React from "react";
import { withRouter } from "react-router-dom";

class LogoutContent extends React.Component{   
    constructor(props){
        super(props);
        this.state={
            ph: props
        };
    }

    handleLogOut = ()=>{
        localStorage.clear();
        this.state.ph.history.push("/Login");
    }

    render(){
        return(
            <div className="form-inline">
                <div className="form-container">
                    <span className="badge badge-pill badge-info">
                        {this.state.ph.welcomeLabel}!
                    </span>
                    <span>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={this.handleLogOut}>Logout</button>
                    </span>
                </div>                
            </div> 
        )
    }
}

export default withRouter(LogoutContent);