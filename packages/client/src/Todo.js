import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

import TodoRow from "./components/taskRow";
import { Container, Task as _taskStyles, TaskStatus } from "./Todo.styles";
import {
  allTasksQuery,
  removeTaskMutation,
  updateTaskMutation
} from "./gqlQueries";
import TodoDnd from "./components/taskDnd";

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
                console.log(removeTodo);
                cache.writeQuery({
                  query: allTasksQuery,
                  data: { allTasks: removeTodo }
                });
              }}
            >
              {removeTask => (
                <TodoDnd removeTask={removeTask} tasks={data.allTasks} />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default App;
