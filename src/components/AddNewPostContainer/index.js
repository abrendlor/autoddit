import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import './style.scss';
import { addNewPostAction } from '../../actions';
import withAuthentication from '../AuthenticateHOC';

class AddNewPostContainer extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const { addNewPostAction, username } = this.props;

        let addNewPostPayload = {
            parentCommentId: null,
            submissionUser: username,
            submissionDate: moment().format("MMM D, YYYY hh:mm"),
            votesCount: 0,
            comments: []
        };

        for (var ref in this.refs) {
            let curRefValue = this.refs[ref].value;
            //if one of the fields is empty, we won't submit
            if (!curRefValue) { return; }
            addNewPostPayload[ref] = curRefValue;
        }

        addNewPostAction(addNewPostPayload);
        this.props.history.push("/list");
    };

    autoFill = () => {
        this.refs.text.value = "Call of Duty: Black Ops 4 Holiday Events Announced";
        this.refs.link.value = "https://www.gamespot.com/articles/call-of-duty-black-ops-4-holiday-events-announced/1100-6464068/";
        this.refs.imageURL.value = "https://static.trueachievements.com/customimages/088900.jpg";
    };

    render() {

        return (
          <div className="add-new-post">
            <h1>Add New Post</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Post title</label>
                    <div>
                        <input name="text" ref="text" type="text" placeholder="Enter a title to the post"/>
                    </div>
                </div>
                <div>
                    <label>Post link</label>
                    <div>
                        <input name="link" ref="link" type="text" placeholder="Enter a link for the post"/>
                    </div>
                </div>
                <div>
                    <label>Post image</label>
                    <div>
                        <input name="image" ref="imageURL" type="text" placeholder="Enter a url for the image"/>
                    </div>
                </div>
                <div>
                    <button type="button" onClick={this.autoFill}>Autofill</button>
                    <button type="submit">Submit</button>
                </div>
            </form> 
          </div> 
        );
    }
}

const mapStateToProps = (state) => ({
  username: state.autodditsReducer.username
});

AddNewPostContainer.proptypes = {
    addNewPostAction: PropTypes.func,
    username: PropTypes.string
};
  
export default withAuthentication(connect(mapStateToProps,{addNewPostAction})(AddNewPostContainer));