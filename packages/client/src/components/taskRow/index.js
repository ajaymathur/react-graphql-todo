// @flow
import React, { Component } from "react";
import { _rowTodo, _taskTitleCell, _doneButton, _statusCell } from "./style";

type Props = {
  todo: {
    task: string,
    Status: string,
    _id: string
  },
  removeTask: Function
};

export default class TaskRow extends Component<Props> {
  render() {
    const { todo, removeTask } = this.props;
    return (
      <div className={_rowTodo}>
        <div className={_taskTitleCell}>{todo.task}</div>
        <div className={_statusCell}>{todo.Status}</div>
        <button
          className={_doneButton}
          onClick={() => {
            removeTask({ variables: { id: todo._id } });
          }}
        >
          Done
        </button>
      </div>
    );
  }
}
