import {Map, List} from 'immutable';
import {assert} from 'chai';
import todoListReducer from '../../reducers/todoList';
import {
  ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO,
  STOP_EDIT_TODO
} from '../../constants/todoList';

suite('todoListReducer', () => {
  const initialState = Map({
    todos: List([
      Map({
        id: 0, text: 'Do something fun', completed: false, editing: false
      }),
      Map({
        id: 1, text: 'Do something not fun', completed: false, editing: false
      })
    ])
  });

  test('adds todo on ADD_TODO when todo list is empty', () => {
    const old = initialState.set('todos', List());
    const text = 'Do something';
    const state = todoListReducer(old, {type: ADD_TODO, text: text});
    const expected = Map({id: 0, text: text, completed: false, editing: false});

    assert.strictEqual(state.get('todos').size, 1)
    assert.ok(expected.equals(state.getIn(['todos', 0])));
  });

  test('adds todo on ADD_TODO when todo list is not empty', () => {
    const text = 'Do something';
    const state = todoListReducer(initialState, {type: ADD_TODO, text: text});
    const expected = Map({id: 2, text: text, completed: false, editing: false});

    assert.strictEqual(state.get('todos').size, 3);
    assert.ok(expected.equals(state.getIn(['todos', 2])));
  });

  test('marks todo as completed on COMPLETE_TODO', () => {
    const state = todoListReducer(initialState, {type: COMPLETE_TODO, id: 1});

    assert.strictEqual(state.getIn(['todos', 0, 'completed']), false);
    assert.strictEqual(state.getIn(['todos', 1, 'completed']), true);
  });

  test('marks todo as not completed on UNCOMPLETE_TODO', () => {
    const old = initialState.updateIn(['todos'], (todos) => (
      todos.map((todo) => todo.set('completed', true))
    ));
    const state = todoListReducer(old, {type: UNCOMPLETE_TODO, id: 1});

    assert.strictEqual(state.getIn(['todos', 0, 'completed']), true);
    assert.strictEqual(state.getIn(['todos', 1, 'completed']), false);
  });

  test('deletes todo on DELETE_TODO', () => {
    const state = todoListReducer(initialState, {type: DELETE_TODO, id: 1});

    assert.strictEqual(state.get('todos').size, 1);
    assert.ok(state.get('todos').includes(initialState.get('todos').first()));
    assert.notOk(state.get('todos').includes(initialState.get('todos').last()));
  });

  test('marks todo as editing on EDIT_TODO', () => {
    const state = todoListReducer(initialState, {type: EDIT_TODO, id: 1});

    assert.strictEqual(state.getIn(['todos', 0, 'editing']), false);
    assert.strictEqual(state.getIn(['todos', 1, 'editing']), true);
  });

  test('updates todo on UPDATE_TODO', () => {
    const text = 'Do something meh';
    const state = todoListReducer(initialState, {
      type: UPDATE_TODO,
      id: 1,
      text: text
    });

    assert.notStrictEqual(state.getIn(['todos', 0, 'text']), text);
    assert.strictEqual(state.getIn(['todos', 1, 'text']), text);
  });

  test('marks todo as not editing on STOP_EDIT_TODO', () => {
    const old = initialState.updateIn(['todos'], (todos) => (
      todos.map((todo) => todo.set('editing', true))
    ));
    const state = todoListReducer(old, {type: STOP_EDIT_TODO, id: 1});

    assert.strictEqual(state.getIn(['todos', 0, 'editing']), true);
    assert.strictEqual(state.getIn(['todos', 1, 'editing']), false);
  });
});
