import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import "./style.css"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import BigUserProfile from "../../../images/big-user-profile.png"
import { logoutUser } from "../../../Redux/Actions/auth";
import Invoice from "../../../images/invoice.png"
import Cloudy from "../../../images/cloudy-small.png"
import teamList from "../../../images/team-list.png"
import Calender from "../../../images/calender.png"
import lineBar from "../../../images/line-bar.png"
import saveTravel from "../../../images/save-travel.png"
import bullk from "../../../images/bullk.png"
import piechat from "../../../images/piechat.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { useDispatch } from 'react-redux';
import { Network } from '../../../Services/Api';
import { ToastContainer, toast } from 'react-toastify';
import Calendar from 'react-calendar';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import 'react-calendar/dist/Calendar.css';
import { compose } from 'redux';
import axios from 'axios'
import "../../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import DonutChart from 'react-donut-chart';






function ManagerHome(props) {

  const history = useHistory();
  const dispatch = useDispatch()

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [image, Profile] = useState(BigUserProfile)
  const [picture, setPicture] = useState(teamList)
  const [degree, setDegree] = useState([])
  const [team, setTeam] = useState([])
  // const [loading,setLoading]= useState(false)
  const [photo, setPhoto] = useState()
  const [teamId, setTeamId] = useState("")
  const [schedule, setSchedule] = useState([])
  const [profilePic, setProfilePic] = useState([])
  const [value, onChange] = useState(new Date());
  const dateValue = new Date(new Date().getFullYear(), new Date().getMonth());
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date());
  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 31);

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
    listTeam()
    changeImage()
    weather()
    teamSelect()
    teamRoster()
    teamSchedule()
    updateProfile()
  }, []);

  const pic = 'https://nodeserver.mydevfactory.com:1447/'

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    dispatch(logoutUser(null))
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };

  const dataSet = {
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

  const listTeam = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let header = {
        'authToken': user.authtoken
      }
      Network('api/my-team-list?team_resmanager_id=' + user._id, 'GET', header)
        .then(async (res) => {
          console.log("hello----", res)
          if (res.response_code == 2000) {

          } else if (res.response_code == 4000) {
            toast.error(res.response_message)
          }
        })
        .catch((error) => {
          console.log("error===>", error)
        });
    }
  }
  const uploadImage = async (value) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {

      const formData = new FormData();
      formData.append('player_id ', user._id);
      formData.append('profile_image', image);

      const url = 'https://nodeserver.mydevfactory.com:1447/api/update-player-profile-image'
      const config = {
        headers: {
          'x-access-token': user.authtoken
        }

      }

      console.log("config", config)

      axios.post(url, formData, config)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });


    }
  }
  const handleChange = event => {
    console.log("URL.createObjectURL(event.target.files[0])---->", URL.createObjectURL(event.target.files[0]));
    Profile(event.target.files[0])
    uploadImage(event.target.files[0])

  };

  const changeImage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let header = {
        'authToken': user.authtoken
      }
      Network('api/player-joined-team-list?player_id=' + user._id, 'GET', header)
        // api/player-list-by-team-id?team_id=60aca35ff6cd6923adf9634a
        .then(async (res) => {
          console.log("picture----", res)
          if (res.response_code == 2000) {

          } else if (res.response_code == 4000) {
            toast.error(res.response_message)
          }
        })
        .catch((error) => {
          console.log("error===>", error)
        });
    }
  }


  const weather = () => {
    fetch(
      // 'http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=2986831fc21dc86b9c0a3f789cec2721'
      'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=matric&appid=2986831fc21dc86b9c0a3f789cec2721'
    ).then((res) => {
      res.json().then((res) => {
        console.log("weather", res.daily)
        if (res.daily != null) {
          setDegree(res.daily)
        }



      })
    })



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


  const teamRoster = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let header = {
        'authToken': user.authtoken

      }
      console.log('user', user)

      Network('api/player-list-by-team-id?team_id=' + "60a51abfae9b3244cc9d1eae", 'GET', header)
        .then(async (res) => {
          console.log("teamRoster----", res)
          console.log("team player", res.response_data.PLAYER)


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







  //  const changeImage=(event)=>{
  //   const user = JSON.parse(localStorage.getItem('user'));

  //   if (user) {

  //   const formData = new FormData();
  //   formData.append('player_id ', user._id);
  //   // formData.append('profile_image', image);
  //    fetch('https://nodeserver.mydevfactory.com:1447/api/player-joined-team-list?player_id=60942bdffd131f3cd452c3be',{
  //        method:"GET",
  //        header:{
  //          // Accept: 'application/json',
  //   'x-access-token': user.authtoken,
  //   // 'Content-Type': 'application/json'
  //        }


  //      }
  //    ).then((res)=>{
  //      res.json().then((result)=>{
  //        console.log("the image result"teamSelect,result)
  //      })
  //    })
  //   }
  //  }
  const backgroundColor = ['brown', 'red', 'black', 'purple', 'blue', 'yellow', 'green']
  console.log("degree", degree)

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
                    <Link to={{ pathname: "/MyAccount"}} >
                      <li><a class="dropdown-item" href="#">My Account</a></li>
                    </Link>
                    <Link to={{ pathname: "/Credit"}} >
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
            <div class="dashboard-top-content">
              <div class="dashboard-top-content-left">
                <div class="dashboard-top-content-left-top">
                  <div class="team-profile">
                    <div class="team-profile-img">
                      {/* <img src={BigUserProfile} alt="" /> */}
                      {profilePic.profile_image == null ?
                        <img src={BigUserProfile} alt="" /> :
                        <img src={`${pic}${profilePic.profile_image}`} alt="" />
                      }
                    </div>
                    <div class="team-profile-name">
                      {profilePic.fname + " " + profilePic.lname}
                    </div>
                    <div class="update-team-photo">
                      Update Team Photo
                      <input type="file" name='img' onChange={(event) => handleChange(event)} />
                    </div>
                  </div>

                  <div class="invoice-due">
                    <div class="create-new-team-section">
                      <div class="create-new-team-banner">
                        <img src="images/team-photo.png" alt="" />
                      </div>
                      <div class="create-new-team-text">
                        <h3>Did you know XYZ supports over 100 different sports & activities?</h3>
                        <p>Use XYZ for everything from soccer, football or baseball to scouts,gaming or book clubs. It’s easy to start a new group. Try it today!</p>
                        <button onClick={() => {
                          history.push("/CreateTeam")
                        }}>Create New Team</button>
                      </div>
                    </div>

                  </div>

                </div>
                <div class="dashboard-top-content-left-bottom">
                  <div class="dublin-weather">

                    <h2>Dublin-Weather</h2>

                    {degree.length == 0 ?
                      <div>
                        <div class="dublin-weather-bottom">
                          <div class="dublin-weather-bottom-boxes">
                            <h3>Today</h3>
                            <img src={Cloudy} alt="" />

                            <div class="active-degree">
                              <p>34˚/30˚</p>

                            </div>
                          </div>
                          <div class="dublin-weather-bottom-boxes">
                            <h3>Sat</h3>
                            <img src={Cloudy} alt="" />
                            <p>34˚/30˚</p>

                          </div>
                          <div class="dublin-weather-bottom-boxes">
                            <h3>Sun</h3>
                            <img src={Cloudy} alt="" />
                            <p>34˚/30˚</p>

                          </div>
                          <div class="dublin-weather-bottom-boxes">
                            <h3>Mon</h3>
                            <img src={Cloudy} alt="" />
                            <p>34˚/30˚</p>

                          </div>
                        </div></div> :
                      <div><div class="dublin-weather-bottom">
                        <div class="dublin-weather-bottom-boxes">
                          <h3>Today</h3>
                          <img src={Cloudy} alt="" />

                          <div class="active-degree">
                            <p>{degree[0].temp.max}˚/{degree[0].temp.min}˚</p>

                          </div>
                        </div>
                        <div class="dublin-weather-bottom-boxes">
                          <h3>Sat</h3>
                          <img src={Cloudy} alt="" />
                          <p>{degree[1].temp.max}˚/{degree[1].temp.min}˚</p>

                        </div>
                        <div class="dublin-weather-bottom-boxes">
                          <h3>Sun</h3>
                          <img src={Cloudy} alt="" />
                          <p>{degree[2].temp.max}˚/{degree[2].temp.min}˚</p>

                        </div>
                        <div class="dublin-weather-bottom-boxes">
                          <h3>Mon</h3>
                          <img src={Cloudy} alt="" />
                          <p>{degree[3].temp.max}˚/{degree[3].temp.min}˚</p>

                        </div>
                      </div></div>}

                  </div>
                </div>
              </div>
              <div class="dashboard-top-content-right">
                <div class="team-list-head">
                  <h2>Team</h2>
                  <a href="#">View All</a>
                </div>
                <div class="team-list-section">
                  {team.map((team) => {
                    return (
                      <div class="team-list-box">
                        <div class="team-list-box-img">
                          {team.image == null ? <img src={teamList} alt="" /> :
                            <img src={`${pic}${team.image}`} alt="" />}
                        </div>
                        <div class="team-list-box-text">
                          <h4>{team.team_name}</h4>

                          <a href="#">Team Roster</a>

                        </div>
                      </div>
                    )
                  })}
                  {/* <div class="team-list-box">
                    <div class="team-list-box-img">
                      <img src={photo} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Boston Nets</h4>
                      <h5>Tab D’souza  <span>Manager</span></h5>
                      <a href="#">Team Roster</a>
                    </div>
                  </div>
                  <div class="team-list-box">
                    <div class="team-list-box-img">
                      <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Brooklyn Nets</h4>
                      <h5>Tab D’souza  <span>Player</span></h5>
                      <a href="#">Team Roster</a>
                    </div>
                  </div>
                  <div class="team-list-box">
                    <div class="team-list-box-img">
                      <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Golden State Warriors</h4>
                      <h5>Tab D’souza  <span>Administrative</span></h5>
                      <a href="#">Team Roster</a>
                    </div>
                  </div> */}



                </div>
              </div>
            </div>
            <div class="player-schedule-section">

              <div class="record-standing-box">
                <div class="pie-chat-total-income">
                  {/* <img src={piechat} alt="" /> */}
                  <div style={{ display: 'flex', flexDirection: "row" }}>
                    <h2 style={{ color: "white" }}>Total Income</h2>
                    <div style={{ marginLeft: "100px" }}>
                      <select style={{ backgroundColor: "#484848", padding: "10px", marginRight: "10px", borderRadius: "10px" }}>
                        <option> Monthly</option>
                      </select>
                      <select style={{ backgroundColor: "#484848", padding: "10px", borderRadius: "10px" }}>
                        <option> Pie Chart</option>
                      </select>
                    </div>
                  </div>

                  <DonutChart
                    data={[
                      {
                        label: '8U Brown',
                        value: 25,
                        style: { fill: "black" }
                      },
                      {
                        label: '8U Red',
                        value: 10
                      },
                      {
                        label: '8U Black',
                        value: 12
                      },
                      {
                        label: '8U Purple',
                        value: 13
                      },
                      {
                        label: '8U Blue',
                        value: 5
                      },
                      {
                        label: '8U Yellow',
                        value: 20,
                        color: 'yellow'
                      },
                      {
                        label: '8U Green',
                        value: 25
                      },


                    ]}
                    backgroundColor={backgroundColor}
                  />
                </div>

              </div>

              <div class="dashboard-schedule-section">
                <div class="dashboard-schedule-head">
                  <h2>Schedule</h2>
                  <a href="#" onClick={() => {
                    history.push('./Teamschdule')
                  }}>View Full Schedule</a>
                </div>
                <div class="dashboard-schedule-main-box">
                  <div class="dashboard-schedule-main-box-option">
                    <label class="options-radio">Game
                      <input type="radio" checked="checked" name="radio" />
                      <span class="checkmark"></span>
                    </label>

                    <label class="options-radio">Event
                      <input type="radio" name="radio" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  {/* <div class="dashboard-schedule-game-event">
                    <div class="dashboard-schedule-game-event-calender"> */}
                  {/* <img src={Calender} alt="" /> */}
                  {/* <div>
                        <Calendar
                          onChange={onChange}
                          value={value}
                        /></div> */}
                  <CalendarComponent />
                  {/* </div>
                  </div> */}

                </div>
              </div>

            </div>

            <div class="record-save-section">
              <div class="record-save-box">
                <div class="record-standing-head">
                  Record
                </div>
                <div class="record-save-box-inner">
                  <div class="record-main-top">
                    <button>Last Game</button>
                    <h4>vs. HuskiesTS Grey</h4>
                    <span>Sat, Mar 14, 10:15 AM</span>

                  </div>
                  <div class="record-line-bar">
                    <img src={lineBar} alt="" />
                  </div>
                  <div class="enter-result">
                    <button class="enter-result-btn">Enter Result</button>
                  </div>
                </div>
              </div>
              <div class="save-travel tb-section">
                <div class="standing-tb-section">
                  <div class="record-standing-head">
                    Standings
                  </div>


                  <div class="record-standing-box-inner">
                    <div class="standing-table">
                      <table>
                        <tr>
                          <th>Team</th>
                          <th>Wins</th>
                          <th>Losses</th>
                          <th>Ties</th>
                        </tr>
                        <tr>
                          <td>Dubcity  Blue</td>
                          <td>8</td>
                          <td>5</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Dubcity  Blue</td>
                          <td>8</td>
                          <td>5</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <td>Dubcity  Blue</td>
                          <td>8</td>
                          <td>5</td>
                          <td>0</td>
                        </tr>
                      </table>
                    </div>
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

export default ManagerHome;
