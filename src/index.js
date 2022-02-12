import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './App/Redux/Reducer/index';
import { ToastContainer, toast } from 'react-toastify';
const middleware = [
  thunk,
  // logger
]
const initialState = {}


// import reduxStore from './App/Redux/reduxConfig'

// const store = reduxStore()

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware)))

  

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// * {
// 	margin: 0;
// 	padding: 0;
// 	border: none;
// 	outline: none;
// }
// body {
// 	margin: 0;
// 	padding: 0;
// 	font-family: 'Barlow Semi Condensed', sans-serif;
// 	font-family: 'Barlow Condensed', sans-serif;
// }
// h1,
// h2,
// h3,
// h4,
// h5,
// h6,
// h1 a,
// h2 a,
// h3 a,
// h4 a,
// h5 a,
// h6 a {
// 	color: #000;	
// 	margin-bottom: 10px;
// }
// h1,
// h1 a {
// 	font-size: 28px;
// 	font-weight: 700;
// }
// h2,
// h2 a {
// 	font-size: 24px;
// 	font-weight: 500;
// }
// h3,
// h3 a {
// 	font-size: 20px;
// 	font-weight: 400;
// }
// h4,
// h4 a {
// 	font-size: 18px;
// 	font-weight: 300;
// }
// h5,
// h5 a {
// 	font-size: 16px;
// 	font-weight: 300;
// }
// h6,
// h6 a {
// 	font-size: 14px;
// 	font-weight: 300;
// }
// p,
// ul,
// ol {
// 	color: #000;
// 	font-size: 14px;
// 	font-weight: 400;
// 	margin: 0 0 10px 0;
// 	line-height: 22px;
// }
// ul {
// 	margin: 0;
// 	padding: 0;
// }
// ul li {
// 	list-style: none;
// }
// a,
// button {
// 	-webkit-transition: all 0.5s ease;
// 	-moz-transition: all 0.5s ease;
// 	-o-transition: all 0.5s ease;
// 	transition: all 0.5s ease;
// }
// a,
// a:hover,
// a:focus {
// 	text-decoration: none;
// 	outline: none;
// }
// img {
// 	max-width: 100%;
// 	border: none;
// 	outline: none;
// 	padding: 0;
// 	margin: 0
// }
// .home-menu-sec{
//   height: 110vh;
// 	background-size: cover;
// 	background-position: center;
// }
// .banner-area{
//   margin-top: -400px;
// }
// .banner-area h1{
// 	font-family: 'Barlow Semi Condensed', sans-serif;
// 	font-size: 80px;
// 	font-weight: 800;
// 	text-align: center;
// 	color: #fff;
// 	text-transform: uppercase;
//   letter-spacing: 5px;
// }
// .banner-area h3{
// 	font-family: 'Barlow Condensed', sans-serif;
// 	font-size: 24px;
// 	font-weight: 400;
// 	text-align: center;
// 	color: #fff;
//   letter-spacing: 1px;
// }
// .ban-serch {
// 	background-color: #fff;
// 	margin-top: -165px;
// 	border-radius: 15px 15px 0px 0px;
// 	position: relative;
// }
// .ban-serch .col-md-2 {
//     -webkit-box-flex: 0;
//     -ms-flex: 0 0 20%;
//     flex: 0 0 20%;
//     max-width: 20%;
// }
// .ban-serch h5{
// 	font-family: 'Barlow Condensed', sans-serif;
// 	font-size: 18px;
//     text-transform: uppercase;
//     font-weight: 600;
//     color: #353535;
// }
// .ban-serch select{
// 	font-size: 42px;
// 	color: #353535;
// 	text-transform: uppercase;
// }
// .checkavai{
// 	float: right;
// }
// .dates.input-group {
//     margin-top: 25px;
// }
// .ban-serch .custom-select {
//     display: inline-block;
//     width: 100%;
//     height: auto;
//     padding: 0px 50px;
//     line-height: 1.5;
//     color: #495057;
//     vertical-align: middle;
//     background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
//     background-size: 100px 30px;
//      border: none; 
//     border-radius: .25rem;
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     appearance: none;
// }
// .y{
// 	padding: 31px 30px;
// }
// .checkavai button{
//     padding: 53px 45px;
//     outline: none;
//     margin-left: 30px;
//     font-size: 20px;
//     color: #fff;
//     background-color: #bd1313;
//     font-family: 'Barlow Condensed', sans-serif;
//     text-transform: uppercase;
//     position: absolute;
//     border-radius: 0px 15px 0px 0px;
//     font-weight: 500;
//     margin-left: -11px; 
// }
// .maps iframe{
// 	position: absolute;
// 	left: 0;
// }
// .home-section-one{
// 	padding:100px 0px;
// }
// .home-section-one img{
// 	height: 150px;
// 	width: 100%;
// }
// #s1{
// 	margin-top: 20px;
// 	margin-bottom: 20px;
// }
// .home-section-one h2{
//   font-size: 30px;
//   font-family: 'Barlow Semi Condensed', sans-serif;
//   font-weight: 600;
// }
// .home-section-one h5{
//   font-size: 18px;
//   font-family: 'Barlow Semi Condensed', sans-serif;
//   font-weight: 400;
//   color: #939393;
// }
// .home-section-one h4{
// 	font-size: 18px;
// 	font-family: 'Barlow Semi Condensed', sans-serif;
// 	font-weight: 600;
// }
// .home-section-one span{
// 	font-size: 18px;
// 	font-family: 'Barlow Semi Condensed', sans-serif;
// 	color: #bd1313;
// 	font-weight: 600;
// }
// .home-section-one h3{
// 	position: absolute;
// 	top: 0;
// 	right: 0;
// 	background-color: #fff;
// 	margin-right: 15px;
// 	padding: 10px;
// 	text-align: right;
// }
// .home-section-one small{
//    color: #dfbc20;
//    font-size: 18px;
//    font-weight: 600;
// }
// .home-section-one h3{
//    color: #000;
//    font-size: 18px;
//    font-weight: 600;
// }
// .home-section-two {
// 	padding-bottom: 100px;
// }
// .home-section-two h5{
//   font-family: 'Barlow Semi Condensed', sans-serif;	
//   color: #686868;
//   font-size: 18px;
//   text-align: center;
//   text-transform: uppercase;
//    font-weight: 500;
// }
// .home-section-two h2{
//   font-family: 'Barlow Semi Condensed', sans-serif;	
//   color: #252525;
//   font-size: 40px;
//   text-align: center;
//   text-transform: uppercase;
//   font-weight: 600;
// }
// .full img{
//    height: auto;
//    width: 2%;
//    margin: auto;
//    display: block;
//    margin-bottom: 40px;
// }
// .home-section-two h3{
// 	position: absolute;
// 	font-family: 'Barlow Semi Condensed', sans-serif;	
// 	margin-top: -80px;
// 	color: #fff;
// 	font-size: 30px;
// 	left: 0;
// 	margin-left: 30px;
// 	font-weight: 600;
// }
// .home-section-two h4{
// 	position: absolute;
// 	font-family: 'Barlow Semi Condensed', sans-serif;	
// 	margin-top: -40px;
// 	color: #fff;
// 	font-size: 18px;
// 	left: 0;
// 	margin-left: 30px;
// }
// .home-section-three{
// 	background-image: url(../images/Layer533.png);
// 	background-position: center;
// 	background-size: cover;
// 	padding-top: 30px;
// 	padding-bottom: 70px;
// }
// .home-section-three h6{
//   font-size: 18px;
//   font-family: 'Barlow Semi Condensed', sans-serif;
//   text-transform: uppercase;
//   color: #686868;
//   font-weight: 600;
// }
// .home-section-three h2{
//   font-size: 40px;
//   font-family: 'Barlow Semi Condensed', sans-serif;
//   text-transform: uppercase;
//   color: #000;
//   font-weight: 600;
// }
// .home-section-three h2::before {
//     content: url(../images/full-two.png);
//     position: absolute;
//     margin-left: -55px;
//     margin-top: -25px;
//     width: 100%;  
// }

