import React, { useState } from 'react'
import '../styles/mix.css'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { registerFunction } from '../services/Apis';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [showpass, setShowpass] = useState(false);
    const [inputdata, setInputdata] = useState({
        // this name should be same as the input name so that we can get the user input
        fname: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    // set input value
    const handleChange = (e)=> {
        const {name, value} = e.target;
        setInputdata({...inputdata,[name]:value})
    }
    // console.log(inputdata)

    // this fuction is to validate signup button after clicking on sign up button to validate registred data that has been entered by the user
    // register data
    const handleSubmit = async(e)=> {
        e.preventDefault();
        const {fname, email, password} = inputdata;

        if (fname === '') {
            toast.error('Enter your name')
        }
        else if (email === '') {
            toast.error('Enter Your Email')
        }
        else if (!email.includes('@')) {
            toast.error('Enter Valid Email')
        }
        else if (password === '') {
            toast.error('Password should not be empty')
        }
        else if (password.length < 6) {
            toast.error('Password should contain atleast 6 characters')
        }
        else {
            const response = await registerFunction(inputdata)
            // console.log(response)

            if (response.status === 200) {
                setInputdata({...inputdata,fname:'',email:'',password:''});
                navigate('/')
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
                    <h1> Sign Up </h1>
                    <p>Hi, we are glad that you have opted to use AkCloud!</p>
                </div>
                <form>
                    <div className="form_input">
                        <label htmlFor="fname">Name</label>
                        <input type="text" name='fname' id='' onChange={handleChange} placeholder='Enter Your name' />
                    </div>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='' onChange={handleChange} placeholder='Enter your email id' />
                    </div>
                    <div className="form_input">
                        <label htmlFor="password">Password</label>
                        <div className='two'>
                            <input type={!showpass ? 'password' : 'text'} name='password' id='' onChange={handleChange} placeholder='Enter your password' />
                            <div className='showpass' onClick={()=> setShowpass(!showpass)} >
                                {!showpass ? 'Show' : 'Hide'}
                            </div>
                        </div>
                        
                        <div>

                        </div>
                    </div>
                    <button className='btn' onClick={handleSubmit}>Sign Up</button>
                    <p> Already have an account! <NavLink to='/'> Login </NavLink> </p>
                </form>
            </div>
            <ToastContainer />
        </section>
    </>
  )
}

export default Register