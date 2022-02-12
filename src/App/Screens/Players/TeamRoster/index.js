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
import Logo from "../../../images/logo.png"
import UserProfile from "../../../images/user-profile.png"
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from '../../../Components/Footer';



import flag from "../../../images/flag.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";





function TeamRoster(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [player, setPlayer] = useState([]);
    const [resData, setResData] = useState({})
    const [nonPlayer, setNonPlayer] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [team, setTeam] = useState([]);




    // const [Nonplayer,setNonPlayer]= useState([]);

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
        teamRoster();
       
       

    }, []);

    const pic = 'https://nodeserver.mydevfactory.com:1447/'

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };
    const teamRoster = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id---->",id)
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/player-list-by-team-id?team_id=' + id, 'GET', header)
                .then(async (res) => {
                    console.log("teamRoster----", res)

                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setResData(res.response_data);
                    console.log("team player", res.response_data.PLAYER)
                    console.log("non player", res.response_data.NON_PLAYER)
                    setPlayer(res.response_data.PLAYER)
                    setNonPlayer(res.response_data.NON_PLAYER)


                })
        }
    }



    const teamSelect = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/player-joined-team-list?player_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("res----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }

                    setTeam(res.response_data);
                    // if(res.response_data.length!=0){
                        teamRoster(res.response_data[0]._id);
                    // }
                   

                })
        }
    }

    

    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamRoster(event.target.value);
    }

    return (
        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents />
                    <div class="dashboard-main-content">
                        <div class="dashboard-head">

                            <div class="teams-select">


                                <select onClick={change}>
                                    <option>Select Team</option>
                                    {team.map((team) => {
                                        return (
                                            <option value={team.team_id._id}>{team.team_id.team_name}</option>
                                        )
                                    })}


                                </select>

                            </div>

                        

                        <div class="profile-head">
                            <div class="profile-head-name">John Doe</div>
                            <div class="profile-head-img">
                                <img src={UserProfile} alt="" />
                            </div>
                        </div>
                        </div>


                        <div class="prefarance-page">
                            <div class="player-info-head">
                                <h2 class="page-title">Roster</h2>
                                <div class="player-info-head-right">
                                    <button class="edit-btn" style={{ width: "265px" }}  onClick={() => history.push('./TeamPlayerInfo')}>Manage My Player Info</button>
                                    <button class="add-new-family" style={{ width: "324px" }}  onClick={() => history.push('./TeamAddPlayer')}>+ Add or Edit My Family Member</button>
               
                                </div>
                            </div>

                            {user.user_type == "manager" ? <div class="manager-player-section">
                                <h3>Maneger</h3>
                                <ul >
                                    <li onClick={() => history.push('./AddPlayer')}><a href="#" style={{ color: "red" }}>+ Add Player</a></li>
                                    <li><a href="#" style={{ color: "red" }}>Import Players</a></li>
                                    <li><a href="#" style={{ color: "red" }}>Import From Another Teams</a></li>
                                </ul>

                            </div> : ""}

                            {/* <div class="prefarance-box player-info">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Lisa Menon</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Contact information</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Optional Player Details</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Player Links & Files</a>
                                    </li>

                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div class="prefarance-tab-content">

                                            <div class="prefarance-form playerinfo-form">
                                                <div class="player-profile-img">
                                                    <img src={TeamList} alt="" />
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>First Name</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>


                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Last Name</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Email</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Who is this?</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Phone Number</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Label</label>
                                                            <input type="text" class="input-select" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Links</label>
                                                            <button class="add-links">Add Links</button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Files</label>
                                                            <button class="add-links">Add Files</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div> */}

                            <div class="manager-player-section">
                                <h3>Players</h3>
                                {/* <ul>
                                    <li><a href="#">New</a></li>
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Import</a></li>
                                </ul> */}
                                <span style={{ color: "white", position: "absolute", right: "3%" }}>Total Player {resData.TOTAL_PLAYER}(Men:3,Women:2)</span>
                            </div>
                            <div class="prefarance-box">
                                <div class="team-payment team-assesment">
                                    <table>
                                        <tr>
                                            <th>Male/Female</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Player No</th>
                                            <th>contact Info</th>
                                            <th>Position</th>
                                        </tr>
                                        {player.map((player) => {
                                            return (
                                                <tr>
                                                    <td>

                                                        <div class="game-name">

                                                            {player.member_id.gender}
                                                        </div>

                                                    </td>
                                                    <td> {player.member_id.profile_image == null ?
                                                        <img src={UserProfile} alt="" /> :
                                                        <img src={`${pic}${player.member_id.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                    }
                                                    </td>
                                                    <td>
                                                        <span>{player.member_id.fname}{player.member_id.lname}</span>
                                                    </td>
                                                    <td>
                                                        <span>{player.jersey_number}</span>
                                                    </td>
                                                    <td>{player.member_id.fname}<br></br>
                                                        {player.member_id.email}

                                                    </td>
                                                    <td>
                                                        <div class="last-row">
                                                            <p>{player.position}</p> <button data-toggle="modal" data-target="#assignmentdelect"><img src={Delect} /></button> <button><img src={pencil} /></button>
                                                        </div>
                                                    </td>
                                                </tr>

                                            )
                                        })}




                                    </table>
                                </div>
                            </div>

                            <div class="manager-player-section">
                                <h3> Non-Players</h3>
                                {/* <ul>
                                    <li><a href="#">New</a></li>
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Import</a></li>
                                </ul> */}
                                <span style={{ color: "white", position: "absolute", right: "3%" }}>Total Player 5(Men:3,Women:2)</span>
                            </div>
                            <div class="prefarance-box">
                                <div class="team-payment team-assesment">
                                    <table>
                                        <tr>
                                            <th>Male/Female</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Player No</th>
                                            <th>contact Info</th>
                                            <th>Position</th>
                                        </tr>

                                        {nonPlayer.map((Nonplayer) => {
                                            return (
                                                <tr>
                                                    <td>

                                                        <div class="game-name">
                                                            {Nonplayer.member_id.gender}</div>
                                                    </td>
                                                    <td> {Nonplayer.member_id.profile_image == null ?
                                                        <img src={UserProfile} alt="" /> :
                                                        <img src={`${pic}${Nonplayer.member_id.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                    }
                                                    </td>
                                                    <td>
                                                        <span>{Nonplayer.member_id.fname}{Nonplayer.member_id.lname}</span>
                                                    </td>
                                                    <td>
                                                        <span>{Nonplayer.jersey_number}</span>
                                                    </td>
                                                    <td>{Nonplayer.member_id.fname}<br></br>
                                                        {Nonplayer.member_id.email}

                                                    </td>
                                                    <td>
                                                        <div class="last-row">
                                                            <p>{Nonplayer.position}</p> <button data-toggle="modal" data-target="#assignmentdelect"><img src={Delect} /></button> <button><img src={pencil} /></button>
                                                        </div>
                                                    </td>
                                                </tr>

                                            )
                                        })}




                                    </table>
                                </div>
                            </div>

                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TeamRoster;
