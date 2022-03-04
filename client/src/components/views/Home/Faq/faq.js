import React from 'react'
import './faq.css'
import useLayout from 'src/hooks/useLayout';

export default function Contact() {
    const { state } = useLayout()
    return (
        <div className="faq-wrapper d-flex flex-column justify-content-lg-between">
            <section className="faq-section1 mt-1">
                <div className="faq-hero-section">
                    <div className="text-center p-5">
                        <h1 className="bolder-font">FAQ'S</h1>
                        <p className="bolder-font"><span>HOME</span> / <span style={{ color: '#ff7faf' }}>FAQ</span></p>
                    </div>
                </div>
            </section>
            <section className="faq-section-padding-small">
                <div className="container">
                    <div className="">
                        {state?.FAQ?.section2 && state?.FAQ?.section2.map((faq, i) => (
                            <div className="col-12">
                                <h4 className="bolder-font">{faq.questions}</h4>
                                <p>{faq.answers}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
