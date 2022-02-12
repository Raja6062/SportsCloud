import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import UserProfile from "../../../images/user-profile.png"
import './ManagerViewCalender.css'

const ManagerViewCalender =()=>{
    const history = useHistory();
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()


    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // //console.log("userMe===>", user);
        dropdownMenu();
        // setUser(user);
        // //console.log("USerData", userdata);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        flagList()
        deleteScheduleData()

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };






    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/my-team-list?team_manager_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    teamSchedule(res.response_data[0]._id);





                })
        }

    }
    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
    }





    const teamSchedule = (id) => {
        console.log("id", id)
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {

                'authToken': user.authtoken

            }

            let url = ""
            if (id != undefined) {

                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10'
            }
            else {
                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamDropdown + '&page=1&limit=10'
            }
            //console.log('user',user)
            Network('api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10', 'GET', header)
                .then(async (res) => {
                    console.log("schedule----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    //console.log("doc data----->",res.response_data.docs)
                    setSchedule(res.response_data.docs)


                })
        }
    }
    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }



                })
        }
    }


    const deleteScheduleData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", id)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "_id": id
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/delete-assignment', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("delete assignment data", res)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
                teamSchedule()



            })

    }
    return(
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <div class="dashboard-main-content">
                <div class="dashboard-head">
                    <div class="teams-select">
                        <button class="create-new-team" onClick={() => history.push("./CreateTeam")}>Create New Teams</button>

                        <select onChange={change} value={teamDropdown == "" ? dropdown[0]?._id : teamDropdown} >
                                    {dropdown.map((dropdown) => {
                                        return (
                                            <option value={dropdown._id}>{dropdown.team_name}</option>
                                        )
                                    })}
                                </select>
                        <select>
                            <option>Account</option>
                            <option>Account 2</option>
                            <option>Account 3</option>
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
                        <div class="page-header">
                                <h2 class="page-title">Schedule</h2>
                                <div class="streming-head-right">
                                    <div class="stream-tab">
                                        <ul>
                                            <li><a class="active" href="#">List View</a></li>
                                            <li onClick={()=>{
                                                history.push("/ViewCalender")
                                            }}><a href="#">Calendar View</a></li>

                                        </ul>
                                    </div>

                                    <button class="start-stream-btn">Select Availability</button>
                                    <button class="start-stream-btn">View Preferences</button>
                                    <button class="start-stream-btn">Subscribe/ Export</button>
                                </div>
                            </div>
                            
                        <div className="calBox">
                            <div className="calBoxHead">
                                <span>
                                    <span>&#10094;</span>
                                    Month
                                    <span>&#10095;</span>
                                </span>
                                <div className="vcRgt">Team record: 8-5</div>
                            </div>
                            <div className="calBtm">
                                <div className="calInfo">
                                    <span>Do you want to play college sports?</span>
                                    <span className="maxW">Set up a free  recruiting profile with Next College Student Athlete and start connecting with over 35,000 college coaches.</span>
                                    <span className="redTx">Let’s Do  This!</span>
                                    <span className="redTx">No Thanks</span>
                                </div>
                                <div className="calTable">  
                                    <table>
                                        <tr>
                                            <th>Sunday</th>
                                            <th>Monday</th>
                                            <th>Tueday</th>
                                            <th>Wednesday</th>
                                            <th>Thursday</th>
                                            <th>Friday</th>
                                            <th>Saturday</th>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                1
                                            </td>
                                            <td>
                                                2
                                                <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                                <h5>Dubcity Basketball Practice</h5>
                                                <p>Eleanor Murrary Fallon Middle School</p>
                                            </td>
                                            <td>3</td>
                                            <td>
                                                4
                                                <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                                <h5>Dubcity Basketball Practice</h5>
                                                <p>Eleanor Murrary Fallon Middle School</p>
                                            </td>
                                            <td>
                                                5
                                                <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                                <h5>Dubcity Basketball Practice</h5>
                                                <p>Eleanor Murrary Fallon Middle School</p>
                                            </td>
                                            <td>6</td>                                        
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>9</td>
                                            <td>
                                                10
                                                <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                                <h5>Dubcity Basketball Practice</h5>
                                                <p>Eleanor Murrary Fallon Middle School</p>
                                            </td>
                                            <td>11</td>
                                            <td>12</td>
                                            <td>13</td>                                        
                                        </tr>
                                        <tr>
                                            <td>14</td>
                                            <td>15</td>
                                            <td>
                                                16
                                                <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                                <h5>Dubcity Basketball Practice</h5>
                                                <p>Eleanor Murrary Fallon Middle School</p>
                                            </td>
                                            <td>17</td>
                                            <td>
                                                18
                                                <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                                <h5>Dubcity Basketball Practice</h5>
                                                <p>Eleanor Murrary Fallon Middle School</p>
                                            </td>
                                            <td>19</td>
                                            <td>20</td>                                        
                                        </tr>
                                        <tr>
                                            <td>21</td>
                                            <td>22</td>
                                            <td>23</td>
                                            <td><span className="prcRedCircle">24</span></td>
                                            <td>
                                                25
                                                <div className="prcBar"><span className="prcIcn">&#9873;</span> <span className="prcBtn">Practice</span></div>
                                                <h5>Dubcity Basketball Practice</h5>
                                                <p>Eleanor Murrary Fallon Middle School</p>
                                            </td>
                                            <td>26</td>
                                            <td>27</td>                                        
                                        </tr>
                                        <tr>
                                            <td>28</td>
                                            <td>29</td>
                                            <td>30</td>
                                            <td>31</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                        </div>

                           
                </div>

                </div>
                
            
        </div>

    )
}

export default ManagerViewCalender ;