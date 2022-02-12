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

const NewPost = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email:false,
        alert:false,
        post:false
    })
    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />

            <SideNav name="Post"/>
            <div class="tab-content">
                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="prefarance-tab-content">

                        <div class="prefarance-form playerinfo-form">

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="prefarance-form-list">
                                        <label> Subjects</label>
                                        <input type="text" class="input-select" />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="prefarance-form-list">
                                        <label> Massage</label>
                                        <textarea type="text" class="input-select" style={{ height: "210px" }} />
                                    </div>
                                </div>
                            </div>
                            <div class="row" style={{borderBottom:"1px solid gray",paddingBottom:"30px"}}>
                            <div class="col-md-12">
                                <div class="prefarance-form-list">

                                    <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                    <span>Track this message
                                        (I'll get an email when a reply is posted)</span>
                                </div>
                            </div>
                            </div>
                            <div class="row" style={{borderBottom:"1px solid gray",paddingBottom:"30px"}}>
                            <div class="col-md-12">
                                <div class="prefarance-form-list" >

                                    <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                    <span>
                                        Broadcast this message
                                        (I'll get an email when a reply is posted)</span>
                                </div>
                            </div>
                            </div>
                            <div class="row" style={{borderBottom:"1px solid gray",paddingBottom:"30px"}}>
                            <div class="col-md-12">
                                <div class="prefarance-form-list">

                                    <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                    <span>Manager announcement
                                        (Shows up with special icon)</span>
                                </div>
                            </div>
                            </div>


                            <div class="col-md-12">
                                <div class="prefarance-form-list" style={{ marginLeft: "57%" }}>
                                    <button class="add-links" style={{ margin: "10px" }}>Cancel</button>
                                    <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} >Post Massage</button>
                
                                </div>
                            </div>











                        </div>
                    </div>
                </div>
            </div>


        </div>





    )
}

export default NewPost;