// .home-section-three p{
//   font-size: 18px;
//   font-family: 'Barlow Condensed', sans-serif;
//   text-transform: capitalize;
//   color: #686868;
//   margin-bottom: 15px;
//   margin-top: 15px;
// }
// .home-section-three ul li{
// 	color: #1a2031;
// 	font-size:18px;
// 	text-transform: uppercase;
// 	font-weight: 600;
// 	padding-top: 10px;
// }
// .home-section-three img{
// 	margin-right: 30px;
// }
// .profile-sec {
//   border: 1px solid #e2e2e2;
//   padding: 30px 20px;
// }
// .profile {
//   margin: auto;
//   height: auto;
//   display: block;
//   width: 38%;
//   margin-bottom: 80px;
//   border-radius: 50%;
// }
// .pencil {
//   margin: auto;
//   height: auto;
//   display: block;
//   width: 15%;
//   margin-top: -104px;
//   margin-left: 147px;
//   margin-bottom: 30px;
// }
// .book-now{
// 	margin-top: 100px;
// }
// .book-now a{
//   padding: 20px 80px;
//   background-color: #027dff;
//   color: #fff;
//   text-transform: uppercase;
//   font-family: 'Barlow Condensed', sans-serif;
//   border-radius: 10px;
//   font-size: 18px;
//   letter-spacing: 2px;
// }
// .home-section-four{
// 	background-image: url(../images/Rectangle.png);
// 	background-position: center;
// 	background-size: cover;
// 	padding-top: 50px;
// 	margin-bottom: 130px;
// }
// .home-section-four h2{
//   font-family: 'Barlow Semi Condensed', sans-serif;	
//   color: #252525;
//   font-size: 40px;
//   font-weight: 600;
//   padding-top: 80px;
// }
// .home-section-four p{
// 	font-family: 'Barlow Semi Condensed', sans-serif;	
//     color: #252525;
//     font-size: 24px;
//     margin-top: 40px;
//     font-weight: 600;
// }
// .book-no{
// 	margin-top: 80px;
// 	margin-bottom: 150px;
// }
// .home-section-four img{
// 	max-width: 120%;
// }
// .book-no a{
//   padding: 20px 50px;
//   background-color: #fff;
//   color: #252525;
//   text-transform: uppercase;
//   font-family: 'Barlow Condensed', sans-serif;
//   border-radius: 10px;
//   font-size: 18px;
//   font-weight: 600;
//   letter-spacing: 2px;
// }
// .home-section-four h2::before {
//     content: url(../images/full-two.png);
//     position: absolute;
//     margin-left: -50px;
//     margin-top: -20px;
//     width: 100%;  
// }
// .newsletter h2{
//   color: #fff;
//   font-family: 'Barlow Condensed', sans-serif;
//   font-size: 36px;
//   font-weight: 400;
//   letter-spacing: 2px;
// }
// .newsletter h4{
//   color: #fff;
//   font-family: 'Barlow Condensed', sans-serif;
//   font-size: 24px;
//   font-weight: 400;
//   letter-spacing: 2px;
// }
// .newsletter{
// 	background-image: url(../images/newsletter.png);
// 	background-position: center;
// 	background-size: cover;
// 	padding:70px 0px; 
// }
// .newsletter form{
// 	display: inline-flex;
// 	margin-top: 10px;
// }
// .form-con {
//     display: block;
//     width: 100%;
//     padding: 3% 60% 3% 5%;
//     font-size: 18px;
//     line-height: 1.5;
//     color: #495057;
//     background-color: transparent;
//     background-clip: padding-box;
//     border-bottom: 2px solid #ced4da !important;
//     border-radius: .25rem;
//     transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
// }
// .go-btn{
// 	margin-left: 20px;
// }
// .go-btn button{
// 	padding:10px 20px;
// 	font-size: 24px;
// 	background-color: #ecc818;
// 	color: #fff;
// 	border-radius: 10px;
// 	font-family: 'Barlow Condensed', sans-serif;
// 	outline: none;
// }

