import React from 'react';
import { render } from 'react-dom';
import Calendar  from './components/Calendar';
import DateBox from './components/DateBox';
import store from './store';
import {Provider} from 'react-redux';
import style from './index.css';

render(
  <Provider store={store}>
    <div className={style.container}>
      <DateBox />
      <Calendar />
    </div>
  </Provider>,
  document.getElementById('root')
);
