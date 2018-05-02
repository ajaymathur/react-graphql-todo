import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TodoRow from './components/taskRow';
import { Container, Task as _taskStyles, TaskStatus } from './Todo.styles';
import {
  allTasksQuery,
  removeTaskMutation,
  updateTaskMutation
} from './gqlQueries';

class App extends Component {
  render() {
    return (
      <DragDropContext>
      <Query query={allTasksQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <Mutation
              mutation={removeTaskMutation}
              update={(cache, { data: { removeTodo } }) => {
                const { allTasks } = cache.readQuery({ query: allTasksQuery });
                console.log(removeTodo)
                cache.writeQuery({
                  query: allTasksQuery,
                  data: { allTasks: removeTodo }
                });
              }}
            >
              {
                (removeTask) => (
                  <Droppable droppableId="droppableId-1">
                  {(provided) => (
                      <div ref={provided.innerRef} className={Container}>
                        {data.allTasks && data.allTasks.map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}>
                              <TodoRow removeTask={removeTask} todo={task} />
                              </div>
                            )}
                            {/* <div className={_taskStyles}>
                              {task.task}
                            </div>
                            <div className={TaskStatus}>
                              {task.Status}
                              <button onClick={() => { removeTask({ variables: { id: task._id } }) }}>del</button>
                              <Mutation
                                mutation={updateTaskMutation}
                              >
                                {
                                  (updateTask) => (
                                    <button onClick={() => { updateTask({ variables: { id: '5ae6d3abe95399c420e47139', task: 'somethign not sensible', Status: '3' } }) }}>+</button>
                                  )
                                }
                              </Mutation>
                            </div> */}
                          </Draggable>
                          ))
                        }
                        </div>
                        )
                      }
                  </Droppable>
                )
              }
            </Mutation>
          )
        }}
      </Query>
      </DragDropContext>
    );
  }
}

export default App;
