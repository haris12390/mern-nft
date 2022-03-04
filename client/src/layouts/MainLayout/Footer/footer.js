import React from 'react'
import DiscordFooter from 'src/images/discordlogo.png'
import FacebookFooter from 'src/images/facebook-png.png'
import TwitterFooter from 'src/images/twitter-png.png'
import InstagramFooter from 'src/images/instagram-png.png'
import useLayout from 'src/hooks/useLayout'
import './footer.css'

export default function Footer() {

    const { state } = useLayout()

    return (
        <div >
            <div style={{ backgroundColor: '#f9689f', height: '5px' }}>
            </div>
            <section className="footer-section-padding" style={{ backgroundColor: state?.Footer?.footer?.bgColor }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 text-white">
                            <h4 className="bolder-font" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.leftheading }}></h4>
                            <p dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.text }}></p>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control rounded-pill" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary text-white " style={{ backgroundColor: '#ff7faf', borderRadius: '10px' }} type="button">Signup</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center text-white">
                            <h4 className="bolder-font" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.rightheading }}></h4>
                            <div className="d-flex justify-content-center" >
                                <img alt="social-media" src={DiscordFooter} className="img-fluid" />
                                <img alt="social-media" src={FacebookFooter} className="img-fluid" />
                                <img alt="social-media" src={TwitterFooter} className="img-fluid" />
                                <img alt="social-media" src={InstagramFooter} className="img-fluid " />
                            </div>
                        </div>
                    </div>
                    <div >
                        <hr style={{ backgroundColor: state?.Footer?.footer?.dashColor }} />
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-4">
                            <div className="d-flex flex-column">
                                <div className="text-white">
                                    <img src={state?.Footer?.footer?.image} className="img-fluid" alt="logo" style={{ height: '50px', margin: '5px' }} />
                                    <p dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.text2 }}></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex justify-content-evenly text-white">
                                <div>
                                    <ul>
                                        <li className="list-unstyled" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listHead1 }}></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink1 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink2 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink3 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink4 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink5 }}></a></li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li className="list-unstyled" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listHead2 }}></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink6 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink7 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink8 }}></a></li>
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        <li className="list-unstyled" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listHead3 }}></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink9 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink10 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink11 }}></a></li>
                                        <li className="list-unstyled"><a href='/' className="text-reset text-decoration-none" dangerouslySetInnerHTML={{ __html: state?.Footer?.footer?.listLink12 }}></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <footer>
                <div className="text-white p-2 footer" style={{ backgroundColor: "#016abd", height: "45px" }}>
                    <p className="text-center" >
                        Copyright © 2021 NFT Art Generator. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