// .newsletter ::placeholder {
//   color: #fff;
//   opacity: .8;
// }
// .footer{
// 	background-color: #011933;
// 	padding-top: 70px;
// 	margin-top: -15px;
// }
// .footer ul li a{
// 	font-size: 20px;
// 	padding:10px 0px;
// 	color: #a0a6ad;
// 	transition: 0.3s;
// }
// .footer ul li a:hover{
// 	font-size: 21px;
// 	padding:10px 0px;
// 	color: #fff;
// 	transition: 0.3s;
// }
// .footer ul li{
// 	font-size: 20px;
// 	padding:7px 0px;
// 	color: #fff;
// }
// .footer h3{
// 	font-size: 20px;
// 	padding:7px 0px;
// 	color: #fff;
// }
// .footer-one ul{
// 	margin-top: 30px;
// 	margin-left: 20px;
// }
// .footer-one ul a{
// 	margin-top: 10px;
// }
// .footer-two{
// 	margin-top: 30px;
// }
// .footer-three{
// 	margin-top: 30px;
// }
// .footer-four{
// 	margin-top: 30px;
// }
// hr{
// 	background-color: #515151;
// 	margin-top: 50px;
// }
// .copy-right h5{
//   color: #a0a6ad;
//   font-size: 20px;
// }
// .copy-right{
// 	padding: 10px 0px;
// }
// .copy-right a{
//   color: #fff;
//   font-size: 20px;
// }
// .copy-right ul{
// 	text-align: right;
// }
// .copy-right ul li{
// 	display: inline-block;
// 	padding:0px 20px;
// }
// .copy-right ul li a{
// 	color: #fff !important;
// 	font-size: 20px !important;
// 	padding-bottom: 0px !important;
// }

