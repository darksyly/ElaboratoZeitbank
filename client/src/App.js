import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MyJobs from './pages/MyJobs';
import Home from './pages/Home';
import AllJobs from './pages/AllJobs';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {

    return (
        <Router>
          <Navbar></Navbar>
          <Toaster/>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/jobs' component={AllJobs} />
            <Route path='/myjobs' component={MyJobs} />
            <Route path='/reg' component={Registration} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
    );

}

export default App;