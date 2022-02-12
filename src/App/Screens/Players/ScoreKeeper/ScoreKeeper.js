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


const Scorekeeper = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [dropdown, setDropdown] = useState([])
    const[locationValue,setLocationValue] =useState([])

    useEffect(() => {
        setUser(user);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        dropdownMenu()
        LocationData()
        

    }, []);
    const handleLogout = () => {

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

                   





                })
        }

    }
    const LocationData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/get-location-list', 'GET', header)
                .then(async (res) => {
                    console.log("location----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setLocationValue(res.response_data);

                   





                })
        }

    }


    const change = (event) => {
        console.log("event", event.target.value)
       

    }

    return (

        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents />
                    <div class="dashboard-main-content">
                        <div class="dashboard-head">
                            <div class="teams-select">
                            <select onChange={change} >

<option>Select A Team</option>
{dropdown.map((dropdown) => {
  return (
    <option value={dropdown._id}>{dropdown.team_name}</option>
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



                        <div class="manager-player-section">
                            <h3>Match :</h3>
                            <div class="teams-select3" style={{ marginRight: "37%" }}>
                                <select>
                                    <option>Location</option>
                                    {locationValue.map((data)=>{
                                        return(
                                            <option>{data.locationName},{data.address}</option>
                                        )
                                    })}
                                   
                                </select>
                            </div>


                            <div class="teams-select3 teamSlct" >
                                <select>
                                    <option>All             </option>
                                    <option> Team Availability</option>
                                </select>
                            </div>

                        </div>

                        <div class="prefarance-box">
                            <div class="team-payment team-assesment">
                                <table style={{textAlign:"center"}}>
                                    <tr>
                                        <th style={{ fontSize: "30px" }}>Players</th>
                                        <th style={{ fontSize: "30px" }}>2 Pointers</th>
                                        <th style={{ fontSize: "30px" }}>3 Pointers</th>
                                        <th style={{ fontSize: "30px" }}>Free Throws</th>

                                    </tr>

                                    <tr>

                                        <td>
                                            <img src={UserProfile} alt="" />
                                            <span>Jayanta Karmakor</span>

                                        </td>
                                        <td >
                                            2
                                        </td>
                                        <td>
                                            <span>1</span>
                                        </td>
                                        <td>2

                                        </td>
                                        <td>
                                            <div class="last-row">
                                                <button data-toggle="modal" data-target="#assignmentdelect"><img src={Delect} /></button> <button><img src={pencil} /></button>
                                            </div>
                                        </td>
                                    </tr>






                                </table>
                            </div>
                        </div>

                        <div class="prefarance-box">
                                <div class="team-payment team-assesment">
                                    <table style={{textAlign:"center"}}>
                                        <tr>
                                            <th style={{fontSize:"30px"}}>Non-Players</th>
                                            <th style={{fontSize:"30px"}}>2 Pointers</th>
                                            <th style={{fontSize:"30px"}}>3 Pointers</th>
                                            <th style={{fontSize:"30px"}}>Free Throws</th>
                                            
                                        </tr>

                                        <tr>
                                            
                                            <td>
                                                <img src={UserProfile} alt="" />
                                                <span>Jayanta Karmakor</span>

                                            </td>
                                            <td>
                                                2
                                            </td>
                                            <td>
                                                <span>1</span>
                                            </td>
                                            <td>2

                                            </td>
                                            <td>
                                                <div class="last-row">
                                                     <button data-toggle="modal" data-target="#assignmentdelect"><img src={Delect} /></button> <button><img src={pencil} /></button>
                                                </div>
                                            </td>
                                        </tr>






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
export default Scorekeeper;