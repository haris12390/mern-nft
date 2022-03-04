import React, { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import Logo from '../../../images/logo.jpg'
import GoogleLogo from '../../../images/google.jpg'
import TwitterLogo from '../../../images/twitter.jpg'
import DiscordLogo from '../../../images/discord.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/js/src/collapse.js";
import './login.css'
import axios from 'axios'
import { Alert } from 'reactstrap';
import useAuth from 'src/hooks/useAuth'
export default function Login({ authenticated, isAuthenticated }) {
    console.log(authenticated)
    console.log(isAuthenticated)
    const history = useHistory()
    const { login } = useAuth()
    const [userInfo, setuserInfo] = useState({
        email: 'admin@gmail.com',
        password: 'handsome45'
    })
    const [error, setError] = useState('')


    if (isAuthenticated) return <Redirect to="/" />


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        // const { data } = await axios.post(`${process.env.REACT_APP_PORT}/api/auth/login`, userInfo)
        // const { data } = await axios.post(`${process.env.REACT_APP_PORT}/api/auth/login`, userInfo)
        try {

            await login(userInfo)

            // if (!data.status) {
            //     return setError(data.messege)
            // }
            // console.log(data)
            // authenticated(data.user)
            // localStorage.setItem('authtoken', data.token)
            // history.push('/')
            // window.location.reload()
        } catch (error) {
            setError(error.messege)
            console.log(error, 'ppppppppppp')
        }

    }


    return (
        <div className='h-100'>
            <div className="main">
                {/* <header className="nft-login-header container">
                    <nav className="navbar navbar-expand-lg  mx-auto "  >
                        <div className="container-fluid">
                            <Link className="navbar-brand " to="/">
                                <img src={Logo} className="img-fluid" alt="" />
                            </Link>
                            <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"><FontAwesomeIcon icon={faBars} /></span>
                            </button>
                            <div className={`menu collapse navbar-collapse `} id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login">Already a member? <span>Sign In</span></Link>
                                    </li>

                                    <li className="hide-li">
                                        <span className="nav-link active" aria-current="page" >|</span>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Not a member? <span>Sign up now</span></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header> */}


                <section className="nft-login-section container ">
                    <div className="row m-0" >
                        <div className="col-md-6  left-box" >
                            <div className='pt-5 '>
                                <h1>
                                    Generating layers for the <br /> digital world
                                </h1>
                            </div>
                        </div>
                        <div className="col-md-6  nft-login-form text-center">
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
                            {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Already a member? <span>Sign In</span></Link>
                                </li>

                                <li className="hide-li">
                                    <span className="nav-link active" aria-current="page" >|</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Not a member? <span>Sign up now</span></Link>
                                </li>
                            </ul> */}
                            <h1>SIGN IN</h1>
                            {error && <Alert color='danger text-center'>
                                {error}
                            </Alert>}
                            <div className="container form">
                                <form onSubmit={onSubmitHandler}>
                                    <div className="mb-4 w-100  ">
                                        <input value={userInfo.email} required onChange={(e) => setuserInfo({ ...userInfo, email: e.target.value })} type="email" className="form-control login-inputs w-100 " placeholder="Email" />
                                    </div>
                                    <div className="mb-4 w-100 ">
                                        <input value={userInfo.password} required onChange={(e) => setuserInfo({ ...userInfo, password: e.target.value })} minLength="6" type="password" className="form-control login-inputs" placeholder="Password" />
                                    </div>
                                    <div className="form-check">
                                        <label  >
                                            <input type="checkbox" className="form-check-input" value="" />
                                            {/* <input type="checkbox" className="form-check-input" value="" /> */}
                                            Remember Me
                                        </label>
                                    </div>
                                    <button className="btn mb-4 login-button w-100" type="submit">SIGNIN</button>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <Link className="text-dark" to='/forgotpassword'>Forgotten Password?</Link>
                                    </div>
                                </div>
                                <div className="separator">or Sign Up with</div>
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <a href='/'><img src={GoogleLogo} alt="socialmedia icon" className="nft-login-logos img-fluid" /></a>
                                    </div>
                                    <div>
                                        <a href='/'><img src={TwitterLogo} alt="socialmedia icon" className="nft-login-logos img-fluid" /></a>
                                    </div>
                                    <div>
                                        <a href='/'><img src={DiscordLogo} alt="socialmedia icon" className="nft-login-logos img-fluid" /></a>
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
