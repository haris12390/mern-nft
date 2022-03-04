import React from 'react'
import RightPicture from '../../../../../images/app-dashboard.jpg'
import "./appDashboard.css"
import { Link } from 'react-router-dom'

export default function App() {

    return (
        <div className="container-fluid app-wrapper">
            <div className="row m-0">
                <div className="col-md-6 ">
                    <div className=" m-5  ">
                        <form className="">
                            <div className="mb-4 w-100  ">
                                <label className="m-1">Project Name</label>
                                <input value="" required type="email" className="form-control login-inputs w-100 " onChange={() => alert('These inputs dont work at the moment please click next to proceed')} placeholder="No Name" />
                            </div>
                            <div className="mb-4 w-100  ">
                                <label className="m-1">Project Description</label>
                                <input value="" required type="email"  onChange={() => alert('These inputs dont work at the moment please click next to proceed')} className="form-control login-inputs w-100 " />
                            </div>
                            <div className="mb-4 w-100  ">
                                <label className="m-1">Collection Size</label>
                                <input value="" required type="email" onChange={() => alert('These inputs dont work at the moment please click next to proceed')} className="form-control login-inputs w-100 " />

                            </div>
                            <div className="">
                                <div className=" row">
                                    <label className="m-1">Dimension</label>
                                    <div className="col-6 ">
                                        <div className="mb-4 w-100  ">
                                            <input value="" required type="email" className="form-control login-inputs w-100 " />
                                        </div>
                                    </div>
                                    <div className="col-6 ">
                                        <div className="mb-4 w-100  ">
                                            <input value="" required type="email" className="form-control login-inputs w-100 " />
                                        </div>
                                    </div>

                                </div>
                                <div className="text-center">
                                    <Link to="/application" >
                                        <button className="btn rounded-pill text-white  px-5" style={{ backgroundColor: "#0076d4" }}>NEXT</button>
                                    </Link>
                                </div>
                            </div>
                            {/* <div className="mb-4 row bg-danger">
                            <div className="col-xs-6 d-flex  flex-column">
                                <label>Dimension</label>
                                <input value="" required type="text" className="form-control login-inputs w-50 " />
                            </div>
                            <div className="col-xs-6 d-flex flex-column">
                                <input value="" required type="text" className="form-control login-inputs w-50 " />
                            </div>
                        </div> */}
                        </form>
                    </div>
                </div>
                <div className="col-md-6 mt-1" >
                    <div className="h-100 w-100" style={{ backgroundImage: `url(${RightPicture})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

                    </div>
                </div>
            </div>
        </div>
    )
}
