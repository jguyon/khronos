import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const INPUT_STYLE = Style.registerStyle(BASE_STYLE.style, {
  background: 'inherit',
  border: 0,
  borderBottom: config.textInput.border,
  height: config.textInput.height,
  width: '100%',
  padding: 0,
  margin: 0,
  outline: 0,
  '&::-webkit-input-placeholder': {
    color: config.colors.grey,
    opacity: 1
  },
  '&::-moz-placeholder': {
    color: config.colors.grey,
    opacity: 1
  },
  '&:-ms-input-placeholder': {
    color: config.colors.grey,
    opacity: 1
  }
});

const TextInput = ({
  onKeyDown, onBlur, placeholder, defaultValue, autoFocus
}) => (
  <input
    type="text"
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    defaultValue={defaultValue}
    autoFocus={autoFocus}
    className={INPUT_STYLE.className}
    onBlur={onBlur}
    onFocus={(e) => setTimeout(() => e.target.select(), 0)} />
);

export default TextInput;
