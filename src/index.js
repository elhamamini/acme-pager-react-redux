import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, NavLink } from 'react-router-dom';
import { fetchEmployees, store } from './store.js';
import NavBar from './nav.js';
import Info from './info.js';
const rootEl = document.querySelector('#root');

class App extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    console.log(store.getState());
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    // fetchEmployees(1);
  }
  render() {
    const { employees } = this.state;

    return (
      <HashRouter>
        <Route render={props => <NavBar {...this.state} {...props} />} />
        <Route
          path="/:page?"
          render={props => <Info {...this.state} {...props} />}
        />
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, rootEl);
