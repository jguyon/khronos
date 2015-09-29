import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const SPACER_STYLE = Style.registerStyle(BASE_STYLE.style, {
  marginBottom: config.spacer.margin - 1,
  height: 1
});

const Spacer = () => <div className={SPACER_STYLE.className}></div>;

export default Spacer;
