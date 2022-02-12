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

const TeamPlayerInfoNav = (props) => {
    const history = useHistory();
    const [listValue, setList] = useState(false)
    return (
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>{props.name}</h1> </a>

            </li>
            <li class="nav-item" >

                <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"  
                onClick={() => {
                    
                   setList(true)
                  
               }}>Lisa Menon     </a>
                
            </li>
            <li class="nav-item" >
                <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Contact Information</a>
            </li>
            <li class="nav-item" >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab" >Optional Player Details</a>
               
            </li>

            <li class="nav-item" class="nav-item"  >
                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab"  >Player Links and Files</a>
               
            </li>


        </ul>
    )
}

export default TeamPlayerInfoNav;