import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
import Post from "../Post";
import withAuthentication from '../AuthenticateHOC';

class PostsContainer extends Component {
    renderPosts = () => {
      const { posts } = this.props;

      return posts && posts.map( (post) => {
        return (
          <Post
            {...post}
            key={post.postId}
          />
          );
      });
    };

    render() {
        return (
          <div className="posts">
            <h1>Posts List</h1>
            <h4>Logged in as: {this.props.username}</h4>
            <Link className="posts__add-new" to="/list/add">Add new post</Link>
            <div className="posts__list">
              {this.renderPosts()}
            </div>
          </div> 
        );
    }
}

PostsContainer.proptypes = {
  posts: PropTypes.array,
  username: PropTypes.string
};

const mapStateToProps = (state) => ({
  posts: state.autodditsReducer.posts,
  username: state.autodditsReducer.username
});
  
export default withAuthentication(connect(mapStateToProps,null)(PostsContainer));