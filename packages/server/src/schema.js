'use strict';
const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLInputObjectType } = require('graphql');
const resolvers = require('./resolvers');

const typeDefs = `
type Query {
  allTasks: [Todo]
}

type Mutation {
  addTodo(todo: TodoInput): Todo
  updateTodo(todo: TodoUpdateInput): Todo
  removeTodo(todo: TodoRemoveInput): [Todo]
}

type Todo{
  task: String
  Status: Int
  _id: String
}

input TodoInput{
  task: String
  Status: Int
}

input TodoRemoveInput{
  _id: String
}

input TodoUpdateInput{
  _id: String
  task: String
  Status: String
}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers });
