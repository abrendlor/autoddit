import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import moment from "moment";
import Modal from 'react-modal';
import './style.scss';
import {addCommentAction} from "../../actions";

Modal.setAppElement('#root');

class CommentsHandler extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }

    openModal = () => { this.setState({modalIsOpen: true}); }

    closeModal = () => { this.setState({modalIsOpen: false}); }

    getCommentsCount = () => {
        const { comments } = this.props;

        return comments && comments.length > 0 
                ? comments.length
                : 0
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let curRefValue = this.refs.commentText.value;
        //if one of the fields is empty, we won't submit
        if (!curRefValue) { return; }
        this.props.addCommentAction(this.props.postId, this.getCommentObj(curRefValue));
        this.closeModal();
    }

    getCommentObj = (commentText) => {
        const { postId, commentId } = this.props;
        return {
            postId: postId,
            parentCommentId: commentId ? commentId : null,
            text: commentText,
            submissionUser: this.props.username,
            submissionDate: moment().format("MMM D, YYYY hh:mm"),
            votesCount: 0
        }  
    }

    renderModal = () => {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Add comment"
                className="add-comment-modal"
                >
                <h2>Add comment</h2>
                <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
                    <textarea ref="commentText" name="commentText" />
                    <button type="submit">Add comment</button>
                    <button onClick={this.closeModal}>close</button>
                </form>        
            </Modal>
        );
    };

    render() {
        const { toggleComments } = this.props;
        const commentsCount = this.getCommentsCount();
        const commentsCountString = commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`;

        return (
            <div className="comments-handler">
                <div className="comments-handler__count" onClick={toggleComments}>
                    {commentsCountString}
                </div>
                <div className="comments-handler__add" onClick={this.openModal}>
                    Add comment
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

CommentsHandler.proptypes = {
    addNewPostAction: PropTypes.func,
    username: PropTypes.string,
    comments: PropTypes.array,
    toggleComments: PropTypes.func,
    postId: PropTypes.number,
    parentCommentId: PropTypes.number,
    commentId: PropTypes.number
};

const mapStateToProps = (state) => ({
    username: state.autodditsReducer.username
});

export default connect(mapStateToProps,{addCommentAction})(CommentsHandler);


