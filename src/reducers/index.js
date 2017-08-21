import { combineReducers } from 'redux'

import {
  SET_POSTS,
  SET_COMMENTS_TO_POST_ID,
  APPLY_VOTE,
  UPDATE_SORT_METHOD,
  CONTROL_NEW_POST_FORM,
  ADD_NEW_POST,
  DISPLAY_DELETE_MODAL,
  SET_POST_ID_TO_DELETE_MODAL,
  DELETE_POST,
  CONTROL_EDIT_POST_FORM,
  EDIT_POST,
  CONTROL_NEW_COMMENT,
  ADD_COMMENT,
  APPLY_VOTE_TO_COMMENT,
  SHOW_TOAST,
  CONTROL_EDIT_COMMENT_FORM,
  UPDATE_COMMENT
} from '../actions'

import { categories } from './categories'

function comments (state = {}, action) {
  switch (action.type) {
    case SET_COMMENTS_TO_POST_ID :

      const { postId, comments } = action
      return {
        ...state,
        [postId]: comments
      }

    case APPLY_VOTE_TO_COMMENT :

      const {commentId, newValue } = action
      let newState = state;
      newState[action.parentId].map((comment) => {
        if (comment.id === commentId)
          comment.voteScore = newValue
        return comment
      })
      return newState

    case ADD_COMMENT :

      const { comment } = action
      const parentId = action.postId
      return {
        ...state,
        [parentId]: state[parentId].concat({
          author: comment.commentAuthor,
          body: comment.newComment,
          deleted: false,
          id: comment.id,
          parentDeleted: false,
          parentId,
          timestamp: comment.timestamp,
          voteScore: 1
        })
      }
    case UPDATE_COMMENT:

    return {
      ...state,
      [action.parentId]: state[action.parentId].map(
           (content) => content.id === action.id ? {...content, body: action.body, author: action.author}
                                   : content
       )
    }

    default :
      return state
  }
}

function posts (state = {}, action) {
  switch (action.type) {

    case DELETE_POST :
      const postIdToDelete = action.postId
      return {
        ...state,
        [postIdToDelete]: {
          ...state[postIdToDelete],
          deleted: true
        },
      }

    case SET_POSTS :
      const { posts } = action
      let stateWithPosts = []
      posts.forEach( (post) => {
        stateWithPosts = {
          ...stateWithPosts,
          [post.id]: post
        }
      })
      return stateWithPosts

    case EDIT_POST:
      const postEdited = action.post
      return {
        ...state,
        [postEdited.id]: {
          ...state[postEdited.id],
          title: postEdited.title,
          body: postEdited.body,
          author: postEdited.author,
          category: postEdited.category
        }
      }

    case APPLY_VOTE :
      const { postId, newValue } = action

      return {
        ...state,
        [postId]: {
          ...state[postId],
          voteScore: newValue
        }
      }
    case ADD_NEW_POST:
      const { title, username, message, category, id, timestamp } = action

      return {
        ...state,
        theNewPost: {
          author: username,
          body: message,
          category,
          deleted: false,
          id,
          timestamp,
          title,
          voteScore: 1
        }
      }
    default :
      return state
  }
}

function sortMethod(state = 'score', action) {
  switch (action.type) {
    case UPDATE_SORT_METHOD:
      return action.method
    default :
      return state
  }
}

function newPostForm(state = {}, action) {
  switch (action.type) {
    case CONTROL_NEW_POST_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

function deletePostModal(state = false, action) {
  switch (action.type) {
    case DISPLAY_DELETE_MODAL:
      const { active } = action
      return {
        ...state,
        isActive: active
      }
    case SET_POST_ID_TO_DELETE_MODAL:
      const { postId } = action
      return {
        ...state,
        postId
      }
    default :
      return state
  }
}

function editPostForm(state = {}, action) {
  switch (action.type) {
    case CONTROL_EDIT_POST_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

function newCommentData(state = {}, action) {
  switch (action.type) {
    case CONTROL_NEW_COMMENT:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

function toastMessage(state = '', action) {
  switch (action.type) {
    case SHOW_TOAST :
      const { message } = action
      return message
    default :
      return state
  }
}

function editCommentForm(state = {id: 0}, action) {
  switch (action.type) {
    case CONTROL_EDIT_COMMENT_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  sortMethod,
  newPostForm,
  editPostForm,
  deletePostModal,
  newCommentData,
  toastMessage,
  editCommentForm
})