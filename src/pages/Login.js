import React, { useState } from 'react'
import '../styles/mix.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sentOtpFunction } from '../services/Apis';
import Spinner from 'react-bootstrap/Spinner';


const Login = () => {

    const [email, setEmail] = useState('');
    // console.log(email)

    const [spinner, setSpinner] = useState(false)

    const navigate = useNavigate

    // sendOtp function
    const sendOtp = async(e)=> {
        e.preventDefault();

        if (email === ''){
            toast.error('Enter Your Email Id !')
        }
        else if (!email.includes('@')) {
            toast.error('Enter Valid Email Id !')
        }
        else{
            setSpinner(true)
            const data = {
                email: email
            }

            const response = await sentOtpFunction(data);
            // console.log(response)

            if (response.status === 200) {
                setSpinner(false)
                navigate('/user/otp', {state: email})
            }
            else {
                toast.error(response.response.data.error)
            }
        }
    }

  return (
    <>
        <section>
            <div className='form_data'>
                <div className="form_heading">
                    <h1>Welcome Back, Login </h1>
                    <p>Hi, we are glad that you are back, please login</p>
                </div>
                <form>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='' onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email id' />
                    </div>
                    <button className='btn' onClick={sendOtp}>Login
                    {
                        spinner ? <span><Spinner animation="border" />;</span>:''
                    }
                    </button>
                    <p>Don't have an account ? <NavLink to='/register'>SignUp</NavLink> </p>
                </form>
            </div>
            <ToastContainer />
        </section>
    </>
  )
}

export default Login