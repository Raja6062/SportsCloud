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
import UserProfile from "../../../images/user-profile.png"
import pdf from "../../../images/pdf.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"


function LiabilityWaiver(props) {

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});

    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // console.log("userMe===>", user);
        setUser(user);
        // console.log("USerData", userdata);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };


    return (
        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents />
                    <div class="dashboard-main-content">
                        <div class="dashboard-head">
                            <div class="teams-select">
                                <select>
                                    <option>My Teams</option>
                                    <option>My Teams 2</option>
                                    <option>My Teams 3</option>
                                </select>
                            </div>

                            <div class="profile-head">
                                <div class="profile-head-name">{user ? user.fname : null}</div>
                                <div class="profile-head-img">
                                    {
                                        user ?
                                            <img src={user.profile_image} alt="" /> :
                                            <img src={UserProfile} alt="" />
                                    }

                                </div>
                            </div>
                            <div class="login-account">
                                <ul>
                                    <li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li>
                                    {/* <li><a href="#" data-toggle="modal" data-target="#myModalregister" onClick={handleLogout}>Logout</a></li> */}
                                </ul>
                            </div>
                        </div>

                        <div class="prefarance-page">
                    <h2 class="page-title">Liability Waiver</h2>
                    <div class="prefarance-box">
                        <div class="liability-box">
                            <div class="player-details-section">
                                <div class="player-details-box">
                                    <span>Player Name</span>
                                    <p>Lisa Menon</p>
                                </div>
                                <div class="player-details-box">
                                    <span>Player Email</span>
                                    <p>lisamenon@gmail.com</p>
                                </div>
                                <div class="player-details-box">
                                    <span>Player Contact</span>
                                    <p>+1 - 236 982 2356</p>
                                </div>
                            </div>
                            <div class="pdf-image">
                                <img src={pdf} lt=""/>
                            </div>
                            <div class="liability-form">
                                <div class="liability-form-input">
                                   <label>Player Name (First and last)</label>
                                    <input type="text" class="liability-input-field"/>
                                </div>
                                <div class="liability-form-input">
                                   <label>Parent Name (First and last)</label>
                                    <input type="text" class="liability-input-field"/>
                                </div>
                                <div class="liability-form-input">
                                   <label>Date</label>
                                    <input type="text" class="liability-input-field"/>
                                </div>
                                <div class="liability-form-input">
                                   <label>Parent/Guardian's signature required</label>
                                    <input type="text" class="liability-input-field"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiabilityWaiver;
