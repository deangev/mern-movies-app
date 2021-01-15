import React from 'react'
import {Nav} from 'react-bootstrap'
import './unLoggedNav.css'

export default function UnLoggedNav() {
    return (
        <Nav className="navbar">
            <Nav.Item className="option-container-top-nav mr-4 ">
                <Nav.Link className="option d-flex align-items-center" href="/login">Sign in</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
