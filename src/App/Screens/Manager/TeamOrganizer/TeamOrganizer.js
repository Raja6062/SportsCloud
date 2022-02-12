import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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



function TeamOrganizer(props) {
    const history = useHistory();

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const dispatch = useDispatch()
    const [team, setTeam] = useState([])
    const [schedule, setSchedule] = useState([])
    const [profilePic, setProfilePic] = useState([])
    const [teamId, setTeamId] = useState("")
    const [startDate,setStartDate]= useState("")
    const [endDate,setEndDate]= useState("")
    const [game,setGame]= useState("")
    const [gameNumber,setGameNumber]= useState("")
    const [clockSpot,setClockSpot]= useState("")
    const [gender,setGender]= useState("")
    const [age1,setAge1]= useState("")
    const [age2,setAge2]= useState("")
    const [quater,setQuarters]= useState("")
    const [halves,setHalves]= useState("")
    const [timeOut,setTimeOut]= useState("")
    const [autoConfig,setAutoConfig]= useState("")
    const [entryFee,setEntryFee]= useState("")
    const [playType,setPlayType]= useState("")
    const [preSale,setPreSale]= useState("")
    const [registration,setRegistration]= useState("")
    const [registrationStart,setRegistrationStart]= useState("")
    const [registrationEnd,setRegistrationEnd]= useState("")
    const [location,setLocation]= useState("")
    const [court,setCourt]= useState("")
    const [refs,setREFS]= useState("")
    const [score,setScore]= useState("")
    const [staff,setStaff]= useState("")
    const [ division,setDivision] =useState("")
    const [ name,setName] =useState("")
    const [ sport,setSport] =useState("")




  



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
        // getTournament()
        postTournament()
    }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };

    const data = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 2400,
            amt: 1000,
        },
        {
            name: 'Feb',
            uv: 6000,
            pv: 3400,
            amt: 2000,
        },
        {
            name: 'March',
            uv: 5000,
            pv: 4400,
            amt: 3400,
        },
        {
            name: 'April',
            uv: 7000,
            pv: 6400,
            amt: 4400,
        },
        {
            name: 'May',
            uv: 9000,
            pv: 5400,
            amt: 5400,
        },
        {
            name: 'Jun',
            uv: 2000,
            pv: 6400,
            amt: 6400,
        },
        {
            name: 'Jul',
            uv: 5000,
            pv: 7400,
            amt: 7400,
        },
        {
            name: 'Aug',
            uv: 3000,
            pv: 6400,
            amt: 6400,
        },
        {
            name: 'Sep',
            uv: 7000,
            pv: 9400,
            amt: 7400,
        },
        {
            name: 'Oct',
            uv: 4000,
            pv: 4400,
            amt: 8400,
        },
        {
            name: 'Nov',
            uv: 7000,
            pv: 2400,
            amt: 9400,
        },
        {
            name: 'Dec',
            uv: 3000,
            pv: 3400,
            amt: 9800,
        },
    ];

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

    // const getTournament = () => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (user) {
    //         let header = {
    //             'x-access-token': user.authtoken,
    //             'Content-Type': 'application/json'

    //         }
    //         console.log('user', user)

    //         Network('api/add-tournament', 'GET', header)
    //             .then(async (res) => {
    //                 console.log("Tournament----", res)
    //                 if (res.response_code == 4000) {
    //                     dispatch(logoutUser(null))
    //                     localStorage.removeItem("user");
    //                     history.push("/")
    //                     toast.error(res.response_message)
    //                 }
                


    //             })
    //     }
    // }

   
    const postTournament = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                 'name':name,
                 'division':division,
                 'sports':sport,
                 'startDate':startDate,
                 'gameType':game,
                 'numberOfGames':gameNumber,
                 'gameClockStops':clockSpot,
                 'ageGrade':age1,
                 'quaters':quater,
                 'halves':halves,
                 'autoConfiguration':autoConfig,
                 'teamEntryFee':entryFee,
                 'playerType':playType,
                 'preSale':preSale,
                 'onlineRegistration':registration,
                 'registrationStartDate':registrationStart,
                 'registrationEndDate':registrationEnd,
                 'location':location,
                 'availableCourts':court,
                 'refs':refs,
                 'scoreKeepers':score,
                 'operationalStaff':staff
                })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/add-tournament', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("Tournament Data-->", res)

                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }
 const save =()=>{
    postTournament()
 }



    return (
        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents manger="manger"/>
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
                                <h2 class="page-title">Tournament Organizer</h2>
                                <div class="player-info-head-right">

                                    <div class="streming-head-right">
                                        <div class="stream-tab">
                                            <ul>
                                                <li><a class="active" href="#">Tournament Organizer</a></li>
                                                <li><a href="#" onClick={() => history.push("./TeamShedule")}>Tournament Schedule</a></li>
                                                <li><a href="#" onClick={() => history.push("./Brackets")}>Brackets</a></li>
                                                <li><a href="#" onClick={() => history.push("./TeamRegister")}>Registration</a></li>
                                            </ul>
                                        </div>

                                        {/* <button class="start-stream-btn">Start Stream</button> */}
                                    </div>
                                </div>
                            </div>
                            <div class="teamOrgbar">
                                <a href="#">Go Live</a>
                                <div className="teamBtnRgt">
                                    <a href="#" >Sync</a>
                                    <a href="#" onClick={save}>Save</a>
                                    <a href="#">Clear</a>
                                    <a href="#">Print</a>
                                </div>
                            </div>
                            <div className="teamOrgselect">
                                <div className="slctLft">
                                    <div className="slctPart">
                                        <span>Sport</span>
                                        <select onChange={(e)=>{setSport(e.target.value)}}>
                                            <option>Basket Ball</option>
                                            <option>2</option>
                                        </select>
                                    </div>
                                    <div className="slctPart">
                                        <span>division</span>
                                        <select onChange={(e)=>{setDivision(e.target.value)}}>
                                            <option>Division 1</option>
                                            <option>2</option>
                                        </select>
                                    </div>
                                    <div className="slctPart">
                                        <span>Tournament Name</span>
                                        <select onChange={(e)=>{setName(e.target.value)}}>
                                            <option>Summer Apr 2020</option>
                                            <option>2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="prefarance-box teamOrgBox">
                                <div className="teamOrgForbmg">
                                    <div className="teamorgSlct formDateBg">
                                        <div className="formDate">
                                            <Form.Group controlId="dob">
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={(e)=>{setStartDate(e.target.value)}} />
                                            </Form.Group>
                                        </div>
                                        <div className="formDate">
                                            <Form.Group controlId="dob">
                                                <Form.Label>End Date</Form.Label>
                                                <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={(e)=>{setEndDate(e.target.value)}}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Game Type</label>
                                        <select className="input-select"  onChange={(e)=>{setGame(e.target.value)}}>
                                            <option>Youth Age Based</option>
                                            <option>BaseBall</option>
                                            <option>FootBall</option>
                                            <option>Cricket</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Number of Games</label>
                                        <select className="input-select" onChange={(e)=>{setGameNumber(e.target.value)}}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="teamOrgForbmg">
                                    <div className="teamorgSlct">
                                        <label>Game Clock Stops</label>
                                        <select className="input-select" onChange={(e)=>{setClockSpot(e.target.value)}}>
                                            <option>Youth Age Based</option>
                                            <option>BaseBall</option>
                                            <option>FootBall</option>
                                            <option>Cricket</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Gender</label>
                                        <select className="input-select" onChange={(e)=>{setGender(e.target.value)}} >
                                            <option>Youth Age Based</option>
                                            <option>BaseBall</option>
                                            <option>FootBall</option>
                                            <option>Cricket</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct toFlex">
                                        <div className="toflexInn">
                                            <label>Age /  Grade</label>
                                            <select class="input-select" onChange={(e)=>{setAge1(e.target.value)}}>
                                                <option>Oldest</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                            </select>
                                        </div>
                                        <div className="toflexInn">
                                            <label>Age /  Grade</label>
                                            <select className="input-select" onChange={(e)=>{setAge2(e.target.value)}}>
                                                <option>Oldest</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="dividrB"></div>
                                <div className="teamOrtsmallHdn">Game Duration</div>
                                <div className="teamOrgForbmg">
                                    <div className="teamorgSlct">
                                        <label>Quarters</label>
                                        <select className="input-select" onChange={(e)=>{setQuarters(e.target.value)}}>
                                            <option>Q3</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Halves</label>
                                        <select className="input-select" onChange={(e)=>{setHalves(e.target.value)}} >
                                            <option>45 minutes</option>
                                            <option>25 minutes</option>
                                            <option>15 minutes</option>
                                            <option>35 minutes</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Time Outs</label>
                                        <select className="input-select" onChange={(e)=>{setTimeOut(e.target.value)}}>
                                            <option>45 minutes</option>
                                            <option>25 minutes</option>
                                            <option>15 minutes</option>
                                            <option>35 minutes</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="dividrB"></div>
                                <div className="teamOrgForbmg">
                                    <div className="teamorgSlct">
                                        <label>Auto Configuration</label>
                                        <select className="input-select" onChange={(e)=>{setAutoConfig(e.target.value)}}>
                                            <option>On</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Team Entry Fee</label>
                                        <select className="input-select" onChange={(e)=>{setEntryFee(e.target.value)}}>
                                            <option>$50</option>
                                            <option>$50</option>
                                            <option>$50</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Play Type</label>
                                        <select className="input-select" onChange={(e)=>{setPlayType(e.target.value)}}>
                                            <option>Bracket</option>
                                            <option>Bracket</option>
                                            <option>Bracket</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="teamOrgForbmg">
                                    <div className="teamorgSlct">
                                        <div className="formDate fullWidth">
                                            <Form.Group controlId="dob">
                                                <Form.Label>Pre Sale</Form.Label>
                                                <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={(e)=>{setPreSale(e.target.value)}}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Online Registration</label>
                                        <select className="input-select" onChange={(e)=>{setRegistration(e.target.value)}}>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct formDateBg">
                                        <div className="formDate">
                                            <Form.Group controlId="dob">
                                                <Form.Label>Registration Start</Form.Label>
                                                <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={(e)=>{setRegistrationStart(e.target.value)}}/>
                                            </Form.Group>
                                        </div>
                                        <div className="formDate">
                                            <Form.Group controlId="dob">
                                                <Form.Label>Registration End</Form.Label>
                                                <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={(e)=>{setRegistrationEnd(e.target.value)}}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>


                                <div className="teamOrgForbmg">
                                    <div className="teamorgSlct">
                                        <label>Locations</label>
                                        <select className="input-select" onChange={(e)=>{setLocation(e.target.value)}}>
                                            <option>5</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Available Courts</label>
                                        <select className="input-select" onChange={(e)=>{setCourt(e.target.value)}}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Officials (REFS)</label>
                                        <select className="input-select" onChange={(e)=>{setREFS(e.target.value)}}>
                                            <option>10</option>
                                            <option>9</option>
                                            <option>8</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="teamOrgForbmg">
                                    <div className="teamorgSlct">
                                        <label>Score Keepers</label>
                                        <select className="input-select" onChange={(e)=>{setScore(e.target.value)}}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        <label>Operational Staff</label>
                                        <select className="input-select" onChange={(e)=>{setStaff(e.target.value)}}>
                                            <option>15</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <div className="teamorgSlct">
                                        &nbsp;
                                    </div>
                                </div>

                                <div className="dividrB"></div>

                                <div className="charSect">
                                    <div className="chartLft">
                                     <div style={{display:"flex",flexDirection:"row"}}> <div style={{height:"20px",width:"20px",backgroundColor:"#8884d8"}}></div><span style={{marginTop:"-10px"}}>Revenue</span></div>  
                                     <div style={{display:"flex",flexDirection:"row"}}>  <div style={{height:"20px",width:"20px",backgroundColor:"#82ca9d"}}></div><span style={{marginTop:"-10px"}}>Expenses</span></div>  

                                        <LineChart
                                            width={600}
                                            height={300}
                                            data={data}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                        
                                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                        </LineChart>

                                    </div>
                                    <div className="chartRgt">
                                        <Table responsive="md">
                                            <thead>
                                                <tr>
                                                    <th>Teams</th>
                                                    <th>Division</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>8U</td>
                                                    <td>1</td>
                                                    <td>22</td>
                                                </tr>
                                                <tr>
                                                    <td>8U</td>
                                                    <td>1</td>
                                                    <td>22</td>
                                                </tr>
                                                <tr>
                                                    <td>8U</td>
                                                    <td>1</td>
                                                    <td>22</td>
                                                </tr>
                                                <tr>
                                                    <td>8U</td>
                                                    <td>1</td>
                                                    <td>22</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                                <div className="toFoot">
                                    <span>Team Add Book</span>
                                    <span>officials Add</span>
                                    <span>Score Keeper Add</span>
                                    <span>Opps Staff Add</span>
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

export default TeamOrganizer;
