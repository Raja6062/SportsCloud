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
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../../Redux/Actions/auth";
import { ToastContainer, toast } from 'react-toastify';
import BigUserProfile from "../../../images/big-user-profile.png"



function Brackets(props) {
    const history = useHistory();

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const dispatch = useDispatch()
    const [team, setTeam] = useState([])
    const [schedule, setSchedule] = useState([])
    const [profilePic, setProfilePic] = useState([])
    const [teamId, setTeamId] = useState("")

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
        teamSelect()
        updateProfile()
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };
    const pic = 'https://nodeserver.mydevfactory.com:1447/'
    const teamSelect = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/my-team-list?team_manager_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("teanSelect----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setTeam(res.response_data)
                    teamSchedule(res.response_data[0]._id);


                })
        }
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
                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamId + '&page=1&limit=10'
            }
            //console.log('user',user)
            Network('api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10', 'GET', header)
                .then(async (res) => {
                    console.log("schedule----", res)
                    // if (res.response_code == 4000) {
                    //     dispatch(logoutUser(null))
                    //     localStorage.removeItem("user");
                    //     history.push("/")
                    //     toast.error(res.response_message)
                    // }
                    //console.log("doc data----->",res.response_data.docs)
                    setSchedule(res.response_data.docs)


                })
        }
    }

    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/get-user-details?user_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)
                    setProfilePic(res.response_data)

                })
        }

    }

    const change = (event) => {
        console.log("event", event.target.value)
        setTeamId(event.target.value)
        teamSchedule(event.target.value);
    }


    return (
        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents />
                    <div class="dashboard-main-content">
                    <div class="dashboard-head">
                            <div class="teams-select">
                                <button class="create-new-team" onClick={() => {
                                    history.push("/CreateTeam")
                                }}>Create New Teams</button>
                                <select onChange={change} >

                                    {team == null ? <option> Team1</option> :
                                        team.map((team) => {
                                            return (
                                                <option key={team.id}>{team.team_name}</option>
                                            )
                                        })}
                                </select>
                                <div className="dropBtn">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                                        ACCOUNT
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                                        <li><a class="dropdown-item" href="#">Jayanta Karmakar</a></li>
                                        <Link to={{ pathname: "/MyAccount" }} >
                                            <li><a class="dropdown-item" href="#">My Account</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/Credit" }} >
                                            <li><a class="dropdown-item" href="#">Credits</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/Household" }} >
                                            <li><a class="dropdown-item" href="#">My HouseHold</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/ManageTeam" }} >
                                            <li><a class="dropdown-item" href="#">Manage My Team</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/Biling" }} >
                                            <li><a class="dropdown-item" href="#">Biling & Plans</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/CreateTeam" }} >
                                            <li><a class="dropdown-item" href="#">Create New Team</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/SignOut" }} >
                                            <li><a class="dropdown-item active" href="#">Sign Out</a></li>
                                        </Link>

                                    </ul>
                                </div>
                            </div>
                            <div class="profile-head">
                                <div class="profile-head-name">{profilePic.fname + " " + profilePic.lname}</div>
                                <div class="profile-head-img">
                                    {profilePic.profile_image == null ?
                                        <img src={BigUserProfile} alt="" /> :
                                        <img src={`${pic}${profilePic.profile_image}`} alt="" />
                                    }

                                </div>
                            </div>
                            <div class="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

                        </div>

                        <div class="prefarance-page">
                            <div class="player-info-head">
                                <h2 class="page-title">Brackets</h2>
                                <div class="player-info-head-right">

                                    <div class="streming-head-right">
                                        <div class="stream-tab">
                                            <ul>
                                                <li><a href="#" onClick={() => history.push("./TeamOrganizer")}>Tournament Organizer</a></li>
                                                <li><a href="#" onClick={() => history.push("./TeamShedule")}>Tournament Schedule</a></li>
                                                <li><a class="active" href="#">Brackets</a></li>
                                                <li><a href="#" onClick={() => history.push("./TeamRegister")}>Registration</a></li>
                                            </ul>
                                        </div>

                                        {/* <button class="start-stream-btn">Start Stream</button> */}
                                    </div>
                                </div>
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
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="slctLft">
                                    <a href="#" className="brkNewteam" onClick={() => history.push("./NewTeam")}>New Team</a>
                                    <div className="slctPart">
                                        <span>Tournament Name</span>
                                        <select>
                                            <option>Summer Apr 2020</option>
                                            <option>2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="prefarance-box bracketsBox">
                                <div className="brkLft">
                                    <p>Options</p>
                                    <div className="brkLbordr">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div className="brkRgt">
                                    <p>16 Bracket</p>

                                    <div className="dialBgCover">
                                        <div className="dialBgWrap">
                                            <div className="diaBgMain">
                                                <div className="diabg">
                                                    <div className="dia1">
                                                        <div className="diaSub1">
                                                            <div className="diaSubchild">
                                                                <p>9 AM (Court 1)</p>
                                                                <span>Chicago Bulls</span>
                                                                <span>Brooklyn</span>
                                                            </div>
                                                            <div className="diaSubchild">
                                                                <p>9 AM (Court 2)</p>
                                                                <span>Indiana Pacers</span>
                                                                <span>LA Lakers</span>
                                                            </div>
                                                        </div>
                                                        <div className="diaSub2">
                                                            <div className="diaSubchild">
                                                                <p>10:30 AM (Court 1)</p>
                                                                <span>Brooklyn</span>
                                                                <span>LA Lakers</span>
                                                            </div>
                                                        </div>
                                                        <div className="diaSub3">
                                                            <div className="diaSubchild">
                                                                <p>3 PM (Court 1)</p>
                                                                <span>Brooklyn</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="dia1">
                                                        <div className="diaSub1">
                                                            <div className="diaSubchild">
                                                                <p>10:30 AM (Court 2)</p>
                                                                <span>Boston Celtics</span>
                                                                <span>Miami Heat</span>
                                                            </div>
                                                            <div className="diaSubchild">
                                                                <p>12 PM (Court 2)</p>
                                                                <span>Houston Rockets</span>
                                                                <span>Denvers</span>
                                                            </div>
                                                        </div>
                                                        <div className="diaSub2">
                                                            <div className="diaSubchild">
                                                                <p>1:30 PM (Court 2)</p>
                                                                <span>Boston Celtics</span>
                                                                <span>Denvers</span>
                                                            </div>
                                                        </div>
                                                        <div className="diaSub3">
                                                            <div className="diaSubchild">
                                                                <p>3 PM (Court 1)</p>
                                                                <span>Denvers</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="diaSub3">
                                                    <div className="diaSubchild">
                                                        <p>5:30 PM (Court 2)</p>
                                                        <span>Denvers</span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="diaBgMain">
                                                <div className="diabg">
                                                    <div className="dia1">
                                                        <div className="diaSub1">
                                                            <div className="diaSubchild">
                                                                <p>12 PM (Court 1)</p>
                                                                <span>Miami Heat</span>
                                                                <span>Detroit Pistons</span>
                                                            </div>
                                                            <div className="diaSubchild">
                                                                <p>1:30 PM (Court 1)</p>
                                                                <span>Phoenix Sun</span>
                                                                <span>Atlanta Hawks</span>
                                                            </div>
                                                        </div>
                                                        <div className="diaSub2">
                                                            <div className="diaSubchild">
                                                                <p>3 PM (Court 2)</p>
                                                                <span>Detroit Pistons</span>
                                                                <span>Phoenix Sun</span>
                                                            </div>
                                                        </div>
                                                        <div className="diaSub3">
                                                            <div className="diaSubchild">
                                                                <p>6 PM (Court 1)</p>
                                                                <span>Phoenix Sun</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="dia1">
                                                        <div className="diaSub1">
                                                            <div className="diaSubchild">
                                                                <p>4:30 PM (Court 1)</p>
                                                                <span>Ornaldo Magic</span>
                                                                <span>Miami Heat</span>
                                                            </div>
                                                            <div className="diaSubchild">
                                                                <p>4:30 PM (Court 2)</p>
                                                                <span>Houston Rockets</span>
                                                                <span>Atlanta Hawks</span>
                                                            </div>
                                                        </div>
                                                        <div className="diaSub2">
                                                            <div className="diaSubchild">
                                                                <p>5:30 PM (Court 1)</p>
                                                                <span>Miami Heat</span>
                                                                <span>Atlanta Hawks</span>
                                                            </div>
                                                        </div>
                                                        <div className="diaSub3">
                                                            <div className="diaSubchild">
                                                                <p>6 PM (Court 1)</p>
                                                                <span>Miami Heat</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="diaSub3">
                                                    <div className="diaSubchild">
                                                        <p>5:30 PM (Court 2)</p>
                                                        <span>Miami Heat</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="diaSub3">
                                            <div className="diaSubchild">
                                                <p>7:30 PM (Court 1)</p>
                                                <span>Denvers</span>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="tournamentDetl">
                                <p>Summary / Tournament Details</p>
                                <div className="tourDetlInn">
                                    <div className="tdLft">
                                        <table>
                                            <tr>
                                                <th>Event</th>
                                                <th>Hours</th>
                                            </tr>
                                            <tr>
                                                <td>Set Up</td>
                                                <td><span>0:30</span></td>
                                            </tr>
                                            <tr>
                                                <td>Clean Up</td>
                                                <td><span>0:30</span></td>
                                            </tr>
                                            <tr>
                                                <td>Times Out/OT</td>
                                                <td><span>0:30</span></td>
                                            </tr>
                                            <tr>
                                                <td>Time on Courts</td>
                                                <td><span>0:30</span></td>
                                            </tr>
                                            <tfoot>
                                                <tr>
                                                    <td>Total Time</td>
                                                    <td><span>0:30</span></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div className="tdRgt">
                                        <ul>
                                            <li>2 Courts</li>
                                            <li>4 Teams Per Hour</li>
                                            <li>5 Games</li>
                                            <li>1 Day Cycle</li>
                                        </ul>
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

export default Brackets;
