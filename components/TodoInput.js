import React from 'react';
import TextInput from './TextInput';

const TodoInput = ({onSave, onBlur, todo}) => {
  if (todo) {
    return <TextInput
      onKeyDown={(e) => onSubmit(e, onSave, todo)}
      defaultValue={todo.get('text')}
      autoFocus={true}
      onBlur={() => onBlur(todo.get('id'))} />;
  }

  return <TextInput
    placeholder="Add something to do"
    onKeyDown={(e) => onSubmit(e, onSave)} />;
};

export default TodoInput;

function onSubmit(e, onSave, todo) {
  if (e.which === 13) {
    const text = e.target.value.trim();

    if (text.length > 0) {
      if (todo) {
        onSave(todo.get('id'), text);
      } else {
        e.target.value = '';
        e.target.blur();
        onSave(text);
      }
    }
  }
}
