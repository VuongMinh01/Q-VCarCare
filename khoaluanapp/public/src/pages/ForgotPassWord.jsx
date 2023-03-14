import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { checkPhoneExistRoute, forgotPasswordRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify'
import Logo from "../assets/Logo.png";
import axios from 'axios'


export default function ForgotPassWord() {

    const navigate = useNavigate();
    // eslint-disable-next-line
    const ref = useRef();

    // < hàm nhập các bước > //
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [result, setResult] = useState('');

    // < Hàm để input text ( do react khác với thông thường) > //
    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    // < Values  > //
    const [values, setValues] = useState({
        phone: "",
        password: "",
        confirmPassword: ""
    })


    // < Kết nối firebase > //
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

    // < Design thông báo > //
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };

    // <  Submit với route forgotPassword  > //
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { phone, password } = values;
            const { data } = await axios.post(`${forgotPasswordRoute}`, {
                phone: "+84" + phone,
                newpassword: password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('car-app-user', JSON.stringify(data.data))
                navigate("/pagequantri");
            }
        }
    }

    // < Hàm kiểm tra dữ liệu > //
    const handleValidation = () => {
        const { password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.err("Password phải trùng với confirmPassword");
            return false;
        }
        else if (password.length < 8) {
            toast.error('Password should be equal or greater than 8 characters', toastOptions);
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (localStorage.getItem("car-app-user")) {
            navigate('/pagequantri')
        }
    }, []);

    // < Kiểm tra otp > //
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

    // < Kiểm tra số điện thoại > //
    const signin = async (event) => {
        event.preventDefault();
        const { phone } = values;
        if (phone === "") {
            toast.error('Phone number is required', toastOptions);
            return;
        }
        const res = await axios.post(`${checkPhoneExistRoute}`, {
            phone: '+84' + phone
        });
        if (!res.data.status) {
            let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible'
            });
            auth.signInWithPhoneNumber("+84" + phone, verify).then((result) => {
                setResult(result);
                setStep('VERIFY_OTP');
            })
                .catch((err) => {
                    toast.error(err, toastOptions);
                });
        } else {
            toast.error("Phone number doesn't exist", toastOptions);
        }
    }

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
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="brand">
                            <img src={Logo} alt="Logo" />
                            <h1>valiu</h1>
                        </div>
                        <input type="password" placeholder="Password" name="password" onChange={(e) => handleOnChange(e)} />
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e) => handleOnChange(e)} />
                        <button type="submit">Change password</button>
                        <span>Already have an account <Link to="/login">Login</Link></span>
                    </form>
                }
            </FormContainer>
            <ToastContainer />

        </>
    )

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
        box-shadow: 0 8px 24px rgb(21 48 142 / 14%);
        border-radius: 2rem;
        padding: 3rem 5rem; 
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
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
        option {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: black;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
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