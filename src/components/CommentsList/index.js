import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Post from '../Post';

class CommentsList extends Component {
    getCommentsCount = () => {
        let commentsCount = this.props.comments.length;

        return commentsCount > 0 ? commentsCount : 0
    };

    getComments = () => {
        let { comments } = this.props;
        return comments.map( (comment) => {
            return (<Post
                        {...comment}
                        key={comment.commentId}
                    />)
        });
    };

    render() {
        const comments = this.getComments();
        
        return (
            <div className="comment">
                {comments}
            </div>
        );
    }
}

CommentsList.proptypes = {
    comments: PropTypes.array
};

export default CommentsList;