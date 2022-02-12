import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import '../../../Utils/css/style.css';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import Logo from "../../../images/logo.png"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
// import { loginUser } from "../../Redux/Reducer/auth"
import MyLoader from "../../../Components/Comman/loader"
import { ToastContainer, toast } from 'react-toastify';

function ResetComponents(props) {
  const location = useLocation();
  const history = useHistory();
  console.log("skgjjsgjjfgj",location.state)
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [input, setInput] = useState({})
  const [errors, setError] = useState({})
  


  const handleSubmit  = (event) => {
    if (validate()) {
    var obj = {
      "password": input['password'],
      "id": location.state.userId
    }
    Network('api/reset-password', 'post', obj)
      .then(async (res) => {
        console.log("res success verify otp--->", res);
        if (res.response_code == 2000) {
          toast.success(res.response_message)
          history.push("/")
        } else {
          toast.error(res.response_message)
        }
      })
      .catch((error) => {
        console.log("error===>", error)
      });
  }
  event.preventDefault();
  }
  const validate = () => {
    let input1 = input;
    let errors = {};
    let isValid = true;
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
    setError(errors)
    return isValid;
  }

  const handleChange = (event) => {
    let input1 = input;
    input1[event.target.name] = event.target.value;
    console.log(input1)
    setInput(input1)
  }

  return (
    <>
      <div class="login-container" style={{ flexGrow: 1 }}>
        <a href="#"><img src={Logo} alt="" /></a>
        <div style={{ paddingBottom: 60 }}>
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Reset Password</h4>
              </div>
              <div class="modal-body">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" onChange={handleChange} name="password"/>
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.password}
                    </span>
                  </div>
                  <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" class="form-control" onChange={handleChange} name="confirmpassword"/>
                    <span style={{ color: "red", fontSize: 12 }}>
                      {errors.confirmpassword}
                    </span>
                  </div>
                  <div class="btn-set">
                    <button type="submit" class="btn btn-deflt">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetComponents;