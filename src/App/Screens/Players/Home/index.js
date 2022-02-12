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
import BigUserProfile from "../../../images/big-user-profile.png"
import { logoutUser } from "../../../Redux/Actions/auth";
import Invoice from "../../../images/invoice.png"
import Cloudy from "../../../images/cloudy-small.png"
import teamList from "../../../images/team-list.png"
import Calender from "../../../images/calender.png"
import lineBar from "../../../images/line-bar.png"
import saveTravel from "../../../images/save-travel.png"
import bullk from "../../../images/bullk.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { useDispatch } from 'react-redux';
import { Network } from '../../../Services/Api';
import { ToastContainer, toast } from 'react-toastify';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import "../../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";


function HomeComponents(props) {
  const history = useHistory();
  const dispatch = useDispatch()

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [player,setPlayer]= useState([]);
  const [team,setTeam]=useState([]);
  const [degree, setDegree] = useState([])

  // const [loading,setLoading]= useState(false)
  const [ profilePic,setProfilePic] = useState([])
  console.log("team ka value====>",team);
  console.log(" typeof team====>",typeof(team));


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
    teamRoster()
    updateProfile()
    weather()
  }, []);
  const pic='https://nodeserver.mydevfactory.com:1447/'

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    dispatch(logoutUser(null))
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };
  const teamSelect=()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let header = {
        'authToken': user.authtoken
       
      }
      console.log('user',user)
    
    Network('api/player-joined-team-list?player_id='+user._id, 'GET',header)
      .then(async (res) => {
        console.log("res----", res)
        if (res.response_code == 4000) {
          dispatch(logoutUser(null))
          localStorage.removeItem("user");
          history.push("/")
          toast.error(res.response_message)
      }
      
        setTeam(res.response_data);
        
    })
  }
}


