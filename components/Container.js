import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const CONTAINER_STYLE = Style.registerStyle(BASE_STYLE.style, {
  margin: 'auto',
  maxWidth: config.container.maxWidth,
  padding: config.container.padding
});

const Container = ({children}) => <div className={CONTAINER_STYLE.className}>
  {children}
</div>;

export default Container;
