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

const NewEvent = () => {
    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>New Event</h1> </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Event Details</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Optional Event Info</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Assignment</a>
                </li>

            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="prefarance-tab-content">

                        <div class="prefarance-form playerinfo-form">

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label> Name of Event</label>
                                        <input type="text" class="input-select" placeholder="Virtual Practice" />
                                    </div>
                                </div>


                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Short Lebel</label>
                                        <input type="text" class="input-select" placeholder="e.g ,Practice,BBQ,Meeting,etc" />
                                        <p style={{ color: "gray" }}>A short lebel to identify the types of event, 10 character max</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Date</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Time <span style={{ color: "gray" }}>(Leave Blank for "TBD")</span></label>
                                        <input type="text" class="input-select" />
                                        <p style={{ color: "gray" }}>Pacific Time (US & Canada)<span style={{ color: "red" }}>Change</span></p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Oponent</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Location</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="prefarance-form-list">
                                        <label>Location Details</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="prefarance-form-list">
                                        <label>Duration</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="prefarance-form-list">
                                        <label >Duration</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Arrival Time</label>
                                        <input type="text" class="input-select" />
                                        <p style={{ color: "gray" }}> minutes befor the starting  time</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Canceled</label>

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Display Icon</label>

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span style={{ color: "white" }}>show this event as canceld on the schedule</span>


                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <div style={{ display: "flex" }}>
                                            <div style={{ margin: "10px" }}><img src={flag} alt="" style={{ height: "15px" }} /><br></br>
                                                <input type="radio" /></div>
                                            <div style={{ margin: "10px" }}><img src={flag} alt="" style={{ height: "15px" }} /><br></br>
                                                <input type="radio" /></div>
                                            <div style={{ margin: "10px" }}><img src={flag} alt="" style={{ height: "15px" }} /><br></br>
                                                <input type="radio" /></div>
                                            <div style={{ margin: "10px" }}><img src={flag} alt="" style={{ height: "15px" }} /><br></br>
                                                <input type="radio" /></div>
                                            <div style={{ margin: "10px" }}><img src={flag} alt="" style={{ height: "15px" }} /><br></br>
                                                <input type="radio" /></div>


                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="prefarance-form-list">
                                        <label >Notes</label>
                                        <input type="text" class="input-select" style={{ height: "150px" }} />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="prefarance-form-list">
                                        <label >Availability</label>
                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span style={{ color: "white" }}>Track availability on the Availability tab</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Assignment</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <label>Uniform</label>
                                        <input type="text" class="input-select" />
                                        <p style={{ color: "red", fontSize: "15px", float: "right" }}>+Add Another</p>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="prefarance-form-list">
                                        <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                        <span style={{ color: "white" }}> Notify Your Team?</span>
                                        <button class="add-links" style={{ margin: "10px" }}>Cancel</button>
                                        <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }}>Save</button>
                                        <button style={{ backgroundColor: "#1d1b1b", padding: "13px", borderRadius: "30px", margin: "10px", color: "white" }}>+Save and Create Another</button>
                                    </div>
                                </div>
                                {/* <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Links</label>
                                                            <button class="add-links">Add Links</button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Files</label>
                                                            <button class="add-links">Add Files</button>
                                                        </div>
                                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default NewEvent;