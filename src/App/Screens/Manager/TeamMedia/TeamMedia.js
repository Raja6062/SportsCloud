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
import tableProfile from "../../../images/table-profile.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../../Redux/Actions/auth";
import { ToastContainer, toast } from 'react-toastify';
import BigUserProfile from "../../../images/big-user-profile.png"


function TeamMedia(props) {
  const history = useHistory();
  const dispatch = useDispatch()

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [team, setTeam] = useState([])
  const [schedule, setSchedule] = useState([])
  const [profilePic, setProfilePic] = useState([])
  const [teamId, setTeamId] = useState("")

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

  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };
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
                <h2 class="page-title">Stream</h2>
                <div class="player-info-head-right">

                  <div class="streming-head-right">
                    <div class="stream-tab">
                      <ul>
                        <li><a class="active" href="#">Stream</a></li>
                        <li><a href="#" onClick={() => history.push("./Photos")}>Photos</a></li>
                        <li><a href="#" onClick={() => history.push("./Videos")}>Videos</a></li>
                        <li><a href="#" onClick={() => history.push("./Files")}>Files</a></li>
                      </ul>
                    </div>

                    <button class="start-stream-btn">Start Stream</button>
                  </div>
                </div>
              </div>
              <div class="prefarance-box streaming-section">
                <div class="strame-chat-section">
                  <div class="strame-main">
                    <div class="strame-main-inner">
                      <h3>Connect streaming software to go live</h3>
                      <p>Viewers will be able to find your stream once you go live</p>
                    </div>
                  </div>
                  <div class="chat-main">
                    <h4>Live Chat</h4>
                    <div class="chat-main-input">
                      <input type="text" placeholder="say something..." class="input-field" />
                      <button class="chat-send-btn"><img src="images/send-btn.png" alt="" /></button>
                    </div>
                  </div>
                </div>

                <div class="streaming-form-section playerinfo-form">
                  <div class="streaming-form-field-set">
                    <div class="streaming-form-field-left">
                      <div class="prefarance-form-list">
                        <label>Title</label>
                        <input type="text" class="input-select" />
                      </div>
                    </div>
                    <div class="streaming-form-field-right">
                      <div class="prefarance-form-list">
                        <label>Game</label>
                        <select class="input-select" >
                          <option>Bascket</option>
                          <option>BaseBall</option>
                          <option>FootBall</option>
                          <option>Cricket</option>
                        </select>
                      </div>
                    </div>
                    <div class="streaming-form-field-left">
                      <div class="prefarance-form-list">
                        <label>Game Description</label>
                        <textarea class="input-textarea"> </textarea>
                      </div>
                    </div>
                    <div class="streaming-form-field-right">
                      <div class="prefarance-form-list">
                        <label>Team</label>
                        <select class="input-select" >
                          <option>Team1</option>
                          <option>Team2</option>
                          <option>Team3</option>
                        </select>
                      </div>
                      <div class="prefarance-form-list">
                        <label>Privacy</label>
                        <select class="input-select" >
                          <option>Privacy1</option>
                          <option>Privacy2</option>
                          <option>Privacy3</option>
                        </select>
                      </div>

                    </div>
                  </div>
                  <div class="prefarance-form-list">
                    <label class="options-check-family">Start sending us your video from your streaming software to go live
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
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

export default TeamMedia;
