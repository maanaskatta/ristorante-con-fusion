import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
switch (action.type) {
    case ActionTypes.POST_FEEDBACK:
        var feedback = action.payload;
        return {...state, comments: state.feedback.concat(feedback)};

    default:
      return state;
  }
};