import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './stateProvide';

// Components
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';

function App() {

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
    {!user ? (
      <Login />
    ) : (
      <div className="app__body">
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/rooms/:roomId">
            <Chat />
          </Route>
          <Route exact path="/">
            {/* <Chat /> */}
          </Route>
        </Switch>
      </Router>
    </div>
    )}
      
    </div>
  );
}

export default App;
