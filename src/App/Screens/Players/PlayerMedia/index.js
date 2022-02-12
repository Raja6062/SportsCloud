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
import "../Home/Player_style.css";


function PlayerMedia(props) {
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
                    <h2 class="page-title">Stream</h2>
                    <div class="player-info-head-right">
    
                      <div class="streming-head-right">
                       <div class="stream-tab">
                           <ul>
                               <li><a class="active" href="#">Stream</a></li>
                               <li onClick={() => history.push("./PlayerPhotos")}><a href="#">Photos</a></li>
                               <li><a href="#" onClick={() => history.push("./PlayerVideos")}>Videos</a></li>
                               <li><a href="#" onClick={() => history.push("./PlayerFiles")}>Files</a></li>
                           </ul>
                       </div>
                       
                       <button class="start-stream-btn">Start Stream</button>
                       </div>
                    </div>
                    </div>
                    <div class="prefarance-box streaming-section">
                      <div class="strame-chat-section">
                          <div class="strame-main">
                              <div class="strame-main-inner">
                                  <h3>Connect streaming software to go live</h3>
                                  <p>Viewers will be able to find your stream once you go live</p>
                              </div>
                          </div>
                          <div class="chat-main">
                              <h4>Live Chat</h4>
                              <div class="chat-main-input">
                                  <input type="text" placeholder="say something..." class="input-field"/>
                                  <button class="chat-send-btn"><img src="images/send-btn.png" alt=""/></button>
                              </div>
                          </div>
                      </div>
                      
                      <div class="streaming-form-section playerinfo-form">
                          <div class="streaming-form-field-set">
                              <div class="streaming-form-field-left">
                                  <div class="prefarance-form-list">
                        <label>Title</label>
                        <input type="text" class="input-select"/>
                    </div>
                              </div>
                              <div class="streaming-form-field-right">
                                  <div class="prefarance-form-list">
                        <label>Game</label>
                        <input type="text" class="input-select"/>
                    </div>
                              </div>
                              <div class="streaming-form-field-left">
                                  <div class="prefarance-form-list">
                        <label>Game Description</label>
                        <textarea class="input-textarea"> </textarea>
                    </div>
                              </div>
                              <div class="streaming-form-field-right">
                                  <div class="prefarance-form-list">
                        <label>Team</label>
                        <input type="text" class="input-select"/>
                         </div>
                          <div class="prefarance-form-list">
                        <label>Privacy</label>
                        <input type="text" class="input-select"/>
                                  </div>
                   
                              </div>
                          </div>
                          <div class="prefarance-form-list">
                        <label class="options-check-family">Start sending us your video from your streaming software to go live
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                        </label>
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

export default PlayerMedia;