// /*////////////become host//////////////////////////////*/
// .banner-ar h1 {
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     font-size: 80px;
//     font-weight: 800;
//     text-align: center;
//     color: #fff;
//     text-transform: uppercase;
//     letter-spacing: 5px;
//     padding-top: 100px;
//     padding-bottom: 100px;
// }
// .become-host-one{
//   padding: 100px 0px;
// }
// .become-host-one p{
//    font-family: 'Barlow Condensed', sans-serif;
//    font-size: 16px;
//    color: #7e7e7e;
// }
// .become-host-one h5{
//    font-family: 'Barlow Condensed', sans-serif;
//    font-size: 24px;
//    color: #2a2a2a;
//    font-weight: 600;
//    text-transform: uppercase;
// }
// .form-cont {
//     display: block;
//     width: 100%;
//     padding: 3% 60% 3% 1%;
//     font-size: 18px;
//     line-height: 1.5;
//     color: #495057;
//     background-color: transparent;
//     background-clip: padding-box;
//     border-bottom: 2px solid #ced4da !important;
//     border-radius: .25rem;
//     transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
// }
// .modal-header{
//   border-bottom: none !important;
// }
// .login-modal h2{
//    text-align: center;
//    font-size: 40px;
//    text-transform: uppercase;
//    font-family: 'Barlow Semi Condensed', sans-serif;
// }

// .login-modal h5{
//    text-align: center;
//    font-size: 28px;
//    font-family: 'Barlow Condensed', sans-serif;
//    color: #565656;
// }
// .formcont {
//     display: block;
//     width: 190%;
//     padding: 3% 60% 3% 1%;
//     font-size: 18px;
//     line-height: 1.5;
//     color: #495057;
//     background-color: transparent;
//     background-clip: padding-box;
//     border-bottom: 2px solid #ced4da !important;
//     border-radius: .25rem;
//     transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
// }
// .login-modal form {
//     padding: 10px 50px;
// }
// .login-modal h3{
//   text-align: right;
//   font-size: 18px;
//   color: #393939;
//   font-family: 'Barlow Condensed', sans-serif;
// }
// .login-modal h4{
//   text-align: center;
//   font-size: 20px;
//   color: #000;
//   font-family: 'Barlow Condensed', sans-serif;
//   margin-top: 30px;
//   margin-bottom: 10px;
// }
// .sign-in{
//   text-align: center;
// }
// #exampleModal button{
//   outline: none;
// }
// .sign-in button{
//     font-family: 'Barlow Condensed', sans-serif;
//     background-color: #f9d316;
//     padding: 8px 59px;
//     font-size: 20px;
//     font-weight: 500;
//     outline: none;
//     border-radius: 5px;
//     margin-top: 20px;
// }
// .login-modal h4 a{
//   color: #ce101f;
//   font-weight: 600;
// }
// .login-modal .form-control {
//     display: block;
//     width: 100%;
//     padding: 1rem .75rem;
//     font-size: 18px;
//     line-height: 1.5;
//     color: #495057;
//     background-color: #fff;
//     background-clip: padding-box;
//     border-bottom: 1px solid #ced4da !important;
//     border-radius: .25rem;
//     border:0px;
//     transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
// }
// .become-host-one h4 a{
//   font-family: 'Barlow Semi Condensed', sans-serif;
//   font-size: 20px;
//   color: #ce101f;
//   font-weight: 600;

// }
// .become-host-one h4{
//    margin-top: 40px;
// }
// .become-host-one h4 span{
//    margin-left: 40px;
// }
// .inputfile {
//     width: 10px;
//     height: 0.1px;
//     opacity: 0;
//     overflow: hidden;
//     position: absolute;
//     z-index: -1;
// }
// .become-host-one form label {
//     font-family: 'Oswald', sans-serif;
//     font-size: 20px;
//     font-weight: 500;
//     text-transform: capitalize;
//     color: #CC1B1B;
//     border: 2px solid;
//     padding: 7px 25px;
//     border-radius: 5px;
// }
// .become-host-one form button {
//     font-family: 'Oswald', sans-serif;
//     font-size: 20px;
//     font-weight: 500;
//     text-transform: capitalize;
//     color: #fff;
//     background-color: #CC1B1B;
//     padding: 7px 25px;
//     border-radius: 5px;
//     margin: 0px 10px;
// }
// .upload{
//   margin-top: 40px;
// }
// .become-host-one{
//   background-image: url(../images/become_host-bg.jpg);
//   background-position: center;
//   background-size: cover;
// }
// .im-not{
//     margin: auto;
//     height: auto;
//     width: 60%;
//     display: block;
//     margin-top: 30px;
//     margin-bottom: 30px;
// }

// .input-group {
//     position: relative;
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     -ms-flex-wrap: wrap;
//     flex-wrap: inherit;
//     -webkit-box-align: stretch;
//     -ms-flex-align: stretch;
//     align-items: stretch;
//     width: 100%;
// }
// .details h4 {
//     margin-top: 20px;
//     margin-bottom: 20px;
// }
// .book-btn {
//     margin-top: 22px;
//     margin-left: -10px;
// }
// .book-btn button {
//     padding: 10px 40px !important;
// }
// .radio2 {
//     margin: 10px 30px;
//     font-size: 20px;
// }
// .radio1 {
//     font-size: 20px;
// }
// .radio3 {
//     font-size: 20px;
// }
// .sign-two{
//   margin-top: -10px;
//   margin-bottom: -10px;
// }
// .radio {
//     margin-bottom: -25px;
// }
//  #exampleModal-two select {
//     text-transform: none;
//     width: 100%;
//     padding: 1rem .75rem;
//     font-size: 18px;
//     line-height: 1.5;
//     color: #495057;
//     border-bottom: 1px solid #ced4da !important;
// }
// .banner-ar h3{
//   margin-top: -100px;
//   text-align: center;
//   color: #fff;
//   padding-bottom: 100px;
//   font-family: 'Barlow Condensed', sans-serif;
//   font-size: 24px;
//   font-weight: 400;
//   letter-spacing: 1px;
// }
// .home-filter-one h2{
//   font-family: 'Barlow Semi Condensed', sans-serif;
//   font-size: 40px;
//   color: #252525;
//   text-transform: uppercase;
//   text-align: center;
//   margin-bottom: 40px;
// }

