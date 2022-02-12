import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import "../Signup/style.css"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import Logo from "../../../images/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import { Network } from '../../../Services/Api';
import MyLoader from "../../../Components/Comman/loader"

const sportsName = [
  {
    "name": "Cricket",
    "value": "cricket"
  },
  {
    "name": "Football",
    "value": "football"
  },
]

const userTypeName = [
  {
    "name": "player",
    "value": "player"
  },
  {
    "name": "manager",
    "value": "manager"
  },
]

function SignUpComponents(props) {



  const history = useHistory();

  const [input, setInput] = useState({})
  const [errors, setError] = useState({})
  const [sports, setsports] = useState("cricket")
  const [userType, setUserType] = useState("player")
  const [loader, setLoader] = useState(false)

  const handleSubmit = (event) => {
    if (validate()) {
      const obj = {
        "email": input['email'],
        "password": input['password'],
        "apptype": "ANDROID",
        "fname": input['firstName'],
        "lname": input['lastName'],
        "sports": sports,
        "Parent_name": input['parentName'],
        "user_type": userType,
        "team_name": input['teamName'],
        "gender":"MALE"
        // "isAgreed":true
      }
      console.log("res success register--->", obj);
      setLoader(true)
      Network('api/register', 'post', obj)
        .then(async (res) => {
          console.log("res success register--->", res);
          if (res.response_code == 2000) {
            setLoader(false)
            toast.success(res.response_message)
            generateOtp()
            history.push({
              pathname: '/verifyotp',
              state: {
                id: 7,
                email: input['email']
              }
            })
          } else {
            setLoader(false)
            toast.error(res.response_message)
          }
        })
        .catch((error) => {
          setLoader(false)
          console.log("error===>", error)
        });

    }
    event.preventDefault();
  }

  const generateOtp  = () => {
    var obj = {
      "email": input['email'],
      'otp_type': "email_verification"
    }

    Network('api/generate-otp', 'post', obj)
      .then(async (res) => {
        console.log("res success verify otp--->", res);
        if (res.response_code == 2000) {
          toast.success(res.response_message)
        } else {
          toast.error(res.response_message)
        }
      })
      .catch((error) => {
        console.log("error===>", error)
      });
  }

  const handleChange = (event) => {
    let input1 = input;
    input1[event.target.name] = event.target.value;
    console.log(input1)
    setInput(input1)
  }

  const validate = () => {
    let input1 = input;
    let errors = {};
    let isValid = true;

    if (!input1["firstName"]) {
      isValid = false;
      errors["firstName"] = "Please enter your first name.";
    }

    if (!input1["lastName"]) {
      isValid = false;
      errors["lastName"] = "Please enter your last name.";
    }

    if (!input1["parentName"]) {
      isValid = false;
      errors["mobile"] = "Please enter your parent name.";
    }

    if (!input1["teamName"]) {
      isValid = false;
      errors["teamName"] = "Please enter team name.";
    }

    if (!input1["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input1["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input1["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!input1["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (input1["confirmpassword"] == input1["password"]) {
      isValid = true
    } else {
      isValid = false;
      errors["confirmpassword"] = "Passwords do not match.";
    }
    if (!input1["terms"]) {
      isValid = false;
      errors["terms"] = "Please select terms & conditions";
    }

    setError(errors)

    return isValid;
  }

 

  const handleSports = (e) => {
    setsports(e.target.value)
  }

  const handleUserType = (e) => {
    setUserType(e.target.value)
  }


  return (
    <>
      <MyLoader active={loader}>
      <div class="signup-container" style={{ flexGrow: 1 }}>
        <a href="#"><img src={Logo} alt="" /></a>
        <div style={{ paddingBottom: 50 }}>
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Register</h4>
              </div>
              <div class="modal-body">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" onChange={handleChange} name="firstName" />
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.firstName}
                    </span>
                  </div>

                  <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" onChange={handleChange} name="lastName" />
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.lastName}
                    </span>
                  </div>

                  <div class="form-group">
                    <label>Team Name</label>
                    <input type="text" class="form-control" onChange={handleChange} name="teamName" />
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.teamName}
                    </span>
                  </div>

                  <div class="form-group">
                    <label>Sports</label>
                    <select onChange={(value)=>setsports(value.target.value)} name="SportsName" class="form-control">
                      {
                        sportsName.map((item) => {
                          return (
                            <option value={item.value} name="Sports">{item.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div class="form-group">
                    <label>userType</label>
                    <select  onChange={(value)=>setUserType(value.target.value)} name="usertype" class="form-control">
                      {
                        userTypeName.map((item) => {
                          return (
                            <option value={item.value} name="usertype">{item.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Parent/Guardian Name</label>
                    <input type="text" class="form-control" onChange={handleChange} name="parentName" />
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.parentName}
                    </span>
                  </div>


                  <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" onChange={handleChange} name="email" />
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.email}
                    </span>
                  </div>

                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" onChange={handleChange} name="password" />
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.password}
                    </span>
                  </div>

                  <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" class="form-control" onChange={handleChange} name="confirmpassword" />
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.confirmpassword}
                    </span>
                  </div>
                 <div style={{alignItems:"center",paddingLeft:20}}>
                 <h4 id="already-have-account"><input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={handleChange} name='terms' /> I agree to the <a href="#"  style={{ color: "white", cursor: "pointer" }}>Terms of Service</a> and <a href="#"  style={{ color: "white", cursor: "pointer" }}>Privary Policy</a></h4>
                  <span style={{ color: "red", fontSize: 12 }}>
                    {errors.terms}
                  </span>
                 </div>
                 
                  <div class="btn-set">
                    <button type="submit" class="btn btn-deflt">Submit</button>
                  </div>
                  <div id="already-have-account">
                    Already have an account?{" "}
                    <a
                      style={{ color: "white", cursor: "pointer" }}
                      onClick={() => history.push("/")}
                    >
                      Login
                  </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </MyLoader>
    </>
  );
}

export default SignUpComponents;