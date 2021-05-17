import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MyJobs from './pages/MyJobs';
import Home from './pages/Home';
import AllJobs from './pages/AllJobs';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Registration from './pages/Registration';

function App() {

    return (
        <Router>
          <Navbar></Navbar>
          <Toaster/>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/jobs' component={AllJobs} />
            <Route path='/login' component={Login} />
            <Route path='/myjobs' component={MyJobs} />
            <Route path='/reg' component={Registration} />
          </Switch>
        </Router>
    );

}

export default App;