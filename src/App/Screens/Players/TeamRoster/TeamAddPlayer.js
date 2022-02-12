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
import validator from 'validator'


const TeamAddPlayer = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [fname, setFName] = useState()
    const [lname, setLName] = useState()
    const [label, setLabel] = useState()
    // const [birthday, setBirthday] = useState();
    const [email, setEmail] = useState()
    const [who, setWho] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [gender, setGender] = useState()
    const [jursey, setJursey] = useState()
    const [position, setPosition] = useState()
    const [assignment, setAssingment] = useState()
    const [uniform, setUniform] = useState()
    const [nonPlayer, setNonPlayer] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [team, setTeam] = useState([]);

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()

    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        playerData()



    }, []);
    

    const playerData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "email": email,
                "fname": fname,
                "lname": lname,
                "manager_id": "609431a8fd131f3cd452c3c0",
                "team_id": "60aca35ff6cd6923adf9634a",
                "gender": gender,
                "city": city,
                "zip": zip,
                "dob": startDate,
                "state": state,
                "address": address,
                "phone": phone,
                "member_type": "NON-PLAYER",
                "jersey_number": jursey,
                "position": position,
                "family_member": [{ "name": "Krishna Das", "email": "angelinaKoli@gmail.com", "phone": 123453, "relation": "DAD" }]
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/add-player-roster', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("player data", res)

                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }


    const CheckValidatiion = () => {

        if (email == null) {
            toast.error("Please Provide  Email", {
                position: "top-center"
            })
            if (validator.isEmail(email)) {
                console.log(email)
            } else {
                toast.error("Please Provide Valid Email", {
                    position: "top-center"
                })
            }
        }


        if (fname == null) {
            toast.error("Please Provide First Name", {
                position: "top-center"
            })
        }
        if (lname == null) {
            toast.error("Please Provide Last Name", {
                position: "top-center"
            })
            return
        }
        if (gender == null) {
            toast.error("Please Select Your Gender", {
                position: "top-center"
            })
            return
        }
        if (city == null) {
            toast.error("Please Select City Name", {
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
        if (startDate == null) {
            toast.error("Please Select Starting Time", {
                position: "top-center"
            })
            return
        }
        if (state == null) {
            toast.error("Please Select State", {
                position: "top-center"
            })
            return
        }
        if (phone == null) {
            toast.error("Please Select Phone Number", {
                position: "top-center"
            })
            return
        }
        if (jursey == null) {
            toast.error("Please Provide Jursey Number", {
                position: "top-center"
            })
            return
        }
        if (position == null) {
            toast.error("Please Provide  Position", {
                position: "top-center"
            })
            return
        }




        playerData()
        history.push("/teamroster")


    }



    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
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

                    // }
                   

                })
        }
    }

    

    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        // teamRoster(event.target.value);
    }


    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>

            <SideMenuComponents manger="manger" />
            <div class="dashboard-main-content">
                
                <div class="prefarance-box" style={{ overflow: "auto" }} >
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>New Member</h1> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Member Info</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Contact Information</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Optional PLayer Details</a>
                        </li>
                        <li class="nav-item">
                            <div style={{ backgroundColor: "gray", borderRadius: "10px" }}>
                                <h3 style={{ color: "white", padding: "10px" }}> Reordering People</h3>
                                <p style={{ color: "white", padding: "10px" }}>In short, don't! Everyone receives the same information, regardless of their order in the list. Changing an email to another person's email address does not give them access. To invite some-one new, use the "Add New Family Member" button. <span style={{ color: "red" }}>Learn more</span> in our help center.</p>
                            </div>
                        </li>

                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="prefarance-tab-content">

                                <div class="prefarance-form playerinfo-form">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label> First Name</label>
                                                <input type="text" class="input-select" onChange={(e) => setFName(e.target.value)} />
                                            </div>
                                        </div>


                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Last Name</label>
                                                <input type="text" class="input-select" onChange={(e) => setLName(e.target.value)} />

                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <label>Non Player</label>
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                                <span style={{ color: "white" }}>This person is a non playing player of the team </span>

                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Email</label>
                                                <input type="text" class="input-select" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Whoe's This? </label>
                                                <input type="text" class="input-select" onChange={(e) => setWho(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <button data-toggle="modal" data-target="#assignmentdelect" style={{ borderRadius: "12px", backgroundColor: "red", }}><img src={Delect} /></button>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <p style={{ color: "white" }}> +Add Another Email</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Phone Number</label>
                                                <input type="text" class="input-select" onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Label</label>
                                                <input type="text" class="input-select" onChange={(e) => setLabel(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <button data-toggle="modal" data-target="#assignmentdelect" style={{ borderRadius: "12px", backgroundColor: "red", }}><img src={Delect} /></button>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <p style={{ color: "white" }}> +Add Another Phone Number</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Address</label>
                                                <input type="text" class="input-select" onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>City</label>
                                                <input type="text" class="input-select" onChange={(e) => setCity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label >State/Province</label>
                                                <input type="text" class="input-select" onChange={(e) => setState(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Zip/Postal Code</label>
                                                <input type="text" class="input-select" onChange={(e) => setZip(e.target.value)} />

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Gender</label>
                                                <input type="text" class="input-select" onChange={(e) => setGender(e.target.value)} />

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Birthday</label>
                                                <div class="input-select" >
                                                    <DatePicker selected={startDate} show="false" onChange={(date) => setStartDate(date)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label >Jursey Number</label>
                                                <input type="text" class="input-select" onChange={(e) => setJursey(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label >Position</label>
                                                <input type="text" class="input-select" onChange={(e) => setPosition(e.target.value)} />
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

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                                <span style={{ color: "white" }}>Invite to join </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <button class="add-links">CANCEL</button>
                                                <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} onClick={CheckValidatiion}>SAVE</button>
                                            </div>
                                        </div>
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

export default TeamAddPlayer;