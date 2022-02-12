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
import "../Login/style.css"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import Logo from "../../../images/logo.png"
import OtpInput from 'react-otp-input';
import { Network } from '../../../Services/Api';
import { ToastContainer, toast } from 'react-toastify';

function VerifyOtpComponents(props) {
  const history = useHistory();
  const location = useLocation();
  console.log("skgjjsgjjfgj",location.state)
  const [otp, setOtp] = useState('')
 
  

  const handleSubmit = (event) => {
    var obj = {
      "email": location.state.email,
      'otp': otp,
      'otp_type': location.state && location.state.otp_type === "forgot_password" ? "forgot_password" : "email_verification"
    }
    console.log("dffdfdf",obj)
    Network('api/verify-otp ', 'post', obj)
      .then(async (res) => {
        console.log("res success verify otp--->", res);
        if (res.response_code == 2000) {
          if(location.state.otp_type === "forgot_password"){
            history.push({
              pathname: '/resetpassword',
              state: {
                id: 7,
                userId: res.response_data._id,
                otp_type: "forgot_password"
              }
            })
          }else{
            toast.success(res.response_message)
            props.history.push("/")
          }
        } else {
          toast.error(res.response_message)
        }
      })
      .catch((error) => {
        console.log("error===>", error)
      });
      event.preventDefault();
  }

  return (
    <>
       <div class="login-container" style={{ flexGrow: 1 }}>
        <a href="#"><img src={Logo} alt="" /></a>
        <div style={{ paddingBottom: 60 }}>
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Verify Otp</h4>
              </div>
            <div class="modal-body">
              <form  onSubmit={handleSubmit}>
                <div style={{ alignItems: 'center', display: "flex", justifyContent: 'center', height: 200 }}>
                  <OtpInput
                    value={otp}
                    onChange={(otp)=>{setOtp(otp)}}
                    shouldAutoFocus={false}
                    numInputs={4}
                    placeholder={"000000"}
                    containerStyle={{ borderColor: 'red', borderWidth: 2, borderRadius: 10 }}
                    inputStyle={{
                      width: '3rem',
                      height: '3rem',
                      margin: '20px 1rem',
                      fontSize: '2rem',
                      borderRadius: 4,
                      border: '2px solid rgba(0,0,0,0.3)',
                    }}
                    separator={<span style={{ fontSize: 20 }}> - </span>}
                  />
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

export default VerifyOtpComponents;