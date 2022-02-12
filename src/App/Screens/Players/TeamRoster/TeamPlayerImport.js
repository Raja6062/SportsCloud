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
import football from "../../../images/football.png"
import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"

import DatePicker from "react-datepicker";


const TeamImportPlayer = () => {
    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />


            <div class="tab-content">
                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="prefarance-tab-content">
                        <h1 style={{color:"white"}}>Import Player</h1>

                        <div className="fileBox">
                            <span>Import a list of players by uploading a file below:</span>
                            <div style={{display:"flex",paddingBottom:"20px"}}>
                            <div class="update-team-photo" style={{ width: "20%" }}>
                                Choose File
                                <input type="file" name='img' />

                            </div>
                            <div className="fileChoosen">No File Choosen</div>
                            </div>
                            <span style={{ color: "red" }}>Download Our Roster Template</span><span>

                                |  (Acceptable Formats: .XLS, .XLSX and .CSV)</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TeamImportPlayer;