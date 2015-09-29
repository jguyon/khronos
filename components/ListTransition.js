import React, {Component} from 'react';
import TransitionManager from 'react-transition-manager';
import Measure from 'react-measure';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const time = config.transitions.longTime;

const CHILD_STYLE = Style.registerStyle(BASE_STYLE.style, {
  '&.add': {
    transition: `height ${time}, margin-bottom ${time}, opacity ${time}`,
    opacity: 0,
    '&.show': {
      opacity: 1,
      '&.hide': {
        opacity: 0,
        height: '0 !important',
        marginBottom: '0 !important'
      }
    }
  },
  '&.add:not(.show)': {
    height: '0 !important',
    marginBottom: '0 !important'
  }
});

export default class ListTransition extends Component {
  constructor() {
    super();
    this.state = {heights: {}};
  }

  handleChange(key, dim) {
    let heights = this.state.heights;
    heights[key] = dim.height;

    this.setState({heights: heights});
  }

  getChildren() {
    const {children, margin} = this.props;

    return children.map((child) => {
      const key = child.key;
      const style = this.state.heights[key] ?
        {height: this.state.heights[key], marginBottom: margin} :
        {marginBottom: margin};

      let component;
      if (__SERVER__) {
        component = <div className="list-item">
          {child}
        </div>
      } else {
        component = <Measure onChange={(d) => this.handleChange(key, d)}>
          <div className="list-item">
            {child}
          </div>
        </Measure>;
      }

      return <div key={key} style={style} className={CHILD_STYLE.className}>
        <Measure onChange={(d) => this.handleChange(key, d)}>
          <div className="list-item">
            {child}
          </div>
        </Measure>
      </div>;
    });
  }

  render() {
    return (
      <TransitionManager
        component="div"
        duration={config.transitions.longDuration}>
        {this.getChildren()}
      </TransitionManager>
    );
  }
};
