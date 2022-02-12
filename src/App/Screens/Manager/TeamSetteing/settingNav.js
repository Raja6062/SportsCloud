import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import { propTypes } from 'react-bootstrap/esm/Image';

const SettingNav = (props) => {
    const history = useHistory();
    const [listValue, setList] = useState(false)
    return (
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>{props.name}</h1> </a>

            </li>
            <li class="nav-item" >

                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"  style={{color:listValue == true ?"red": "white"}}
                onClick={() => {
                    
                   setList(true)
                  
               }}>Team Setting     </a>
                <ul style={{ display: listValue == true ? "block" : "none", listStyle: "none", color:"white" }}>
                    <li class="nav-item"  style={{color:listValue == true ?"red": "white"}} onClick={()=>{
                        history.push("/MyAccount")
                    }}>Profile </li>
                    <li class="nav-item" onClick={()=>{
                        history.push("/Household")
                    }}>HouseHold</li>
                    <li class="nav-item"  onClick={()=>{
                        history.push("/Preference")
                    }}>Preferance</li>
                    <li class="nav-item" onClick={()=>{
                        history.push("/LoginAccount")
                    }}>Login</li>
                </ul>
            </li>
            <li class="nav-item"  onClick={()=>{
                        history.push("/SitePreference")
                    }}>
                <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Site Preferance</a>
            </li>
           

            <li class="nav-item" class="nav-item" onClick={()=>{
                        history.push("/TabManager")
                    }} >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  style={{color:listValue.post == true ?"red": "white"}}>Tab Manager</a>
            </li>
            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  style={{color:listValue.post == true ?"red": "white"}}>Custom Fields</a>
            </li>
            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  style={{color:listValue.post == true ?"red": "white"}}>Seasion</a>
            </li>
            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  style={{color:listValue.post == true ?"red": "white"}}>Sports Type</a>
            </li>
            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  style={{color:listValue.post == true ?"red": "white"}}>Language</a>
            </li>
            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  style={{color:listValue.post == true ?"red": "white"}}>Invoice Template</a>
            </li>
            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  style={{color:listValue.post == true ?"red": "white"}}>Team Financials</a>
            </li>


        </ul>
    )
}

export default SettingNav;