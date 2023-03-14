import React, { useState, useRef } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute, checkPhoneExistRoute } from "../utils/APIRoutes";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function Register() {
    const navigate = useNavigate();

    // < Values chính > //
    const [values, setValues] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [result, setResult] = useState('');
    // eslint-disable-next-line
    const ref = useRef();

    // < Kết nối firebase (dùng để gửi mã otp) > //
    const firebaseConfig = {
        apiKey: "AIzaSyARseHklRXUerl9EnE9zm9X8HhzKu3xDoo",
        authDomain: "q-vcarcare.firebaseapp.com",
        projectId: "q-vcarcare",
        storageBucket: "q-vcarcare.appspot.com",
        messagingSenderId: "686489309037",
        appId: "1:686489309037:web:f026c61ee26d77c88f9464",
        measurementId: "G-3DQESHET22"
    };
    const app = initializeApp(firebaseConfig);
    // eslint-disable-next-line
    const analytics = getAnalytics(app);
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // < submit form , kiểm tra database> //
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            console.log("in validtaion", registerRoute);
            const { password, username, email, phone } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                phone: "+84" + phone,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem("car-app-user", JSON.stringify(data.user));
                navigate("/pagequantri")
            }
        }
    };

    // < Kiểm tra dữ liệu  > //
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("password và confirmpassword phải giống nhau.", toastOptions);
            return false;
        }
        if (username.length < 3) {
            toast.error("Username không được ít hơn 3 ký tự.", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("Email không được để trống.", toastOptions);
            return false;
        }

        else if (password.length < 6) {
            toast.error("Password không được ít hơn 6 ký tự", toastOptions);
            return false;
        }
        return true;
    };

    // < Hàm để input text ( do react khác với thông thường) > //
    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // < Kiểm tra số điện thoại > //
    const signin = async (event) => {
        event.preventDefault();
        const { phone } = values;
        if (phone === "") {
            toast.error('Phone number is required', toastOptions);
        } else {
            const res = await axios.post(`${checkPhoneExistRoute}`, {
                phone: '+84' + phone
            });
            if (res.data.status) {
                let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible'
                });
                auth.signInWithPhoneNumber("+84" + phone, verify).then((result) => {
                    setResult(result);
                    setStep('VERIFY_OTP');
                })
                    .catch((err) => {
                        alert(err);
                    });
            } else {
                toast.error('This phone number already exist', toastOptions);
            }
        }
    }

    const ValidateOtp = (event) => {
        event.preventDefault();
        if (otp === null) return;

        result.confirm(otp).then((result) => {
            setStep('VERIFY_SUCCESS');
        })
            .catch((err) => {
                toast.error("Incorrect code", toastOptions);
            })
    }

    // < Design thông báo > //
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    return (
        <>
            <FormContainer>
                {step === 'INPUT_PHONE_NUMBER' &&
                    <form onSubmit={(e) => signin(e)}>
                        <div className="brand">
                            <img src={Logo} alt="Logo" />
                            <h1>valiu</h1>
                        </div>
                        <div className="phone-input">
                            <p>+84</p>
                            <input type="text" placeholder="Phone number" name="phone" onChange={(e) => handleOnChange(e)} />
                        </div>
                        <div id="recaptcha-container"></div>
                        <button type="submit">Send OTP</button>
                        <span>Already have an account <Link to="/login">Login</Link></span>
                    </form>
                }
                {step === 'VERIFY_OTP' &&
                    <form onSubmit={(e) => ValidateOtp(e)}>
                        <div className="brand">
                            <img src={Logo} alt="Logo" />
                            <h1>valiu</h1>
                        </div>
                        <input type="text" placeholder={"Enter your OTP"} onChange={(e) => { setOtp(e.target.value) }} />
                        <div id="recaptcha-container"></div>
                        <button type="submit">Verify</button>
                        <span>Already have an account <Link to="/login">Login</Link></span>
                    </form>
                }
                {step === 'VERIFY_SUCCESS' &&
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="brand">
                            <img src={Logo} alt="Logo" />
                            <h1>Q&V</h1>
                        </div>
                        <input type="text" placeholder="Username" name="username" onChange={(e) => handleOnChange(e)} />
                        <input type="email" placeholder="Email" name="email" onChange={(e) => handleOnChange(e)} />
                        <input type="password" placeholder="Password" name="password" onChange={(e) => handleOnChange(e)} />
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => handleOnChange(e)} />
                        <button type="submit">Create user</button>
                        <span>Already have an account <Link to="/login">Login</Link></span>
                    </form>
                }

            </FormContainer>
            <ToastContainer />
        </>
    );
}
const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #e8f3ff;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            /* color: white; */
            text-transform: uppercase
        }
    }
    .phone-input {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        p {
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            padding: 0.5rem;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #fff;
        border-radius: 2rem;
        padding: 3rem 5rem; 
        box-shadow: 0 8px 24px rgb(21 48 142 / 14%);
    }
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #ccc;
        border-radius: 0.4rem;
        /* color: white; */
        width: 100%;
        font-size: 1rem;
        &:focus {
            /* border: 0.1rem solid #997af0; */
            outline: none;
        }
    }
    select {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #ccc;
        border-radius: 0.4rem;
        /* color: white; */
        width: 100%;
        font-size: 1rem;
        &:focus {
            /* border: 0.1rem solid #997af0; */
            outline: none;
        }
        option {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #ccc;
            border-radius: 0.4rem;
            color: black;
            width: 100%;
            font-size: 1rem;
            &:focus {
                /* border: 0.1rem solid #997af0; */
                outline: none;
            }
        }
    }
    button {
        background-color: #0068ff;
        padding: 1rem 2rem;
        color: white;
        cursor: pointer;
        border: none;
        font-weight: bold;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #0184e0;
        }
    }
    span {
        /* color: white; */
        text-transform: uppercase;
        a {
            text-decoration: none;
            font-weight: bold;
            color: #0068ff;
        }
    }
`;

