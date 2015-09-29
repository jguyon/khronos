import FreeStyle from 'react-free-style';

if (__CLIENT__) {
  require('normalize.css/normalize.css');
  require('./fonts.css');
  require('./icons.css');
}

const Style = FreeStyle.create();

export default Style;
