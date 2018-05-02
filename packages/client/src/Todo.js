import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
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
                  <div className={Container}>
                    {
                      data.allTasks && data.allTasks.map(task => (
                        <TodoRow removeTask={removeTask} todo={task} key={task._id}>
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
                        </TodoRow>
                      ))
                    }
                  </div>
                )
              }
            </Mutation>
          )
        }}
      </Query>
    );
  }
}

export default App;
