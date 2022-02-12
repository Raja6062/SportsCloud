import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import listImage from "../../../images/list-pro1.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";


function PlayerTeamShop(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [shopData, setShopData] = useState([])
  const [team,setTeam]=useState([]);

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
    teamShopData()
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };
  const pic = 'https://nodeserver.mydevfactory.com:1447/'

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


  const teamShopData = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("iddddd",id)
    if (user) {
      let header = {
        'authToken': user.authtoken

      }
      console.log('user', user)


      console.log("id----------->", id)
      Network('api/team-store-product-list?manager_id=' + user._id + '&team_id=' + id, 'GET', header)
        .then(async (res) => {
          console.log("teamShopData----", res)

          if (res.response_code == 4000) {
            dispatch(logoutUser(null))
            localStorage.removeItem("user");
            history.push("/")
            toast.error(res.response_message)
          }
          setShopData(res.response_data.docs)
          if(res.response_data.docs.length!=0){
            teamShopData(res.response_data.docs[0]._id)
          }
         


        })
    }
  }


  const change = (event) => {
    console.log("event", event.target.value)
    teamShopData(event.target.value)

  }


  return (
    <div>
      <div class="dashboard-container">
        <div class="dashboard-main">
          <SideMenuComponents />
          <div class="dashboard-main-content">
            <div class="dashboard-head">
              <div class="teams-select">
                <select onClick={change} >
                  { team.map((team)=>{
                    return(
                      <option value={team.team_id._id}>{team.team_id.team_name}</option>
                    )
                  })}
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

            <div class="team-shop-page">
              <div class="my-order-section">
                <a href="#">My Orders</a>
              </div>
              <div class="team-shop-list-box">
                <div class="sort-by-section">
                  <div class="sort-by-section-main">
                    <label>Sort By</label>
                    <select>
                      <option>Popularity</option>
                      <option>Popularity 2</option>
                      <option>Popularity 3</option>
                    </select>
                  </div>
                </div>

                <div class="team-shop-list-main">
                  {shopData.length==0?
                  <div class="team-shop-list-main">
                   <div class="team-shop-product-box">
                    <div class="team-shop-product-img"  >
                       <Link to={{ pathname: "/AddShopData", state: "GAME" }} >
                      <img src={listImage} alt=""  />
                      </Link>
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                  <div class="team-shop-product-img">
                    <img src={listImage} alt="" />
                  </div>
                  <div class="team-shop-product-text">
                    <h2 class="product-title">Nike Edition</h2>
                    <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                      Red Swingman Team Jersey</p>
                    <div class="product-price">
                      $82.49
                    </div>
                    <div class="product-size">Size : S, M, L, XL, XXL</div>
                  </div>
                </div>
                <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>



                </div>



                    :
                    shopData.map((data) => {
                      return (
                        <div class="team-shop-product-box">
                          <div class="team-shop-product-img">
                            {data.image == null ? <img src={listImage} alt="" /> :
                              <img src={`${pic}${data.image}`} alt="" />}

                          </div>
                          <div class="team-shop-product-text">
                            <h2 class="product-title">{data.brand}</h2>
                            <p class="product-description">{data.description}</p>
                            <div class="product-price">
                              ${data.price}
                            </div>
                            <div class="product-size">{data.size}</div>
                          </div>
                        </div>

                      )
                    })
                   
                 

                  }

                  {/* 
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>

                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div>
                  <div class="team-shop-product-box">
                    <div class="team-shop-product-img">
                      <img src={listImage} alt="" />
                    </div>
                    <div class="team-shop-product-text">
                      <h2 class="product-title">Nike Edition</h2>
                      <p class="product-description">Men's Chicago Bulls Wendell Carter Jr. Nike
                        Red Swingman Team Jersey</p>
                      <div class="product-price">
                        $82.49
                      </div>
                      <div class="product-size">Size : S, M, L, XL, XXL</div>
                    </div>
                  </div> */}
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

export default PlayerTeamShop;
