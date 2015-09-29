import React, {Component} from 'react';
import TransitionManager from 'react-transition-manager';
import Measure from 'react-measure';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const CROSS_FADE_STYLE = Style.registerStyle(BASE_STYLE.style, {
  position: 'relative',
  transition: `height ${config.transitions.longTime}`,
});

const CHILD_STYLE = Style.registerStyle(BASE_STYLE.style, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  '&.add': {
    transition: `opacity ${config.transitions.longTime}`,
    opacity: 0,
    '&.show': {
      opacity: 1,
      '&.shown': {
        position: 'static',
        '&.hide': {
          position: 'absolute',
          opacity: 0
        }
      }
    }
  }
});

export default class CrossFadeTransition extends Component {
  handleChange(dim) {
    this.setState({height: dim.height});
  }

  render() {
    const {children} = this.props;
    const style = this.state ? {height: this.state.height} : {};

    return (
      <TransitionManager
        component="div"
        className={CROSS_FADE_STYLE.className}
        duration={config.transitions.longDuration}
        style={style}>
        <div
          key={children.key}
          className={CHILD_STYLE.className}>
          <Measure onChange={(d) => this.handleChange(d)}>
            {children}
          </Measure>
        </div>
      </TransitionManager>
    );
  }
};
