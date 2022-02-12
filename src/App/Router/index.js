import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginComponents from "../Screens/Auth/Login"
import SignUpComponents from "../Screens/Auth/Signup"
import ForgetComponents from "../Screens/Auth/ForgetPassword"
import ResetComponents from "../Screens/Auth/Resetpassword"
import VerifyOtpComponents from "../Screens/Auth/VerifyOtp"
// palyer 
import HomeScreen from './../Screens/Players/Home';
import PlayerPhotos from '../Screens/Players/PlayerMedia/PlayerPhotos';
import PlayerVideos from '../Screens/Players/PlayerMedia/PlayerVideos';
import PlayerFiles from '../Screens/Players/PlayerMedia/PlayerFiles';
import TeamRoster from "../Screens/Players/TeamRoster"
import PlayerSchedule from "../Screens/Players/TeamSchedule"
import PlayerTeamShop from "../Screens/Players/PlayerTeamShop"
import Preferance from "../Screens/Players/Preferance"
import PlayerAssignments from "../Screens/Players/PlayerAssignments"
import PlayerPayment from "../Screens/Players/Payment"
import PlayerMedia from "../Screens/Players/PlayerMedia"
import LiabilityWaiver from "../Screens/Players/liabilityWaiver"
import TeamAvailability from '../Screens/Players/TeamAvailability/TeamAvailability';
import Scorekeeper from '../Screens/Players/ScoreKeeper/ScoreKeeper';
import AddShopData from '../Screens/Players/PlayerTeamShop/AddShopData';
import ViewCalender from '../Screens/Players/TeamSchedule/ViewCalender'
import TeamPlayerInfo from '../Screens/Players/TeamRoster/TeamPlayerInfo';
import TeamPlayerInfoNav from '../Screens/Players/TeamRoster/TeamPlayerInfoNav';
import TeamImportPlayer from '../Screens/Players/TeamRoster/TeamPlayerImport';
import TeamAddPlayer from '../Screens/Players/TeamRoster/TeamAddPlayer';
import Export from '../Screens/Players/TeamSchedule/Export';
// Team manger
import ManagerHome from './../Screens/Manager/Home/index';
import TeamSchdule from "./../Screens/Manager/TeamSchedule/index"
import ManagerRoster from '../Screens/Manager/Roster/index';
import NewEvent from '../Screens/Manager/TeamSchedule/newEvent'
import AddPlayer from '../Screens/Manager/Roster/AddPlayer'
import CreateTeam from '../Screens/Manager/Roster/CreateTeam'
import ManagerTeamAvailability from '../Screens/Manager/ManagerTeamAvailability/ManagerTeamAvailability'
import TeamMassage from '../Screens/Manager/TeamMassage/teamMassage';
import Inbox from '../Screens/Manager/TeamMassage/inbox';
import Sent from '../Screens/Manager/TeamMassage/sent';
import Alert from '../Screens/Manager/TeamMassage/NewAlert';
import AlertInbox from '../Screens/Manager/TeamMassage/AlertInbox';
import AlertSent from '../Screens/Manager/TeamMassage/AlertSent';
import Post from '../Screens/Manager/TeamMassage/Post';
import NewPost from '../Screens/Manager/TeamMassage/NewPost';
import TeamMedia from '../Screens/Manager/TeamMedia/TeamMedia';
import TeamPayment from '../Screens/Manager/TeamPayment/TeamPayment';
import TeamLiabilityWaiver from '../Screens/Manager/TeamLiabilityWaiver/LiabilityWaiver';
import ManagerTeamShop from '../Screens/Manager/ManagerTeamShop/ManagerShop';
import TeamAssignments from '../Screens/Manager/TeamAssignment/TeamAssignment';
import MyAccount from '../Screens/Manager/Home/MyAccount';
import NavBarSide from '../Screens/Manager/Home/NabBar';
import Household from '../Screens/Manager/Home/Household';
import Preference from '../Screens/Manager/Home/Preference';
import LoginAccount from '../Screens/Manager/Home/loginAccount';
import ImportPlayer from '../Screens/Manager/Roster/ImportPlayer';
import PlayerInfo from '../Screens/Manager/Roster/PlayerInfo';
import EditLocation from '../Screens/Manager/TeamSchedule/EditLocation';
import NewLocation from '../Screens/Manager/TeamSchedule/NewLocation';
import EditOponent from '../Screens/Manager/TeamSchedule/EditOponent';
import NewOponent from '../Screens/Manager/TeamSchedule/NewOponent';
import Subscribe from '../Screens/Manager/TeamSchedule/Subscribe';
import ManagerViewCalender from '../Screens/Manager/TeamSchedule/ManagerViewCalender';
import TeamSettingHome from '../Screens/Manager/TeamSetteing/teamSettingHome';
import SettingNav from '../Screens/Manager/TeamSetteing/settingNav';
import SitePreference from '../Screens/Manager/TeamSetteing/SitePreference';
import Biling from '../Screens/Manager/Home/Bilings';
import ManageTeam from '../Screens/Manager/Home/ManageTeam';
import Credit from '../Screens/Manager/Home/Credit';
import AnotherPlayer from '../Screens/Manager/Roster/AnotherPlayer';
import TeamStatistics from '../Screens/Manager/Team Statistics/TeamStatistic';
import TeamStats from '../Screens/Manager/Team Statistics/TeamStats';
import PlayerStats from '../Screens/Manager/Team Statistics/PlayerStats';
import GameStats from '../Screens/Manager/Team Statistics/GameStats';
import ManageStats from '../Screens/Manager/Team Statistics/ManageStats';
import NewStatistic from '../Screens/Manager/Team Statistics/NewStatistic';
import RecorderStatistic from '../Screens/Manager/Team Statistics/RecorderStatistic';
import TeamOrganizer from '../Screens/Manager/TeamOrganizer/TeamOrganizer';
import TeamShedule from '../Screens/Manager/TeamOrganizer/TeamShedule';
import Brackets from '../Screens/Manager/TeamOrganizer/Brackets';
import NewTeam from '../Screens/Manager/TeamOrganizer/NewTeam';
import TeamRegister from '../Screens/Manager/TeamOrganizer/TeamRegister';
import TabManager from '../Screens/Manager/TeamSetteing/TabManager';
import Order from "../Screens/Manager/ManagerTeamShop/order";
import Photos from "../Screens/Manager/TeamMedia/Photos";
import Videos from "../Screens/Manager/TeamMedia/Videos";
import Files from "../Screens/Manager/TeamMedia/Files";
import TeamScorekeeper from '../Screens/Manager/TeamScoreKeeper/TeamScoreKeeper';

