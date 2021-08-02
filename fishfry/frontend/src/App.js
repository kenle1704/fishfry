import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  BoatsList from './BoatsList'
import  BoatCreateUpdate  from './BoatCreateUpdate'
import  GuidesList from './GuidesList'
import  GuideCreateUpdate  from './GuideCreateUpdate'
import  SwimLanesList from './SwimLanesList'
import  SwimLaneCreateUpdate  from './SwimLaneCreateUpdate'
import  BoatServiceList from './BoatServiceList'
import  BoatServiceCreateUpdate  from './BoatServiceCreateUpdate'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/">Fishfry</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="/">BOAT SERVICES</a>
      <a className="nav-item nav-link" href="/boatservice">CREATE BOAT SERVICE</a>
      
    </div>
  </div>
</nav>  

    <div className="content">
      	<Route path="/" exact component={BoatServiceList} />
      	<Route path="/boatservice/:pk"  component={BoatServiceCreateUpdate} />
	<Route path="/boatservice/" exact component={BoatServiceCreateUpdate} />
	<Route path="/guideslist/" exact component={GuidesList} />
	<Route path="/guide/:pk"  component={GuideCreateUpdate} />
	<Route path="/guide/" exact component={GuideCreateUpdate} />
	<Route path="/swimlaneslist/" exact component={SwimLanesList} />
	<Route path="/swimlane/:pk"  component={SwimLaneCreateUpdate} />
	<Route path="/swimlane/" exact component={SwimLaneCreateUpdate} />
      	<Route path="/boatslist/" exact component={BoatsList} />
      	<Route path="/boat/:pk"  component={BoatCreateUpdate} />
      	<Route path="/boat/" exact component={BoatCreateUpdate} />
	
    </div>

  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;
