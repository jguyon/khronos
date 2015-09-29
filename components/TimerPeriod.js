import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';
import {POMODORO, SHORT_PAUSE, LONG_PAUSE} from '../constants/timer';

const PERIOD_STYLE = Style.registerStyle(BASE_STYLE.style, {
  textAlign: 'center',
  color: config.colors.grey,
  fontStyle: 'italic'
});

const TimerPeriod = ({period, isRunning, isPaused}) => {
  let text;

  if (isRunning) {
    if (isPaused) {
      text = 'Click on play when you are ready again';
    } else {
      switch(period) {
        case POMODORO:
          text = 'Now work without doing anything else'
          break;
        case SHORT_PAUSE:
          text = 'Rest for a while without doing work-related stuff'
          break;
        case LONG_PAUSE:
          text = 'Now rest for a longer period';
      }
    }
  } else {
    text = 'Click when you are ready to work';
  }

  return <div className={PERIOD_STYLE.className}>{text}</div>;
};

export default TimerPeriod;
