import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { allTasksQuery } from './Todo';
import { Footer as _Footer, FooterInput, FooterAddButton } from './Footer.styles';

const ADD_TODO = gql`
  mutation addTodo($task: String!) {
    addTodo(todo: {task: $task, Status: 0} ) {
      task
      Status
    }
  }
`;

export default class Footer extends Component{

  handleInput = (event) => {
    this.setState({
      newTask: event.target.value,
    })
  }

  render() {
    return (
      <Mutation 
        mutation={ADD_TODO}
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
          <div className={_Footer}>
            <input className={FooterInput} type="text" placeholder="There is no better day than today" onChange={this.handleInput}/>
            <button className={FooterAddButton} onClick={() => {addTodo({ variables: { task: this.state.newTask } })}}>
              Add
            </button>
          </div>
        )
      }
      </Mutation>
    )
  }
}
