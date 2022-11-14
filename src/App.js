import './App.css';

import { Switch, Route, Redirect } from "react-router-dom";

import EntryPage from './pages/entry/entry.page';
import RecordPage from './pages/record/record.page';

import Topbar from './components/topbar/topbar.component';
import LoginPage from './pages/login/login.page';

import PrivateRoute from './components/privateroutewrapper/privateRoute.component'
import { useState } from 'react'
import EditInfo from './components/edit/edit.component';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <Topbar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/login">
          <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        </Route>
        <PrivateRoute path="/entry" isLoggedIn={isLoggedIn}>
          <EntryPage />
        </PrivateRoute>
        <PrivateRoute path="/record" isLoggedIn={isLoggedIn}>
          <RecordPage />
        </PrivateRoute>
        <Route path='*'>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
