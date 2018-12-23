import * as actionType from "./types";

export const loginAction = (username) => {
    return {
        type: actionType.LOGIN,
        username: username
    };
};

export const addCommentAction = (postId, commentObj) => {
    return {
        type: actionType.ADD_COMMENT,
        payload: {
            postId,
            commentObj
        }
    };
};

export const addNewPostAction = (postObj) => {
    return {
        type: actionType.ADD_NEW_POST,
        payload: {
            postObj
        }
    };
};

export const increaseVotesAction = (postId, commentId) => {
    return {
        type: actionType.INCREASE_VOTE,
        payload: {
            postId,
            commentId
        }
    }
};

export const decreaseVotesAction = (postId, commentId) => {
    return {
        type: actionType.DECREASE_VOTE,
        payload: {
            postId,
            commentId
        }
    }
};

