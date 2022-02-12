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
import TeamList from "../../../images/team-list.png"
import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import NavBarSide from './NabBar';
import DatePicker from "react-datepicker";
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import validator from 'validator'
import { Button } from 'bootstrap';
import axios from 'axios'

const MyAccount = () => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [type1, setType1] = useState('')
    const [type2, setType2] = useState('')
    const [number1, setNumber1] = useState('')
    const [number2, setNumber2] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state1, setState1] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')
    const [private1, setPrivate1] = useState(false)
    const [private2, setPrivate2] = useState(false)
    const [private3, setPrivate3] = useState(false)
    const [private4, setPrivate4] = useState(false)
    const [private5, setPrivate5] = useState(false)
    const [allUserDataList,setAlluserDatalist] =useState([])
    const [profilePicture,setProfilePicture]=useState('')

    const [file, Profile] = useState();
    const pic = 'https://nodeserver.mydevfactory.com:1447/profilepic/'


    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // //console.log("userMe===>", user);
        dropdownMenu();
        // setUser(user);
        // //console.log("USerData", userdata);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        getAllUserData()

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };


    function handleUpload(event) {
        console.log('imagepath', URL.createObjectURL(event.target.files[0]));
        Profile(event.target.files[0]);
        setProfilePicture(event.target.files[0])
        EditUserImage()
        
        
      }
      const ImageThumb = ({ image }) => {
        return <img src={URL.createObjectURL(image)} alt={image.name}  style={{height:"90px",width:"90px",borderRadius:"60px"}}/>;
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

                    teamSchedule(res.response_data[0]._id);





                })
        }

    }
    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
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
    console.log("file------",file,)
    console.log("profile pic",profilePicture)

    const getAllUserData=()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          let header = {
            'authToken': user.authtoken
    
          }
          console.log('user', user)
    
          Network("api/get-user-details", 'GET', header)
            .then(async (res) => {
              console.log("tget all user details----", res)
              setAlluserDatalist(res.response_data)
             
    
    
            })
        }

    }

    const EditUserDetails = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "firstName" : firstName,
    "lastName" : lastName,
    "email": email,
    "dob" : birthday,
    "phone" : number1,
    "gender" : gender,
    "alternative_phone" : number2,
    "address_line_one" : address1,
    "address_line_two" : address2,
    "city" : city,
    "state" : state1,
    "zip" : zip,
    "country" : country,
    "hide_age" : private1,
    "email_is_private" : private5,
    "alternative_phone_is_private" : private2,
    "phone_is_private" : private3,
    "address_is_private" : private4
 })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/edit-user-details', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("edit user data", res)
                if(res.response_code==2000){
                    toast.success("Edit Succecfull")
                    console.log("edit data",res)

                }

                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }

    const EditUserImage = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        formData.append('profile_image', file);
        const requestOptions = {
            method:"POST",
            headers: {
                'x-access-token': user.authtoken
            },
           
        };
        console.log("formdata ",formData)
        axios('https://nodeserver.mydevfactory.com:1447/api/update-user-profile-image', 
        {
            method:"POST",
            headers:{
                "Content-Type": "multipart/form-data",
                'x-access-token': user.authtoken
                
            },
            data:formData
        })
            .then((res) => {
                console.log("edit user Image", res)
                if(res.status==200){
                    toast.success("Edit Succecfull")
                    console.log("edit Image",res)
                }

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


        if (firstName == null) {
            toast.error("Please Provide First Name", {
                position: "top-center"
            })
        }
        if (lastName == null) {
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
        if (address1 == null) {
            toast.error("Please Select Adress1", {
                position: "top-center"
            })
            return
        }
        if (address2 == null) {
            toast.error("Please Select Adress2", {
                position: "top-center"
            })
            return
        }
        if (state1 == null) {
            toast.error("Please Select State", {
                position: "top-center"
            })
            return
        }
        if (number1 == null) {
            toast.error("Please Select Phone Number", {
                position: "top-center"
            })
            return
        }
        if (number2 == null) {
            toast.error("Please Select Alternate Phone Number", {
                position: "top-center"
            })
            return
        }
        if (birthday == null) {
            toast.error("Please Provide Birthday", {
                position: "top-center"
            })
            return
        }
       



        EditUserDetails()
        


    }
    console.log("private",private5)


 
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
                        <select>
                            <option>Account</option>
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
                <div class="prefarance-page">
                    <div class="page-header">
                        <h2 class="page-title">My Account</h2>

                    </div>


                    <div class="prefarance-box" style={{ overflow: "auto" }} >
                        <NavBarSide />
                        <div class="team-payment team-assesment">




                            <div class="prefarance-form playerinfo-form">

                                <div class="row" style={{ padding: "20px" }}>
                                    <div class="col-md-8">
                                        <div class="prefarance-form-list">
                                            {/* <img src={UserProfile} alt="" style={{ height: "83px", width: "111px" }} /> */}
                                            {file == null ? <img src="https://nodeserver.mydevfactory.com:1447/profilepic/1644383186292_avater.jpg" alt="" style={{ height: "83px", width: "111px" }} />: file && <ImageThumb image={file}  style={{height:"90px",width:"90px",borderRadius:"60px"}}/>}
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="prefarance-form-list">
                                            <div class="update-team-photo">
                                                Edit Photo
                                                <input type="file" name='img' onChange={handleUpload} />
                                                
                                            </div>
                                            {/* <button onClick={()=>EditUserImage(file)} style={{padding:"10px",marginTop:"10px",marginLeft:"103px",borderRadius:"10px",backgroundColor:"green"}}>Update</button> */}

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label> First Name</label>
                                            <input type="text" class="input-select" onChange={(e) => setFirstName(e.target.value)} defaultValue={allUserDataList.fname}/>
                                        </div>
                                    </div>


                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Last Name</label>
                                            <input type="text" class="input-select" onChange={(e) => setLastName(e.target.value)} defaultValue={allUserDataList.lname}/>

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Birthday</label>
                                            <div class="input-select" >
                                                <input type="date" class="input-select" onChange={(e) => setBirthday(e.target.value)} style={{border:"none"}} defaultValue={allUserDataList.dob}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Gender</label>
                                            <select class="input-select" onChange={(e) => setGender(e.target.value)} defaultValue={allUserDataList.gender}>
                                                <option>Select</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>

                                        </div>
                                    </div>


                                    <div class="col-md-12">
                                        <div class="prefarance-form-list">

                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e)=>setPrivate1(!private1)} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Hide Age</span>

                                        </div>
                                    </div>
                                </div>
                                <div class="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Email</label>
                                            <input type="text" class="input-select" onChange={(e) => setEmail(e.target.value)} defaultValue={allUserDataList.email}/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }}   />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>

                                <div class="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>

                                    <div class="col-md-2">
                                        <div class="prefarance-form-list">
                                            <label>Type </label>
                                            <select class="input-select" onChange={(e) => setType1(e.target.value)} defaultValue={allUserDataList.apptype}>
                                                <option>Home</option>
                                                <option>Personal</option>
                                            </select> </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="prefarance-form-list">
                                            <label>Phone </label>
                                            <input type="text" class="input-select" onChange={(e) => setNumber1(e.target.value)} defaultValue={allUserDataList.phone}/>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="prefarance-form-list">
                                            <label>Type </label>
                                            <select class="input-select" onChange={(e) => setType2(e.target.value)} defaultValue={allUserDataList.apptype}>
                                                <option>Home</option>
                                                <option>Personal</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="prefarance-form-list">
                                            <label>Phone </label>
                                            <input type="text" class="input-select" onChange={(e) => setNumber2(e.target.value)} defaultValue={allUserDataList.alternative_phone}/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e)=>setPrivate2(!private2)} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e)=>setPrivate3(!private3)} />
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" style={{

                                    marginTop: "15px",
                                    paddingBottom: "16px",
                                    padding: "20px"
                                }}>





                                    <div class="col-md-12">
                                        <div class="prefarance-form-list">
                                            <label>Address1 Line</label>
                                            <input type="text" class="input-select" onChange={(e) => setAddress1(e.target.value)} defaultValue={allUserDataList.address_line_one}/>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="prefarance-form-list">
                                            <label>Address2 Line</label>
                                            <input type="text" class="input-select" onChange={(e) => setAddress2(e.target.value)} defaultValue={allUserDataList.address_line_two}/>
                                        </div>
                                    </div>




                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>City</label>
                                            <input type="text" class="input-select" onChange={(e) => setCity(e.target.value)} defaultValue={allUserDataList.city}/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label >State</label>
                                            <input type="text" class="input-select" onChange={(e) => setState1(e.target.value)} defaultValue={allUserDataList.state}/>
                                            {/* <select class="input-select" onClick={(e) => setState1(e.target.value)} defaultValue={allUserDataList.state}>
                                                <option>Select</option>
                                                <option>State1</option>
                                                <option>State2</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Zip Code</label>
                                            <input type="text" class="input-select" onChange={(e) => setZip(e.target.value)} defaultValue={allUserDataList.zip}/>

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <label>Country</label>
                                            <input type="text" class="input-select" onChange={(e) => setCountry(e.target.value)} defaultValue={allUserDataList.country}/>

                                            {/* <select class="input-select" onClick={(e) => setCountry(e.target.value)} defaultValue={allUserDataList.country}>
                                                <option>Select</option>
                                                <option>Country1</option>
                                                <option>Country2</option>
                                            </select> */}

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={(e)=>setPrivate4(!private4)} defaultValue={allUserDataList.fname}/>
                                            <span style={{ color: "white", textDecoration: "underline" }}>Private</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" style={{ padding: "20px" }}>
                                    <div class="col-md-6">
                                        <div class="prefarance-form-list">
                                            <button class="add-links" onClick={()=>history.push("/")}>CANCEL</button>
                                            <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} onClick={CheckValidatiion}>SAVE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>

        </div >

    )
}

export default MyAccount;