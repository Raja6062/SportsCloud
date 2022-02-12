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
import BigUserProfile from "../../../images/big-user-profile.png"
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


function TeamAssignments(props) {
    const history = useHistory();
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [assignment, setAssignment] = useState([])
    const [modalValue, setModalValue] = useState(false)
    const [time, setTime] = useState('');
    const [location, setLocation] = useState()
    const [assignmentValue, setAssignmentValue] = useState()
    const [volenteer, setVolenteer] = useState()
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [schedule, setSchedule] = useState([])
    const [gameEvent, setGameEvent] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [locationData, setLocationData] = useState([])
    const [locationId, setLocationId] = useState()
    const [volenteerData, setVolenteerData] = useState([])
    const [uid, setUId] = useState("")
    const [modeValue, setModeValue] = useState(false)
    const [id, setId] = useState("")
    const [team, setTeam] = useState([])
    const [profilePic, setProfilePic] = useState([])



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

        AssignmentData()
        addAssignmentData()
        dropdownMenu()
        deleteAssignmentData()
        LocationData()
        VolenteerData()
        updateAssignmentData()
        teamSelect()
    }, []);

    const pic = 'https://nodeserver.mydevfactory.com:1447/'

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };

    const AssignmentData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/get-assignment-list?assigner_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("assignmentData----", res)
                    setAssignment(res.response_data.docs)



                })
        }
    }


    const addAssignmentData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("location", location)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "date": startDate,
                "time": time,
                "assignment": assignmentValue,
                "game_event_id": gameEvent,
                "location": location,
                "volunteer": volenteer,
                "assigner_id": user._id
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/add-assignment', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("add assignment data", res)

                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

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

                    teamSchedule(res.response_data[0]._id);





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

    const deleteAssignmentData = (id) => {
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
                AssignmentData()



            })

    }



    const updateAssignmentData = (uId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("location", location)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "assignment": assignmentValue,
                "_id": uid,
                "location": location,
                "time": time,
                "date": startDate,
                "volunteer": volenteer
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/update-assignment', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("update assignment data", res)

                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }



    const LocationData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/get-location-list', 'GET', header)
                .then(async (res) => {
                    console.log("Location----", res)
                    setLocationData(res.response_data)



                })
        }
    }



    const VolenteerData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(" volenteer id", id)
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/all-player-list-by-team-id?team_id=60a51abfae9b3244cc9d1eae', 'GET', header)
                .then(async (res) => {
                    console.log("Volenteer ----", res)
                    setVolenteerData(res.response_data)



                })
        }
    }

    const selectLocation = (e) => {
        setLocation(e.target.value)
    }


    const save = () => {

        addAssignmentData()
        setModalValue(false)
        AssignmentData()
    }
    const update = () => {

        updateAssignmentData(uid)
        setModeValue(false)
        AssignmentData()
    }




    const assignmentData = (e) => {
        setAssignmentValue(e.target.value)
    }


    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
        VolenteerData(event.target.value)
    }


    const gameEventId = (e) => {
        setGameEvent(e.target.value)
        console.log("game event", e.target.value)
    }
    const volenteerId = (e) => {
        setVolenteer(e.target.value)
    }

    const updateModalValue = (id, uId) => {
        setModeValue(true)
        setUId(uId)
        setId(id)
        console.log("idddddd-------->", id, uId)

    }


    const CheckValidatiionSave = () => {

        if (time == null) {
            toast.error("Please Provide Time", {
                position: "top-center"
            })
        }
        if (location == null) {
            toast.error("Please Select Location", {
                position: "top-center"
            })
            return
        }
        if (assignmentValue == null) {
            toast.error("Please Provide Assignment ", {
                position: "top-center"
            })
            return
        }
        if (volenteer == null) {
            toast.error("Please Select Volunteer", {
                position: "top-center"
            })
            return
        }
        if (teamDropdown == null) {
            toast.error("Please Select a Team", {
                position: "top-center"
            })
            return
        }
        if (startDate == null) {
            toast.error("Please Select Date", {
                position: "top-center"
            })
            return
        }
        if (gameEvent == null) {
            toast.error("Please Select Game/Event", {
                position: "top-center"
            })
            return
        }


        save()






    }

    const CheckValidatiionUpdate = () => {

        if (time == null) {
            toast.error("Please Provide Time", {
                position: "top-center"
            })
        }
        if (location == null) {
            toast.error("Please Select Location", {
                position: "top-center"
            })
            return
        }
        if (assignmentValue == null) {
            toast.error("Please Provide Assignment ", {
                position: "top-center"
            })
            return
        }
        if (volenteer == null) {
            toast.error("Please Select Volunteer", {
                position: "top-center"
            })
            return
        }
        if (teamDropdown == null) {
            toast.error("Please Select a Team", {
                position: "top-center"
            })
            return
        }
        if (startDate == null) {
            toast.error("Please Select Date", {
                position: "top-center"
            })
            return
        }
        if (gameEvent == null) {
            toast.error("Please Select Game/Event", {
                position: "top-center"
            })
            return
        }



        update()




    }






    return (
        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents manger="manger" />
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
                            <div class="page-header">
                                <h2 class="page-title">Assignments</h2>
                                <div class="right-head-buttons">
                                    <a href="#" class="add-new-btn" data-toggle="modal" data-target="#addassignment" onClick={() => setModalValue(true)}>Add New</a>
                                    <a href="#" class="view-preferance" data-toggle="modal" data-target="#assignmentpreferance">View Preferences</a>
                                </div>
                            </div>

                            <Modal show={modalValue} style={{ position: "absolute", top: "206px" }}>

                                <Modal.Body>
                                    <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Add Assignments</h1>
                                    <h2 style={{ color: "#524646", padding: "10px" }}>SELECT TEAM</h2>


                                    <select onChange={change} style={{ width: "80%", height: "46px", borderRadius: "10px", backgroundColor: "white" }} >
                                        <option>Select A Team</option>
                                        {dropdown.map((dropdown) => {
                                            return (
                                                <option value={dropdown._id}>{dropdown.team_name}</option>
                                            )
                                        })}
                                    </select>

                                    <h2 style={{ color: "#524646", padding: "10px" }}>GAME/EVENT</h2>

                                    <select style={{ width: "80%", height: "46px", borderRadius: "10px", backgroundColor: "white" }} onChange={gameEventId}>
                                        <option >Select Game/Event</option>
                                        {schedule.map((schedule) => {
                                            return (
                                                <option value={schedule._id}>{schedule.name}</option>
                                            )
                                        })}

                                    </select>

                                    <h2 style={{ color: "#524646", padding: "10px" }}>Date</h2>
                                    <div class="input-select" style={{ width: "27%" }}>
                                        <DatePicker selected={startDate} show="false" onChange={(date) => setStartDate(date)} className="abc" />
                                    </div>
                                    <h2 style={{ color: "#524646", padding: "10px" }}>Time</h2>
                                    <div class="input-select" style={{ width: "80%", marginLeft: "11%", borderRadius: "10px", border: "1px solid black" }}>
                                        <TimePicker
                                            onChange={setTime}
                                            value={time}
                                            className="bcd"
                                        />
                                    </div>
                                    <h2 style={{ color: "#524646", padding: "10px" }}>Location</h2>
                                    <select onClick={selectLocation} style={{ width: "80%", height: "46px", borderRadius: "10px", backgroundColor: "white" }}>
                                        <option  >Select Location</option>
                                        {locationData.map((locationData) => {
                                            return (
                                                <option value={locationData.locationName}>{locationData.locationName}</option>
                                            )
                                        })}
                                        <option></option>
                                    </select>
                                    <h2 style={{ color: "#524646", padding: "10px" }}>Assignments</h2>
                                    <input type="text" style={{ width: "80%", height: "52px", borderRadius: "10px" }}
                                        onChange={assignmentData}
                                    />
                                    <h2 style={{ color: "#524646", padding: "10px" }}>Volenteer</h2>
                                    <select onClick={volenteerId} style={{ width: "80%", height: "46px", borderRadius: "10px", backgroundColor: "white" }}>
                                        <option>Select Volenteer</option>
                                        {volenteerData.map((volenteerData) => {
                                            return (
                                                <option value={`${volenteerData.member_id.fname}${volenteerData.member_id.lname}`}>{volenteerData.member_id.fname}{volenteerData.member_id.lname}</option>
                                            )
                                        })}

                                    </select>

                                    <button class="add-links" style={{ margin: "10px" }} onClick={(e) => setModalValue(false)}>Cancel</button>
                                    <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={CheckValidatiionSave}>Save</button>
                                    <button style={{ backgroundColor: "#1d1b1b", padding: "13px", borderRadius: "30px", margin: "10px", color: "white", width: "338px" }}>+Save and Create Another</button>
                                </Modal.Body>

                            </Modal>


                            {modeValue ? <Modal show={modeValue} style={{ position: "absolute", top: "206px" }}>

                                <Modal.Body>
                                    <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Add Assignments</h1>
                                    <h2 style={{ color: "#524646", padding: "10px" }}>SELECT TEAM</h2>


                                    <select onChange={change} style={{ width: "80%", height: "46px", borderRadius: "10px", backgroundColor: "white" }} >

                                        <option>Select a Team</option>

                                        {dropdown.map((dropdown) => {
                                            return (
                                                <option value={dropdown._id}>{dropdown.team_name}</option>
                                            )
                                        })}
                                    </select>

                                    <h2 style={{ color: "#524646", padding: "10px" }}>GAME/EVENT</h2>

                                    <select style={{ width: "80%", height: "46px", borderRadius: "10px", backgroundColor: "white" }} onChange={gameEventId}>
                                        <option >{assignment[id].eventGameDetails.name}</option>

                                        {schedule.map((schedule) => {
                                            return (
                                                <option value={schedule._id}>{schedule.name}</option>
                                            )
                                        })}

                                    </select>

                                    <h2 style={{ color: "#524646", padding: "10px" }}>Date</h2>
                                    <div class="input-select" style={{ width: "27%" }}>
                                        <DatePicker selected={startDate} defaultValue={assignment[id].date} show="false" onChange={(date) => setStartDate(date)} className="abc" />
                                    </div>
                                    <h2 style={{ color: "#524646", padding: "10px" }}>Time</h2>
                                    <div class="input-select" style={{ width: "80%", marginLeft: "11%", borderRadius: "10px", border: "1px solid black" }}>
                                        <TimePicker
                                            onChange={setTime}
                                            value={assignment[id].time}
                                            className="bcd"
                                        />
                                    </div>
                                    <h2 style={{ color: "#524646", padding: "10px" }}>Location</h2>
                                    <select onClick={selectLocation} style={{ width: "80%", height: "46px", borderRadius: "10px", backgroundColor: "white" }}>
                                        <option  > {assignment[id].location}</option>

                                        {locationData.map((locationData) => {
                                            return (
                                                <option value={locationData.locationName}>{locationData.locationName}</option>
                                            )
                                        })}
                                        <option></option>
                                    </select>
                                    <h2 style={{ color: "#524646", padding: "10px" }}>Assignments</h2>
                                    <input type="text" style={{ width: "80%", height: "52px", borderRadius: "10px" }}
                                        onChange={assignmentData} defaultValue={assignment[id].assignment}
                                    />
                                    <h2 style={{ color: "#524646", padding: "10px" }}>Volenteer</h2>
                                    <select onClick={volenteerId} style={{ width: "80%", height: "46px", borderRadius: "10px", backgroundColor: "white" }}>
                                        <option>{assignment[id].volunteer}</option>
                                        {volenteerData.map((volenteerData) => {
                                            return (
                                                <option value={`${volenteerData.member_id.fname}${volenteerData.member_id.lname}`}>{volenteerData.member_id.fname}{volenteerData.member_id.lname}</option>
                                            )
                                        })}

                                    </select>

                                    <button class="add-links" style={{ margin: "10px" }} onClick={(e) => setModeValue(false)}>Cancel</button>
                                    <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={CheckValidatiionUpdate}>Save</button>
                                    <button style={{ backgroundColor: "#1d1b1b", padding: "13px", borderRadius: "30px", margin: "10px", color: "white", width: "338px" }}>+Save and Create Another</button>
                                </Modal.Body>

                            </Modal> : ""}



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
                                        {assignment.map((assignment, id) => {
                                            return (
                                                <tr >
                                                    <td>
                                                        <div class="flag-prac">
                                                            <img src={flag} alt="" />
                                                            <button class="practice">{assignment.eventGameDetails.event_type}</button>
                                                        </div>
                                                        <div class="game-name">
                                                            {assignment.eventGameDetails.name}</div>
                                                    </td>
                                                    <td><span>{assignment.date}</span></td>
                                                    <td>
                                                        <span>{assignment.time}</span>
                                                    </td>
                                                    <td>
                                                        <span>{assignment.location}</span>
                                                    </td>
                                                    <td>{assignment.assignment}
                                                        {/* <div class="add-btn">
                                                <button><img src={add} alt="" /></button>
                                            </div> */}
                                                    </td>
                                                    <td>
                                                        <div class="last-row">
                                                            <p>{assignment.volunteer}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="last-row">
                                                            <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deleteAssignmentData(assignment._id)}><img src={Delect} /></button>
                                                            <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => updateModalValue(id, assignment._id)}><img src={pencil} /></button>
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

export default TeamAssignments;







{/* 
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
                                            <td>Scorekeeper
                                    <div class="add-btn">
                                                    <button><img src={add} alt="" /></button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <p>Avaneesh Shetti</p> <button><img src={Delect} /></button> <button><img src={pencil} /></button>
                                                </div>
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
                                            <td>Scorekeeper
                                    <div class="add-btn">
                                                    <button><img src={add} alt="" /></button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <p>Avaneesh Shetti</p> <button><img src={Delect} /></button> <button><img src={pencil} /></button>
                                                </div>
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
                                            <td>Scorekeeper
                                    <div class="add-btn">
                                                    <button><img src={add} alt="" /></button>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="last-row">
                                                    <p>Avaneesh Shetti</p> <button><img src={Delect} /></button> <button><img src={pencil} /></button>
                                                </div>
                                            </td>
                                        </tr> */}