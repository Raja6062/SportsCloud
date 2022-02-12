import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
    useParams,
    useLocation
} from "react-router-dom";
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import Delect from "../../../images/delect.png"
import SideMenuComponents from "../../../Components/SideMenu"
import UserProfile from "../../../images/user-profile.png"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";

const CreateTeam = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [zip, setZip] = useState()
    const [language, setLanguage] = useState()
    const [teamName, setTeamName] = useState()
    const [sport, setSport] = useState()
    const [timeZone, setTimeZone] = useState()
    const [country, setCountry] = useState()
    const [parentName, setParentName] = useState()

    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        createTeamData()



    }, []);

    const createTeamData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "team_name": teamName,
                "team_manager_id": user._id,
                "sports": sport,
                "time_zone": timeZone,
                "country": country,
                "zip": zip,
                "language": language,
                "parentName": parentName
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/create-team', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("create team data", res)


                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }


    const CheckValidatiion = () => {

        if (teamName == null) {
            toast.error("Please Provide Team Name", {
                position: "top-center"
            })
        }
        if (sport == null) {
            toast.error("Please Provide Sport Name", {
                position: "top-center"
            })
        }
        if (timeZone == null) {
            toast.error("Please Provide Time Zone", {
                position: "top-center"
            })
            return
        }
        if (country == null) {
            toast.error("Please Provide Country", {
                position: "top-center"
            })
            return
        }
        if (zip == null) {
            toast.error("Please Provide Zip Code", {
                position: "top-center"
            })
            return
        }
        if (language == null) {
            toast.error("Please Provide Language", {
                position: "top-center"
            })
            return
        }
        if (parentName == null) {
            toast.error("Please Provide Parents Name", {
                position: "top-center"
            })
            return
        }

        createTeamData()
        history.push("/playerschdule")


    }






    return (
        <div class="prefarance-box player-info" style={{ height: "100vh", marginTop: "0px", borderRadius: "0px", paddingTop: "5%", paddingLeft: "20%", paddingRight: "20%" }}>
            <div class="prefarance-form playerinfo-form">

                <div class="row">
                    <div class="col-md-6" >
                        <div class="prefarance-form-list" style={{ color: "white" }}>
                            <h1 style={{ color: "white", fontSize: "35px", padding: "10px" }}>Create a  New Team</h1>
                            <h3 style={{ color: "white", fontSize: "25px", padding: "10px" }}>Let's get started</h3>
                            <p style={{ color: "white", fontSize: "20px", padding: "10px" }}> We'll create your team on the Free plan, which includes all of our

                                core features:</p>
                            <ul style={{ color: "white", fontSize: "20px" }}>
                                <li>Schedule games, practices and events</li>
                                <li>Instantly connect with everyone via chat
                                </li>
                                <li>Get paid for team expenses</li>
                            </ul>
                            <p style={{ color: "white", fontSize: "20px", padding: "10px" }}>Ready to take your team to the next level?</p>
                            <p style={{ color: "red", fontSize: "20px", padding: "10px" }}>Explore our paid plans</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <div class="prefarance-form-list">
                                <label>Language</label>
                                <input type="text" class="input-select" onChange={(e) => setLanguage(e.target.value)} />
                                <label>Team Name</label>
                                <input type="text" class="input-select" onChange={(e) => setTeamName(e.target.value)} />
                                <label>Player Parent Name</label>
                                <input type="text" class="input-select" onChange={(e) => setParentName(e.target.value)} />
                                <label>Sport</label>
                                <select class="input-select" onChange={(e) => setSport(e.target.value)}>
                                    <option>Football</option>
                                    <option>Cricket</option>
                                    <option>Badminton</option>
                                </select>
                                {/* <input type="text" class="input-select" onChange={(e) => setSport(e.target.value)}/> */}
                                <label>Time Zone</label>
                                <select class="input-select" onChange={(e) => setTimeZone(e.target.value)}>
                                    <option>Time Zone1</option>
                                    <option>Time Zone2</option>
                                    <option>Time Zone3</option>
                                </select>
                                {/* <input type="text" class="input-select" onChange={(e) => setTimeZone(e.target.value)}/> */}
                            </div>
                        </div>
                        <div class="col-md-12" style={{ display: "flex", flexDirection: "row" }}>
                            <div class="col-md-6">
                                <div class="prefarance-form-list">
                                    <label>Country</label>
                                    <select class="input-select" onChange={(e) => setCountry(e.target.value)}>
                                        <option>India</option>
                                        <option>America</option>
                                        <option>South Africa</option>
                                    </select>
                                    {/* <input type="text" class="input-select" onChange={(e) => setCountry(e.target.value)}/> */}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="prefarance-form-list">
                                    <label>Zip Code</label>
                                    <input type="text" class="input-select" onChange={(e) => setZip(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12" style={{ display: "flex", flexDirection: "row" }}>
                            <div class="col-md-6">
                                <div class="prefarance-form-list">
                                    <button class="add-links">CANCEL</button>

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="prefarance-form-list">
                                    <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} onClick={CheckValidatiion} >SAVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateTeam;