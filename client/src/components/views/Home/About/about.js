import React from 'react'
import './about.css'
import Section2Row1 from '../../../../images/about-row.png'
import Section2Row2 from '../../../../images/about-row2.png'
import Section2Row3 from '../../../../images/about-row3.png'
import Section2Row4 from '../../../../images/about-row4.png'
import useLayout from 'src/hooks/useLayout'
import Section3List1 from '../../../../images/about-section3-list1.png'
import Section3List2 from '../../../../images/about-section3-list2.png'
import Section3List3 from '../../../../images/about-section3-list3.png'
import Section3List4 from '../../../../images/about-section3-list4.png'


export default function About() {

    const { state } = useLayout()

    return (
        <div className="about-wrapper">
            <section className="about-section1 mt-1">
                <div className="about-hero-section">
                    <div className="text-center p-5">
                        <h1 style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: state?.About?.section1?.heading }}></h1>
                        {/* <h1 style={{ fontWeight: "bold" }}>ABOUT US</h1> */}
                        {/* <p style={{ fontWeight: "bold" }}><span>Home</span> / <span style={{ color: '#ff7faf' }}>ABOUT US</span></p> */}
                        <p style={{ fontWeight: "bold" }}><span dangerouslySetInnerHTML={{ __html: state?.About?.section1?.leftSubHeading }}></span> / <span style={{ color: '#ff7faf' }} dangerouslySetInnerHTML={{ __html: state?.About?.section1?.rightSubHeading }}></span></p>
                    </div>
                </div>
            </section>
            <section className="about-section-padding ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 ">
                            <img src={state?.About?.section2?.leftImage} alt="image" className="img-fluid" />
                            {/* <img alt="image" src={Section2About} className="img-fluid" /> */}
                        </div>
                        <div className="col-md-6 ">
                            <div>
                                {/* <h2 style={{ fontWeight: "bold" }}>Who we are ?</h2> */}
                                <h2 style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: state?.About?.section2?.rightHeading }}></h2>
                                <p dangerouslySetInnerHTML={{ __html: state?.About?.section2?.text }}></p>
                                {/* <p>Contrary to popular belief, Lorem Ipsum is not from a Lorem Ipsum passage, and going through the cites of the word in classical literature. <br />
                                    <br />
                                    Contrary to popular belief, Lorem Ipsum is not from a Lorem Ipsum passage, Lorem Ipsum passage, and going Contrary to popular belief, <br /> Lorem Ipsum is not from a Lorem Ipsum passage, and going through the cites of the word in classical literature.Contrary to popular belief, Lorem Ipsum is not from a Lorem Ipsum passage, and going through the cites of the word in classical literature.</p> */}
                            </div>

                        </div>
                    </div>

                    <div className="row pt-5">
                        <div className="col-md-3">
                            <img alt="image" style={{ width: "100%" }} className="img-fluid pb-2" src={Section2Row1} />
                        </div>
                        <div className="col-md-3">
                            <img alt="image" style={{ width: "100%" }} className="img-fluid pb-2" src={Section2Row2} />
                        </div>
                        <div className="col-md-3">
                            <img alt="image" style={{ width: "100%" }} className="img-fluid pb-2" src={Section2Row3} />
                        </div>
                        <div className="col-md-3">
                            <img alt="image" style={{ width: "100%" }} className="img-fluid pb-2" src={Section2Row4} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="">
                                <h2 style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: state?.About?.section3?.heading }} ></h2>
                                {/* <h2 style={{ fontWeight: "bold" }}>NFT at a Glance</h2> */}
                                <p dangerouslySetInnerHTML={{ __html: state?.About?.section3?.text }}></p>
                                {/* <p>Contrary to popular belief, Lorem Ipsum is not from a Lorem Ipsum passage, and going through the cites of the word in classical literature. <br />
                                    <br />
                                    Contrary to popular belief, Lorem Ipsum is not from a Lorem Ipsum passage, Lorem Ipsum passage, and going Contrary to popular belief, <br /> Lorem Ipsum is not from a Lorem Ipsum passage, and going through the cites of the word in classical literature.Contrary to popular belief, Lorem Ipsum is not from a Lorem Ipsum passage, and going through the cites of the word in classical literature.</p> */}
                            </div>
                            <div className="row">
                                <div className="d-flex col-6 ">
                                    <div>
                                        <img alt="image" src={Section3List1} />
                                    </div>
                                    <div className=" d-flex flex-column  p-1">
                                        <span style={{ fontWeight: "bold" }}>259768</span>
                                        <span>Creators</span>
                                    </div>
                                </div>
                                <div className="d-flex col-6">
                                    <div>
                                        <img alt="image" src={Section3List2} />
                                    </div>
                                    <div className=" d-flex flex-column  p-1">
                                        <span style={{ fontWeight: "bold" }}>98</span>
                                        <span>Investors</span>
                                    </div>
                                </div>
                                <div className="d-flex col-6">
                                    <div>
                                        <img alt="image" src={Section3List3} />
                                    </div>
                                    <div className=" d-flex flex-column  p-1">
                                        <span style={{ fontWeight: "bold" }}>90768</span>
                                        <span>Total Clients</span>
                                    </div>
                                </div>
                                <div className="d-flex col-6">
                                    <div>
                                        <img alt="image" src={Section3List4} />
                                    </div>
                                    <div className="d-flex flex-column  p-1">
                                        <span style={{ fontWeight: "bold" }}>34</span>
                                        <span>Members</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="">
                                <img alt="image" style={{ height: "100%", width: "100%", objectFit: "cover" }} src={state?.About?.section3?.image} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container text-center">
                <div className="p-4">
                    <button className="about-section-button" dangerouslySetInnerHTML={{ __html: state?.About?.section3?.buttonText }} ></button>
                    {/* <button className="about-section-button" dangerouslySetInnerHTML={{ __html: state?.About?.section3?.buttonText }} >START GENERATING THERE COLLECTION TODAY</button> */}
                </div>
            </section>
        </div>
    )
}
