import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Style from '../styles';
import * as config from '../styles/config';
import BASE_STYLE from '../styles/base';

const SLIDER_STYLE = Style.registerStyle(BASE_STYLE.style, {
  position: 'relative',
  backgroundColor: config.colors.grey,
  height: config.slider.height,
  marginTop: config.slider.marginBottom,
  marginBottom: config.slider.marginTop
});

const HANDLE_STYLE = Style.registerStyle(BASE_STYLE.style, {
  position: 'absolute',
  width: 1,
  height: 1,
  cursor: 'pointer',
  transition: `left ${config.transitions.time}`,
  '&:after': {
    backgroundColor: config.colors.base,
    position: 'relative',
    display: 'block',
    content: "''",
    width: 16,
    height: 16,
    borderRadius: '50%',
    top: -8,
    left: -8,
    boxShadow: config.slider.shadow,
    transition: `box-shadow ${config.transitions.time}`,
  },
  '&:hover': {
    '&:after': {
      boxShadow: config.slider.hoverShadow
    }
  },
  '&:active': {
    '&:after': {
      boxShadow: config.slider.hoverShadow
    }
  },
});

export default class Slider extends Component {
  render() {
    const style = {left: this.getPosition()}

    return <div className={SLIDER_STYLE.className}>
      <div
        ref="handle"
        className={HANDLE_STYLE.className}
        style={style}
        onMouseDown={this.handleMouseDown.bind(this)}>
      </div>
    </div>;
  }

  getPosition() {
    const left = 100 * (this.props.value - this.props.min) /
      (this.props.max - this.props.min);

      if (left < 0) {
        return '0%';
      }

      if (left > 100) {
        return '100%';
      }

      return `${left}%`;
  }

  handleMouseDown(e) {
    e.preventDefault();
    let handle = this.refs.handle;

    this.startDragPos = e.clientX - handle.offsetLeft;

    this.mousemoveListener = this.handleDrag.bind(this);
    this.mouseupListener = this.handleDragEnd.bind(this);

    document.addEventListener('mousemove', this.mousemoveListener);
    document.addEventListener('mouseup', this.mouseupListener);
  }

  handleDrag(e) {
    e.preventDefault();

    const pos = e.clientX - this.startDragPos;
    this.change(pos);
  }

  handleDragEnd(e) {
    e.preventDefault();
    document.removeEventListener('mousemove', this.mousemoveListener);
    document.removeEventListener('mouseup', this.mouseupListener);
  }

  change(pos) {
    if (!this.props.onChange) {
      return;
    }

    const width = findDOMNode(this).getBoundingClientRect().width;

    if (pos < 0) pos = 0;
    if (pos > width) pos = width;

    let value  = (pos / width) * (this.props.max - this.props.min) +
      this.props.min;
    value = Math.round(value / this.props.step) * this.props.step;

    if (value != this.props.value) {
      this.props.onChange(value);
    }
  }
};
