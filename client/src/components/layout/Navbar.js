import React, { useContext } from 'react';
import './navbar.css';
import * as Ai from 'react-icons/ai'
import SearchComp from '../SearchComp';
import UserContext from '../../context/UserContext';
import LoggedNav from './loggedNav/LoggedNav';
import UnLoggedNav from './unLoggedNav/UnLoggedNav';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { userData } = useContext(UserContext);

    return (
        <div className="row top-navbar">
            <Link to='/' className="col-1 header-logo-container"><div className="header-logo"><Ai.AiFillHome /></div></Link>
            <div className="ml-4 col-8"><SearchComp /></div>
            <div className="top-navbar-user-container">
                {userData.id ?
                    <LoggedNav /> :
                    <UnLoggedNav />
                }
            </div>
        </div>

    )
}
