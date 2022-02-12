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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import CalenderIcon from "../../../images/calenderIcon.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import UserProfile from "../../../images/user-profile.png"




const NewEvent = () => {


    const history = useHistory();
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [flag, setFlag] = useState([])
    const [name, setName] = useState()
    const [lebel, setLebel] = useState()
    // const [date, setDate] = useState()
    const [time, setTime] = useState('');
    // const [time, setTime] = useState()
    const [oponent, setOponent] = useState()
    const [location, setLocation] = useState()
    const [locationDetails, setLocationDetails] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [arrivalTime, setArrivalTime] = useState()
    const [note, setNote] = useState()
    const [availability, setAvalability] = useState()
    const [assignment, setAssingment] = useState()
    const [uniform, setUniform] = useState()
    const [teamId, setTeamId] = useState()
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [opnentDropdown, setOponentDropDown] = useState("")
    const [check, setCheck] = useState("false")
    const [flagId, setFlagId] = useState("")
    const { state } = useLocation()
    const [schedule, setSchedule] = useState([])









    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        flagList()
        eventCreate()
        dropdownMenu()



    }, []);
    const pic = 'https://nodeserver.mydevfactory.com:1447/'



    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };



    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }


            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setFlag(res.response_data)


                })
        }
    }


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





    const eventCreate = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const eventType = localStorage.getItem("eventType")
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                'name': name,
                'date': startDate,
                'team_id': teamDropdown,
                'short_label': lebel,
                "opponent": opnentDropdown,
                "manager_id": user._id,
                "event_type": state,
                "location_details": locationDetails,
                "location": location,
                "uniform": uniform,
                "arrival_time": arrivalTime,
                "notes": note,
                "assignment": assignment,
                "notify_team": check,
                "display_icon": flagId,
                "home_or_away": "HOME",
                "time": {
                    "startTime": startTime,
                    "endTime": endTime
                },
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/add-game-event', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("event Data", res)
                console.log("eventType", eventType)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

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


    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
    }

    const changeTeam = (event) => {
        setTeamDropDown(event.target.value)
    }

    const changeOponent = (event) => {
        setOponentDropDown(event.target.value)
    }

    const selectFlag = (event) => {
        setFlagId(event.target.value)
    }




    const CheckValidatiion = () => {

        if (name == null) {
            toast.error("Please Provide  Name", {
                position: "top-center"
            })
        }
        if (startDate == null) {
            toast.error("Please Provide Starting Time", {
                position: "top-center"
            })
        }
        if (teamDropdown == null) {
            toast.error("Please Select A Team", {
                position: "top-center"
            })
            return
        }
        if (lebel == null) {
            toast.error("Please Fill the Label", {
                position: "top-center"
            })
            return
        }
        if (opnentDropdown == null) {
            toast.error("Please Select Oponent Team", {
                position: "top-center"
            })
            return
        }
        if (state == null) {
            toast.error("Please Provide State", {
                position: "top-center"
            })
            return
        }
        if (locationDetails == null) {
            toast.error("Please Select Location Details", {
                position: "top-center"
            })
            return
        }
        if (location == null) {
            toast.error("Please Select Location", {
                position: "top-center"
            })
            return
        }
        if (uniform == null) {
            toast.error("Please Select Uniform", {
                position: "top-center"
            })
            return
        }
        if (arrivalTime == null) {
            toast.error("Please Provide Arrival Time", {
                position: "top-center"
            })
            return
        }
        if (note == null) {
            toast.error("Please Provide  Note", {
                position: "top-center"
            })
            return
        }
        if (assignment == null) {
            toast.error("Please Provide Assignment", {
                position: "top-center"
            })
            return
        }
        if (flagId == null) {
            toast.error("Please Select Your Flag", {
                position: "top-center"
            })
            return
        }
        if (startTime == null) {
            toast.error("Please Provide Starting Time", {
                position: "top-center"
            })
            return
        }
        if (endTime == null) {
            toast.error("Please Provide End Time", {
                position: "top-center"
            })
            return
        }


        eventCreate()
        history.push("/playerschdule")


    }


    return (
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
                        <select onClick={()=>{
                    history.push("/MyAccount")
                  }}>
                  <option >Account</option>
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
                <div class="prefarance-box" style={{ overflow: "auto" }} >
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>New Event</h1> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Event Details</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Optional Event Info</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Assignment</a>
                        </li>

                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="prefarance-tab-content">

                                <div class="prefarance-form playerinfo-form">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label> Name of Event</label>
                                                <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>


                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Short Lebel</label>
                                                <input type="text" class="input-select" placeholder="e.g ,Practice,BBQ,Meeting,etc" onChange={(e) => setLebel(e.target.value)} />
                                                <p style={{ color: "gray" }}>A short lebel to identify the types of event, 10 character max</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Date</label>
                                                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} class="input-select" style={{ height:"50px",borderRadius:"10px"}}/>
                                    */}
                                                <div class="input-select" >

                                                    <DatePicker selected={startDate} show="false" onChange={(date) => setStartDate(date)} /></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Time <span style={{ color: "gray" }}>(Leave Blank for "TBD")</span></label>
                                                <div class="input-select" >
                                                    <TimePicker
                                                        onChange={setTime}
                                                        value={time}
                                                    />
                                                </div>

                                                <p style={{ color: "gray" }}>Pacific Time (US & Canada)<span style={{ color: "red" }}>Change</span></p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Team</label>
                                                {/* <input type="text" class="input-select" onChange={(e) => setOponent(e.target.value)} /> */}
                                                <select class="input-select" onChange={changeTeam}>
                                                    <option value="">Select A Team </option>
                                                    {dropdown.map((dropdown) => {
                                                        return (


                                                            <option value={dropdown._id}>{dropdown.team_name}</option>

                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Oponent</label>
                                                {/* <input type="text" class="input-select" onChange={(e) => setOponent(e.target.value)} /> */}
                                                <select class="input-select" onChange={changeOponent} >
                                                    <option value="">Select Oponent Team </option>
                                                    {dropdown.map((dropdown) => {
                                                        return (

                                                            <option value={dropdown._id}>{dropdown.team_name}</option>


                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Location</label>
                                                <input type="text" class="input-select" onChange={(e) => setLocation(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <label>Location Details</label>
                                                <input type="text" class="input-select" onChange={(e) => setLocationDetails(e.target.value)} />
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="prefarance-form-list">
                                                <label>Start Time</label>
                                                <input type="text" class="input-select" onChange={(e) => setStartTime(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="prefarance-form-list">
                                                <label >End Time</label>
                                                <input type="text" class="input-select" onChange={(e) => setEndTime(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Arrival Time</label>
                                                <input type="text" class="input-select" onChange={(e) => setArrivalTime(e.target.value)} />
                                                <p style={{ color: "gray" }}> minutes befor the starting  time</p>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Display Icon</label>

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <div style={{ display: "flex" }}>
                                                    {flag.map((flag) => {
                                                        return (

                                                            <div style={{ margin: "10px" }}><img src={`${pic}${flag.image}`} alt="" style={{ height: "30px", width: "30px" }} /><br></br>
                                                                <input type="radio" name="radio" style={{ height: "30px", margin: "5px" }} onClick={selectFlag} value={flag._id} /></div>
                                                        )
                                                    })}




                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <label >Notes</label>
                                                <input type="text" class="input-select" style={{ height: "150px" }} onChange={(e) => setNote(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <label >Availability</label>
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} onChange={(e) => setAvalability(e.target.value)} />
                                                <span style={{ color: "white" }}>Track availability on the Availability tab</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Assignment</label>
                                                <input type="text" class="input-select" onChange={(e) => setAssingment(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Uniform</label>
                                                <input type="text" class="input-select" onChange={(e) => setUniform(e.target.value)} />
                                                <p style={{ color: "red", fontSize: "15px", float: "right" }}>+Add Another</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={() => setCheck(check == "true" ? "false" : "true")} />
                                                <span style={{ color: "white" }}> Notify Your Team?</span>
                                                <button class="add-links" style={{ margin: "10px" }}>Cancel</button>
                                                <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={CheckValidatiion}>Save</button>
                                                <button style={{ backgroundColor: "#1d1b1b", padding: "13px", borderRadius: "30px", margin: "10px", color: "white" }}>+Save and Create Another</button>
                                            </div>
                                        </div>
                                        {/* <div class="col-md-6">
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
                                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewEvent;