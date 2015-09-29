import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const HEADER_STYLE = Style.registerStyle(BASE_STYLE.style, {
  fontSize: config.header.fontSize,
  margin: 0,
  marginBottom: config.header.margin,
  textAlign: 'center',
  textShadow: config.header.shadow
});

const Header = ({children}) => <h1 className={HEADER_STYLE.className}>
  {children}
</h1>;

export default Header;
