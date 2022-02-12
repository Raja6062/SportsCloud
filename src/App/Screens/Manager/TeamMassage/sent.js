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
import SideNav from './sideNav';

const Sent = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email:false,
        alert:false,
        post:false
    })
    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />

            <SideNav name="Send Emails"/>
            <div class="tab-content">
                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="prefarance-tab-content">

                        <div class="prefarance-form playerinfo-form">

                            <div class="row">
                                <div class="col-md-9">
                                    <div class="prefarance-form-list">

                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="prefarance-form-list">
                                        <button class="add-links" style={{ margin: "10px" }}>Delete</button>
                                    </div>
                                </div>
                            </div>

                            
                            <div class="team-payment team-assesment">

                                <table  >
                                    <thead >
                                        <tr>
                                            <th> </th>
                                            <th style={{fontSize:"Larger"}}> Subject</th>
                                            <th style={{fontSize:"Larger"}}> Sent To</th>
                                            <th style={{fontSize:"Larger"}}>Send Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="firstColumn">
                                            <td>   <input type="checkbox" style={{ height: "15px", width: "17px" }} /></td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>










                        </div>
                    </div>
                </div>
            </div>


        </div>


    )
}

export default Sent;