import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import GoogleLogo from '../../../images/google.jpg'
import TwitterLogo from '../../../images/twitter.jpg'
import DiscordLogo from '../../../images/discord.jpg'
import './register.css'
import axios from 'axios'
import { Alert } from 'reactstrap';


export default function Register({ isAuthenticated }) {

    const [userInfo, setuserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const history = useHistory()

    const [response, setResponse] = useState('')
    const [responseStatus, setresponseStatus] = useState(true)

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_PORT}/api/auth/register`, userInfo).then((res) => {
            if (!res.data.status) {
                setResponse(res.data.messege)
                setresponseStatus(res.data.messege)

            }
            setResponse(res.data.messege)
            setresponseStatus(res.data.status)
            history.push('/login')
        }).catch(err => {
            console.log(err, 'errr')
        })
        // console.log(userInfo)
    }


    return (
        <div className='h-100'>
            <div className="main">
                <section className="nft-register-section container ">
                    <div className="row m-0" >
                        <div className="col-md-6  left-box" >
                            <div className='pt-5 '>
                                <h1>
                                    Generating layers for the <br /> digital world
                                </h1>
                            </div>
                        </div>

                        <div className="col-md-6  nft-sign-up-form  ">
                            <ul className="d-flex list-unstyled justify-content-center ">
                                <li >
                                    <Link className="nav-link text-black" aria-current="page" to="/login">Already a member? <span style={{ color: "#3a4a9f" }}>Sign In</span></Link>
                                </li>

                                <li className="hide-li">
                                    <span className="nav-link text-black" aria-current="page" >|</span>
                                </li>
                                <li >
                                    <Link className="nav-link text-black" to="/register">Not a member? <span style={{ color: "#3a4a9f" }}>Sign up now</span></Link>
                                </li>
                            </ul>
                            <h1>SIGN UP</h1>
                            <div className="container form">
                                <form onSubmit={onSubmitHandler}>
                                    <div className="w-100">
                                        {!responseStatus ?
                                            <Alert color='danger'>
                                                {response}
                                            </Alert>
                                            : null
                                        }
                                    </div>
                                    <div className="d-flex  w-100  mb-4 justify-content-between  ">
                                        <input required onChange={(e) => setuserInfo({ ...userInfo, firstName: e.target.value })} type="text" className="form-control input-container w-100 " placeholder="First Name" />
                                        <div style={{ width: "18px" }} />
                                        <input required onChange={(e) => setuserInfo({ ...userInfo, lastName: e.target.value })} type="text" className="form-control input-container  w-100 " placeholder="Last Name" />
                                    </div>
                                    <div className="mb-4 w-100  ">
                                        <input required onChange={(e) => setuserInfo({ ...userInfo, email: e.target.value })} type="email" className="form-control sign-up-inputs w-100 " placeholder="Email" />
                                    </div>
                                    <div className="mb-4 w-100 ">
                                        <input required minLength="6" onChange={(e) => setuserInfo({ ...userInfo, password: e.target.value })} type="password" className="form-control sign-up-inputs" placeholder="Password" />
                                    </div>
                                    <div className="form-check w-100 ">
                                        <label  >
                                            <input required type="checkbox" className="form-check-input" value="" />
                                            I have read and accept the <a style={{ textDecoration: 'none' }} href="/">Terms of Service</a>
                                        </label>
                                    </div>
                                    <button className="btn sign-up-button w-100  ">SIGNUP</button>
                                </form>
                                <div className="separator">or Sign Up with</div>
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <a href='/'><img alt="socialmedia" src={GoogleLogo} alt="socialmedia icon" className="nft-sign-up-logos img-fluid" /></a>
                                    </div>
                                    <div>
                                        <a href='/'><img alt="socialmedia" src={TwitterLogo} alt="socialmedia icon" className="nft-sign-up-logos img-fluid" /></a>
                                    </div>
                                    <div>
                                        <a href='/'><img alt="socialmedia" src={DiscordLogo} alt="socialmedia icon" className="nft-sign-up-logos img-fluid" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section >
            </div>
        </div >
    )
}
