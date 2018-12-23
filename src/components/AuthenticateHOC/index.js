import React, { Component } from 'react';  
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { appRoutes } from "../../config";

const withAuthentication = (ComposedComponent) => {  
  class Authenticate extends Component {
    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    checkAndRedirect = () => {
      const { isAuthenticated } = this.props;

      if (!isAuthenticated) {
        this.redirect();
      }
    };

    redirect = () => {
        this.props.history.push(appRoutes.login);
    };

    render() {
      return (
        <div>
          { this.props.isAuthenticated
             ? 
            <ComposedComponent {...this.props} />
             : 
             null
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.autodditsReducer.isAuthenticated
    };
  };

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool
  }

  return connect(
    mapStateToProps, 
    null
  )(Authenticate)
};

export default withAuthentication;