// @flow
import React, { Component } from 'react';
import {
  _addTask,
  _inputTask,
  _buttonAdd
} from './style';

type Props = {
  addTodo: Function,
}

type State = {
  newTask: number,
}

export default class addTask extends Component<Props, State>{
  state = {
    newTask: ''
  };

  handleInput = event => {
    this.setState({
      newTask: event.target.value,
    });
  }

  addTodo = () => {
    this.props.addTodo({
      variables: { task: this.state.newTask }
    });
    this.setState({
      newTask: ''
    });
  }

  render() {
    return (
      <div className={_addTask}>
        <input 
          className={_inputTask} 
          type="text" 
          placeholder="There is no better day than today"
          value={this.state.newTask}
          onChange={this.handleInput}
        />
        <button 
          className={_buttonAdd} 
          onClick={() => {this.addTodo({ variables: { task: this.state.newTask } })}}
        >
          Add
        </button>
      </div>
    )
  }
}
