import React from "react";
import { withRouter } from "react-router-dom";
import {ACCESS_USER_NAME} from '../../constants/apiConstants';
import LogOutForm from './LogoutChildForm';

class LogoutForm extends React.Component{
    render(){
        let renderContent;  
        if(!!(localStorage.getItem(ACCESS_USER_NAME))){
            let welcomeAttr = "Welcome " + localStorage.getItem(ACCESS_USER_NAME);
            renderContent = <LogOutForm welcomeLabel={welcomeAttr} />
        }             
        return(
             <div>
                 {renderContent}
             </div>
        )
    }
}

export default withRouter(LogoutForm);