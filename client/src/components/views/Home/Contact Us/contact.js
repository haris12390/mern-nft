import React from 'react'
import './contact.css'
import LocationIcon from '../../../../images/location-icon.png'
import MailIcon from '../../../../images/mail-icon.png'
import TelephoneIcon from '../../../../images/telephone.png'
import GreyDash from '../../../../images/grey-dash.png'
import useLayout from 'src/hooks/useLayout';


export default function Contact() {
    const { state } = useLayout()
    return (
        <div className="contact-wrapper d-flex flex-column justify-content-lg-between">
            <section className="contact-section1 mt-1">
                <div className="contact-hero-section">
                    <div className="text-center p-5">
                        {/* <h1 className="bolder-font">CONTACT US</h1> */}
                        <h1 className="bolder-font" dangerouslySetInnerHTML={{ __html: state?.Contact?.section1?.heading }}></h1>
                        {/* <p className="bolder-font"><span>HOME</span> / <span style={{ color: '#ff7faf' }}>CONTACT US</span></p> */}
                        <p className="bolder-font"><span dangerouslySetInnerHTML={{ __html: state?.Contact?.section1?.leftSubHeading }}></span> / <span style={{ color: '#ff7faf' }} dangerouslySetInnerHTML={{ __html: state?.Contact?.section1?.rightSubHeading }}></span></p>
                    </div>
                </div>
            </section>
            <section className="contact-section-padding-small">
                <div className="container-fluid">
                    <div className="container">
                        <div className='row'>
                            <div className="col-md-6 ">
                                <div>
                                    {/* <h2 className="bolder-font pb-4">Get in Touch</h2> */}
                                    <h2 className="bolder-font pb-4" dangerouslySetInnerHTML={{ __html: state?.Contact?.section2?.leftheading }}></h2>
                                </div>
                                <form>
                                    <div className="d-flex">
                                        <div className="mb-4 w-100  ">
                                            <input required type="text" className="form-control w-100 contact-input" placeholder="Name" />
                                        </div>
                                        &nbsp;
                                        <div className="mb-4 w-100 ">
                                            <input required type="email" className="form-control contact-input" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <div className="mb-4 w-100  ">
                                            <input required type="text" className="form-control w-100 contact-input" placeholder="Subject" />
                                        </div>
                                        &nbsp;
                                        <div className="mb-4 w-100 ">
                                            <input required type="text" className="form-control contact-input" placeholder="Phone" />
                                        </div>
                                    </div>
                                    <div className="d-flex ">
                                        <textarea class="form-control textarea-input" id="exampleFormControlTextarea1" placeholder="Messege" rows="9"></textarea>
                                    </div>
                                    <div className=" text-center py-3">
                                        <button className="contact-button">SUBMIT</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-6 pt-1 d-flex flex-column">
                                <div className=" align-self-center">
                                    {/* <h2 className="bolder-font">Contact Details</h2> */}
                                    <h2 className="bolder-font" dangerouslySetInnerHTML={{ __html: state?.Contact?.section2?.rightheading }}></h2>
                                    <p dangerouslySetInnerHTML={{ __html: state?.Contact?.section2?.text }}></p>
                                    {/* <p>Lorem Ipsum is simply dummy text of the printing and <br /> typesetting industry. Lorem Ipsum has been the industry's <br /> standard dummy text ever since the 1500s.</p> */}
                                    <img src={GreyDash} alt="greydash" />
                                    <div className="d-flex">
                                        <div >
                                            <img src={LocationIcon} />
                                        </div>
                                        &nbsp;
                                        <div className="pl-1">
                                            <span dangerouslySetInnerHTML={{ __html: state?.Contact?.section2?.addressText }}></span>
                                            {/* <span>Address: No 30 Baria Street 133/2 NewYork City</span> */}
                                        </div>
                                    </div>
                                    <img src={GreyDash} alt="greydash" />
                                    <div>
                                        <img src={MailIcon} />
                                        &nbsp;
                                        <span dangerouslySetInnerHTML={{ __html: state?.Contact?.section2?.mailText }}></span>
                                        {/* <span>Info@youremail.com</span> */}
                                    </div>
                                    <img src={GreyDash} alt="greydash" />
                                    <div >
                                        <img src={TelephoneIcon} className="img-fluid" />
                                        &nbsp;
                                        {/* <span>(132) 56987500</span> */}
                                        <span dangerouslySetInnerHTML={{ __html: state?.Contact?.section2?.telephoneText }}></span>
                                    </div>
                                    <div className="mt-5">
                                        <h2 className="bolder-font">Working Hours</h2>
                                        <p dangerouslySetInnerHTML={{ __html: state?.Contact?.section2?.WorkingHours }}></p>
                                        {/* <p>Monday - Saturday: 08AM</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
