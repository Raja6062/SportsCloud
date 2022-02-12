import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import '../../Utils/css/style.css';
import '../../Utils/css/responsive.css';
import "../../Utils/css/bootstrap.min.css"
import "../../Utils/css/bootstrap-datepicker.css"
import Logo from "../../images/logo.png"
import UserProfile from "../../images/user-profile.png"
// import BigUserProfile from "../../../images/big-user-profile.png"
// import Invoice from "../../../images/invoice.png"
// import Cloudy from "../../../images/cloudy-small.png"
// import teamList from "../../../images/team-list.png"
// import Calender from "../../../images/calender.png"
// import lineBar from "../../../images/line-bar.png"
// import saveTravel from "../../../images/save-travel.png"
// import bullk from "../../../images/bullk.png"
import face from "../../images/Face.png"



function SideMenuComponents(props) {
  console.log("props-----",props.manger)
  const history = useHistory();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});

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
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };


  return (
    <div class="dashboard-side-bar">
      <div class="logo">
        <a href="#"><img src={Logo} alt="" /></a>
      </div>
      <div class="left-menu-section">
        <div class="nav-header">
          <button id="openMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="menulist">
          {
            props.manger == "manger" ?
            <ul>
            <Link to="/">
              <li><a href="#" class="menu1 active">Team Home</a></li>
            </Link>
            <Link to="/ManagerRoster">
              <li><a href="#" class="menu2">Team Roster</a></li>
            </Link >
            <Link to="/Teamschdule">
            <li><a href="#" class="menu3">Team Schedule</a></li>
            </Link>
            <Link to="/ManagerTeamAvailability">
            <li><a href="#" class="menu4">Team Availability</a></li>
            </Link>
            <Link to="/ManagerTeamShop">
              <li><a href="#" class="menu5">Team Store</a></li>
            </Link>
            <Link to="/ScoreKeeper">
            <li><a href="#" class="menu6">Score Keeper</a></li>
            </Link>
            <Link to="/TeamAssignments">
              <li><a href="#" class="menu7">Team Assignment</a></li>
            </Link>
            <Link to="/TeamMedia">
            <li><a href="#" class="menu8">Team Media</a></li>
            </Link>
            <Link to="/TeamMassage">
            <li><a href="#" class="menu9">Team Messages</a></li>
            </Link>
            <Link to="/preferance">
              <li><a href="#" class="menu10">Team Preferences</a></li>
            </Link>
            <Link to='/TeamSettingHome'>
            <li><a href="#" class="menu11">Team Settings</a></li>
            </Link>
            <Link to='/TeamStatistics'>
            <li><a href="#" class="menu11">Team Statistics</a></li>
            </Link>
            <Link to='/TeamOrganizer'>
            <li><a href="#" class="menu12">Tournament Organizer</a></li>
            </Link>
            <Link to = "/TeamLiabilityWaiver">
          <li><a href="#" class="menu11">Liability Waiver</a></li>
          </Link>
            <Link to="/TeamPayment">
              <li><a href="#" class="menu12">Team Payment</a></li>
            </Link>
           
            {/* <li><a href="#" class="menu13">Team Store</a></li>
            <li><a href="#" class="menu14">Website Adminis tration</a></li>
            <li><a href="#" class="menu15">player Liability Waiver</a></li>
            <li><a href="#" class="menu16" >Invoicing</a></li> */}
          </ul>
          :
          
          <ul>
          <Link to="/">
            <li><a href="#" class="menu1 active">Team Home</a></li>
          </Link>
          <Link to="/teamroster">
            <li><a href="#" class="menu2">Team Roster</a></li>
          </Link>
          <Link to="/playerschdule">
          <li><a href="#" class="menu3">Team Schedule</a></li>
          </Link>
          <Link to="/TeamAvailability">
          <li><a href="#" class="menu4">Player Availability</a></li>
          </Link>
          <Link to="/teamshop">
            <li><a href="#" class="menu5">Team Shop</a></li>
          </Link>
          <Link to="/ScoreKeeper">
            <li><a href="#" class="menu6">Score Keeper</a></li>
            </Link>
          <Link to="/playerassignments">
            <li><a href="#" class="menu7">Player Assignment</a></li>
          </Link>
          <Link to="/playermedia">
          <li><a href="#" class="menu8">Player Media</a></li>
          </Link>
          <li><a href="#" class="menu9">Player Messages</a></li>
          <Link to="/preferance">
            <li><a href="#" class="menu10">Player Preferences</a></li>
          </Link>
          <Link to = "liabilitywaiver">
          <li><a href="#" class="menu11">Liability Waiver</a></li>
          </Link>
          <Link to="/payment">
          <li><a href="#" class="menu12" >Team Payments</a></li>
          </Link>
          
        </ul>
          }
          
        </div>
      </div>
    </div>
  );
}

export default SideMenuComponents;
