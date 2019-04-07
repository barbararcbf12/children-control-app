import { fork } from 'redux-saga/effects';
import { watchSearchMedia, watchChildCheckIn, watchChildCheckOut } from './watchers';

export default function* startForman() {
  yield fork(watchSearchMedia);
  yield fork(watchChildCheckIn);
  yield fork(watchChildCheckOut);
}
