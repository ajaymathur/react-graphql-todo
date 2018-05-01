'use strict';
const { Todo } = require('./connectors');

const resolvers = {
  Query: {
    allTasks() {
      return Todo.find({});
    }
  },
  Mutation: {
    addTodo(_, { todo }) {
      const newTodo = new Todo(todo);
      newTodo.save();
      return todo;
    },
    removeTodo(_, { todo }) {
      Todo.remove({ '_id': todo._id }, () => {});
      return Todo.find({});
    },
    updateTodo(_, { todo }) {
      console.log(todo)
      Todo.findByIdAndUpdate(todo._id, { task: todo.task, Status: todo.Status }, () => {});
      return todo;
    }
  }
}

module.exports = resolvers;