const teamRoster=()=>{
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    let header = {
      'authToken': user.authtoken
     
    }
    console.log('user',user)
  
  Network('api/player-list-by-team-id?team_id='+ '60a51abfae9b3244cc9d1eae', 'GET',header)
    .then(async (res) => {
      console.log("teamRoster----", res)
      if (res.response_code == 4000) {
        dispatch(logoutUser(null))
        localStorage.removeItem("user");
        history.push("/")
        toast.error(res.response_message)
    }
      console.log("team player",res.response_data.PLAYER)
      setPlayer(res.response_data.PLAYER)
    
      
     
  })
}
}
  const updateProfile=()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let header = {
        'authToken': user.authtoken
       
      }
      console.log('user',user)
    
    Network('api/get-user-details?user_id='+user._id, 'GET',header)
      .then(async (res) => {
        console.log("new Profile Pic----", res)
        if (res.response_code == 4000) {
          dispatch(logoutUser(null))
          localStorage.removeItem("user");
          history.push("/")
          toast.error(res.response_message)
      }
       setProfilePic(res.response_data)
        
    })
  }

  }

  const weather = () => {
    fetch(
      // 'http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=2986831fc21dc86b9c0a3f789cec2721'
      'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=matric&appid=2986831fc21dc86b9c0a3f789cec2721'
    ).then((res) => {
      res.json().then((res) => {
        console.log("weather", res.daily)
        if(res.daily!=null){
          setDegree(res.daily)
        }
       
 

      })
    })



  }




  return (
    <div>
      
       <div class="dashboard-container">
       <div class="dashboard-main">
           <SideMenuComponents />
           <div class="dashboard-main-content">
            <div class="dashboard-head">
              <div class="teams-select">
                <select>
                  { team.map((team)=>{
                    return(
                      <option>{team.team_id.team_name}</option>
                    )
                  })}
                </select>
              </div>
              {/* <!--
                   <div class="create-teams">
                <button><img src="images/add-team.png" alt="" /> Create New Team</button>
              </div>
              --> */}
              <div class="profile-head">
                <div class="profile-head-name">{ profilePic.fname + " " +profilePic.lname}</div>
                <div class="profile-head-img">
                {profilePic.profile_image==null?
                      <img src={BigUserProfile} alt="" />:
                      <img src={`${pic}${profilePic.profile_image}`} alt="" />
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
            <div class="dashboard-top-content">
              <div class="dashboard-top-content-left">
                <div class="dashboard-top-content-left-top">
                  <div class="team-profile">
                    <div class="team-profile-img">
                      {profilePic.profile_image==null?
                      <img src={BigUserProfile} alt="" />:
                      <img src={`${pic}${profilePic.profile_image}`} alt="" />
                      }
                    </div>
                    <div class="team-profile-name">
                      {profilePic.fname + " " +profilePic.lname}
                                </div>
                    <div class="update-team-photo">
                      Update Player Photo
                                    <input type="file" />
                    </div>
                  </div>

                  <div class="invoice-due">
                    <div class="ionice-due-inner">
                      <h2>Invoices Due</h2>
                      <div class="invoice-icon">
                        <img src={Invoice} alt="" />
                      </div>

                      <p>No invoices currently due.</p>
                      <span>Thank you for being awesome!</span>

                    </div>
                  </div>

                </div>
                <div class="dashboard-top-content-left-bottom">
                  <div class="dublin-weather">
                    <h2>Local Weather</h2>
                    {degree.length==0?
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
                    </div></div>:
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
                  <h2>Team Roster</h2>
                  <a href="#">View All</a>
                </div>
                <div class="team-list-section">
                 
                  {
                    player.map((player)=>{
                      
                      return(
                        <div class="team-list-box">
                        <div class="team-list-box-img">
                          {
                            player.member_id.profile_image==null?
                          <img src={teamList} alt="" />:
                          <img src={`${pic}${player.member_id.profile_image}`} alt="" />
                          }
                        </div>
                        <div class="team-list-box-text">
                          <h4>{player.member_id.fname} {player.member_id.lname}</h4>
                          <h5>{ player.member_type}</h5>
                          <a href="#">{player.position}</a>
                        </div>
                      </div>
                      )
                    })
                 
                  }
                  {/* <div class="team-list-box">
                    <div class="team-list-box-img">
                      <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Boston Nets</h4>
                      <h5>Tab D’souza  <span>Manager</span></h5>
                      <a href="#">Go to Users Details</a>
                    </div>
                  </div>
                  <div class="team-list-box">
                    <div class="team-list-box-img">
                      <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Brooklyn Nets</h4>
                      <h5>Tab D’souza  <span>Player</span></h5>
                      <a href="#">Go to Users Details</a>
                    </div>
                  </div>
                  <div class="team-list-box">
                    <div class="team-list-box-img">
                      <img src={teamList} alt="" />
                    </div>
                    <div class="team-list-box-text">
                      <h4>Golden State Warriors</h4>
                      <h5>Tab D’souza  <span>Administrative</span></h5>
                      <a href="#">Go to Users Details</a>
                    </div>
                  </div> */}




                 


</div>
               
              </div>
            </div>
            <div class="player-schedule-section">
              <div class="record-standing-box">
                <div class="record-standing-head">
                  Player Status
                        </div>
                <div class="record-standing-box-inner">
                  <div class="standing-table">
                    <table>
                      <tr>
                        <th>Team</th>
                        <th>2 Pointers</th>
                        <th>3 Pointers</th>
                        <th>Free Throws</th>
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

              <div class="dashboard-schedule-section">
                <div class="dashboard-schedule-head">
                  <h2>Schedule</h2>
                  <a href="#">View Full Schedule</a>
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
                    <div class="dashboard-schedule-game-event-calender">
                      <img src={Calender} alt="" />
                    </div>

                  </div> */}
                     <CalendarComponent  />

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
              <div class="save-travel">
                <div class="record-standing-head">
                  Save on Travel
                        </div>
                <div class="record-save-box-inner">
                  <div class="save-on-travel">
                    <div class="save-on-travel-img">
                      <img src={saveTravel} alt="" />
                    </div>
                    <h4>TeamSnap for Clubs & Leagues</h4>
                    <p>If TeamSnap has joined up with HotelPlanner to provide exclusive hotel discounts to TeamSnap users. Save on your next away game, get group discounts and save on personal travel tool!</p>
                    <a href="#">Browse Travel Deals</a>
                  </div>
                </div>
              </div>

            </div>
            <div class="myteam-teamsnap-section">
              <div class="record-save-box">
                <div class="record-standing-head">
                  My Teams
                        </div>
                <div class="myteam-list-section">
                  {
                    team.map((team)=>{
                      console.log('team ----',team);
                      return(
                        <div class="team-list-box" key={team.id}>
                    <div class="team-list-box-img" >
                        {   team.team_id.image==null?
                        <img src={UserProfile} alt="" />:
                      <img src={`${pic}${team.team_id.image}` } alt="" />
                      }
                    </div>
                    <div class="team-list-box-text">
                      <h4>{team.team_id.team_name}</h4>
                      {/* <div class="my-team-details">
                        <div class="name">John Doe</div>
                        <div class="category">Player</div>
                        <div class="season">Spring Season</div>
                      </div> */}

                    </div>
                  </div>
                      )
                    })
                  
                  }

                 

                  



                </div>
              </div>
              <div class="teamsnap-section">
                <div class="teamsnap-section-head">
                  <h2>The TeamSnap Blog</h2>
                  <a href="#">View All</a>
                </div>
                <div class="teamsnap-section-main">
                  <div class="teamsnap-list-box">
                    <p>You Can Help Save Youth Sports in 30 Seconds.</p>
                    <span>May 7, 2021</span>
                  </div>
                  <div class="teamsnap-list-box">
                    <p>You Can Help Save Youth Sports in 30 Seconds.</p>
                    <span>May 7, 2021</span>
                  </div>
                  <div class="teamsnap-list-box">
                    <p>You Can Help Save Youth Sports in 30 Seconds.</p>
                    <span>May 7, 2021</span>
                  </div>
                  <div class="teamsnap-list-box">
                    <p>You Can Help Save Youth Sports in 30 Seconds.</p>
                    <span>May 7, 2021</span>
                  </div>
                </div>

              </div>
            </div>
            <Footer/>
          </div>
          </div>  
        </div>
        </div>  
  );
}

export default HomeComponents;
