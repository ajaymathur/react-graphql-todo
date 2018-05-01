import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Task as _taskStyles, TaskStatus } from './Todo.styles';

export const allTasksQuery = gql`
{
  allTasks {
    _id
    task
    Status
  }
}
`;

export const removeTaskMutation = gql`
mutation($id: String!){
  removeTodo(todo: {_id: $id}) {
    task
    Status
    _id
  }
}
`;

export const updateTaskMutation = gql`
mutation($id: String, $task: String, $Status: String) {
  updateTodo(todo: { _id: $id, task: $task, Status: $Status }) {
    _id
    task
    Status
  }
}
`;

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
                        <div key={task._id}>
                          <div className={_taskStyles}>
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
                          </div>
                        </div>
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
