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


function PlayerSchedule(props) {
    const history = useHistory();
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule,setSchedule] =useState([])
    const [team,setTeam] =useState([])

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
        teamSchedule()
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };


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
                        teamSchedule(res.response_data[0]._id);
                    // }
                   

                })
        }
    }



    const teamSchedule=(id)=>{
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id<<<<<",id)
        if (user) {
          let header = {
            'authToken': user.authtoken
           
          }
          console.log('user',user)
        
        Network('api/get-game-event-list-for-player?user_id='+user._id+'&page=1&limit=10', 'GET',header)
          .then(async (res) => {
            console.log("schedule----", res)

            if (res.response_code == 4000) {
                dispatch(logoutUser(null))
                localStorage.removeItem("user");
                history.push("/")
                toast.error(res.response_message)
            }
            setSchedule(res.response_data.docs)
           
            
        })
      }
    }
    const change = (event) => {
        console.log("event", event.target.value)
       
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

                                    <button class="start-stream-btn" onClick={() => history.push('./TeamAvailability')}>Select Availability</button>
                                    <button class="start-stream-btn">View Preferences</button>
                                    <button class="start-stream-btn" onClick={() => history.push('./Export')}>Subscribe/ Export</button>
                                </div>
                            </div>
                            
                            <div class="prefarance-box">
                                <div class="team-payment team-assesment">
                                    <table>
                                        <tr>
                                            <th>Game/ Event</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Location</th>
                                            <th>Assignments</th>
                                            <th>Volunteer</th>
                                        </tr>
                                        {schedule.map((schedule)=>{
                                            return(
                                                <tr>

                                            <td>
                                                <div class="flag-prac">
                                                <img src={schedule.display_icon.image} alt=""  style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
                                                <button class="practice">{schedule.name}</button>
                                                    
                                                </div>
                                        
                                            </td>
                                            <td><span>{schedule.date}</span></td>
                                            <td>
                                                <span>{schedule.time.startTime}-{schedule.time.endTime}</span>
                                            </td>
                                            <td>
                                                <span>{schedule.location_details},{schedule.location}</span>
                                            </td>
                                            <td>{schedule.assignment}
                                    
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <p>Avaneesh Shett</p> <button data-toggle="modal" data-target="#assignmentdelect" ><img src={Delect} />
                                                    </button> <button><img src={pencil} /></button>
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
        </div>
    );
}

export default PlayerSchedule;
