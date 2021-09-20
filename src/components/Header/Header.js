import React from 'react';
import Logout from "../Logout/LogoutForm";

class Header extends React.Component{    
    render(){
        return(
            <div className="container bg-primary">
                <div className="row">                
                    <div className="col-7 text-right">
                        <span className="h3 text-white">Movie Application</span>  
                    </div>       
                    <div className="col-2"></div>        
                    <div className="col-3 text-right">
                        <Logout />
                    </div>                                  
                </div>     
            </div>
        )
    }
}

export default Header;