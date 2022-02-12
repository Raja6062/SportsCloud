import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import '../../Utils/css/style.css';
import '../../Utils/css/responsive.css';
import "../../Utils/css/bootstrap.min.css"
import "../../Utils/css/bootstrap-datepicker.css"
import face from "../../images/Face.png"
import twitte from "../../images/twitte.png"
import insta from "../../images/insta.png"


function Footer(props) {
    const history = useHistory();

    return (
        <center>
            <div class="footer">
                <div class="copy-right">
                    Copyright © 2020 Evolution Athletics  |  <a href="#">Privacy Policy</a>  |
                                                                 <a href="#">Terms of Service</a>
                </div>
                <div class="social-icon-footer">
                    <p><a href="#"><img src={face} alt="" /></a> <a href="#"><img src={twitte} alt="" /></a> <a href="#"><img src={insta} alt="" /></a></p>
                </div>
            </div>
        </center>
    );
}

export default Footer;
