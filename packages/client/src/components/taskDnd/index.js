// @flow
import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoRow from "../taskRow";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type Props = {
  ...State,
  removeTask: Function
};

type State = {
  tasks: Array<Object>
};

export default class TaskDnd extends Component<Props, State> {
  state = {
    tasks: []
  };
  componentDidMount() {
    this.setState({
      tasks: this.props.tasks
    });
  }
  onDragEnd(result: { destination: ?Object, source: Object }) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.tasks,
      result.source.index,
      result.destination.index
    );

    this.setState({
      tasks: items
    });
  }

  render() {
    const { removeTask } = this.props;
    const { tasks } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppableId-1">
          {provided => (
            <div ref={provided.innerRef}>
              {tasks &&
                tasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoRow removeTask={removeTask} todo={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