// .home-filter-one{
//   padding-top: 70px;
//   padding-bottom: 100px;
// }
// .home-filter-one h3{
//   font-size: 20px;
//   text-transform: uppercase;
//   padding-top: 20px;
//   font-family: 'Barlow Condensed', sans-serif;
//   font-weight: 600;
//   padding-left: 20px;
// }
// .home-filter-one h4{
//   font-size: 16px;
//   text-transform: uppercase;
//   padding-top: 20px;
//   font-family: 'Barlow Condensed', sans-serif;
//   color: #919191;
//   font-weight: 400;
//   padding-left: 20px;
// }
// .home-filter-one h5{
//   font-size: 22px;
//   text-transform: uppercase;
//   font-family: 'Barlow Condensed', sans-serif;
//   color: #000;
//   font-weight: 500;
//   padding-left: 20px;
//   padding-bottom: 30px;
// }

// .box-shadow{
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
//   transition: 0.3s;
// }
// .box-shadow:hover{
//   box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
//   transition: 0.3s;
// }
// .serch-section{
//   background-color: #037dff;
// }
// .serch-section .form-control {
//     display: block;
//     width: 100%;
//     padding: .575rem .75rem;
//     font-size: 1rem;
//     line-height: 1.5;
//     color: #fff;
//     background-color: #0073ed;
//     background-clip: padding-box;
//     border: none;
//     border-radius: .25rem;
//     transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
// }
// .serch-section ::placeholder {
//   color: #fff;
//   font-size: 16px;
// }
// .serch-section .input-group-append {
//     margin-left: -1px;
//     background-color: #0073ed;
// }

// .serch-section i{
//     z-index: 1;
//     color: #fff;
//     font-size: 22px;
//     padding-top: 9px;
//     margin-left: -25px;
// }
// .serch-section h2 {
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     font-size: 20px;
//     color: #fff;
//     text-transform: uppercase;
//     text-align: left;  
//     margin-bottom: 20px;
//     padding-top: 30px;
// }
// .serch-section select{
//     display: block;
//     width: 100%;
//     padding: .575rem .75rem;
//     font-size: 1rem;
//     line-height: 1.5;
//     color: #fff;
//     background-color: #0073ed;
//     background-clip: padding-box;
//     border: none;
//     border-radius: .25rem;
//     transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
// }
// .search-btn button{
//   padding: 10px 100px;
//   font-size: 18px;
//   color: #f31c25;
//   text-transform: uppercase;
//   font-weight: 500;
//   font-family: 'Barlow Semi Condensed', sans-serif;
//   border-radius: 5px;
//   outline: none;
// }
// .search-btn{
//   margin-bottom: 20px;
// }
// .serch-section label{
//     color: aliceblue;
//     font-size: 16px;
// }
// .serch-section span{
//     color: aliceblue;
//     font-size: 16px;
// }
// .lsdasd{
//   margin-top: -450px;
// }
// .box-shadow small {
//     position: absolute;
//     left: 0;
//     top: 0;
//     font-size: 30px;
//     z-index: 1;
//     margin-left: 16px;
//     background: #f31c24;
//     color: aliceblue;
//     padding: 10px 10px 10px 20px;
//     font-weight: 500;
// }
// .forgotyour h2{
//   padding: 10px 20px;
// }
// .forgotyour h5{
//   padding: 10px 40px;
// }







