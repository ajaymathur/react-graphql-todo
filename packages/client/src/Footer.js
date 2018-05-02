import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import AddTask from './components/addTask';
import { allTasksQuery, ADD_TODO_QUERY } from './gqlQueries';

export default class Footer extends Component{
  render() {
    return (
      <Mutation 
        mutation={ADD_TODO_QUERY}
        update={(cache, { data: { addTodo } }) => {
          const { allTasks } = cache.readQuery({ query: allTasksQuery });
          allTasks.push(addTodo);
          cache.writeQuery({
            query: allTasksQuery,
            data: { allTasks }
          });
        }}
      >
      {
        (addTodo, { data }) => (
          <AddTask addTodo={addTodo} />
        )
      }
      </Mutation>
    )
  }
}
