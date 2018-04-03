import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Main from './views/Main'
import Building from './views/Building';
import Calendar from './views/Calendar';
import Admin from './views/Admin';
import Data from './data/Data'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

class App extends Component {
  constructor(props) {
		super(props)

		this.state = {
      sensor_data: ""
    }
  }

  componentDidMount() {
		Data.getData().then(result => {
			this.setState({ sensor_data: result });
		});
	}

  render() {
    console.log(this.state.sensor_data)
    return (
      <Switch>
        <Layout>
          <Route exact path="/" component={ Main } />
          <Route path="/building" component={ Building } />
          <Route path="/calendar" component={ Calendar } />
          <Route path="/admin" component={ Admin } />
        </Layout>
      </Switch>
	  );
  }
}

export default App;
