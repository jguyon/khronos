import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const CLOCK_STYLE = Style.registerStyle(BASE_STYLE.style, {
  fontSize: config.clock.fontSize,
  fontWeight: 'bold',
  textAlign: 'center'
});

const TimerClock = ({seconds}) => (
  <div className={CLOCK_STYLE.className}>{formatSeconds(seconds)}</div>
);

export default TimerClock;

function formatSeconds(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;

  return <div>{`${formatNumber(mins)}:${formatNumber(secs)}`}</div>;
}

function formatNumber(number) {
  if (number >= 10) {
    return number;
  }

  return `0${number}`;
}
