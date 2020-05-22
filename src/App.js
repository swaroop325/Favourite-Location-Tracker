import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './Components/login';
import signup from './Components/signup';
function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/signup" component={signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
