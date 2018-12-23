import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import './App.scss';
import PostsContainer from './components/PostsContainer';
import Login from './components/Login';
import AddNewPostContainer from './components/AddNewPostContainer';
import { appRoutes } from "./config";

class App extends Component {
  redirect = () => {
    const {isAuthenticated} = this.props;
    if (isAuthenticated) {
      return <Redirect to={appRoutes.list} />
    } else {
      return <Redirect to={appRoutes.login} />
    }
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      this.props.history.push(appRoutes.list);
    }
  }

  render() {
    const {history} = this.props;

    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path={appRoutes.home} render={this.redirect} />
            <Route exact path={appRoutes.login} component={Login} />
            <Route exact path={appRoutes.list} component={PostsContainer} />
            <Route exact path={appRoutes.add} component={AddNewPostContainer} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.autodditsReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(App);
