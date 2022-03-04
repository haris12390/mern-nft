import React from 'react'
import { useHistory } from 'react-router-dom'
import './blog.css'
import useLayout from 'src/hooks/useLayout';

export default function Blog() {

    const history = useHistory()
    const { state } = useLayout()

    return (
        <div className="blog-wrapper d-flex flex-column justify-content-lg-between">
            <section className="blog-section1 mt-1">
                <div className="blog-hero-section">
                    <div className="text-center p-5">
                        <h1 style={{ fontWeight: "bold" }}>BLOG</h1>
                        <p ><span style={{ fontWeight: "bold" }}>HOME</span> / <span style={{ color: '#ff7faf', fontWeight: "bold" }}>BLOG</span></p>
                    </div>
                </div>
            </section>
            <section className="blog-section-padding">
                <div className="container">
                    <div className="row">
                        {state?.Blog?.section2 && state?.Blog?.section2.map((blog) => {
                            return (
                                <>
                                    <div className="blog col-md-3 p-0 box" onClick={() => history.push(`/blog/${blog.id}`)}>
                                        <div >
                                            <div className="position-absolute rounded-pill" style={{ height: '40px', minWidth: '180px', backgroundColor: "#ffffff", margin: '10px' }}>
                                                <div className="ms-2 mt-2">
                                                    <span style={{ fontWeight: "bold" }}>Created by {blog.createdBy}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <img src={blog.featuredImage} style={{ width: '100%', height: '210px', borderTopRightRadius: '13px', borderTopLeftRadius: '13px', objectFit: 'cover' }} />
                                            </div>
                                            {/* <div className="bg-info container">
                                                <div className="position-absolute rounded-pill" style={{ height: '40px', minWidth: '130px', backgroundColor: "#0076d4", color: 'white', marginLeft: '150px', marginTop: '-20px' }}>
                                                    <div className="ms-2 mt-2">
                                                        <p className="bolder-font text-center">{blog.category}</p>
                                                    </div>
                                                </div>
                                            </div> */}
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
            </section>
        </div>
    )
}
