import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import { Container } from 'react-bootstrap';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation.js';
import Artists from './components/Artists/Artists';
import ArtistsDetails from './components/ArtistDetails/ArttistDetails';
import Photo from './components/Photo/Photo';

function App() {
  const [loggedIn, setLoggedIn]= useState(localStorage.getItem('token') ? true : false);
  const [userInfo, setUserInfo] = useState(null);
  const [photos, setPhotos] =useState([]);
  
  const handleLogout = async()=>{
    try{
      const response = await fetch('https://hidden-reef-03391.herokuapp.com/token/logout', {
        method :'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        },
      });
      if (response.status === 204) {
        alert('you have been logged out!')
        //delete the token
        localStorage.removeItem('token');
        //reset login state
        setLoggedIn(false)
      }
    }catch(err){
      console.log(err)
    }
  }
  const handleSetLogIn = (authToken) => {
    setLoggedIn(true);
    localStorage.setItem('token', authToken);
    getUserInfo();
  }

  const getUserInfo = async () => {
    try {
      const response = await fetch('https://hidden-reef-03391.herokuapp.com/users/me/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (loggedIn) {
      getUserInfo();
    }
  }, []);

  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} handleLogout={handleLogout} userInfo={userInfo}/>
      <Container>
        <Switch>
          <Route path='/login' render={() => <Login handleSetLogIn={handleSetLogIn} />} />
          <Route path='/signup' render={() => <Signup />} />
          <Route path='/' exact component={Home} /> 
          <Route
            path='/artists'
            exact
            render={() => <Artists loggedIn={loggedIn} />}
          />
           <Route
            path='/artists/:id'
            render={() => (
              <ArtistsDetails userInfo={userInfo} loggedIn={loggedIn} />
            )}
          />
          <Route
            path='/photos'
            render={() => (
              <Photo userInfo={userInfo} loggedIn={loggedIn} photos={photos} setPhotos={setPhotos} />
            )}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
