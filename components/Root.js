import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const ROOT_STYLE = Style.registerStyle(BASE_STYLE, {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  fontFamily: config.font.family,
  fontSize: config.font.size,
  lineHeight: config.font.lineHeight,
  color: config.colors.dark,
  backgroundColor: config.colors.light
});

const Root = ({children}) => <div className={ROOT_STYLE.className}>
  {children}
</div>;

export default Root;
