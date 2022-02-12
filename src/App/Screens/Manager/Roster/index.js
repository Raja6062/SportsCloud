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
import Modal from "react-bootstrap/Modal";
import axios from 'axios'






function ManagerRoster(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [player, setPlayer] = useState([]);
    const [resData, setResData] = useState({})
    const [nonPlayer, setNonPlayer] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const [modeValue, setModeValue] = useState(false)
    const [uid, setUId] = useState("")
    const [id, setId] = useState("")
    const [modeValue1, setModeValue1] = useState(false)
    const [id1, setId1] = useState("")
    const [imageModal, setImageModal] = useState(false)
    const [imageId, setImageId] = useState("")
    const [image, Profile] = useState("")
    const [gender, setGender] = useState('')
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [jursey, setJursey] = useState('')
    const [position, setPosition] = useState('')
    const [contact, setContact] = useState('')
    const [phone, setPhone] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [stateData, setSateData] = useState('')
    const [zip, setZip] = useState('')
    const [birthday, setBirthday] = useState('')
    const [memberType, setMemberType] = useState('')
    const [newplayerdata, setNewPlayerData] = useState([])
    const [newNonPlayerData, setNewNonPlayerData] = useState([])





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
        // teamRoster();
        dropdownMenu();


    }, []);
    console.log("new player data", newplayerdata)

    const pic1 = 'https://nodeserver.mydevfactory.com:1447/roster/'

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
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

                    teamRoster(res.response_data[0]._id);





                })
        }

    }





    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        setPlayer([])
        teamRoster(event.target.value);

    }

    console.log("player-------->", player)
    const teamRoster = (id) => {
        console.log("team roster id", id)
        const user = JSON.parse(localStorage.getItem('user'));
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
                    setNewPlayerData(res.response_data.PLAYER.filter(data => {
                        return data.member_id != null

                    }))
                    setNonPlayer(res.response_data.NON_PLAYER)
                    setNewNonPlayerData(res.response_data.NON_PLAYER.filter(data => {
                        return data.member_id != null

                    }))




                })
        }
    }




    const deletePlayerData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", id)
        const a = window.confirm('Are you sure you wish to delete this Data?')
        console.log("delete click")
        if (a == true) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.authtoken
                },
                body: JSON.stringify({
                    "player_id": id
                })
            };
            fetch('https://nodeserver.mydevfactory.com:1447/api/delete-player', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("delete Player  data", res)
                    if (res.response_code == 2000) {
                        console.log("deleted data", res)
                        teamRoster(teamDropdown)
                    }
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }


                    setPlayer(player.filter(data => {
                        return data._id != id
                    }))
                    setNonPlayer(nonPlayer.filter(data => {
                        return data._id != id
                    }))

                })
        }

    }


    const updateModalValue = (id1, uId) => {
        setModeValue(true)
        setUId(uId)
        setId(id1)


    }
    const updateModalValue1 = (id1, uId) => {
        setModeValue1(true)
        setUId(uId)
        setId1(id1)


    }

    const handleChange = event => {
        console.log("URL.createObjectURL(event.target.files[0])---->", URL.createObjectURL(event.target.files[0]));
        Profile(event.target.files[0])
        // addShopData(event.target.files[0])

    };
    const updatePlayerData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({

                "player_id": uid,
                "email": email,
                "fname": fname,
                "lname": lname,
                "gender": gender,
                "city": city,
                "zip": zip,
                "dob": birthday,
                "state": stateData,
                "address_line_one": address1,
                "address_line_two": address2,
                "phone": phone,
                "member_type": memberType,
                "jersey_number": jursey,
                "position": position,
                "family_member": [{ "name": "jay", "email": "jayantakarmakar.brainium@gmail.com", "phone": 123453 }]

            })

        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/update-player-details', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("update Player data", res)
                if (res.response_code == 2000) {
                    toast.success("Edit Player data succesful")
                    setModeValue(false)
                    setModeValue1(false)
                    teamRoster(teamDropdown);

                }

                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })




    }
    const imageModalOpen = (id1, uId) => {
        setImageModal(true)
        setUId(uId)
        setImageId(id1)


    }
    const updateImage=()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        formData.append('profile_image', image);
        formData.append('player_id', uid);
        const requestOptions = {
            
            headers: {
                'x-access-token': user.authtoken
            },
           
        };
        console.log("player id ",uid)
        axios('https://nodeserver.mydevfactory.com:1447/api/add-update-player-profile-image',
        {
            method:"POST",
            headers:{
                "Content-Type": "multipart/form-data",
                'x-access-token': user.authtoken
                
            },
            data:formData
        })
            .then((res) => {
                console.log("edit player Image", res)
                if(res.status==200){
                    toast.success("Edit Succecfull")
                    console.log("edit player Image",res)
                    setImageModal(false)
                    teamRoster(teamDropdown)
                }
    
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })
            
    }
    console.log("pic1",pic1)



    return (
        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents manger="manger" />
                    <div class="dashboard-main-content">
                        <div class="dashboard-head">

                            <div class="teams-select">
                                {user.user_type == "manager" ?
                                    <div>
                                        <button class="create-new-team" onClick={() => {
                                            history.push("/CreateTeam")
                                        }}>Create New Teams</button>
                                        <select onChange={change}>
                                            {dropdown.map((dropdown) => {
                                                return (
                                                    <option value={dropdown._id}>{dropdown.team_name}</option>
                                                )
                                            })}
                                        </select>
                                        <select onClick={() => {
                                            history.push("/MyAccount")
                                        }}>
                                            <option >Account</option>
                                            <option>Account 2</option>
                                            <option>Account 3</option>
                                        </select>
                                    </div> : ""}

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
                                    <button class="edit-btn" style={{ width: "265px" }} onClick={() => history.push('./PlayerInfo')}>Manage My Player Info</button>
                                    <button class="add-new-family" style={{ width: "324px" }} onClick={() => history.push('./PlayerInfo')}>+ Add or Edit My Family Member</button>
                                    <button class="edit-btn" style={{ marginLeft: "5px" }} onClick={() => history.push('./Subscribe')}>Export</button>
                                </div>
                            </div>

                            {user.user_type == "manager" ? <div class="manager-player-section">
                                <h3>Maneger</h3>
                                <ul >
                                    <li onClick={() => history.push('./AddPlayer')}><a href="#" style={{ color: "red" }}>+ Add Player</a></li>
                                    <li onClick={() => history.push('./ImportPlayer')}><a href="#" style={{ color: "red" }}>Import Players</a></li>
                                    <li><a href="#" style={{ color: "red" }} onClick={() => history.push('./AnotherPlayer')}>Import From Another Teams</a></li>
                                </ul>

                            </div> : ""}


                            <div class="manager-player-section">
                                <h3>Players</h3>

                                <span style={{ color: "white", position: "absolute", right: "3%" }}>Total Player {resData.TOTAL_PLAYER}(Men:3,Women:2)</span>
                            </div>
                            <div class="prefarance-box">
                                <div class="team-payment team-assesment">
                                    <table>

                                        <tr>
                                            <th>Male/Female</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Jursey No</th>
                                            <th>contact Info</th>
                                            <th>Position</th>
                                        </tr>
                                        {

                                            (newplayerdata && newplayerdata.length > 0) ?
                                                <>
                                                    {
                                                        newplayerdata.map((player, i) => {

                                                            return (
                                                                <>
                                                                    {
                                                                        (player.member_id != null) ?
                                                                            <>

                                                                                <tr>

                                                                                    <td>

                                                                                        <div class="game-name">

                                                                                            {(player.member_id.gender) ? player.member_id.gender : null}
                                                                                        </div>

                                                                                    </td>
                                                                                    <td onClick={() => imageModalOpen(i, player.member_id._id)}>
                                                                                        {player.member_id.profile_image == null ?
                                                                                            <img src={UserProfile} alt="" /> :
                                                                                            <img src={`${pic1}${player.member_id.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
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
                                                                                            <p>{player.position}</p> <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(player.member_id._id)} ><img src={Delect} /></button>
                                                                                            <button onClick={() => updateModalValue(i, player.member_id._id)}><img src={pencil} /></button>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                            : null
                                                                    }
                                                                </>
                                                            )

                                                        })
                                                    }
                                                </>
                                                : null
                                        }



                                    </table>
                                </div>
                                {modeValue ? <Modal show={modeValue} style={{ position: "absolute", top: "206px" }}>


                                    <Modal.Body>
                                        <div class="prefarance-form playerinfo-form">
                                            <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Edit Player Details</h1>
                                            <div class="row">

                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> Gender</h2>
                                                        <select class="input-select" onChange={(e) => setGender(e.target.value)} defaultValue={newplayerdata[id].member_id.gender}>
                                                            <option>Select</option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> First Name of Player</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setFName(e.target.value)}
                                                            defaultValue={newplayerdata[id].member_id.fname}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> Last Name of Player</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setLName(e.target.value)}
                                                            defaultValue={newplayerdata[id].member_id.lname}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> Jursey Number </h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setJursey(e.target.value)}
                                                            defaultValue={newplayerdata[id].jersey_number}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>Email</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setEmail(e.target.value)}
                                                            defaultValue={newplayerdata[id].member_id.email}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Player Position</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setPosition(e.target.value)}
                                                            defaultValue={newplayerdata[id].position}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  City</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setCity(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Zip</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setZip(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  State</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setSateData(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Birthday</h2>
                                                        <input type="date" class="input-select" placeholder="Virtual Practice " onChange={(e) => setBirthday(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Address Line1</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setAddress1(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> Address Line 2</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setAddress2(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Phone Number</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setPhone(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Member Type</h2>

                                                        <select class="input-select" onChange={(e) => setMemberType(e.target.value)}>
                                                            <option>Select</option>
                                                            <option>PLAYER</option>
                                                            <option>MANAGER</option>
                                                        </select>
                                                    </div>

                                                </div>



                                            </div>



                                            <button class="add-links" style={{ margin: "10px" }} onClick={() => setModeValue(false)}>Cancel</button>
                                            <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updatePlayerData}>Update</button>

                                        </div>
                                    </Modal.Body>

                                </Modal> : ""}

                                {imageModal ? <Modal show={imageModal} style={{ position: "absolute", top: "206px" }}>


                                    <Modal.Body>
                                        <div class="prefarance-form playerinfo-form">
                                            <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Edit Player Details</h1>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="update-team-photo" style={{ width: "100%" }}>
                                                        Choose Image
                                                        <input type="file" name='img' onChange={(event) => handleChange(event)} />

                                                    </div>
                                                </div>
                                            </div>
                                            <button class="add-links" style={{ margin: "10px" }} onClick={() => setImageModal(false)}>Cancel</button>
                                            <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updateImage}>Update</button>

                                        </div>
                                    </Modal.Body>

                                </Modal> : ""}


                                {modeValue1 ? <Modal show={modeValue1} style={{ position: "absolute", top: "206px" }}>


                                    <Modal.Body>
                                        <div class="prefarance-form playerinfo-form">
                                            <h1 style={{ color: "red", paddingBottom: "20px", fontWeight: "bold" }}>Edit Game/Event</h1>
                                            <div class="row">

                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> Gender</h2>
                                                        <select class="input-select" onChange={(e) => setGender(e.target.value)} defaultValue={newNonPlayerData[id1].member_id.gender}>
                                                            <option>Select</option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> First Name of Player</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setFName(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].member_id.fname}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> Last Name of Player</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setLName(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].member_id.lname}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> Jursey Number </h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setJursey(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].jersey_number}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>Email</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setEmail(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].member_id.email}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Player Position</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setPosition(e.target.value)}
                                                            defaultValue={newNonPlayerData[id1].position}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  City</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setCity(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Zip</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setZip(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  State</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setSateData(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Birthday</h2>
                                                        <input type="date" class="input-select" placeholder="Virtual Practice " onChange={(e) => setBirthday(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Address Line1</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setAddress1(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2> Address Line 2</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setAddress2(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Phone Number</h2>
                                                        <input type="text" class="input-select" placeholder="Virtual Practice " onChange={(e) => setPhone(e.target.value)}

                                                        />
                                                    </div>

                                                </div>
                                                <div class="col-md-12">
                                                    <div class="prefarance-form-list">
                                                        <h2>  Member Type</h2>

                                                        <select class="input-select" onChange={(e) => setMemberType(e.target.value)}>
                                                            <option>Select</option>
                                                            <option>PLAYER</option>
                                                            <option>MANAGER</option>
                                                        </select>
                                                    </div>

                                                </div>



                                            </div>



                                            <button class="add-links" style={{ margin: "10px" }} onClick={() => setModeValue1(false)}>Cancel</button>
                                            <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updatePlayerData}>Update</button>

                                        </div>
                                    </Modal.Body>

                                </Modal> : ""}

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
                                            <th>Jursey No</th>
                                            <th>contact Info</th>
                                            <th>Position</th>
                                        </tr>



                                        {(newNonPlayerData && newNonPlayerData.length > 0) ?


                                            <>
                                                {
                                                    newNonPlayerData.map((nonPlayer, i) => {

                                                        return (
                                                            <>
                                                                {
                                                                    (nonPlayer.member_id != null) ?
                                                                        <>
                                                                            <tr>

                                                                                <td>

                                                                                    <div class="game-name">

                                                                                        {(nonPlayer.member_id.gender) ? nonPlayer.member_id.gender : null}
                                                                                    </div>

                                                                                </td>
                                                                                <td onClick={() => imageModalOpen(i, nonPlayer.member_id._id)}> 
                                                                                    {nonPlayer.member_id.profile_image == null ?
                                                                                    <img src={UserProfile} alt="" /> :
                                                                                    <img src={`${pic1}${nonPlayer.member_id.profile_image}`} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                                                }
                                                                                </td>
                                                                                <td>
                                                                                    <span>{nonPlayer.member_id.fname}{nonPlayer.member_id.lname}</span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>{nonPlayer.jersey_number}</span>
                                                                                </td>
                                                                                <td>{nonPlayer.member_id.fname}<br></br>
                                                                                    {nonPlayer.member_id.email}

                                                                                </td>
                                                                                <td>
                                                                                    <div class="last-row">
                                                                                        <p>{nonPlayer.position}</p> <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deletePlayerData(nonPlayer.member_id._id)} ><img src={Delect} /></button>
                                                                                        <button onClick={() => updateModalValue1(i, nonPlayer.member_id._id)}><img src={pencil} /></button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </>
                                                                        : null
                                                                }
                                                            </>
                                                        )

                                                    })
                                                }
                                            </>
                                            : null
                                        }






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

export default ManagerRoster;
