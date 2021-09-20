import React from "react";
import axios from "axios";
import {ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";



class HomeForm extends React.Component{  

    constructor(props){
        super(props);       

        this.state = {
            gridData:[],
            selectedLocation:"default",
            selectedLanguage:"default"
        };

        
    }

    componentDidMount(){
        axios.get('http://localhost:3001/movies',
        {headers:{'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then((response) =>{
            this.setState({gridData:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }
    
    handleChange = (e) => {
        let apiUrl = 'http://localhost:3001/movies';
        if(e.target.name === 'locations'){  
            this.setState({
                selectedLocation: e.target.value
            });         

            if(this.state.selectedLanguage === 'default'){                
                apiUrl = `http://localhost:3001/movies/1/${e.target.value}`;
            }
            else{
                apiUrl = `http://localhost:3001/movies/3/${e.target.value}/${this.state.selectedLanguage}`;
            }
        }
        else if(e.target.name === 'languages'){
            this.setState({
                selectedLanguage: e.target.value
            });
            if(this.state.selectedLocation === 'default'){
                apiUrl = `http://localhost:3001/movies/2/${e.target.value}`;
            }
            else{
                apiUrl = `http://localhost:3001/movies/3/${this.state.selectedLocation}/${e.target.value}`;
            }            
        }
        axios.get(apiUrl,
        {headers:{'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`}})
        .then((response) =>{
            this.setState({gridData:response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    onGridReady = params =>{
        console.log(params.api);
    }
   

    render(){
        return(
            <div>                
                <div className="form-inline form-group">
                    <span className="form-control border-0">
                        <label id="lblLocation">Select Location:</label>
                    </span>
                    <span className="form-control border-0">
                    <select name="locations" id="locations" defaultValue={this.state.selectedLocation}
                    onChange={this.handleChange}>
                        <option value="default">--Select--</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Australia">Australia</option>
                        <option value="Europe">Europe</option>
                        <option value="NorthAmerica">North America</option>
                        <option value="SouthAmerica">South America</option>
                    </select>
                    </span>
                    <span className="form-control border-0">
                        <label id="lblLanguages">Select Language:</label>
                    </span>
                    <span className="form-control border-0">
                    <select name="languages" id="languages" defaultValue={this.state.selectedLanguage}
                    onChange={this.handleChange}>
                        <option value="default">--Select--</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                    </select>
                    </span>
                </div>
                <div className="ag-theme-balham" style={{height:'500px', width: '801px'}}>
                    <AgGridReact rowData={this.state.gridData} onGridReady={this.onGridReady}> 
                    <AgGridColumn field="title"></AgGridColumn>
                    <AgGridColumn field="language"></AgGridColumn>
                    <AgGridColumn field="location"></AgGridColumn>
                    <AgGridColumn field="imdbRating"></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        )
    }
}



export default withRouter(HomeForm);