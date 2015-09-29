import sinon from 'sinon';
import * as TimerActions from '../../actions/timer';
import {
  TIMER_STARTED, TIMER_STOPPED, INCREMENT_TIME
} from '../../constants/timer';

suite('TimerActions', () => {
  suiteSetup(() => {
    const setInterval = global.setInterval;

    sinon.stub(global, 'setInterval', (cb, ms) => {
      return setInterval(cb, 1);
    });
  });

  suiteTeardown(() => {
    global.setInterval.restore();
  });

  test('starts and stops the timer', (done) => {
    const startTimer = TimerActions.startTimer();
    const stopTimer = TimerActions.stopTimer();

    let dispatch = sinon.spy((action) => {
      if (action.type === INCREMENT_TIME) {
        stopTimer(dispatch);

        sinon.assert.calledThrice(dispatch);
        sinon.assert.calledWith(dispatch, {type: TIMER_STARTED});
        sinon.assert.calledWith(dispatch, {type: TIMER_STOPPED});
        sinon.assert.calledWith(dispatch, {type: INCREMENT_TIME});

        done();
      }
    });

    startTimer(dispatch);
  });

  test('restarts and stops the timer', (done) => {
    const startTimer = TimerActions.startTimer();
    const stopTimer = TimerActions.stopTimer();

    let dispatch = sinon.spy((action) => {
      if (action.type === INCREMENT_TIME) {
        stopTimer(dispatch);

        sinon.assert.callCount(dispatch, 4);
        sinon.assert.calledWith(dispatch, {type: TIMER_STARTED});
        sinon.assert.calledWith(dispatch, {type: TIMER_STOPPED});
        sinon.assert.calledWith(dispatch, {type: INCREMENT_TIME});

        done();
      }
    });

    startTimer(dispatch);
    startTimer(dispatch);
  });
});
