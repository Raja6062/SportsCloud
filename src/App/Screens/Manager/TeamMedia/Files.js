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
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form'


function Files(props) {
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
                               <li><a href="#" onClick={() => history.push("./Photos")}>Photos</a></li>
                               <li><a href="#" href="#" onClick={() => history.push("./Videos")}>Videos</a></li>
                               <li><a class="active" href="#">Files</a></li>
                           </ul>
                       </div>
                       
                       {/* <button class="start-stream-btn">Start Stream</button> */}
                       </div>
                    </div>
                    </div>
                    <div class="prefarance-box streaming-section">
                      <div className="photosTp">
                          <span>Import a Schedule of games by uploading a file that includes opponents, times, and locations.</span>                          
                      </div>
                      {/* <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" />
                        </Form.Group> */}
                      <div className="fileUploadSec">
                          <button>Choose File</button>
                          <span>No file choosen</span>
                      </div>
                      <div className="photoTpBtm">
                            <p>The First row should be your column headings (e.g., date, time, opponent, location). See the Schedule Template below for examples. </p>                            
                      </div>
                      <div className="filesBtms"><span className="filesDnld">Download Our Roster Template</span> | <span className="filepdnLft">(Acceptable Formats: .XLS, .XLSX and .CSV)</span></div>

                    </div>
                </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Files;
