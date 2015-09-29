import React from 'react';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const CARD_STYLE = Style.registerStyle(BASE_STYLE.style, {
  backgroundColor: config.colors.white,
  color: config.colors.black,
  boxShadow: config.card.shadow,
  borderRadius: config.card.radius,
  marginBottom: config.card.margin,
  overflow: 'hidden'
});

const WRAPPER_STYLE = Style.registerStyle(BASE_STYLE.style, {
  padding: config.card.padding,
});

const Card = ({children}) => <div className={CARD_STYLE.className}>
  <div className={WRAPPER_STYLE.className}>{children}</div>
</div>;

export default Card;
