import {
  TIMER_STARTED, TIMER_STOPPED, TIMER_PAUSED, INCREMENT_TIME, EDIT_CONFIG,
  UPDATE_CONFIG, STOP_EDIT_CONFIG
} from '../constants/timer';

let timer = null;

export function startTimer() {
  return (dispatch) => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    timer = setInterval(() => dispatch(incrementTime()), 1000);

    dispatch(timerStarted());
  };
};

export function stopTimer() {
  return (dispatch) => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    dispatch(timerStopped());
  };
};

export function pauseTimer() {
  return (dispatch) => {
    if (timer) {
      clearInterval(timer);
      timer = null;

      dispatch(timerPaused());
    }
  };
};

export function editConfig() {
  return {
    type: EDIT_CONFIG
  };
};

export function updateConfig(key, value) {
  return {
    type: UPDATE_CONFIG,
    key: key,
    value: value
  };
};

export function stopEditConfig() {
  return {
    type: STOP_EDIT_CONFIG
  };
};

function timerStarted() {
  return {
    type: TIMER_STARTED
  };
}

function timerStopped() {
  return {
    type: TIMER_STOPPED
  };
}

function timerPaused() {
  return {
    type: TIMER_PAUSED
  };
}

function incrementTime() {
  return {
    type: INCREMENT_TIME
  };
}
