import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
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


const TeamAvailability = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule,setSchedule] =useState([])
    const [team,setTeam] =useState([])
    const [divColor,setDivColor]=useState(false)




    useEffect(() => {
        setUser(user);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        teamSelect()
        teamSchedule()

        
    }, []);
    const handleLogout = () => {
        
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
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
                        <div>
                            <h1 style={{color:"white",fontSize:"30px",fontWeight:"bold"}}>Availability for</h1>
                        </div>
                        <div class="manager-player-section">
                        <div class="teams-select1" >
                         <select>
                             <option>My Availability</option>
                             <option> Team Availability</option>
                         </select>
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
                                        <th>Attendence</th>
                                        
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
                                        <td>
                                            <div  style={{ height:"20px",width:"20px",marginLeft:"30px",backgroundColor:divColor?"green":"white"}} onClick={()=>setDivColor(!divColor)}></div>
                                        </td>
                                        
                                    </tr>
                                       )

                                    })}

                                    {/* <tr>
                                        <td>
                                            <div class="flag-prac">
                                                <img src={flag} alt="" />
                                                <button class="practice">Practice</button>
                                            </div>
                                            <div class="game-name">
                                                Dubcity Basketball
                                                Practice</div>
                                        </td>
                                        <td><span>Oct 16, 2021</span></td>
                                        <td>
                                            <span>TBD</span>
                                        </td>
                                        <td>
                                            <span>Eleanor Murray

                                                Fallon Middle Schoo</span>
                                        </td>
                                        <td>
                                            <input type="checkbox" name="checked"  style={{ height:"20px",width:"20px",marginLeft:"30px"}}/>
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                        <td>
                                            <div class="flag-prac">
                                                <img src={flag} alt="" />
                                                <button class="practice">Practice</button>
                                            </div>
                                            <div class="game-name">
                                                Dubcity Basketball
                                                Practice</div>
                                        </td>
                                        <td><span>Oct 16, 2021</span></td>
                                        <td>
                                            <span>TBD</span>
                                        </td>
                                        <td>
                                            <span>Eleanor Murray

                                                Fallon Middle Schoo</span>
                                        </td>
                                        <td>
                                            <input type="checkbox" name="checked"  style={{ height:"20px",width:"20px",marginLeft:"30px"}}/>
                                        </td>
                                        
                                    </tr> */}
                                </table>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TeamAvailability;