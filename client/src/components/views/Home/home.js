import React, { useEffect, useState } from 'react'
import './home.css'
import { useHistory } from 'react-router-dom'
import SectionFiveImg from '../../../images/background-blue.png'
import HeroLeft from '../../../images/hero-left.png'
import HeroRight from '../../../images/hero-right.png'
import axios from 'axios'
import Flickity from 'react-flickity-component'
import './flick.css'
// import useAuth from '../../../hooks/useAuth'
import useLayout from '../../../hooks/useLayout'
// import Layout from '../../Layout.json'


export default function Home() {
    const [assets, setAssets] = useState()
    const history = useHistory()

    const { state } = useLayout()

    console.log(state, "HOMEEEEEE")


    // useEffect(() => {
    //     axios.post(`${process.env.REACT_APP_PORT}/api/layout/save`, { Layout }).then(res => {
    //         console.log(res.data)
    //     })
    // }, [])
    useEffect(() => {
        getOpenSeaAssets()
    }, [state])

    const getOpenSeaAssets = async () => {
        if (state) {
            console.log('function')
            const { data } = await axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=${Number(state?.Home?.section3?.NFTLimit)}`)
            console.log(data.assets)
            if (data) {
                setAssets(data.assets)
            }
        }
    }



    const flickityOptions = {
        initialIndex: 2
    }

    function Carousel() {
        return (
            <Flickity
                options={flickityOptions}
            >
                {assets && assets.map(asset => {
                    {/* console.log(asset?.description) */ }
                    let image = asset.image_url
                    if (!asset.image_url) return
                    let description = asset?.description
                    if (!description) return
                    let finalDesc = description?.substring(asset.description[0], asset.description[100])


                    return (
                        <div key={asset.id} style={{ width: '300px', margin: '10px', height: 'auto' }}>
                            <div className="card">
                                <img className="card-img-top" width="200px" height="300px" src={image} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{asset.name}</h5>
                                    <p className="card-text">{`${finalDesc}...`}</p>
                                    <a href={asset.permalink} target="_blank" rel="noreferrer" className="btn btn-primary">Buy</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Flickity>
        );
    }


    return (
        <div className="wrapper">
            <div className="sections">
                <div className="row m-0 hero-section1">
                    <div className="col-md-6">
                        <div style={{ margin: '20%' }}>
                            <div className="pb-2">
                                {/* <h1 className="bolder-font">Create, sell or collect <br /> digital items.</h1> */}
                                <h1 dangerouslySetInnerHTML={{ __html: state?.Home?.section1?.heading }} className="bolder-font"></h1>
                            </div>
                            <div className="  pb-2">
                                {/* <h5>The No-Code Solution for generating <br /> your 10,000 NFT collection</h5> */}
                                <h5 className="text-start" dangerouslySetInnerHTML={{ __html: state?.Home?.section1?.text }}></h5>
                            </div>
                            <div className="pb-2">
                                {/* <button className="section-one-button">GET STARTED</button> */}
                                <button className="section-one-button" dangerouslySetInnerHTML={{ __html: state?.Home?.section1?.buttonText }}></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="h-100 w-100" style={{ backgroundImage: `url(${state?.Home?.section1?.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        </div>
                    </div>
                </div>

                <div >
                    <section style={{ backgroundColor: state?.Home?.section2?.bgColor }} className="section-padding ">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 m-auto">
                                    <div className="text-center">
                                        <img src={state?.Home?.section2?.image1} alt='mobiles' className="img-fluid" />
                                    </div>

                                </div>
                                <div className="col-md-6 mt-1" >
                                    <div className="container">
                                        <div className="pb-2">
                                            {/* <h2 className="bolder-font">Easy to use AND no coding <br /> needed</h2> */}
                                            <h2 dangerouslySetInnerHTML={{ __html: state?.Home?.section2?.heading }} className="bolder-font"></h2>
                                        </div>
                                        <div className="text-center">
                                            <img src={state?.Home?.section2?.image2} alt="list" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>
                </div>
                <div >
                    <div>

                    </div>

                    <section className="section-padding section-three">
                        {/* <h2 className="text-center bolder-font ">Hot Collections</h2> */}
                        <h2 dangerouslySetInnerHTML={{ __html: state?.Home?.section3?.heading }} className="text-center bolder-font"></h2>
                        <div className='container'>
                            <Carousel />
                            {/* <div className='d-flex'>
                                    {assets && assets.map(asset => {
                                        console.log(typeof (asset.image_url))
                                        let image = asset.image_url
                                        if (!asset.image_url) return

                                        return (
                                            <div key={asset.id} className="card m-1">
                                                <img className="card-img-top" width="200px" height="300px" src={image} alt="Card image cap" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{asset.name}</h5>
                                                    <p className="card-text">{asset.description}</p>
                                                    <a href={asset.permalink} target="_blank" className="btn btn-primary">Buy</a>
                                                </div>
                                            </div>
                                        )
                                    })} */}
                            {/* </div> */}
                        </div>

                    </section>
                </div>
                <div >
                    {/* https://ibb.co/QKcMxpf
                    https://ibb.co/q5SsZbG
                    https://ibb.co/Jj74czH
                    https://ibb.co/hRpk0TD
                    https://ibb.co/tJpcSCZ
                    https://ibb.co/XyVjMyx
                    https://ibb.co/7NWvRRZ
                    https://ibb.co/C0nYYJm
                    https://ibb.co/X4dRcRw
                    https://ibb.co/2knYn68
                    https://ibb.co/w6T70bF
                    https://ibb.co/1LQJydr
                    https://ibb.co/0tjsxjb
                    https://ibb.co/jL41LTX
                    https://ibb.co/DYdq5hK
                    https://ibb.co/bBgs7P1
                    https://ibb.co/VjxPN4Y */}
                    <section className="section-padding section-four">
                        <div className="container">
                            {/* <h2 className="text-center bolder-font" dangerouslySetInnerHTML={{ _html: state?.Home?.section4?.heading }}></h2> */}
                            <h2 className="text-center bolder-font" dangerouslySetInnerHTML={{ __html: state?.Home?.section4?.heading }}></h2>

                            <div>
                                <div>
                                    {/* <h1 className="text-center">Will Be Imported From Opean Sea</h1> */}
                                    <h1 className="text-center" dangerouslySetInnerHTML={{ __html: state?.Home?.section4?.text }}></h1>
                                </div>

                            </div>

                        </div>

                    </section>
                </div>
                <div  >
                    <section className="section-padding" style={{ backgroundImage: `url(${SectionFiveImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                    </div>
                                    <div className="pt-5 text-white">
                                        <div className="m-2 pb-2">
                                            {/* <h1 className="bolder-font">Start your own collection <br /> today</h1> */}
                                            <h1 className="bolder-font" dangerouslySetInnerHTML={{ __html: state?.Home?.section5?.heading }}></h1>
                                        </div>
                                        <div className="m-2 pb-2">
                                            {/* <h5>The No-Code Solution for generating <br /> your 10,000 NFT collection</h5> */}
                                            <h5 dangerouslySetInnerHTML={{ __html: state?.Home?.section5?.text }}></h5>
                                        </div>
                                        <div className="pb-2">
                                            {/* <button className="section-one-button" style={{ backgroundColor: '#ff7faf' }}>GET STARTED</button> */}
                                            <button className="section-one-button" style={{ backgroundColor: '#ff7faf' }} dangerouslySetInnerHTML={{ __html: state?.Home?.section5?.buttonText }}></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 m-auto">
                                    <div className="text-center">
                                        <img src={state?.Home?.section5?.image} alt="nft-icon" className="img-fluid" />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section>
                </div>
                <div  >
                    <section className="section-padding" style={{ backgroundColor: state?.Home?.section6?.bgColor }}>
                        <div style={{ backgroundImage: `url(${HeroLeft}) , url(${HeroRight})`, backgroundRepeat: 'no-repeat', backgroundPosition: "left , right", height: '400px' }}>
                            <div className="container">
                                <h2 className="text-center bolder-font p-2">Blogs</h2>

                                <div className='row'>
                                    {state && state?.Blog?.section2.map((blog, index) => {
                                        if (index > 2) return
                                        return (
                                            <>
                                                <div className="blog col-md-4 p-0 m-1 box" style={{ backgroundColor: '#ffffff' }} onClick={() => history.push(`/blog/${blog.id}`)}>
                                                    <div className="">
                                                        <div className="position-absolute rounded-pill" style={{ height: '40px', minWidth: '180px', backgroundColor: "#ffffff", margin: '10px' }}>
                                                            <div className="ms-2 mt-2">
                                                                <span className="bolder-font">Created by {blog.createdBy}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <img src={blog.featuredImage} style={{ width: '100%', height: '210px', borderTopRightRadius: '13px', borderTopLeftRadius: '13px', objectFit: 'cover' }} />
                                                        </div>

                                                    </div>
                                                    <div className="container">
                                                        <div className="mt-4">
                                                            <h5 className="bolder-font">{blog.blogTitle}</h5>
                                                            <span>{blog.createdAt}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div  >
                    <section className="section-padding section-seven">
                        <div className="container">
                            {/* <h1>FAQ'S</h1> */}
                            <h1 dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.heading }}></h1>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="d-flex flex-column">
                                        <div className="mb-5">
                                            {/* <h4>What is NFT Generator?</h4> */}
                                            <h4 dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.listHead }}></h4>
                                            <p dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.listText }}></p>
                                            {/* <p>NFT Generator is the easiest tool to use if you want to generate thousands of unique items for your NFT collection.No coding required, just drag and drop your images, create layers and set rarity.</p> */}
                                            <div>
                                                <img src={state?.Home?.section7?.listImages} alt="purpledash" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            {/* <h4>How do we handle your data?</h4> */}
                                            <h4 dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.listHead2 }}></h4>
                                            {/* <p>None of the assets you drag & drop are uploaded to our servers when generating previews or free collections.</p> */}
                                            <p dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.listText2 }}></p>
                                            <div>
                                                <img src={state?.Home?.section7?.listImages} alt="purpledash" className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-5">
                                        {/* <h4>Why use NFT Generator?</h4> */}
                                        <h4 dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.listHead3 }}></h4>
                                        {/* <p>NFT Generator is the easiest way start selling your NFT collection.With its ease of use combined with powerful rarity capability, NFT Generator will provide the features you are looking for.</p> */}
                                        <p dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.listText3 }}></p>
                                        <div>
                                            <img src={state?.Home?.section7?.listImages} alt="purpledash" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <h4 dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.listHead4 }}></h4>
                                        {/* <h4>Missing feature?</h4> */}
                                        {/* <p>If NFT Generator is not meeting some of your needs, let us know using the chatbox and we will work with you! </p> */}
                                        <p dangerouslySetInnerHTML={{ __html: state?.Home?.section7?.listText4 }}></p>
                                        <div>
                                            <img src={state?.Home?.section7?.listImages} alt="purpledash" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section>
                </div >
            </div>

        </div >
    )
}
