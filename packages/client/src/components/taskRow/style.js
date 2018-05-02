import { css } from 'emotion';

export const _rowTodo = css`
  box-sizing: border-box;
  display: flex;
  font-size: 2em;
  justify-content: space-between;
  height: 50px;
  padding: 5px;
  width: 100%;
`;

export const _taskTitleCell = css`
  border-right: 1px solid #c7c7c7;
  width: 80%;
`;

export const _statusCell = css`
  padding: 0 5px;
  border-right: 1px solid #c7c7c7;
`;

export const _doneButton = css`
  background: #94ff94;
  border: none;
  box-shadow: 0px 2px 2px 0px #a8a8a8, 0px 0px 6px 0px #a4a4a4;
  padding: 0px 20px;
  font-size: 1.1em;
`;
