import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../Login/style.css"
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import Logo from "../../../images/logo.png"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
 import { loginUser } from "../../../Redux/Actions/auth"
import MyLoader from "../../../Components/Comman/loader"
import { ToastContainer, toast } from 'react-toastify';

function LoginComponents(props) {
  const history = useHistory();

  const [input, setInput] = useState({})
  const [errors, setError] = useState({})
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)


  const validate = () => {
    let input1 = input;
    let errors = {};
    let isValid = true;

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
    setError(errors)
    return isValid;
  }
  //.........for on change mether.............

  const handleChange = (event) => {
    let input1 = input;
    input1[event.target.name] = event.target.value;
    console.log(input1)
    setInput(input1)
  }

  //.........Login submit............

  const handleSubmit = (event) => {
    if (validate()) {
      var obj = {
        "email": input['email'],
        "password": input['password'],
        "apptype": "ANDROID",
        "devicetoken": "123456"
      }
      // console.log("obj submit for log in ----->", obj)
      setLoader(true)
      Network('api/login', 'post', obj)
        .then(async (res) => {
          // console.log("res success login--->", res);
          if (res.response_code == 2000) {
            toast.success(res.response_message)
            setLoader(false)
            localStorage.setItem('user', JSON.stringify(res.response_data));
             dispatch(loginUser(res.response_data))
             props.history.replace("/");
          } else {
            toast.error(res.response_message)
            setLoader(false)
          }
        })
        .catch((error) => {
          setLoader(false)
          console.log("error===>", error)
        });
    }
    event.preventDefault();
  }


  return (
    <>
      <MyLoader active={loader}>
      <div class="login-container" style={{ flexGrow: 1 }}>
        <a href="#"><img src={Logo} alt="" /></a>
        <div style={{ paddingBottom: 60 }}>
          <div class="modal-dialog custom-modal">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Login</h4>
              </div>

              <div class="modal-body">
                <form onSubmit={handleSubmit}>
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
                  <div style={{ position: "absolute", right: 20 }}>
                    <Link to="/forgetpassword">
                      <h3><a href="#" class="forget-title">Forgot Password?</a></h3>
                    </Link>
                  </div>
                  <div class="btn-set">
                    <button type="submit" class="btn btn-deflt">Submit</button>
                  </div>
                  <div>
                    <p id="account">
                      Don't have an account? {"  "}
                      <Link to="/signup">
                        <a
                          //  onClick={() => history.push("/signup")}
                          style={{ color: "white", cursor: "pointer" }}
                        >
                          Sign Up
                </a>
                      </Link>
                    </p>
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

export default LoginComponents;