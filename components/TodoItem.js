import React from 'react';
import * as config from '../styles/config';
import Card from './Card';
import Button from './Button';
import TodoInput from './TodoInput';
import CrossFadeTransition from './CrossFadeTransition';

const TodoItem = ({
  todo, onComplete, onUncomplete, onDelete, onEdit, onUpdate, onStopEdit
}) => {
  let child;

  if (todo.get('editing')) {
    child = <TodoInput
      key="input"
      todo={todo}
      onSave={onUpdate}
      onBlur={onStopEdit} />;
  } else {
    const rightStyle = {
      float: 'right',
      marginLeft: 3
    };
    const leftStyle = {
      float: 'left',
      marginRight: 3
    }

    let style, onClick, icon;
    if (todo.get('completed')) {
      style = {textDecoration: 'line-through', color: config.colors.grey};
      onClick = () => onUncomplete(todo.get('id'));
      icon = 'check';
    } else {
      style = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      };
      onClick = () => onComplete(todo.get('id'));
      icon = 'uncheck';
    }

    child = <div key="todo">
      <div style={rightStyle}>
        <Button onClick={() => onEdit(todo.get('id'))} icon="edit" />
        {' '}
        <Button onClick={() => onDelete(todo.get('id'))} icon="delete" />
      </div>

      <div style={leftStyle}>
        <Button onClick={onClick} icon={icon} />
      </div>

      <div style={style}>{todo.get('text')}</div>
    </div>;
  }

  return <Card>
    <CrossFadeTransition>{child}</CrossFadeTransition>
  </Card>;
};

export default TodoItem;
