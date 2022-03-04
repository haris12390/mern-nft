import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './innerBlog.css'
import ReactHtmlParser from 'react-html-parser';
import useLayout from 'src/hooks/useLayout';

export default function Blog() {

    const { id } = useParams()
    const { state } = useLayout()
    const history = useHistory()

    return (
        <div className="contact-wrapper d-flex flex-column justify-content-lg-between">
            <section className="blog-section1 mt-1">
                <div className="blog-hero-section">
                    <div className="text-center p-5">
                        <h1 style={{ fontWeight: "bold" }}>BLOG</h1>
                        <p style={{ fontWeight: "bold" }}><span>HOME</span> / <span style={{ color: '#ff7faf' }}>BLOG</span></p>
                    </div>
                </div>
            </section>
            <section className="blog-section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ">
                            {state?.Blog?.section2 && state?.Blog?.section2.map(blog => {
                                if (blog.id === id) {
                                    return (
                                        <div className="d-flex flex-column justify-content-between" key={blog.id}>
                                            <h2 style={{ fontWeight: "bold" }}>{blog.blogTitle}</h2>
                                            <div >
                                                <span>{blog.createdAt}</span>
                                            </div>
                                            <div className="py-4">
                                                <img className="rounded" src={blog.featuredImage} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
                                            </div>
                                            <div>
                                                {ReactHtmlParser(blog.blogText)}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex flex-column">
                                <div className="">
                                    <h3>Search</h3>
                                    <div className="input-group">
                                        <input className="form-control border-end-0 border" type="search" id="example-search-input" />
                                        <span className="input-group-append">
                                            <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
                                                <i className="fa fa-search" style={{ color: '#f9689f' }}></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <h3>Top Blog</h3>
                                    <div className="d-flex flex-column">
                                        {state?.Blog?.section2 && state?.Blog?.section2.map(blog => {
                                            if (blog.id === id) return
                                            return (
                                                <div className="py-2 d-flex blog-list" key={blog.id} onClick={() => history.push(`/blog/${blog.id}`)} >
                                                    <img className="rounded-3" src={blog.featuredImage} height="84px" width="149px" alt="featured image" />
                                                    <div style={{ paddingLeft: '5px' }}>
                                                        <span className="bolder-font small">{blog.blogTitle}</span>
                                                        <br />
                                                        <span className="small">{blog.createdAt}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="pt-5">
                                        <h3 className="bolder-font">Categories</h3>
                                        <ul>
                                            <li className="list-unstyled">Art</li>
                                            <li className="list-unstyled">Virtual Worlds</li>
                                            <li className="list-unstyled">Collectibles</li>
                                            <li className="list-unstyled">Music</li>
                                            <li className="list-unstyled">Games</li>
                                            <li className="list-unstyled">Domains</li>
                                            <li className="list-unstyled">Memes</li>
                                        </ul>
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
