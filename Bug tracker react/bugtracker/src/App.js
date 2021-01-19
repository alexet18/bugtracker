import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import { render } from '@testing-library/react';
import LoginPage from './LoginPage';
import Nav from './Nav'
import ProjectsPage from './ProjectsPage';
import DialogMembers from './AddMember';
import AddProject from './AddProject'






function App() {



  return (
  <Router>
    <div className="App">
      
       <Nav />
      
       <Route path="/" exact component = {LoginPage}/>
      
       <Route path="/projects" exact component = {ProjectsPage}/>
      
       
    </div>
    </Router>
)
}


export default App;
