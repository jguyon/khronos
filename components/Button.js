import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const BUTTON_STYLE = Style.registerStyle(BASE_STYLE.style, {
  backgroundColor: 'inherit',
  border: 'none',
  padding: 0,
  margin: 0,
  textShadow: config.button.shadow,
  color: config.colors.base,
  lineHeight: 1,
  transition: `text-shadow ${config.transitions.time}`,
  outline: 0,
  '&:hover': {
    textShadow: config.button.hoverShadow,
    '&:active': {
      textShadow: config.button.shadow
    }
  }
});

const BIG_BUTTON_STYLE = Style.registerStyle(
  BASE_STYLE.style, BUTTON_STYLE.style, {
    fontSize: config.button.bigFontSize
  }
);

const Button = ({icon, onClick, big}) => {
  let className;
  if (big) {
    className = BIG_BUTTON_STYLE.className;
  } else {
    className = BUTTON_STYLE.className;
  }

  return <button type="button" className={className} onClick={onClick}>
    <i className={`icon icon-${icon}`} />
  </button>
};

export default Button;
