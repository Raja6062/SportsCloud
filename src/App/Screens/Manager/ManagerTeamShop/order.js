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
import Modal from "react-bootstrap/Modal";



function Order(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [dropdown, setDropdown] = useState([])
  const [shopData, setShopData] = useState([])
  const [modalValue, setModalValue] = useState(false)
  const [image, Profile] = useState("")
  const[name,setName]=useState("")
  const [color,setColor]=useState("")
  const[jursey,setJursey]=useState("")
  const[size,setSize]=useState("")
  const[desciption,setDescription]=useState("")
  const[price,setPrice]=useState("")
  const [brand,setBrand]=useState("")
  const [material,setMaterial]=useState("")
  const [teamId,setTeamID]=useState("")

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
    dropdownMenu()
    teamShopData()
    addShopData()
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };
  const pic = 'https://nodeserver.mydevfactory.com:1447/'

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

          teamShopData(res.response_data[0]._id);





        })
    }

  }


  const teamShopData = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
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



        })
    }
  }


  const change = (event) => {
    console.log("event", event.target.value)
    teamShopData(event.target.value)
    setTeamID(event.target.value)

  }
  const addShopData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {

      const formData = new FormData();
      formData.append('manager_id ', user._id);
      formData.append('team_id', teamId);
      formData.append('name ', name);
      formData.append('jersey_number', jursey);
      formData.append('description ', desciption);
      formData.append('price', price);
      formData.append('brand ', brand);
      formData.append('color', color);
      formData.append('material ', material);
      formData.append('size', size);
      formData.append('image', image);


      // const url = 'https://nodeserver.mydevfactory.com:1447/api/update-player-profile-image'


      fetch("https://nodeserver.mydevfactory.com:1447/api/add-store-image", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'x-access-token': user.authtoken,
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      }).then(function (response) {
        console.log("shopDataPost===>", response);
        return response.json();
      })



     


    }
  }

  const handleChange = event => {
    console.log("URL.createObjectURL(event.target.files[0])---->", URL.createObjectURL(event.target.files[0]));
    Profile(event.target.files[0])
    // addShopData(event.target.files[0])

  };
  const save=()=>{
    addShopData()
    setModalValue(false)
  }


  console.log("dta--->", shopData)

    return (
        <div>
      <div class="dashboard-container">
        <div class="dashboard-main">
          <SideMenuComponents />
          <div class="dashboard-main-content">
            <div class="dashboard-head">
              <div class="teams-select">
                {/* <select>
                  <option>My Teams</option>
                  <option>My Teams 2</option>
                  <option>My Teams 3</option>
                </select> */}
                <select onChange={change} >

                  <option>Select A Team</option>
                  {dropdown.map((dropdown) => {
                    return (
                      <option value={dropdown._id}>{dropdown.team_name}</option>
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
              <div class="my-order-section ordrHdn">
              <h2 class="page-title">Shop &nbsp;<span>&#10092;</span>&nbsp; My Orders</h2>
                <div><a href="#">My Orders</a></div>
              </div>
              <div class="team-shop-list-box">
                  <div className="tsListshop">
                      <div className="tsLpart">
                          <div className="tsLpBlog">
                              <h6>Big Face Shorts</h6>
                              <div className="sizeQty">Size : L      |     Quantity : 10</div>
                              <p>The rugged Big Face Shorts from sportswear specialists Mitchell &amp; Ness are a staple in every NY Giants fan's roster.</p>
                          </div>
                          <span className="tsLprice">$ 590.00</span>
                      </div>
                      <div className="tsLpart">
                          <div className="tsLpBlog">
                              <h6>Big Face Shorts</h6>
                              <div className="sizeQty">Size : L      |     Quantity : 10</div>
                              <p>The rugged Big Face Shorts from sportswear specialists Mitchell &amp; Ness are a staple in every NY Giants fan's roster.</p>
                          </div>
                          <span className="tsLprice">$ 590.00</span>
                      </div>
                      <div className="tsLpart">
                          <div className="tsLpBlog">
                              <h6>Big Face Shorts</h6>
                              <div className="sizeQty">Size : L      |     Quantity : 10</div>
                              <p>The rugged Big Face Shorts from sportswear specialists Mitchell &amp; Ness are a staple in every NY Giants fan's roster.</p>
                          </div>
                          <span className="tsLprice">$ 590.00</span>
                      </div>
                      <div className="dividr">sdfds</div>
                      <div className="tsLpart">
                          <div className="tsLpBlog">
                              <h6>Total</h6>                              
                          </div>
                          <span className="tsLprice">$ 1590.00</span>
                      </div>
                  </div>

                  <div className="prevOrdr">Previous Orders</div>
                  <div className="tsListshop">
                      <div className="tsLpart">
                          <div className="tsLpBlog">
                              <h6>Big Face Shorts</h6>
                              <div className="sizeQty">Size : L      |     Quantity : 10</div>
                              <p>The rugged Big Face Shorts from sportswear specialists Mitchell &amp; Ness are a staple in every NY Giants fan's roster.</p>
                          </div>
                          <span className="tsLprice">$ 590.00</span>
                      </div>
                      <div className="tsLpart">
                          <div className="tsLpBlog">
                              <h6>Big Face Shorts</h6>
                              <div className="sizeQty">Size : L      |     Quantity : 10</div>
                              <p>The rugged Big Face Shorts from sportswear specialists Mitchell &amp; Ness are a staple in every NY Giants fan's roster.</p>
                          </div>
                          <span className="tsLprice">$ 590.00</span>
                      </div>
                      <div className="dividr">sdfds</div>
                      <div className="tsLpart">
                          <div className="tsLpBlog">
                              <h6>Total</h6>                              
                          </div>
                          <span className="tsLprice">$ 1590.00</span>
                      </div>
                  </div>


              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
    )
}

export default Order;