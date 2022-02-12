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


function PlayerPayment(props) {
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
        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents />
                    <div class="dashboard-main-content">
                        <div class="dashboard-head">
                            <div class="teams-select">
                                <select>
                                    <option>My Teams</option>
                                    <option>My Teams 2</option>
                                    <option>My Teams 3</option>
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
                            <h2 class="page-title">Team Payment</h2>
                            <div class="prefarance-box">
                                <div class="team-payment">
                                    <table>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Ordered Item</th>
                                            <th>Price</th>
                                            <th>Invoice</th>
                                            <th>Status</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="profile-name-img">
                                                    <img src={tableProfile} alt="" />
                                                    Lisa Menon
                                        </div>
                                            </td>
                                            <td>lisamenon@gmail.com</td>
                                            <td>Authentic Jersey</td>
                                            <td>$ 59.99</td>
                                            <td><a href="#" class="view-invoice" data-toggle="modal" data-target="#inVoice">View Invoice</a></td>
                                            <td>
                                                <a href="#" class="pay-now">Pay Now</a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div class="profile-name-img">
                                                <img src={tableProfile} alt="" />
                                                    Lisa Menon
                                        </div>
                                            </td>
                                            <td>lisamenon@gmail.com</td>
                                            <td>Authentic Jersey</td>
                                            <td>$ 59.99</td>
                                            <td><a href="#" class="view-invoice">View Invoice</a></td>
                                            <td>
                                                <span class="paid">Paid</span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div class="profile-name-img">
                                                <img src={tableProfile} alt="" />
                                                    Lisa Menon
                                        </div>
                                            </td>
                                            <td>lisamenon@gmail.com</td>
                                            <td>Authentic Jersey</td>
                                            <td>$ 59.99</td>
                                            <td><a href="#" class="view-invoice">View Invoice</a></td>
                                            <td>
                                                <a href="#" class="pay-now">Pay Now</a>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div class="profile-name-img">
                                                <img src={tableProfile} alt="" />
                                                    Lisa Menon
                                        </div>
                                            </td>
                                            <td>lisamenon@gmail.com</td>
                                            <td>Authentic Jersey</td>
                                            <td>$ 59.99</td>
                                            <td><a href="#" class="view-invoice">View Invoice</a></td>
                                            <td>
                                                <span class="paid">Paid</span>
                                            </td>
                                        </tr>
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

export default PlayerPayment;
