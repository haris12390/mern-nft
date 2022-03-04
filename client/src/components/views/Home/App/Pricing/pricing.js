import React, { useState } from 'react'
import './pricing.css'
import useLayout from 'src/hooks/useLayout';
import PricingBG from 'src/images/pricing-bg.jpg'
import PricingSection from 'src/images/pricing-image.png'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PayPal from 'src/components/Paypal/PayPal';

export default function Pricing() {
    const { state } = useLayout()
    const [open, setOpen] = useState(false)
    const [checkout, setCheckout] = useState(true)
    const [amount, setAmount] = useState('')
    return (
        <div className="pricing-wrapper d-flex flex-column justify-content-lg-between">
            <Modal isOpen={open} centered toggle={() => setOpen(false)}>
                <ModalHeader className="justify-content-center border-0  " style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                    <h3 className="bolder-font">Pay By </h3>
                </ModalHeader>
                <ModalBody className="p-5">
                    {checkout && <PayPal amount={amount} />}
                </ModalBody>
            </Modal>
            <section className="pricing-section1 mt-1">
                <div className="pricing-hero-section">
                    <div className="text-center p-5">
                        <h1 className="bolder-font">PRICING</h1>
                        {/* <p className="bolder-font"><span>HOME</span> / <span style={{ color: '#ff7faf' }}>CONTACT US</span></p> */}
                        {/* <p className="bolder-font"><span dangerouslySetInnerHTML={{ __html: state?.Contact?.section1?.leftSubHeading }}></span> / <span style={{ color: '#ff7faf' }} dangerouslySetInnerHTML={{ __html: state?.Contact?.section1?.rightSubHeading }}></span></p> */}
                    </div>
                </div>
            </section>

            <div  >

                <section className="pricing-section-padding-small" style={{ backgroundImage: `url(${PricingBG})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <div className="container">
                        <div className="row p-4">
                            <div className="col-md-6 text-end">
                                <img src={PricingSection} className="img-fluid" />
                            </div>
                            <div className="col-md-6 ">
                                <div className="mt-5 text-white">
                                    <h3>Start your own collection today</h3>
                                    <p>The No-Code Solution for generating your 10,000 NFT collection</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>
            </div>
            <div style={{ backgroundColor: "#f4f4f4" }}>
                <div className="container pricing-section-padding " >
                    <div className="row">
                        <div className="pricing-card d-flex flex-column justify-content-between p-5 col-md-4  pricing-box bg-white">
                            <p className="text-center">SANDBOX</p>
                            <h2 className="text-center" style={{ color: "#0076d4" }}>FREE</h2>
                            <ul>
                                <li>Up to 1 project </li>
                                <li>100 uniquely generated pieces in total</li>
                                <li>Watermarked</li>
                            </ul>
                            <div className="text-center">
                                <button style={{ backgroundColor: '#0076d4' }} className="btn rounded-pill  px-5 text-white">Generate Collection</button>
                            </div>
                        </div>
                        <div className="pricing-card d-flex flex-column justify-content-between p-5 col-md-4 pricing-box bg-white">
                            <div>
                                <p className="text-center">ASSEMBLY</p>
                                <h2 className="text-center" style={{ color: "#0076d4" }}><sup>$</sup>49.99 <sub>/ mo</sub></h2>
                                <ul>
                                    <li>10,000 uniquely generated pieces in total every month No Waterm</li>
                                    <li>100 uniquely generated pieces in total</li>
                                    <li>No Watermarked</li>
                                    <li>Metadata provided</li>
                                    <li>Direct Download</li>
                                    <li>Push generated projects direct to third party markets</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <button onClick={() => {
                                    setOpen(true)
                                    setAmount("49.99")
                                }
                                } style={{ backgroundColor: '#0076d4' }} className="btn rounded-pill  px-5 text-white">Generate Collection</button>
                            </div>
                        </div>
                        <div className="pricing-card d-flex flex-column justify-content-between p-5 col-md-4 pricing-box bg-white">
                            <p className="text-center">LAUNCH</p>
                            <h2 className="text-center" style={{ color: "#0076d4" }}><sup>$</sup>99.99 <sub>/ mo</sub></h2>
                            <ul>
                                <li>Unlimited projects</li>
                                <li>100,000 uniquely generated pieces in total every month</li>
                                <li>Early access to future NFT launches, which in part will facilitate the next phases of the platform</li>
                            </ul>
                            <div className="text-center ">
                                <button onClick={() => {
                                    setOpen(true)
                                    setAmount("99.99")
                                }
                                } style={{ backgroundColor: '#0076d4' }} className="btn rounded-pill  px-5 text-white">Generate Collection</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}
