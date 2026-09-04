import React from 'react'
import Header from '../inc/Header'
import { Outlet } from 'react-router'
import Footer from '../inc/Footer'

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout