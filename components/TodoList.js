import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import Card from './Card';
import ListTransition from './ListTransition';
import * as config from '../styles/config';

export default class TodoList extends Component {
  render() {
    const {state, actions} = this.props;

    return <div>
      <ListTransition margin={config.card.margin}>
        {state.get('todos').map((todo) => (
          <TodoItem
            key={todo.get('id')}
            todo={todo}
            onComplete={actions.completeTodo}
            onUncomplete={actions.uncompleteTodo}
            onDelete={actions.deleteTodo}
            onEdit={actions.editTodo}
            onUpdate={actions.updateTodo}
            onStopEdit={actions.stopEditTodo} />
        )).toJS()}
      </ListTransition>

      <Card>
        <TodoInput onSave={actions.addTodo} />
      </Card>
    </div>;
  }
};