// /*///////////////////////////responsive ///////////////////////////*/
// /*///////////////////////////responsive ///////////////////////////*/
// /*///////////////////////////responsive ///////////////////////////*/


// @media only screen and (min-width:300px) and (max-width:500px) 
// {
//   html, body {width: auto!important; overflow-x: hidden!important}

// .banner-area h1 {
//     font-size: 55px;
// }
// .ban-serch .col-md-2 {
//     -webkit-box-flex: 0;
//     -ms-flex: 0 0 20%;
//     flex: 0 0 100%;
//     max-width: 100%;
// }
// .checkavai button {
//     padding: 53px 45px;
//     outline: none;
//     font-size: 20px;
//     color: #fff;
//     background-color: #bd1313;
//     font-family: 'Barlow Condensed', sans-serif;
//     text-transform: uppercase;
//     position: relative;
//     border-radius: 15px;
//     font-weight: 500;
//     margin-left: 0px;
// }
// .checkavai {
//      float: right;
//     margin-bottom: 40px;
//     text-align: center;
// }
// .ban-serch {
//     background-color: #fff;
//     margin-top: 70px;
//     border-radius: 15px;
//     position: relative;
//     margin-bottom: 50px;
// }
// .datepicker.dropdown-menu {
//     min-width: 250px !important;
// }
// .maps iframe {
//     position: relative;
//     left: 0;
//     margin-bottom: 40px;
// }
// .lsdasd{
//   margin-top: 0px;
// }
// .home-section-one h2 {
//     font-size: 30px;
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     font-weight: 600;
//     margin-top: 20px;
// }
// .home-section-two h2 {
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     color: #252525;
//     font-size: 37px;
//     text-align: center;
//     text-transform: uppercase;
//     font-weight: 600;
// }
// .full img {
//     height: auto;
//     width: 15%;
//     margin: auto;
//     display: block;
//     margin-bottom: 40px;
// }
// .img-mr{
// 	margin-bottom: 20px;
// }
// .home-section-one img {
//     height: 250px;
//     width: 100%;
// }
// .home-section-three {
//     text-align: center;
// }
// .home-section-three h2::before {
//     content: url(../images/full-two.png);
//     position: absolute;
//     margin-left: -132px;
//     margin-top: -40px;
//     left: 0;
//     width: 100%;
// }
// .book-now {
//     margin-top: 100px;
//     margin-bottom: 100px;
// }
// .home-section-four {
// 	text-align: center;
// }
// .home-section-four h2 {
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     color: #252525;
//     font-size: 32px;
//     font-weight: 600;
//     padding-top: 80px;
// }
// .home-section-four h2::before {
//     content: url(../images/full-two.png);
//     position: absolute;
//     margin-left: -50px;
//     margin-top: -55px;
//     width: 100%;
// }
// .home-section-four p {
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     color: #252525;
//     font-size: 22px;
//     margin-top: 40px;
//     font-weight: 600;
// }
// .home-section-four img {
//     max-width: 100%;
// }
// .newsletter {
//     background-image: url(../images/newsletter.png);
//     background-position: center;
//     background-size: cover;
//     padding: 70px 0px;
//     text-align: center;
// }
// .form-con {
//     display: block;
//     width: 100%;
//     padding: 3% 30% 3% 5%;
// }

