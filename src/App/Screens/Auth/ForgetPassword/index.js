import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
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

function ForgetComponents(props) {

  const history = useHistory();

  const [input, setInput] = useState({})
  const [errors, setError] = useState({})
  


  const handleSubmit  = (event) => {
    var obj = {
      "email": input['email'],
      'otp_type': "forgot_password"
    }
    Network('api/generate-otp', 'post', obj)
      .then(async (res) => {
        console.log("res success verify otp--->", res);
        if (res.response_code == 2000) {
          toast.success(res.response_message)
          history.push({
            pathname: '/verifyotp',
            state: {
              id: 7,
              email: input['email'],
              otp_type: "forgot_password"
            }
          })
        } else {
          toast.error(res.response_message)
        }
      })
      .catch((error) => {
        console.log("error===>", error)
      });
      event.preventDefault();
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
        <div style={{ paddingBottom: 120 }}>
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Forget Password</h4>
              </div>

              <div class="modal-body">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" onChange={handleChange} name="email" />
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

export default ForgetComponents;