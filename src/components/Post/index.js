import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import './style.scss';
import Votes from '../Votes';
import PostData from "../PostData";
import CommentsList from "../CommentsList";
import Author from "../Author";
import CommentsHandler from "../CommentsHandler";
import {increaseVotesAction, decreaseVotesAction} from "../../actions";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComments: false
        }
    }
    handleOnIncreaseVotes = () => {
        this.props.increaseVotesAction(this.props.postId, this.props.commentId);
    };
    handleOnDecreaseVotes = () => {
        this.props.decreaseVotesAction(this.props.postId, this.props.commentId);
    };

    toggleComments = () => {
        const { comments } = this.props;

        this.setState({
            showComments:  !this.state.showComments &&
                            comments &&
                            comments.length > 0
        })
    };

    componentDidUpdate(prevProps, prevState) {
        const { comments } = this.props;
        //Added the feature where when adding a new comment to a post or to a comment, the comments list will expand
        if (!prevState.showComments && comments && prevProps.comments && comments.length > prevProps.comments.length) {
            this.setState({showComments: true});
        }
    }

    render() {
        const { postId, text, link,
                imageURL, submissionDate, submissionUser,
                comments, votesCount, parentCommentId, commentId } = this.props;

        const { showComments } = this.state;

        return (
            <div className="post" key={postId}>
                <Votes 
                    votesCount={votesCount}
                    onIncreaseVotes={this.handleOnIncreaseVotes}
                    onDecreaseVotes={this.handleOnDecreaseVotes}
                />
                {imageURL && <img 
                              alt="autoddit cover" 
                              src={imageURL} 
                              />}
                <PostData
                    text={text}
                    link={link}
                >
                    <Author 
                        submissionDate={submissionDate}
                        submissionUser={submissionUser}
                    />
                    <CommentsHandler 
                        comments={comments} 
                        toggleComments={this.toggleComments}
                        postId={postId}
                        parentCommentId={parentCommentId}
                        commentId={commentId}
                    />
                </PostData>
                {showComments && (
                    <div className="comments-list">
                        <CommentsList 
                                comments={comments}
                            />
                    </div>
                )}
            </div>
        );
    }
}

const getComments = (state, ownProps) => {
    const posts = state.autodditsReducer.posts;
    const filteredPost = posts && posts.filter(post => post.postId === ownProps.postId);
    return filteredPost && filteredPost.length === 1
           ?
           filteredPost[0].comments.filter(comment =>
                (
                comment.parentCommentId === ownProps.parentCommentId 
                && 
                ownProps.parentCommentId === null 
                && 
                !ownProps.commentId
                ) 
                ||
                comment.parentCommentId === ownProps.commentId
                )
                :
                null;
};

Post.proptypes = {
    comments: PropTypes.array,
    increaseVotesAction: PropTypes.func,
    decreaseVotesAction: PropTypes.func,
    postId: PropTypes.number,
    text: PropTypes.string,
    link: PropTypes.string,
    imageURL: PropTypes.string,
    submissionDate: PropTypes.string,
    submissionUser: PropTypes.string,
    votesCount: PropTypes.number,
    parentCommentId: PropTypes.number,
    commentId: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
    comments: getComments(state, ownProps)
});
    
export default connect(mapStateToProps,{ increaseVotesAction, decreaseVotesAction })(Post);