import React, { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Link, NavLink } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Admin } from '../../../components/Constants/constants'
import useLayout from 'src/hooks/useLayout';
import './navbar.css'

export default function Navbar() {

    const { user, logout } = useAuth()
    const { state } = useLayout()

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);


    return (
        <div className="navbar-wrapper">
            <div className="navbar-header-main">
                <header className="nft-navbar-header container">
                    <nav className="navbar navbar-expand-lg  mx-auto "  >
                        <div className="container-fluid">
                            <Link className="navbar-brand " to="/">
                                <img src={state?.Header?.header?.image} className="img-fluid" alt="logo" />
                            </Link>
                            <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"><FontAwesomeIcon icon={faBars} /></span>
                            </button>
                            <div className="menu collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item active">
                                        {/* <Link className="nav-link bold-link" to="/" >navbar</Link> */}
                                        <NavLink activeStyle={{
                                            fontWeight: "bold",
                                        }} className="nav-link " exact to="/" dangerouslySetInnerHTML={{ __html: state?.Header?.header?.listItem1 }} ></NavLink>
                                    </li>
                                    <li className="nav-item active">
                                        {/* <NavLink className="nav-link bold-link" to="/" >navbar</NavLink> */}
                                        <NavLink activeStyle={{
                                            fontWeight: "bold",
                                        }} className="nav-link " to="/application-dashboard" dangerouslySetInnerHTML={{ __html: state?.Header?.header?.listItem2 }} ></NavLink>
                                    </li>
                                    <li className="nav-item active">
                                        {/* <NavLink className="nav-link bold-link" to="/" >navbar</NavLink> */}
                                        <NavLink activeStyle={{
                                            fontWeight: "bold",
                                        }} className="nav-link " exact to="/gallery" dangerouslySetInnerHTML={{ __html: state?.Header?.header?.listItem3 }} ></NavLink>
                                    </li>
                                    <li className="nav-item active">
                                        {/* <NavLink className="nav-link bold-link" to="/" >navbar</NavLink> */}
                                        <NavLink activeStyle={{
                                            fontWeight: "bold",
                                        }} className="nav-link " exact to="/about" dangerouslySetInnerHTML={{ __html: state?.Header?.header?.listItem4 }} ></NavLink>
                                    </li>
                                    <li className="nav-item active">
                                        {/* <NavLink className="nav-link bold-link" to="/" >navbar</NavLink> */}
                                        <NavLink activeStyle={{
                                            fontWeight: "bold",
                                        }} className="nav-link " exact to="/blog" dangerouslySetInnerHTML={{ __html: state?.Header?.header?.listItem5 }} ></NavLink>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to="/app">APP</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/gallery">GALLERY</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link " to="/about">ABOUT US</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link " to="/blog">BLOG</Link>
                                    </li> */}
                                    <div className="navbar-right-box">
                                        <div className="mt-2">
                                            {user ?
                                                <Dropdown className="logged-dropdown" isOpen={dropdownOpen} toggle={toggle}>
                                                    <DropdownToggle caret>
                                                        {user && user?.firstName}
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        {user?.role === Admin ?
                                                            <DropdownItem ><Link to='/admin-dashboard' className='text-decoration-none text-dark'>Dashboard</Link></DropdownItem>
                                                            : null}
                                                        {/* <DropdownItem onClick={logoutHandler}>Log Out</DropdownItem> */}
                                                        <DropdownItem onClick={logout}>Log Out</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                                :
                                                <div className="d-flex">
                                                    <li className="navbar-log-in-button ">
                                                        <Link className="text-white text-decoration-none" to="/login">LOGIN</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link " to="/register">SIGNUP</Link>
                                                    </li>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    )
}
