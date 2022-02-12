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
import BigUserProfile from "../../../images/big-user-profile.png"
import axios from 'axios'
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"


function ManagerTeamShop(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const [dropdown, setDropdown] = useState([])
  const [shopData, setShopData] = useState([])
  const [teamDropdown, setTeamDropdown] = useState("")
  const [modalValue, setModalValue] = useState(false)
  const [image, Profile] = useState("")
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [jursey, setJursey] = useState("")
  const [size, setSize] = useState("")
  const [desciption, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [brand, setBrand] = useState("")
  const [material, setMaterial] = useState("")
  const [teamId, setTeamID] = useState("")
  const [team, setTeam] = useState([])
  const [profilePic, setProfilePic] = useState([])
  const [schedule, setSchedule] = useState([])
  const [modeValue, setModeValue] = useState(false)
  const [uid, setUId] = useState("")
  const [id, setId] = useState("")

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
    setTeamDropdown(event.target.value)

  }
  const addShopData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('team_id', teamDropdown);
    formData.append('name', name);
    formData.append('jersey_number', jursey);
    formData.append('description', desciption);
    formData.append('price', price);
    formData.append('brand ', brand);
    formData.append('color', color);
    formData.append('material ', material);
    formData.append('size', size);
    formData.append('image', image);
    const requestOptions = {
      method:"POST",
        headers: {
            'x-access-token': user.authtoken
        },
       
    };
    console.log("image--> ",image)
    axios('https://nodeserver.mydevfactory.com:1447/api/add-store-image', 
    {
      method:"POST",
      headers:{
          "Content-Type": "multipart/form-data",
          'x-access-token': user.authtoken
          
      },
      data:formData
  })
        .then((res) => {
            console.log("edit shop Image", res)
            if(res.status==200){
                toast.success("Add Succecfull")
                console.log("Add Image",res)
                teamShopData(teamDropdown)

            }

            if (res.response_code == 4000) {
                dispatch(logoutUser(null))
                localStorage.removeItem("user");
                history.push("/")
                toast.error(res.response_message)
            }
        })

  }

  const handleChange = event => {
    console.log("URL.createObjectURL(event.target.files[0])---->", URL.createObjectURL(event.target.files[0]));
    Profile(event.target.files[0])
    // addShopData(event.target.files[0])

  };
  const save = () => {
    addShopData()
    setModalValue(false)
  }

  const deleteShopData = (id) => {
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
          "id": id
        })
      };
      fetch('https://nodeserver.mydevfactory.com:1447/api/delete-store-product-by-id', requestOptions)
        .then(response => response.json())
        .then((res) => {
          console.log("delete shop  data", res)
          if (res.response_code == 2000) {
            console.log("deleted data", res)
          }
          if (res.response_code == 4000) {
            dispatch(logoutUser(null))
            localStorage.removeItem("user");
            history.push("/")
            toast.error(res.response_message)
          }


          teamShopData(teamDropdown)

        })
    }


  }

  const updateModalValue = (id1, uId) => {
    teamShopData(teamDropdown);
    setModeValue(true)
    setUId(uId)
    setId(id1)
    console.log("idddddd-------->", id1)

  }




  const updateProduct = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('team_id', teamDropdown);
    formData.append('name ', name);
    formData.append('jersey_number', jursey);
    formData.append('description ', desciption);
    formData.append('price', price);
    formData.append('brand ', brand);
    formData.append('color', color);
    formData.append('material ', material);
    formData.append('size', size);
    formData.append('image', image);
    const requestOptions = {
      method:"POST",
        headers: {
            'x-access-token': user.authtoken
        },
       
    };
    console.log("formdata ",formData)
    axios('https://nodeserver.mydevfactory.com:1447/api/edit-store-image', 
    {
      method:"POST",
      headers:{
          "Content-Type": "multipart/form-data",
          'x-access-token': user.authtoken
          
      },
      data:formData
  })
        .then((res) => {
            console.log("edit shop Image", res)
            if(res.status==200){
                toast.success("Edit Succecfull")
                console.log("edit Image",res)
                setModeValue(false)
            }

            if (res.response_code == 4000) {
                dispatch(logoutUser(null))
                localStorage.removeItem("user");
                history.push("/")
                toast.error(res.response_message)
            }
        })
        

}


  console.log("dta--->", shopData)
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
                <select onChange={change}>
                  {dropdown.map((dropdown) => {
                    return (
                      <option value={dropdown._id}>{dropdown.team_name}</option>
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

            <div class="team-shop-page">
              <div class="my-order-section" onClick={() => history.push("./Order")}>
                <a href="#">My Orders</a>
              </div>
              <div class="team-shop-list-box">
                <div class="sort-by-section">
                  <div class="sort-by-section-main">
                    <div class="my-order-section" onClick={() => setModalValue(true)}>
                      <a href="#">Add Product</a>
                    </div>
                  </div>
                </div>


                <div class="team-shop-list-main">
                  <Modal show={modalValue} >

                    <Modal.Body>
                      <div class="prefarance-form playerinfo-form">
                        <h1 style={{ color: "red", fontWeight: "bolder" }}> ADD PRODUCT</h1>
                        <div class="row">

                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Team</h2>

                              <select onChange={change} class="input-select">
                                <option>Select A Team</option>
                                {dropdown.map((dropdown) => {
                                  return (
                                    <option value={dropdown._id}>{dropdown.team_name}</option>
                                  )
                                })}
                              </select>

                            </div>
                          </div>

                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Name</h2>
                              <input type="text" class="input-select" onChange={(e) => setName(e.target.value)} />

                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Jursey Number</h2>
                              <input type="text" class="input-select" onChange={(e) => setJursey(e.target.value)} />

                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Description</h2>
                              <input type="text" class="input-select" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Price</h2>
                              <input type="text" class="input-select" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Brand</h2>
                              <input type="text" class="input-select" onChange={(e) => setBrand(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Color</h2>
                              <select class="input-select" onChange={(e) => setColor(e.target.value)}>
                                <option>Select Color</option>
                                <option>RED</option>
                                <option>BLUE</option>
                                <option>WHITE</option>
                                <option>BLACK</option>
                                <option>YELLOW</option>

                              </select>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Material</h2>
                              <input type="text" class="input-select" onChange={(e) => setMaterial(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Size</h2>

                              <select class="input-select" onChange={(e) => setSize(e.target.value)}>
                                <option>Select Size</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>2XL</option>
                                <option>3XL</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="update-team-photo" style={{ width: "100%" }}>
                              Choose Image
                              <input type="file" name='img' onChange={(event) => handleChange(event)} />

                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list" >
                              <button class="add-links" onClick={() => setModalValue(false)}>CANCEL</button>
                              <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} onClick={save} >SAVE</button>
                            </div>
                          </div>



                        </div>
                      </div>

                    </Modal.Body>

                  </Modal>
                  {shopData.length == 0 ?
                    <div class="team-shop-list-main">
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
                    shopData.map((data, id) => {
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
                            <div class="product-size" style={{ flexDirection: "row" }}>{data.size}

                              <img src={Delect} style={{ marginLeft: "75%", marginRight: "10px", background: "orangered" }} onClick={() => deleteShopData(data._id)} />
                              <img src={pencil} onClick={() => updateModalValue(id, data._id)} />
                            </div>
                          </div>
                        </div>

                      )
                    })



                  }

                  {modeValue ? <Modal show={modeValue} style={{ position: "absolute", top: "206px" }}>

                    <Modal.Body>
                    <div class="prefarance-form playerinfo-form">
                        <h1 style={{ color: "red", fontWeight: "bolder" }}> Edit PRODUCT</h1>
                        <div class="row">

                         

                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Name</h2>
                              <input type="text" class="input-select" onChange={(e) => setName(e.target.value)} />

                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Jursey Number</h2>
                              <input type="text" class="input-select" onChange={(e) => setJursey(e.target.value)} />

                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Description</h2>
                              <input type="text" class="input-select" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Price</h2>
                              <input type="text" class="input-select" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Brand</h2>
                              <input type="text" class="input-select" onChange={(e) => setBrand(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Color</h2>
                              <select class="input-select" onChange={(e) => setColor(e.target.value)}>
                                <option>Select Color</option>
                                <option>RED</option>
                                <option>BLUE</option>
                                <option>WHITE</option>
                                <option>BLACK</option>
                                <option>YELLOW</option>

                              </select>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Material</h2>
                              <input type="text" class="input-select" onChange={(e) => setMaterial(e.target.value)} />
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="prefarance-form-list">
                              <h2>Size</h2>

                              <select class="input-select" onChange={(e) => setSize(e.target.value)}>
                                <option>Select Size</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>2XL</option>
                                <option>3XL</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="update-team-photo" style={{ width: "100%" }}>
                              Choose Image
                              <input type="file" name='img' onChange={(event) => handleChange(event)} />

                            </div>
                          </div>
                         



                        </div>
                      </div>



                      <button class="add-links" style={{ margin: "10px" }} onClick={() => setModeValue(false)}>Cancel</button>
                      <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={updateProduct} >Update</button>
                    </Modal.Body>

                  </Modal> : ""}



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

export default ManagerTeamShop;
