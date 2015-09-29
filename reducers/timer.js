import {Map} from 'immutable';
import {createReducer} from 'redux-immutablejs';
import {
  TIMER_STARTED, TIMER_STOPPED, TIMER_PAUSED, INCREMENT_TIME, EDIT_CONFIG,
  UPDATE_CONFIG, STOP_EDIT_CONFIG,
  POMODORO, SHORT_PAUSE, LONG_PAUSE
} from '../constants/timer';

export default createReducer(Map({
  running: false,
  paused: false,
  configuring: false,
  seconds: 0,
  period: POMODORO,
  pomodoro: 1,
  config: Map({
    pomodoro: 25 * 60,
    short_pause: 5 * 60,
    long_pause: 15 * 60,
    pomodoro_number: 4,
  })
}), {
  [TIMER_STARTED]: (timer, action) => {
    if (timer.get('paused')) {
      timer = timer.set('paused', false);

      if (timer.get('period') === POMODORO) {
        timer = timer.set('seconds', 0);
      }

      return timer;
    }

    return timer.
      set('running', true).
      set('seconds', 0).
      set('period', POMODORO).
      set('pomodoro', 1);
  },

  [TIMER_STOPPED]: (timer, action) => timer.
    set('running', false).
    set('paused', false),

  [TIMER_PAUSED]: (timer, action) => timer.set('paused', true),

  [INCREMENT_TIME]: (timer, action) => {
    const seconds = timer.get('seconds') + 1;
    const period = timer.get('period');
    const config = timer.get('config');

    if (period === POMODORO && seconds === config.get('pomodoro')) {
      const pomodoro = timer.get('pomodoro');

      if (pomodoro === config.get('pomodoro_number')) {
        return timer.
          set('seconds', 0).
          set('period', LONG_PAUSE);
      }

      return timer.
        set('period', SHORT_PAUSE).
        set('seconds', 0);
    }

    if (period === SHORT_PAUSE && seconds === config.get('short_pause')) {
      const pomodoro = timer.get('pomodoro');

      return timer.
        set('seconds', 0).
        set('period', POMODORO).
        set('pomodoro', pomodoro + 1);
    }

    if (period === LONG_PAUSE && seconds === config.get('long_pause')) {
      return timer.
        set('seconds', 0).
        set('period', POMODORO).
        set('pomodoro', 1);
    }

    return timer.set('seconds', seconds);
  },

  [EDIT_CONFIG]: (timer, action) => timer.set('configuring', true),

  [UPDATE_CONFIG]: (timer, action) => {
    if (!timer.get('running')) {
      return timer.setIn(['config', action.key], action.value);
    }

    return timer;
  },

  [STOP_EDIT_CONFIG]: (timer, action) => timer.set('configuring', false)
});
