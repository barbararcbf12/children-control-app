import { put, call } from 'redux-saga/effects';
import { fetchChildrenGroup, checkInChild, checkOutChild } from '../Api/api';
import * as types from '../constants/actionTypes';


export function* searchMediaSaga({ payload }) {
  try {
    const children = yield call(fetchChildrenGroup, payload);
    yield [
      put({ type: types.FETCH_CHILDREN_SUCCESS, children }),
      put({ type: types.SELECTED_CHILD, child: children[0] })
    ];
  } catch (error) {
    yield put({ type: 'FETCH_CHILDREN_FAILURE', error });
  }
}

export function* checkInChildSaga({ child, pickupTime }) {
  try {
    const children = yield call(checkInChild, child, pickupTime);
    yield [
      put({ type: types.CHECKIN_CHILD_SUCCESS, child: child, pickupTime: pickupTime })
    ];
  } catch (error) {
    yield put({ type: 'CHECKIN_CHILD_FAILURE', error });
  }
}

export function* checkOutChildSaga({ child }) {
  try {
    const children = yield call(checkOutChild, child);
    yield [
      put({ type: types.CHECKOUT_CHILD_SUCCESS, child: child })
    ];
  } catch (error) {
    yield put({ type: 'CHECKOUT_CHILD_FAILURE', error });
  }
}