import NotFound from "./../../Error"

export const currentURL = '/projects/suvendu/robins/sportscloud';

//  basename={currentURL}

function RouterScreen() {


    const userdata = useSelector((state) => state.userdata);
    console.log("i am selector",  userdata);
    const [userMe, setUser] = useState(null);
    const [userType, setUserType] = useState("")



    useEffect(() => {
        let user = userdata && userdata._id ? true : false
        setUser(user);
        const userLocal = JSON.parse(localStorage.getItem('user'));
        let userTy = userLocal && userLocal.user_type == 'player' ? true : false
        setUserType(userTy)
        let userD = userLocal && userLocal._id ? true : false
        setUser(userD);
    }, [userdata]);



    return (

        <Router basename={currentURL}>
            {/* <div> */}
            <Switch >
                {
                    userMe ?
                        <>
                            {
                                userType ?

                                    <>
                                        <Route path='/' component={HomeScreen} exact />
                                        <Route path='/teamroster' component={TeamRoster} />
                                        <Route path='/playerschdule' component={PlayerSchedule} />
                                        <Route path='/teamshop' component={PlayerTeamShop} />
                                        <Route path='/preferance' component={Preferance} />
                                        <Route path='/playerassignments' component={PlayerAssignments} />
                                        <Route path='/payment' component={PlayerPayment} />
                                        <Route path='/playermedia' component={PlayerMedia} />
                                        <Route path='/liabilitywaiver' component={LiabilityWaiver} />
                                        <Route path='/TeamAvailability' component={TeamAvailability} />
                                        <Route path='/Scorekeeper' component={Scorekeeper} />
                                        <Route path='/AddShopData' component={AddShopData} />
                                        <Route path='/ViewCalender' component={ViewCalender} />
                                        <Route path='/TeamPlayerInfo' component={TeamPlayerInfo} />
                                        <Route path='/TeamPlayerInfoNav' component={TeamPlayerInfoNav} />
                                        <Route path='/TeamImportPlayer' component={TeamImportPlayer} />
                                        <Route path='/TeamAddPlayer' component={TeamAddPlayer} />
                                        <Route path='/Export' component={Export} />
                                        <Route path='/PlayerPhotos' component={PlayerPhotos} />
                                        <Route path='/PlayerVideos' component={PlayerVideos} />
                                        <Route path='/PlayerFiles' component={PlayerFiles} />
                                        
                                    </>
                                    :
                                    <>
                                        <Route path='/' component={ManagerHome} exact />
                                        <Route path='/ManagerRoster' component={ManagerRoster} />
                                        <Route path='/Teamschdule' component={TeamSchdule} />
                                        <Route path='/ManagerTeamShop' component={ManagerTeamShop} />
                                        <Route path='/preferance' component={Preferance} />
                                        <Route path='/TeamAssignments' component={TeamAssignments} />
                                        <Route path='/NewEvent' component={NewEvent} />
                                        <Route path='/AddPlayer' component={AddPlayer} />
                                        <Route path='/CreateTeam' component={CreateTeam} />
                                        <Route path='/ManagerTeamAvailability' component={ManagerTeamAvailability} />
                                        <Route path='/Scorekeeper' component={TeamScorekeeper} />
                                        <Route path='/TeamMassage' component={TeamMassage} />
                                        <Route path='/Inbox' component={Inbox} />
                                        <Route path='/Sent' component={Sent} />
                                        <Route path='/Alert' component={Alert} />
                                        <Route path='/AlertInbox' component={AlertInbox} />
                                        <Route path='/AlertSent' component={AlertSent} />
                                        <Route path='/Post' component={Post} />
                                        <Route path='/NewPost' component={NewPost} />
                                        <Route path='/TeamMedia' component={TeamMedia} />
                                        <Route path='/TeamPayment' component={TeamPayment} />
                                        <Route path='/TeamLiabilityWaiver' component={TeamLiabilityWaiver} />
                                        <Route path='/MyAccount' component={MyAccount} />
                                        <Route path='/NavBarSide' component={NavBarSide} />
                                        <Route path='/Household' component={Household} />
                                        <Route path='/Preference' component={Preference} />
                                        <Route path='/LoginAccount' component={LoginAccount} />
                                        <Route path='/ImportPlayer' component={ImportPlayer} />
                                        <Route path='/PlayerInfo' component={PlayerInfo} />
                                        <Route path='/EditLocation' component={EditLocation} />
                                        <Route path='/NewLocation' component={NewLocation} />
                                        <Route path='/EditOponent' component={EditOponent} />
                                        <Route path='/NewOponent' component={NewOponent} />
                                        <Route path='/Subscribe' component={Subscribe} />
                                        <Route path='/ManagerViewCalender' component={ManagerViewCalender} />
                                        <Route path='/TeamSettingHome' component={TeamSettingHome} />
                                        <Route path='/SettingNav' component={SettingNav} />
                                        <Route path='/SitePreference' component={SitePreference} />
                                        <Route path='/Credit' component={Credit} />
                                        <Route path='/ManageTeam' component={ManageTeam} />
                                        <Route path='/Biling' component={Biling} />
                                        <Route path='/AnotherPlayer' component={AnotherPlayer} />
                                        <Route path='/TeamStatistics' component={TeamStatistics} />
                                        <Route path='/PlayerStats' component={PlayerStats} />
                                        <Route path='/GameStats' component={GameStats} />
                                        <Route path='/ManageStats' component={ManageStats} />
                                        <Route path='/NewStatistic' component={NewStatistic} />
                                        <Route path='/RecorderStatistic' component={RecorderStatistic} />
                                        <Route path='/TeamStats' component={TeamStats} />
                                        <Route path='/TeamOrganizer' component={TeamOrganizer} /> 
                                        <Route path='/TeamShedule' component={TeamShedule} />   
                                        <Route path='/Brackets' component={Brackets} />  
                                        <Route path='/NewTeam' component={NewTeam} />  
                                        <Route path='/TeamRegister' component={TeamRegister} />                                      
                                        <Route path='/TabManager' component={TabManager} />
                                        <Route path='/Order' component={Order} />
                                        <Route path='/Photos' component={Photos} />
                                        <Route path='/Videos' component={Videos} />
                                        <Route path='/Files' component={Files} />
                                        
                                        

                                    </>

                            }

                        </>


                        :

                        <>
                            <Route path='/' component={LoginComponents} exact />
                            <Route path='/signup' component={SignUpComponents} />
                            <Route path='/forgetpassword' component={ForgetComponents} />
                            <Route path='/resetpassword' component={ResetComponents} />
                            <Route path='/verifyotp' component={VerifyOtpComponents} />
                            {/* <Route  component={NotFound} /> */}

                        </>

                }

            </Switch >

            {/* </div> */}
        </Router>
    );
}

export default RouterScreen;
