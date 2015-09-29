import React from 'react';
import TimerClock from './TimerClock';
import TimerPeriod from './TimerPeriod';
import TimerControls from './TimerControls';
import Card from './Card';
import Slider from './Slider';
import Button from './Button';
import TimerConfig from './TimerConfig';
import CrossFadeTransition from './CrossFadeTransition';

const Timer = ({state, actions}) => {
  let child;

  if (state.get('configuring')) {
    const config = state.get('config');

    child = <TimerConfig
      key="config"
      config={config}
      onUpdate={actions.updateConfig}
      onStopEdit={actions.stopEditConfig} />;
  }
  else {
    child = <div key="timer">
      <TimerClock seconds={state.get('seconds')} />
      <TimerControls
        isRunning={state.get('running')}
        isPaused={state.get('paused')}
        onRun={actions.startTimer}
        onStop={actions.stopTimer}
        onPause={actions.pauseTimer}
        onConfig={actions.editConfig} />
      <TimerPeriod
        isRunning={state.get('running')}
        isPaused={state.get('paused')}
        period={state.get('period')} />
    </div>;
  }

  return <Card>
    <CrossFadeTransition>
      {child}
    </CrossFadeTransition>
  </Card>;
};

export default Timer;
