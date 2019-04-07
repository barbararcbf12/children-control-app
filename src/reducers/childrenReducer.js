import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = {children: initialState.children, pickupTime: initialState.pickupTime}, action) { 
  switch (action.type) {
    case types.FETCH_CHILDREN_SUCCESS:
      return [...state, action.children];
    case types.SELECTED_CHILD:
      return { ...state, selectedChild: action.child };
    case types.CHECKIN_CHILD:
      return { ...state, selectedChild: action.child, pickupTime: action.pickupTime }; 
    case types.CHECKOUT_CHILD:
      return { ...state, selectedChild: action.child } 
    default:
      return state;
  }
}

