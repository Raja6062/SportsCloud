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
import Footer from "../../../Components/Footer"
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';



function NewTeam(props) {
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
                        <h2 class="page-title">Tournament Registration</h2>
                        </div>
                        {/* <div class="teamOrgbar">
                            <span><input type="checkbox"/>Show Historical</span>
                            <div className="teamBtnRgt">
                                <a href="#">Print</a>
                            </div>
                        </div> */}
                        <div className="teamOrgselect">
                            <div className="slctLft">
                                <div className="slctPart">
                                    <Form.Group controlId="dob">
                                        <Form.Label>Tournament Name </Form.Label>
                                        <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="slctLft">
                                <div className="slctPart">
                                    <span>Tournament Name</span>
                                    <select>
                                        <option>Summer Apr 2020</option>
                                        <option>2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="prefarance-box teamOrgBox newTMbox"> 
                            <div className="netTmsingle">
                                <label>Number of Teams</label>
                                <select className="input-select" >
                                   <option>2</option>
                                   <option>5</option>
                                   <option>7</option>
                                   <option>12</option>
                                </select>
                            </div>
                            <div className="teamOrgForbmg">
                                <div className="teamorgSlct">
                                    <label>Team Name</label>
                                    <input type="text" value="Chicago Bulls"/>
                                </div>
                                <div className="teamorgSlct">
                                    <label>Age / Grade</label>
                                    <select className="input-select" >
                                        <option>2</option>
                                        <option>5</option>
                                        <option>7</option>
                                        <option>12</option>
                                    </select>
                                </div>
                                <div className="teamorgSlct toFlex">
                                    <div className="toflexInn">
                                        <label>Division</label>
                                        <select class="input-select" >
                                            <option>Option 1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <div className="toflexInn">
                                        <label>Team Name</label>
                                        <select className="input-select" >
                                            <option>Male</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>    
                            <div className="teamOrgForbmg">
                                <div className="teamorgSlct">
                                    <label>Team Name</label>
                                    <input type="text" value="Chicago Bulls"/>
                                </div>
                                <div className="teamorgSlct">
                                    <label>Age / Grade</label>
                                    <select className="input-select" >
                                        <option>2</option>
                                        <option>5</option>
                                        <option>7</option>
                                        <option>12</option>
                                    </select>
                                </div>
                                <div className="teamorgSlct toFlex">
                                    <div className="toflexInn">
                                        <label>Division</label>
                                        <select class="input-select" >
                                            <option>Option 1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <div className="toflexInn">
                                        <label>Team Name</label>
                                        <select className="input-select" >
                                            <option>Male</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>  

                            <div className="netTmsingle">
                                <label>Number of Teams</label>
                                <select className="input-select" >
                                   <option>2</option>
                                   <option>5</option>
                                   <option>7</option>
                                   <option>12</option>
                                </select>
                            </div>


                            <div className="teamOrgForbmg">
                                <div className="teamorgSlct">
                                    <label>Coach</label>
                                    <input type="text" value="Christopher Castillo"/>
                                </div>
                                <div className="teamorgSlct">
                                    <label>Email</label>
                                    <input type="text" value="Eleazar.Marvin@gmail.com"/>
                                </div>
                                <div className="teamorgSlct">
                                    <label>Phone</label>
                                    <input type="text" value="(228) 282-4096"/>
                                </div>
                            </div>  


                            <div className="teamOrgForbmg">
                                <div className="teamorgSlct">
                                    <label>Coach</label>
                                    <input type="text" value="Christopher Castillo"/>
                                </div>
                                <div className="teamorgSlct">
                                    <label>Email</label>
                                    <input type="text" value="Eleazar.Marvin@gmail.com"/>
                                </div>
                                <div className="teamorgSlct">
                                    <label>Phone</label>
                                    <input type="text" value="(228) 282-4096"/>
                                </div>
                            </div> 


                            <div className="netWm_check">
                                 <Form.Check type="radio" name="radio" aria-label="Paypal" />
                                 <span>Paypal</span>
                                 <Form.Check type="radio" name="radio" aria-label="Credit Card" />
                                 <span>Credit Card</span>
                            </div>  
                            <div className="newTm_submit">
                                <a href="#">Register and Pay</a>
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

export default NewTeam;
