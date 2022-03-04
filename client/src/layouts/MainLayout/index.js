import React from 'react'
import Navbar from './Navbar/navbar'
import Footer from './Footer/footer'

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
