import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loginAction} from "../../actions";
import "./style.scss";

class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let curRefValue = this.refs.username.value;
        //if one of the fields is empty, we won't submit
        if (!curRefValue) { return; }
        this.props.loginAction(curRefValue);
    };

    render() {
        return (
            <div className="login">
                <h1>Login Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Username</label>
                        <div>
                            <input name="username" ref="username" type="text" placeholder="Enter a username"/>
                        </div>
                    </div>
                    <div>
                        <button type="submit">login</button>
                    </div>
                </form> 
            </div>
            );
    }
}

Login.proptypes = {
    username: PropTypes.string,
    loginAction: PropTypes.func,
};

const mapStateToProps = (state) => ({
    username: state.autodditsReducer.username
});
  
export default connect(mapStateToProps, {loginAction})(Login);