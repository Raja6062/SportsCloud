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
import tableProfile from "../../../images/table-profile.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer";
import ProgressBar from 'react-bootstrap/ProgressBar'


function Photos(props) {
    const history = useHistory();

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
                   <div class="player-info-head">
                    <h2 class="page-title">Photo Albums</h2>
                    <div class="player-info-head-right">
    
                      <div class="streming-head-right">
                       <div class="stream-tab">
                           <ul>
                               <li><a href="#" onClick={() => history.push("./TeamMedia")}>Stream</a></li>
                               <li><a class="active" href="#">Photos</a></li>
                               <li><a href="#" onClick={() => history.push("./Videos")}>Videos</a></li>
                               <li><a href="#" onClick={() => history.push("./Files")}>Files</a></li>
                           </ul>
                       </div>
                       
                       {/* <button class="start-stream-btn">Start Stream</button> */}
                       </div>
                    </div>
                    </div>
                    <div class="prefarance-box streaming-section">
                      <div className="photosTp">
                          <span>Photos</span>
                          <div className="photoProgress"><span>Storate : </span><ProgressBar now={90} /><span>0 MB used (0%), 98800 MB available</span></div>
                      </div>
                      <div className="photoTpBtm">
                            <p>TeamSnap makes it easy to share video links, photos and files with the entire team via a simple interface for uploading, organizing, and wirting custom titles and captions. Use the buttons in the upper right to switch between <span className="redTxt">Photos</span>, <span className="redTxt">Videos</span>, and <span className="redTxt">Files</span>. </p>
                            <a href="#" className="addFirstvideo">Add Your First Photo</a>
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

export default Photos;
