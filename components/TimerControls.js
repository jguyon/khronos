import React from 'react';
import Style from '../styles';
import BASE_STYLE from '../styles/base';
import Button from './Button';

const CONTROLS_STYLE = Style.registerStyle(BASE_STYLE.style, {
  textAlign: 'center'
});

const TimerControls = ({
  isRunning, isPaused, onRun, onStop, onPause, onConfig
}) => {
  let children;

  if (isRunning) {
    let child;

    if (isPaused) {
      child = <Button key="0" icon="play" big onClick={() => onRun()} />;
    } else {
      child = <Button key="0" icon="pause" big onClick={() => onPause()} />;
    }

    children = [
      child,
      ' ',
      <Button icon="stop" key="1" big onClick={() => onStop()} />
    ];
  } else {
    children = [
      <Button icon="play" key="0" big onClick={() => onRun()} />,
      ' ',
      <Button icon="config" key="1" big onClick={() => onConfig()} />
    ];
  }

  return <div className={CONTROLS_STYLE.className}>
    {children}
  </div>;
};

export default TimerControls;
