import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import listImage from "../../../images/list-pro1.png"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"

const AddShopData = () => {
    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />

            <div class="tab-content">
                <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="prefarance-tab-content">

                        <div class="prefarance-form playerinfo-form">

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="prefarance-form-list">
                                        <img src={listImage} alt="" />
                                    </div>
                                    <div style={{ display: "flex" ,marginLeft:"10%"}}>
                                    <div class="prefarance-form-list">
                                        <img src={listImage} alt="" className="imgSize" />
                                    </div>
                                    <div class="prefarance-form-list">
                                        <img src={listImage} alt="" className="imgSize"  />
                                    </div>
                                    <div class="prefarance-form-list">
                                        <img src={listImage} alt="" className="imgSize"  />
                                    </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p style={{ color: "white", fontSize: "Larger" }}>Officially Licensed Gear</p>
                                            <p style={{ color: "white", fontSize: "Larger", fontWeight: "bolder", paddingTop: "15px", paddingBottom: "15px" }}>Men's Chicago Bulls Wendell Carter Jr. Nike Red

                                                Swingman Team Jersey</p>
                                            <p style={{ color: "green", fontSize: "Larger" }}> In Stock - This item will ship within two business days.</p>
                                            <span style={{ color: "red", fontSize: "30px", paddingTop: "20px", paddingBottom: "20px", fontWeight: "bolder" }}>$82.49</span>
                                            <p style={{ color: "white", fontSize: "Larger" }}>Regular: $109.99</p>
                                            <p style={{ color: "green", fontSize: "Larger" ,paddingTop:"25px"}}>You Save: $27.50 on select sizes</p>
                                        </div>
                                        <div class="row" style={{
                                            marginTop: "10%",
                                            backgroundColor: "gray",
                                            padding: "4%",
                                            borderRadius: "10px"
                                        }}>

                                            <div class="col-md-12">
                                                <span style={{paddingRight:"73%"}}>Size</span>  <span style={{color:"red"}}> Size Chart</span>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="prefarance-form-list">
                                                    <div style={{ display: "flex" }}>
                                                        <div className="sizebox">S<br></br>
                                                        </div>
                                                        <div className="sizebox">M<br></br>
                                                        </div>
                                                        <div className="sizebox">L<br></br>
                                                        </div>
                                                        <div className="sizebox">XL<br></br>
                                                        </div>
                                                        <div className="sizebox">2XL<br></br>
                                                        </div>
                                                        <div className="sizebox">3XL<br></br>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="prefarance-form-list">
                                                    <label >Jursey No</label>
                                                    <input type="text" class="input-select" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="prefarance-form-list">
                                                    <label >Quantity</label>
                                                    <input type="number" class="input-select" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="prefarance-form-list">
                                                    <label >  </label>
                                                    <button class="Addcart">Add To Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="prefarance-form-list">
                                                    <label>Shipping</label>
                                                    <ul style={{color:"white"}}>
                                                        <li>This item will ship within two business days.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="prefarance-form-list">
                                                    <label>Details</label>
                                                    <ul style={{color:"white"}}>
                                                        <li>Product ID: 3231566</li>
                                                        <li>Fit: Men's Nike Swingman Jerseys have an athletic cut. For a looser fit, we recommend ordering one size larger than you normally wear.</li>
                                                        <li>Material: 100% Recycled Polyester</li>
                                                        <li>Nike Dry fabrics move sweat from your skin for quicker evaporation – helping you stay dry, comfortable and focused on the task at hand</li>
                                                        <li>Dri-FIT ® technology wicks away moisture</li>
                                                        <li>Rib-knit collar and arms</li>
                                                        <li>Woven authentic Swingman jersey jock tag</li>
                                                        <li>Back neck taping</li>
                                                        <li>Men's Nike Swingman Jerseys have an athletic cut. For a looser fit, we recommend ordering one size larger than you normally wear</li>
                                                        <li>Heat-sealed fabric applique graphics</li>
                                                        <li>Machine wash, tumble dry low</li>
                                                        <li>Tagless Collar</li>
                                                        <li>Officially licensed</li>
                                                        <li>Imported</li>
                                                        <li>Brand: Nike</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="prefarance-form-list">
                                                    <label>Details</label>
                                                    <ul style={{color:"white"}}>
                                                        <li>When you put on this Wendell Carter Jr. Chicago Bulls Icon Swingman team jersey from Nike, you'll feel like you're out on the court ready to shoot free throws. While you're on the court, the Dri-FIT and Nike Dry technologies built into this jersey will keep you comfortable by wicking moisture away from your body.</li>
                                                    </ul>
                                                </div>
                                            </div>






                                        </div>
                                    </div>







                                    {/* <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Links</label>
                                                            <button class="add-links">Add Links</button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Files</label>
                                                            <button class="add-links">Add Files</button>
                                                        </div>
                                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}
export default AddShopData;