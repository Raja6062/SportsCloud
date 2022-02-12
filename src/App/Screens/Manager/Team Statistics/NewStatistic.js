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
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../../Redux/Actions/auth";
import { ToastContainer, toast } from 'react-toastify';
import BigUserProfile from "../../../images/big-user-profile.png"


function NewStatistic(props) {
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
                        <div class="player-info-head">
                            <h2 class="page-title">New Statistics</h2>
                        </div>

                        <div className="prefarance-box newStatisticBg">
                            <form>
                                <div className="newStatisBlog">
                                    <div className="newStb_Lft">
                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Full Name of Statistic</Form.Label>
                                            <Form.Control type="text" placeholder="Example: 'Earned Run Avrrage'" />
                                            <Form.Label>Acronym of Statistic</Form.Label>
                                            <Form.Control type="text" placeholder="Example: 'ERA'" />
                                            <Form.Label>Stat Group (Optional)</Form.Label>
                                            <Form.Control type="text" placeholder="(Example: 'Offense','Kickers','Goalies')" />
                                            <Form.Label>Formula (Optional)</Form.Label>
                                            <Form.Control type="text" placeholder="Example: ER/(IP*9)" />
                                        </Form.Group>
                                    </div>
                                    <div className="newStb_Rgt">
                                        <div className="newSt_child_a">
                                            <h6>Full Name of Statistic</h6>
                                            <p className="shade">MIN  -   Minutes Played</p>
                                            <p className="shade">2PM  -   2 Point Shots Made</p>
                                            <p className="shade">2PA   -   2 Point Shots Attempted</p>
                                            <p className="shade">3PA   -   3 Point Shots Attempted</p>
                                            <p className="shade">3PM  -   3 Point Shots Made</p>
                                            <p className="shade">2PP   -   2 Point Shots Percentage</p>
                                        </div>
                                        <div className="newSt_child_b">
                                            <h6>Reserved Acronyms:</h6>
                                            <p className="shade">GP  -   Games Played</p>
                                            <p>Do not use GP in formulas per-game averages are automatically calculated</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="newStatisBlog">
                                    <div className="newStb_Lft">
                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Precision</Form.Label>
                                            <div className="newStbSlct">
                                                <span>Display this statistic to</span>
                                                <select>
                                                    <option>1</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                                <span>decimal places</span>
                                            </div>
                                            <Form.Label>Percentage</Form.Label>
                                            <Form.Check type="checkbox" label="Display this statistic as a percentaage" />
                                            <Form.Label>Percentage</Form.Label>
                                            <Form.Check type="checkbox" label="Display this statistic as a percentaage" />
                                            <Form.Label>Stat Ranking</Form.Label>
                                            <Form.Check type="checkbox" label="For this statistic, lower number are  better" />
                                            <Form.Label>Stat Ranking</Form.Label>
                                            <Form.Check type="checkbox" label="For this statistic, lower number are  better" />
                                        </Form.Group>
                                        <div className="newSt_submit">
                                            <Button type="submit" className="cancl">Cancel</Button>
                                            <Button type="submit" className="saves">Save</Button>
                                            <Button type="submit" className="saveanother">Save &amp; Create Another</Button>
                                        </div>
                                    </div>
                                    <div className="newStb_Rgt">
                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Rounding</Form.Label>
                                            <Form.Check type="checkbox" label="Always show decimal places, even when it's a whole number" />
                                            <Form.Label>Show Zero</Form.Label>
                                            <Form.Check type="checkbox" label="Display this statistic even if the total is zero. (Example : Hockey Plus /MInus)" />
                                            <Form.Label>Top Stat</Form.Label>
                                            <Form.Check type="checkbox" label="Show the top performers in this statistic on the 'Stats Leadders' page" />
                                            <Form.Label>Top Stat</Form.Label>
                                            <Form.Check type="checkbox" label="This statistic applies to the whole team, not individual players" />
                                        </Form.Group>
                                    </div>
                                </div>

                            </form>
                        </div>





                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewStatistic;
