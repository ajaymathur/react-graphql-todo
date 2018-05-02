// @flow
import gql from 'graphql-tag';

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

export const ADD_TODO_QUERY = gql`
  mutation addTodo($task: String!) {
    addTodo(todo: {task: $task, Status: 0} ) {
      _id
      task
      Status
    }
  }
`;
