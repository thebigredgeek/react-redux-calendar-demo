import {handleActions} from 'redux-actions';
import {PREV_MONTH, NEXT_MONTH, SELECT_DATE, MONTH_NUM_TO_STRING} from './constants';

const initialDate = new Date();
const initialMonth = initialDate.getMonth();
const initialYear = initialDate.getFullYear();

function createMatrix (numDays, firstDay) {
  // 1) First firstRow
  //    - Render null while i < firstDay
  //    - Render nextDay while i < 7
  // 2) Render middle rows while nextDay <= numDays - 7
  //    - Render nextDay while i < 7
  // 3) Render last row if numDays - nextDay > 0 (leftovers)
  //    - Render nextDay while nextDay <= numDays
  //    - Render null while i < 7

  var i = 0;
  var firstRow = [];
  var rows = [firstRow];

  while (i < firstDay) {//1) first row nulls
    firstRow.push(null);
    i++;
  }

  var nextDay = 1;
  while (i < 7) { //1) first row nextDays
    firstRow.push(nextDay++);
    i++;
  }

  while (nextDay <= numDays - 7) { //2) render each middle row outer until there is less than a week of days left
    let nextRow = [];
    rows.push(nextRow);
    i = 0;
    while (i < 7) { //2) render each middle row inner
      nextRow.push(nextDay++);
      i++;
    }
  }
  if (numDays - nextDay >= 0) { //3) Contingent on there being less than a full week of days left over
    let lastRow = [];
    rows.push(lastRow);
    i = 0;
    while (nextDay <= numDays) { //3) render out remaining days
      lastRow.push(nextDay++);
      i++;
    }
    while (i < 7) { //3) render out null for the remaining places of the last week outside of the current month
      lastRow.push(null);
      i++;
    }
  }

  return rows;
}

function computeNumberOfDaysInMonth (year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function computeFirstDayOfMonth (year, month) {
  return new Date(year, month, 1).getDay();
}

function createCalendar (year, month) {
  const numDays = computeNumberOfDaysInMonth(year, month);
  const firstDay = computeFirstDayOfMonth(year, month);
  return {
    selectedDayOfMonth: 1,
    numDays: numDays,
    firstDay: firstDay,
    month: month,
    monthStr: MONTH_NUM_TO_STRING[month],
    year: year,
    matrix: createMatrix(numDays, firstDay)
  };
}


export default handleActions({
  [PREV_MONTH]: (state, action) => {
    let year = state.calendar.year;
    let month = state.calendar.month;
    if (state.calendar.month === 0) {
      month = 11;
      year --;
    } else {
      month --;
    }
    return {
      calendar: createCalendar(year, month)
    };
  },
  [NEXT_MONTH]: (state, action) => {
    let year = state.calendar.year;
    let month = state.calendar.month;
    if (state.calendar.month === 11) {
      month = 0;
      year ++;
    } else {
      month ++;
    }
    return {
      calendar: createCalendar(year, month)
    };
  },
  [SELECT_DATE]: (state, action) => {
    if (action.payload <= state.calendar.numDays && action.payload > 0) {
      return {
        ...state,
        calendar: {
          ...state.calendar,
          selectedDayOfMonth: action.payload
        }
      };
    }
    throw new Error('Day of month outside range');
  }
}, {
  calendar: createCalendar(initialYear, initialMonth)
})
