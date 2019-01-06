import * as actions from '../Common/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import { getData } from 'src/Common/api';
import routes from '../Common/routes';

function* fetchProducts() {
  try {
    const response = yield call(() => getData(routes.products));
    const data = response.data;

    yield put({ type: actionTypes.RECV_PRODUCTS, payload: data });
  } catch (e) {
    yield put(actions.getFailure(e));
  }
}

export function* productListWatcher() {
  yield takeLatest(actionTypes.GET_PRODUCTS, fetchProducts);
}