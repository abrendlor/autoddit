
import Immutable from "seamless-immutable";
import data from "../mocks/main";
import * as actionType from "../actions/types";


const defaultState = Immutable({
    isAuthenticated: data.isAuthenticated,
    username: data.Username,
    posts: data.Posts
});

let postId = 3;

const addPostId = (obj) => {
  return {
    postId: postId++,
    ...obj    
  }
}

const addCommentId = (postsCommentsLen, obj) => {
  return {
    commentId: ++postsCommentsLen,
    ...obj
  }
};

const pushCommentToArrayUpdater = (array, item) => {
  return [
    ...array,
    { ...item }
  ]
};

const addCommentToPost = (posts, postId, commentObj) => {
  //geting the target post we want to work on
  const targetPost = posts.filter(post => post.postId === postId)[0];
  //adding commentId
  let newCommentObj = addCommentId(targetPost.comments.length, commentObj);
  //adding to the comments array of the target post a new commentObj and returning a new target post
  const newTargetPost = Immutable.updateIn(targetPost, ["comments"], pushCommentToArrayUpdater, newCommentObj);
  //return a new posts array with the update new target post which we added the comment to
  return Immutable.setIn(posts, [postId-1], newTargetPost);
};

const insertItemToArray = (array, item) => {
  return Immutable.set(array, array.length, item);
};

const incVote = (x) => {
  return x+1;
};

const decVote = (x) => {
  return x-1;
}

const handleVotesCount = (posts, payload, isInc) => {
  const { postId, commentId } = payload;
  if (payload.postId && payload.commentId) {
    return handleVote(posts, [postId-1, "comments", commentId-1, "votesCount"], isInc);
  } else if (payload.postId && !payload.commentId) {
    return handleVote(posts, [postId-1, "votesCount"], isInc);
  }
};

const handleVote = (posts, arrPath, isInc) => {
  if (isInc) {
    return Immutable.updateIn(posts, arrPath, incVote);
  } else {
    return Immutable.updateIn(posts, arrPath, decVote);
  }
};

const autodditsReducer = (state = defaultState, action) => {
    switch (action.type) {
      case actionType.LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          username: action.username
        };
      case actionType.ADD_COMMENT:
        return {
          ...state,
          posts: addCommentToPost(state.posts, action.payload.postId, action.payload.commentObj)
        };
      case actionType.ADD_NEW_POST:
        return {
          ...Immutable.update(state, "posts", insertItemToArray, addPostId(action.payload.postObj))
        };
      case actionType.INCREASE_VOTE:
        return {
          ...state,
          posts: handleVotesCount(state.posts, action.payload, 1)
        };  
      case actionType.DECREASE_VOTE:
        return {
          ...state,
          posts: handleVotesCount(state.posts, action.payload, 0)
        };  
      default:
        return state
    }
  }
  
  export default autodditsReducer;