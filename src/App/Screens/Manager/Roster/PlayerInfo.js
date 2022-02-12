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
import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import PlayerInfoNav from "./PlayerInfoNav"
import DatePicker from "react-datepicker";

const PlayerInfo = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />

            <PlayerInfoNav />
            <div class="tab-content">
                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="prefarance-tab-content">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="prefarance-form-list">
                                    <h1 style={{color:"white",fontWeight:"bolder"}}>Player</h1>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="prefarance-form-list">
                                <button class="add-links"  style={{ backgroundColor: "#181717",marginRight:"5px"}} onClick={()=>history.push('./AddPlayer')}>Edit</button>
                                <button class="add-links" style={{width:"220px"}} onClick={()=>history.push('./AddPlayer')}>Add New Family Member</button>
                                
                                </div>
                            </div>
                        </div>

                        <div class="prefarance-form playerinfo-form">

                            <div class="row">
                                <div class="col-md-8">
                                    <div class="prefarance-form-list">
                                        <img src={UserProfile} alt="" style={{ height: "83px", width: "111px" }} />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="prefarance-form-list">
                                        <div className="EditPhoto">Edit Photo</div>

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label> First Name</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>


                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Last Name</label>
                                        <input type="text" class="input-select" />

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Email</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Who's this</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Phone Number</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Label</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Links</label>
                                        <button class="add-links">Add Links</button>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Files</label>
                                        <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} >Add Files</button>

                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="prefarance-form-list">
                                        <label style={{ paddingTop: "25px" }}>Player Status</label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="prefarance-form-list">
                                        <div className="EditPhoto">Disable</div>

                                    </div>
                                </div>












                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >

    )
}

export default PlayerInfo;