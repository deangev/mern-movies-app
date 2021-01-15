import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from './context/UserContext';
import watchlistContext from './context/watchlistContext';
import Axios from 'axios'
import Home from './components/Home';
import Navbar from './components/layout/Navbar';
import { url } from './context/urlProvider';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Watchlist from './components/watchlist/Watchlist';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    name: undefined,
    id: undefined
  });

  const [userWatchlist, setUserWatchlist] = useState()

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token')
      if (token === null) {
        localStorage.setItem('auth-token', "")
        token = ""
      }
      const tokenRes = await Axios.post(
        `${url}/users/tokenIsValid`,
        null,
        { headers: { "x-auth-token": token } }
      )
      if (tokenRes.data) {
        const userRes = await Axios.get(
          `${url}/users/`,
          { headers: { "x-auth-token": token } }
        )
        setUserData({
          token,
          firstName: userRes.data.firstName,
          lastName: userRes.data.lastName,
          id: userRes.data.id,
          email: userRes.data.email,
          watchlist: userRes.data.watchlist
        })
      }
    }

    checkLoggedIn()
  }, [])

  useEffect(() => {
    const getWatchlist = async () => {
      let token = localStorage.getItem('auth-token');
      if (token) {
        let watchlistRes = await Axios.get(
          `${url}/watchlist/`,
          { headers: { "x-auth-token": token } }
        )
        setUserWatchlist(watchlistRes.data);
      }
    }
    getWatchlist()
  }, [userData.id])

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <watchlistContext.Provider value={{ userWatchlist, setUserWatchlist }}>
            <Navbar />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/watchlist" component={Watchlist} />
              <Route exact path="/" component={Home} />
            </Switch>
          </watchlistContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;