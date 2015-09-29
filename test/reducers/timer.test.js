import {assert} from 'chai';
import {Map} from 'immutable';
import timerReducer from '../../reducers/timer';
import {
  TIMER_STARTED, TIMER_STOPPED, TIMER_PAUSED, INCREMENT_TIME, EDIT_CONFIG,
  UPDATE_CONFIG, STOP_EDIT_CONFIG,
  POMODORO, SHORT_PAUSE, LONG_PAUSE
} from '../../constants/timer';

const initialState = Map({
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
    pomodoro_number: 4
  })
});

suite('timerReducer', () => {
  test('initializes state', () => {
    const state = timerReducer();
    assert.ok(initialState.equals(state));
  });

  test('starts pomodoro on TIMER_STARTED', () => {
    const old = initialState.merge({
      seconds: 2,
      period: SHORT_PAUSE,
      pomodoro: 2
    });
    const state = timerReducer(old, {type: TIMER_STARTED});

    assert.strictEqual(state.get('running'), true);
    assert.strictEqual(state.get('seconds'), 0);
    assert.strictEqual(state.get('period'), POMODORO);
    assert.strictEqual(state.get('pomodoro'), 1);
  });

  test('starts pomodo on TIMER_STARTED when paused', () => {
    const old = initialState.merge({
      seconds: 2,
      paused: true
    });
    const state = timerReducer(old, {type: TIMER_STARTED});

    assert.notOk(state.get('paused'));
    assert.strictEqual(state.get('seconds'), 0);
  });

  test('stops pomodoro on TIMER_STOPPED', () => {
    const old = initialState.set('running', true);
    const state = timerReducer(old, {type: TIMER_STOPPED});

    assert.strictEqual(state.get('running'), false);
  });

  test('pauses pomodoro on TIMER_PAUSED', () => {
    const state = timerReducer(initialState, {type: TIMER_PAUSED});
    assert.ok(state.get('paused'));
  });

  test('increments seconds on INCREMENT_TIME', () => {
    const state = timerReducer(initialState, {type: INCREMENT_TIME});
    assert.strictEqual(state.get('seconds'), 1);
  });

  test('transitions to SHORT_PAUSE from POMODORO  on INCREMENT_TIME', () => {
    const old = initialState.set('seconds', 25 * 60 - 1);
    const state = timerReducer(old, {type: INCREMENT_TIME});

    assert.strictEqual(state.get('seconds'), 0);
    assert.strictEqual(state.get('period'), SHORT_PAUSE);
  });

  test('retransitions to POMODORO from SHORT_PAUSE on INCREMENT_TIME', () => {
    const old = initialState.
      set('seconds', 5 * 60 - 1).
      set('period', SHORT_PAUSE);
    const state = timerReducer(old, {type: INCREMENT_TIME});

    assert.strictEqual(state.get('seconds'), 0);
    assert.strictEqual(state.get('period'), POMODORO);
    assert.strictEqual(state.get('pomodoro'), 2);
  });

  test('transitions to LONG_PAUSE from POMODORO on INCREMENT_TIME', () => {
    const old = initialState.
      set('seconds', 25 * 60 - 1).
      set('pomodoro', 4);
    const state = timerReducer(old, {type: INCREMENT_TIME});

    assert.strictEqual(state.get('seconds'), 0);
    assert.strictEqual(state.get('period'), LONG_PAUSE);
  });

  test('retransitions to POMODORO from LONG_PAUSE on INCREMENT_TIME', () => {
    const old = initialState.
      set('seconds', 15 * 60 - 1).
      set('period', LONG_PAUSE).
      set('pomodoro', 4);
    const state = timerReducer(old, {type: INCREMENT_TIME});

    assert.strictEqual(state.get('seconds'), 0);
    assert.strictEqual(state.get('period'), POMODORO);
    assert.strictEqual(state.get('pomodoro'), 1);
  });

  test('marks timer as configuring on EDIT_CONFIG', () => {
    const state = timerReducer(initialState, {type: EDIT_CONFIG});
    assert.ok(state.get('configuring'));
  });

  test('updates config on EDIT_CONFIG', () => {
    const state = timerReducer(initialState, {
      type: UPDATE_CONFIG,
      key: 'pomodoro',
      value: 2
    });

    assert.strictEqual(state.getIn(['config', 'pomodoro']), 2);
  });

  test('marks timer as not configuring on STOP_EDIT_CONFIG', () => {
    const old = initialState.set('configuring', true);
    const state = timerReducer(old, {type: STOP_EDIT_CONFIG});

    assert.notOk(state.get('configuring'));
  });
});
