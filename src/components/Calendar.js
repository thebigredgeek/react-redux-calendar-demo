import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators } from 'redux'
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';

import {prevMonth, nextMonth, selectDate} from '../actions';
import style from './Calendar.css';
import {DAYS_OF_WEEK} from '../constants';

class Calendar extends React.Component {
  constructor (props, context) {
    super(props, context);
  }
  render () {
    return (
      <div className={style.rootContainer}>
        <div className={style.headerContainer}>
          <MdChevronLeft className={style.chevronLeft} onClick={this.props.actions.prevMonth}/>
          <MdChevronRight className={style.chevronRight} onClick={this.props.actions.nextMonth}/>
          <div className={style.dateContainer}>
            <p className={style.month}>{this.props.calendar.monthStr}</p>
            <p className={style.year}>{this.props.calendar.year}</p>
          </div>
        </div>
        <div className={style.bodyContainer}>
          <table className={style.bodyTable}>
            <tbody>
              <tr>{DAYS_OF_WEEK.map((day, i) => <td key={i} className={style.bodyTableHeader}>{day}</td>)}</tr>
              {this.props.calendar.matrix.map(this.renderRow.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  renderRow (row, i) {
    return (
      <tr key={i}>
        {
          row.map((date, j) => {
            if (date) {
              let tdClass = classNames({
                [style.bodyTableDate]: true,
                [style.selected]: date === this.props.calendar.selectedDayOfMonth
              });
              let boundClick = this.props.actions.selectDate.bind(null, date);
              return <td key={j} className={tdClass} onClick={boundClick}>{date}</td>
            }
            return <td key={j}></td>
          })
        }
      </tr>
    );
  }
}

function mapStateToProps (state) {
  return { calendar: state.calendar };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      prevMonth,
      nextMonth,
      selectDate
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
