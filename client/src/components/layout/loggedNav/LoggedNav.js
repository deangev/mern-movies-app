import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import './loggedNav.css'
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import UserContext from '../../../context/UserContext';

export default function LoggedNav() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const watchlist = () => {
        history.push('/watchlist')
    }

    const logout = () => {
        localStorage.setItem('auth-token', '')
        setUserData({
            token: undefined,
            firstName: undefined,
            lastName: undefined,
            id: undefined,
            email: undefined,
            watchlist: undefined
        })
        history.push('/')
    }

    return (
        <div className="logged-container">
            <div className="logged-wrapper">
                {userData.firstName && <div className="user-info">
                    <FaIcons.FaRegUserCircle className="user-icon" onClick={watchlist} style={{ cursor: 'pointer' }} />
                    <h3 className="user-name">{userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1)}</h3>

                    <ul className="menu">
                        <li>
                            <button type="submit" id="dropdownMenuButton" href="#"><MdIcons.MdArrowDropDown className="dropdown-icon" /></button>
                            <ul id="dropdown-list-menu">
                                <li><button className="border-bottom" onClick={watchlist}>Your watchlist</button></li>
                                <li><button onClick={logout}>Sign out</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                }
            </div>
        </div>
    )
}