// .newsletter form {
//     display: inline-flex;
//     margin-top: 50px;
// }
// .footer {
//     background-color: #011933;
//     padding-top: 70px;
//     margin-top: -25px;
//     text-align: center;
// }
// .copy-right ul {
//     text-align: center;
// }
// .become-host-one h4 span {
//     margin-left: 6px;
// }
// .become-host-one h5 {
//     font-family: 'Barlow Condensed', sans-serif;
//     font-size: 24px;
//     color: #2a2a2a;
//     font-weight: 600;
//     text-transform: uppercase;
//     margin-top: 32px;
// }
// .upload {
//     margin-top: 40px;
//     display: grid;
//     text-align: center;
// }
// .become-host-one form button {
//     font-family: 'Oswald', sans-serif;
//     font-size: 20px;
//     font-weight: 500;
//     text-transform: capitalize;
//     color: #fff;
//     background-color: #CC1B1B;
//     padding: 7px 25px;
//     border-radius: 5px;
//     margin: 20px 10px;
// }
// .details{
//   text-align: center;
// }
// .radio2 {
//     margin: 10px 0px;
//     margin-right: 10px;
//     font-size: 20px;
// }
// .banner-ar h1 {
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     font-size: 55px;
//     font-weight: 800;
//     text-align: center;
//     color: #fff;
//     text-transform: uppercase;
//     letter-spacing: 5px;
//     padding-top: 100px;
//     padding-bottom: 100px;
// }
// .serch-section {
//     background-color: #037dff;
//     margin-bottom: 50px;
// }
// .box-shadow{
//   margin-top: 20px;
// }
// .serch-section label {
//     color: aliceblue;
//     font-size: 17px;
// }








// }



// @media only screen and (min-width:500px) and (max-width:800px) 
// {
//   html, body {width: auto!important; overflow-x: hidden!important}
// .ban-serch select {
//     font-size: 30px;
//     color: #353535;
//     text-transform: uppercase;
// }
// .ban-serch h5 {
//     font-family: 'Barlow Condensed', sans-serif;
//     font-size: 15px;
//     text-transform: uppercase;
//     font-weight: 600;
//     color: #353535;
// }
// .y {
//     padding: 20px 20px;
// }
// .checkavai button {
//     padding: 35px 0px;
//     outline: none;
//     margin-left: 30px;
//     font-size: 21px;
//     color: #fff;
//     background-color: #bd1313;
//     font-family: 'Barlow Condensed', sans-serif;
//     text-transform: uppercase;
//     position: absolute;
//     border-radius: 0px 15px 0px 0px;
//     font-weight: 500;
//     margin-left: -11px;
// }
// .banner-area h1 {
//     font-size: 60px;
// }
// .maps iframe {
//     position: relative;
//     left: 0;
//     margin-bottom: 50px;
// }
// .home-section-three h2::before {
//     content: url(../images/full-two.png);
//     position: absolute;
//     margin-left: 0px;
//     margin-top: -90px;
//     width: 100%;
// }
// .home-section-four h2::before {
//     content: url(../images/full-two.png);
//     position: absolute;
//     margin-left: -10px;
//     margin-top: -50px;
//     width: 100%;
// }
// .become-host-one h4 span {
//     margin-left: 5px;
// }
// .upload {
//     margin-top: 40px;
//     display: grid;
//     text-align: center;
// }
// .become-host-one form button {
//     font-family: 'Oswald', sans-serif;
//     font-size: 20px;
//     font-weight: 500;
//     text-transform: capitalize;
//     color: #fff;
//     background-color: #CC1B1B;
//     padding: 7px 25px;
//     border-radius: 5px;
//     margin: 20px 10px;
// }
// .newsletter h2 {
//     color: #fff;
//     font-family: 'Barlow Condensed', sans-serif;
//     font-size: 34px;
//     font-weight: 400;
//     letter-spacing: 2px;
// }
// .search-btn button {
//     padding: 10px 47px;
//     font-size: 18px;
//     color: #f31c25;
//     text-transform: uppercase;
//     font-weight: 500;
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     border-radius: 5px;
//     outline: none;
// }
// .serch-section {
//     background-color: #037dff;
//     margin-bottom: 50px;
// }




// }


// @media only screen and (min-width:900px) and (max-width:1100px) 
// {
//   html, body {width: auto!important; overflow-x: hidden!important}

// .search-btn button {
//     padding: 10px 47px;
//     font-size: 18px;
//     color: #f31c25;
//     text-transform: uppercase;
//     font-weight: 500;
//     font-family: 'Barlow Semi Condensed', sans-serif;
//     border-radius: 5px;
//     outline: none;
// }


// }