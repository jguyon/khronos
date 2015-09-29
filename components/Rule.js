import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const RULE_STYLE = Style.registerStyle(BASE_STYLE.style, {
  border: 0,
  borderTop: config.rule.border,
  margin: 0,
  marginBottom: config.rule.margin,
  boxShadow: config.rule.shadow
});

const Rule = ({children}) => <hr className={RULE_STYLE.className} />;

export default Rule;
