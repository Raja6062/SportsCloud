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
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import { propTypes } from 'react-bootstrap/esm/Image';

const SideNav = (props) => {
    const history = useHistory();
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    return (
        <div style={{ width: "25%", padding: "10px", border: "1px solid gray" }}>

            <div className="accorDianbg">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-head" id="headingOne">
                            <h2 class="mb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={() => { history.push("/TeamMassage") }}>
                                Email
                            </h2>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                <p onClick={() => { history.push("/TeamMassage") }}>Compose Mail</p>
                                <p onClick={() => { history.push("/Inbox") }}>Inbox</p>
                                <p onClick={() => { history.push("/Sent") }}>Sent</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head" id="headingTwo">
                            <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={() => { history.push("/Alert") }}>
                                Chat
                            </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">

                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head" id="headingThree">
                            <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={() => { history.push("/Inbox") }}>
                                Alart
                            </h2>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                                <p onClick={() => { history.push("/Alert") }}>New ALert</p>
                                <p onClick={() => { history.push("/AlertInbox") }}>Inbox</p>
                                <p onClick={() => { history.push("/AlertSent") }}>Sent</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-head" id="headingThree">
                            <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={() => { history.push("/Post") }}>
                                Posts
                            </h2>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                                <p onClick={() => { history.push("/NewPost") }}>New Post</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default SideNav;