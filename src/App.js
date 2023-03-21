import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import NewLogin from './components/NewLogin';
import NewSearch from './components/NewSearch';
import Album from './components/Album';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
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
    <div className="app">
    <Switch>
        <Route exact path="/">
          { logged ? <Redirect to="/search" /> : <NewLogin
            handleInputChange={ handleInputChange }
            loginBtnClick={ loginBtnClick }
            userName={ userName }
            loading={ loading }
          /> }
        </Route>
        <Route exact path="/search" render={ () => <NewSearch loading={ loading } /> } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
    </Switch>
    </div>
  );
}

export default App;