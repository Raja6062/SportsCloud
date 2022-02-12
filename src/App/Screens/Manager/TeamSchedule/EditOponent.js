import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";

import "./style.css"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import flag from "../../../images/flag.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";




function EditOponent(props) {

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

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
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


    //     const EventSet=(setEvent)=>{
    //         // setEventType(e.target.value)
    //         localStorage.setItem("eventType",setEvent)
    //         console.log("eventtype------>",setEvent)
    //    }




    return (

        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents />
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
                                <h2 class="page-title">Locations</h2>

                            </div>
                            <div class="manager-player-section">
                                <h3>Manager:</h3>
                                <div class="teams-select">
                                    <ul >
                                        <Link to={{ pathname: "/NewOponent", state: "GAME" }} >
                                            <li ><a href="javascript:void(0)"  >New Oponent</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/NewEvent", state: "GAME" }} >
                                            <li ><a href="javascript:void(0)"  >New Game</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/NewEvent", state: "EVENT" }} >
                                            <li   ><a href="javascript:void(0)"  >New Event</a></li>
                                        </Link>
                                    </ul>


                                </div>
                                {/* <ul>
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Import</a></li>
                                </ul> */}
                            </div>
                            <div class="prefarance-box">
                                <div class="team-payment team-assesment">
                                    <table>
                                        <tr>
                                            <th>Opponent Name</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Notes</th>
                                            <th>Record vs.</th>
                                            <th>Scheduled Games</th>


                                        </tr>

                                        <tr>

                                            <td>
                                                <span> Bay Area Eagles</span>

                                            </td>
                                            <td><span>Siomone Gary</span></td>
                                            <td>
                                                <span>+1 256 232 8872</span>
                                            </td>
                                            <td>
                                                <span>
                                                    siomongary@domain.com</span>
                                            </td>
                                            <td>
                                                <span>......</span>
                                            </td>
                                            <td>
                                                <span>0-1</span>
                                            </td>
                                            <td>
                                                <span>TeamLink Opponent</span>
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <button><img src={pencil} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>

                                            <td>
                                                <span> Bay Area Eagles</span>

                                            </td>
                                            <td><span>Siomone Gary</span></td>
                                            <td>
                                                <span>+1 256 232 8872</span>
                                            </td>
                                            <td>
                                                <span>
                                                    siomongary@domain.com</span>
                                            </td>
                                            <td>
                                                <span>......</span>
                                            </td>
                                            <td>
                                                <span>0-1</span>
                                            </td>
                                            <td>
                                                <span>TeamLink Opponent</span>
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <button><img src={pencil} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>

                                            <td>
                                                <span> Bay Area Eagles</span>

                                            </td>
                                            <td><span>Siomone Gary</span></td>
                                            <td>
                                                <span>+1 256 232 8872</span>
                                            </td>
                                            <td>
                                                <span>
                                                    siomongary@domain.com</span>
                                            </td>
                                            <td>
                                                <span>......</span>
                                            </td>
                                            <td>
                                                <span>0-1</span>
                                            </td>
                                            <td>
                                                <span>TeamLink Opponent</span>
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <button><img src={pencil} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>

                                            <td>
                                                <span> Bay Area Eagles</span>

                                            </td>
                                            <td><span>Siomone Gary</span></td>
                                            <td>
                                                <span>+1 256 232 8872</span>
                                            </td>
                                            <td>
                                                <span>
                                                    siomongary@domain.com</span>
                                            </td>
                                            <td>
                                                <span>......</span>
                                            </td>
                                            <td>
                                                <span>0-1</span>
                                            </td>
                                            <td>
                                                <span>TeamLink Opponent</span>
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <button><img src={pencil} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>

                                            <td>
                                                <span> Bay Area Eagles</span>

                                            </td>
                                            <td><span>Siomone Gary</span></td>
                                            <td>
                                                <span>+1 256 232 8872</span>
                                            </td>
                                            <td>
                                                <span>
                                                    siomongary@domain.com</span>
                                            </td>
                                            <td>
                                                <span>......</span>
                                            </td>
                                            <td>
                                                <span>0-1</span>
                                            </td>
                                            <td>
                                                <span>TeamLink Opponent</span>
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <button><img src={pencil} /></button>
                                                </div>
                                            </td>
                                        </tr>





                                    </table>
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

export default EditOponent;

