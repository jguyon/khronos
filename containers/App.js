import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {injectStyle} from 'react-free-style'
import * as TimerActions from '../actions/timer';
import * as TodoListActions from '../actions/todoList';
import Style from '../styles';
import Root from '../components/Root';
import Container from '../components/Container';
import Header from '../components/Header';
import Rule from '../components/Rule';
import Timer from '../components/Timer';
import TodoList from '../components/TodoList';

@connect((state) => {
  return {state: state};
})
@injectStyle(Style)
export default class App extends Component {
  render() {
    return <div>
      <Root>
        <Container>
          <Header>Khronos</Header>
          <Timer
            state={this.props.state.get('timer')}
            actions={bindActionCreators(TimerActions, this.props.dispatch)} />
          <Rule />
          <TodoList
            state={this.props.state.get('todoList')}
            actions={bindActionCreators(TodoListActions, this.props.dispatch)} />
        </Container>
      </Root>

      <Style.Element />
    </div>;
  }
};
