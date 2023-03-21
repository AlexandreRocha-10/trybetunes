import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Search from './components/Search';
import { createUser } from './services/userAPI';

function App() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  const handleInputChange = ({ target }) => {
    setUserName(target.value);
  };

  const loginBtnClick = () => {
    setLoading(true);
    useCreateUser();
  };

  const useCreateUser = async () => {
    try {
      await createUser({ name: userName });
      setLoading(false);
      setLogged(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Switch>
        <Route exact path="/">
          { logged ? <Redirect to="/search" /> : <Login
            handleInputChange={ handleInputChange }
            loginBtnClick={ loginBtnClick }
            userName={ userName }
            loading={ loading }
          /> }
        </Route>
        <Route exact path="/search" render={ () => <Search loading={ loading } /> } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
  );
}

export default App;
