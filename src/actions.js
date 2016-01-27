import {createAction} from 'redux-actions';
import {PREV_MONTH, NEXT_MONTH, SELECT_DATE} from './constants';

export const prevMonth = createAction(PREV_MONTH);
export const nextMonth = createAction(NEXT_MONTH);
export const selectDate = createAction(SELECT_DATE);
