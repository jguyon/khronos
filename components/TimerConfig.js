import React, {Component} from 'react';
import Style from '../styles';
import BASE_STYLE from '../styles/base';
import Slider from './Slider';
import Button from './Button';
import Spacer from './Spacer';

const TIMER_CONFIG_STYLE = Style.registerStyle(BASE_STYLE.style, {
  textAlign: 'center'
});

const LABEL_STYLE = Style.registerStyle(BASE_STYLE.style, {
  '&:after': {
    content: '""',
    display: 'table',
    clear: 'both'
  }
});

const TEXT_STYLE = Style.registerStyle(BASE_STYLE.style, {
  float: 'left'
});

const VALUE_STYLE = Style.registerStyle(BASE_STYLE.style, {
  float: 'right',
  fontWeight: 'bold'
});

const Label = ({text, value}) => <div className={LABEL_STYLE.className}>
  <div className={TEXT_STYLE.className}>{text}</div>
  <div className={VALUE_STYLE.className}>{value}</div>
</div>;

class TimerConfig extends Component {
  render() {
    const {config, onUpdate, onStopEdit, className} = this.props;

    return <div className={TIMER_CONFIG_STYLE.className + ' ' + className}>
      <Label
        text="Focus:"
        value={config.get('pomodoro') / 60 + ' minutes'} />
      <Slider min={5} max={45} step={5} value={config.get('pomodoro') / 60}
        onChange={(val) => onUpdate('pomodoro', val * 60)} />
      <Spacer />

      <Label
        text="Short pause:"
        value={config.get('short_pause') / 60 + ' minutes'} />
      <Slider min={2} max={12} step={1} value={config.get('short_pause') / 60}
        onChange={(val) => onUpdate('short_pause', val * 60)} />
      <Spacer />

      <Label
        text="Long pause:"
        value={config.get('long_pause') / 60 + ' minutes'} />
      <Slider min={5} max={30} step={5} value={config.get('long_pause') / 60}
        onChange={(val) => onUpdate('long_pause', val * 60)} />
      <Spacer />

      <Label
        text="Cycles before long pause:"
        value={config.get('pomodoro_number') + ' cycles'} />
      <Slider min={2} max={8} step={1} value={config.get('pomodoro_number')}
        onChange={(val) => onUpdate('pomodoro_number', val)} />
      <Spacer />

      <div>
        <Button icon="back" big
          onClick={() => onStopEdit()} />
      </div>
    </div>;
  }
};

export default TimerConfig;
